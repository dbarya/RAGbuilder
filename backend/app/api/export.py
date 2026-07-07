from fastapi import APIRouter, HTTPException, Response

from app.services.llm import Presentation
from app.services.pptx_service import PPTXService
from app.utils.errors import handle_service_errors

router = APIRouter()
pptx_service = PPTXService()


@router.post("/export")
@handle_service_errors()
async def export_presentation(data: Presentation, format: str = "pptx"):
    if format == "pptx":
        pptx_io = pptx_service.create_presentation(data)
        return Response(
            content=pptx_io.getvalue(),
            media_type="application/vnd.openxmlformats-officedocument.presentationml.presentation",
            headers={"Content-Disposition": "attachment; filename=presentation.pptx"},
        )
    elif format == "pdf":
        raise HTTPException(status_code=501, detail="PDF export not yet implemented")
    else:
        raise HTTPException(status_code=400, detail="Unsupported format")
