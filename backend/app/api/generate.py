from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.llm import LLMService, Presentation

router = APIRouter()
llm_service = LLMService()

class GenerateRequest(BaseModel):
    prompt: str

@router.post("/generate", response_model=Presentation)
async def generate_slides(request: GenerateRequest):
    try:
        presentation = await llm_service.generate_presentation(request.prompt)
        return presentation
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
