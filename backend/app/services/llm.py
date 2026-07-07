import os
import httpx
import json
import logging
from typing import List, Dict, Any, Optional
from pydantic import BaseModel, ValidationError

logger = logging.getLogger(__name__)


class LLMProviderError(Exception):
    """Raised when all LLM providers fail."""

    def __init__(self, provider_errors: Dict[str, str]):
        self.provider_errors = provider_errors
        summary = "; ".join(
            f"{name}: {err}" for name, err in provider_errors.items()
        )
        super().__init__(f"All LLM providers failed — {summary}")


class Slide(BaseModel):
    title: str
    content: List[str]
    speaker_notes: Optional[str] = ""
    layout: str = "bullet_points"

class Presentation(BaseModel):
    title: str
    slides: List[Slide]

class LLMService:
    def __init__(self):
        self.openrouter_api_key = os.getenv("OPENROUTER_API_KEY")
        self.groq_api_key = os.getenv("GROQ_API_KEY")
        self.cerebras_api_key = os.getenv("CEREBRAS_API_KEY")
        self.nvidia_api_key = os.getenv("NVIDIA_NIM_API_KEY")
        
    async def generate_presentation(self, prompt: str) -> Presentation:
        system_prompt = """You are an expert presentation designer. 
        Create a coherent presentation based on the user's topic.
        Return the response as a JSON object with the following structure:
        {
          "title": "Presentation Title",
          "slides": [
            {
              "title": "Slide Title",
              "content": ["Point 1", "Point 2"],
              "speaker_notes": "Speaker notes for this slide",
              "layout": "bullet_points" (possible values: title_slide, bullet_points, image_text, text_only)
            }
          ]
        }
        Provide at least 5 slides. Ensure the narrative flows logically from introduction to conclusion."""
        
        user_prompt = f"Topic: {prompt}"
        
        providers = [
            ("Groq", self._call_groq),
            ("OpenRouter", self._call_openrouter),
            ("Cerebras", self._call_cerebras),
            ("Nvidia", self._call_nvidia)
        ]
        
        provider_errors: Dict[str, str] = {}

        for name, func in providers:
            try:
                logger.info("Trying LLM provider: %s", name)
                result = await func(system_prompt, user_prompt)
                if result is None:
                    raise ValueError("Provider returned empty result")
                presentation = Presentation(**result)
                logger.info("Successfully generated presentation via %s", name)
                return presentation
            except ValidationError as e:
                error_msg = f"Response validation failed: {e}"
                logger.warning("Provider %s returned invalid data: %s", name, error_msg)
                provider_errors[name] = error_msg
            except (httpx.HTTPStatusError, httpx.RequestError) as e:
                error_msg = str(e)
                logger.warning("HTTP error from provider %s: %s", name, error_msg)
                provider_errors[name] = error_msg
            except (json.JSONDecodeError, KeyError, IndexError) as e:
                error_msg = f"Failed to parse response: {e}"
                logger.warning("Parse error from provider %s: %s", name, error_msg)
                provider_errors[name] = error_msg
            except ValueError as e:
                error_msg = str(e)
                logger.warning("Provider %s unavailable: %s", name, error_msg)
                provider_errors[name] = error_msg

        raise LLMProviderError(provider_errors)

    def _extract_content(self, response: httpx.Response) -> str:
        """Extract the message content from an LLM API response.

        Raises ``KeyError`` / ``IndexError`` when the response body does not
        have the expected ``choices[0].message.content`` structure.
        """
        body = response.json()
        try:
            return body["choices"][0]["message"]["content"]
        except (KeyError, IndexError) as exc:
            raise KeyError(
                f"Unexpected response structure (keys: {list(body.keys())})"
            ) from exc

    async def _call_groq(self, system: str, user: str) -> Dict[str, Any]:
        if not self.groq_api_key:
            raise ValueError("Groq API key not configured")
            
        url = "https://api.groq.com/openai/v1/chat/completions"
        headers = {
            "Authorization": f"Bearer {self.groq_api_key}",
            "Content-Type": "application/json"
        }
        data = {
            "model": "llama-3.1-70b-versatile",
            "messages": [
                {"role": "system", "content": system},
                {"role": "user", "content": user}
            ],
            "response_format": {"type": "json_object"}
        }
        
        async with httpx.AsyncClient() as client:
            response = await client.post(url, headers=headers, json=data, timeout=30.0)
            response.raise_for_status()
            content = self._extract_content(response)
            return json.loads(content)

    async def _call_openrouter(self, system: str, user: str) -> Dict[str, Any]:
        if not self.openrouter_api_key:
            raise ValueError("OpenRouter API key not configured")
            
        url = "https://openrouter.ai/api/v1/chat/completions"
        headers = {
            "Authorization": f"Bearer {self.openrouter_api_key}",
            "Content-Type": "application/json"
        }
        data = {
            "model": "meta-llama/llama-3.1-8b-instruct:free",
            "messages": [
                {"role": "system", "content": system},
                {"role": "user", "content": user}
            ]
        }
        
        async with httpx.AsyncClient() as client:
            response = await client.post(url, headers=headers, json=data, timeout=30.0)
            response.raise_for_status()
            content = self._extract_content(response)
            if "```json" in content:
                parts = content.split("```json", 1)
                closing = parts[1].split("```", 1)
                if len(closing) < 2:
                    raise json.JSONDecodeError(
                        "Unterminated JSON code block in LLM response",
                        content,
                        0,
                    )
                content = closing[0].strip()
            return json.loads(content)

    async def _call_cerebras(self, system: str, user: str) -> Dict[str, Any]:
        if not self.cerebras_api_key:
            raise ValueError("Cerebras API key not configured")
            
        url = "https://api.cerebras.ai/v1/chat/completions"
        headers = {
            "Authorization": f"Bearer {self.cerebras_api_key}",
            "Content-Type": "application/json"
        }
        data = {
            "model": "llama3.1-70b",
            "messages": [
                {"role": "system", "content": system},
                {"role": "user", "content": user}
            ],
            "response_format": {"type": "json_object"}
        }
        
        async with httpx.AsyncClient() as client:
            response = await client.post(url, headers=headers, json=data, timeout=30.0)
            response.raise_for_status()
            content = self._extract_content(response)
            return json.loads(content)

    async def _call_nvidia(self, system: str, user: str) -> Dict[str, Any]:
        if not self.nvidia_api_key:
            raise ValueError("Nvidia NIM API key not configured")
            
        url = "https://integrate.api.nvidia.com/v1/chat/completions"
        headers = {
            "Authorization": f"Bearer {self.nvidia_api_key}",
            "Content-Type": "application/json"
        }
        data = {
            "model": "meta/llama-3.1-70b-instruct",
            "messages": [
                {"role": "system", "content": system},
                {"role": "user", "content": user}
            ],
            "response_format": {"type": "json_object"}
        }
        
        async with httpx.AsyncClient() as client:
            response = await client.post(url, headers=headers, json=data, timeout=30.0)
            response.raise_for_status()
            content = self._extract_content(response)
            return json.loads(content)
