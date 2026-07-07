import os
import secrets
from typing import List
from typing_extensions import Annotated
from pydantic import field_validator
from pydantic_settings import BaseSettings, NoDecode

class Settings(BaseSettings):
    PROJECT_NAME: str = "DeckForge"
    # Generate a strong ephemeral key when one is not provided via the
    # environment. Never ship a hardcoded, guessable default secret.
    SECRET_KEY: str = os.getenv("SECRET_KEY") or secrets.token_urlsafe(32)
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    # Comma-separated list of allowed CORS origins. Defaults to local dev only.
    # Set BACKEND_CORS_ORIGINS in the environment for production, e.g.
    # "https://app.example.com,https://www.example.com".
    BACKEND_CORS_ORIGINS: Annotated[List[str], NoDecode] = ["http://localhost:3000", "http://localhost:5173"]

    # LLM Keys
    OPENROUTER_API_KEY: str = os.getenv("OPENROUTER_API_KEY", "")
    GROQ_API_KEY: str = os.getenv("GROQ_API_KEY", "")
    CEREBRAS_API_KEY: str = os.getenv("CEREBRAS_API_KEY", "")
    NVIDIA_NIM_API_KEY: str = os.getenv("NVIDIA_NIM_API_KEY", "")

    @field_validator("BACKEND_CORS_ORIGINS", mode="before")
    @classmethod
    def assemble_cors_origins(cls, v):
        if isinstance(v, str):
            return [origin.strip() for origin in v.split(",") if origin.strip()]
        return v

settings = Settings()
