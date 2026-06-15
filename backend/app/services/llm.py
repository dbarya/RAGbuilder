import os
import httpx
import json
from typing import List, Dict, Any, Optional
from pydantic import BaseModel

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
        
        # Try providers in order
        providers = [
            ("Groq", self._call_groq),
            ("OpenRouter", self._call_openrouter),
            ("Cerebras", self._call_cerebras),
            ("Nvidia", self._call_nvidia)
        ]
        
        for name, func in providers:
            try:
                print(f"Trying LLM provider: {name}")
                result = await func(system_prompt, user_prompt)
                if result:
                    return Presentation(**result)
            except Exception as e:
                print(f"Error calling {name}: {e}")
                continue
                
        raise Exception("All LLM providers failed")

    async def _call_groq(self, system: str, user: str) -> Dict[str, Any]:
        if not self.groq_api_key:
            raise ValueError("Groq API key not found")
            
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
            content = response.json()["choices"][0]["message"]["content"]
            return json.loads(content)

    async def _call_openrouter(self, system: str, user: str) -> Dict[str, Any]:
        if not self.openrouter_api_key:
            raise ValueError("OpenRouter API key not found")
            
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
            content = response.json()["choices"][0]["message"]["content"]
            # Extract JSON if it's wrapped in markdown
            if "```json" in content:
                content = content.split("```json")[1].split("```")[0].strip()
            return json.loads(content)

    async def _call_cerebras(self, system: str, user: str) -> Dict[str, Any]:
        if not self.cerebras_api_key:
            raise ValueError("Cerebras API key not found")
            
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
            content = response.json()["choices"][0]["message"]["content"]
            return json.loads(content)

    async def _call_nvidia(self, system: str, user: str) -> Dict[str, Any]:
        if not self.nvidia_api_key:
            raise ValueError("Nvidia NIM API key not found")
            
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
            content = response.json()["choices"][0]["message"]["content"]
            return json.loads(content)
