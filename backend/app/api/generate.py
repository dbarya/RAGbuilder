import logging

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, ValidationError
from app.services.llm import LLMService, LLMProviderError, Presentation

logger = logging.getLogger(__name__)

router = APIRouter()
llm_service = LLMService()

class GenerateRequest(BaseModel):
    prompt: str

@router.post("/generate", response_model=Presentation)
async def generate_slides(request: GenerateRequest):
    try:
        presentation = await llm_service.generate_presentation(request.prompt)
        return presentation
    except LLMProviderError as e:
        logger.error("All LLM providers failed for prompt: %s — %s", request.prompt[:80], e)
        raise HTTPException(status_code=502, detail=str(e))
    except ValidationError as e:
        logger.error("Validation error during generation: %s", e)
        raise HTTPException(status_code=422, detail=str(e))
    except Exception:
        logger.exception("Unexpected error during slide generation")
        raise HTTPException(status_code=500, detail="Internal server error")
