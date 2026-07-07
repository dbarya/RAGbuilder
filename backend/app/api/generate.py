import logging

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
from app.services.llm import LLMService, Presentation

logger = logging.getLogger(__name__)

router = APIRouter()
llm_service = LLMService()

class GenerateRequest(BaseModel):
    prompt: str = Field(..., min_length=1, max_length=2000)

@router.post("/generate", response_model=Presentation)
async def generate_slides(request: GenerateRequest):
    try:
        presentation = await llm_service.generate_presentation(request.prompt)
        return presentation
    except Exception:
        logger.exception("Failed to generate presentation")
        raise HTTPException(status_code=500, detail="Failed to generate presentation")
