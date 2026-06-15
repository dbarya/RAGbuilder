from fastapi import APIRouter
from typing import List
from pydantic import BaseModel

router = APIRouter()

class Template(BaseModel):
    id: str
    name: str
    description: str
    preview_url: str

@router.get("/templates", response_model=List[Template])
async def list_templates():
    return [
        {
            "id": "modern",
            "name": "Modern Business",
            "description": "Clean and professional design for business presentations",
            "preview_url": "https://example.com/modern.png"
        },
        {
            "id": "creative",
            "name": "Creative Portfolio",
            "description": "Vibrant and engaging design for creative work",
            "preview_url": "https://example.com/creative.png"
        }
    ]
