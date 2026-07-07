import os
from dataclasses import dataclass
from typing import List, Optional

from pydantic import BaseModel

from app.utils.http import call_llm_provider


class Slide(BaseModel):
    title: str
    content: List[str]
    speaker_notes: Optional[str] = ""
    layout: str = "bullet_points"


class Presentation(BaseModel):
    title: str
    slides: List[Slide]


@dataclass(frozen=True)
class ProviderConfig:
    name: str
    url: str
    api_key_env: str
    model: str
    json_mode: bool = False


PROVIDERS: List[ProviderConfig] = [
    ProviderConfig(
        name="Groq",
        url="https://api.groq.com/openai/v1/chat/completions",
        api_key_env="GROQ_API_KEY",
        model="llama-3.1-70b-versatile",
        json_mode=True,
    ),
    ProviderConfig(
        name="OpenRouter",
        url="https://openrouter.ai/api/v1/chat/completions",
        api_key_env="OPENROUTER_API_KEY",
        model="meta-llama/llama-3.1-8b-instruct:free",
        json_mode=False,
    ),
    ProviderConfig(
        name="Cerebras",
        url="https://api.cerebras.ai/v1/chat/completions",
        api_key_env="CEREBRAS_API_KEY",
        model="llama3.1-70b",
        json_mode=True,
    ),
    ProviderConfig(
        name="Nvidia",
        url="https://integrate.api.nvidia.com/v1/chat/completions",
        api_key_env="NVIDIA_NIM_API_KEY",
        model="meta/llama-3.1-70b-instruct",
        json_mode=True,
    ),
]


class LLMService:
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

        messages = [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": f"Topic: {prompt}"},
        ]

        for provider in PROVIDERS:
            api_key = os.getenv(provider.api_key_env)
            if not api_key:
                print(f"Skipping {provider.name}: API key not set")
                continue
            try:
                print(f"Trying LLM provider: {provider.name}")
                result = await call_llm_provider(
                    url=provider.url,
                    api_key=api_key,
                    model=provider.model,
                    messages=messages,
                    json_mode=provider.json_mode,
                )
                return Presentation(**result)
            except Exception as e:
                print(f"Error calling {provider.name}: {e}")
                continue

        raise Exception("All LLM providers failed")
