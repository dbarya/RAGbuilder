from fastapi import APIRouter
from pydantic import BaseModel

from app.services.llm import LLMService, Presentation
from app.utils.errors import handle_service_errors

router = APIRouter()
llm_service = LLMService()


class GenerateRequest(BaseModel):
    prompt: str


@router.post("/generate", response_model=Presentation)
@handle_service_errors()
async def generate_slides(request: GenerateRequest):
    return await llm_service.generate_presentation(request.prompt)
