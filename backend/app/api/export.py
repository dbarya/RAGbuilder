import logging

from fastapi import APIRouter, HTTPException, Response
from app.services.llm import Presentation
from app.services.pptx_service import PPTXService

logger = logging.getLogger(__name__)

router = APIRouter()
pptx_service = PPTXService()

@router.post("/export")
async def export_presentation(data: Presentation, format: str = "pptx"):
    if format == "pptx":
        try:
            pptx_io = pptx_service.create_presentation(data)
            return Response(
                content=pptx_io.getvalue(),
                media_type="application/vnd.openxmlformats-officedocument.presentationml.presentation",
                headers={"Content-Disposition": "attachment; filename=presentation.pptx"}
            )
        except Exception:
            logger.exception("Failed to export presentation")
            raise HTTPException(status_code=500, detail="Failed to export presentation")
    elif format == "pdf":
        # Placeholder for PDF export
        raise HTTPException(status_code=501, detail="PDF export not yet implemented")
    else:
        raise HTTPException(status_code=400, detail="Unsupported format")
