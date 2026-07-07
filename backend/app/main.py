from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import generate, templates, export
from app.core.config import settings

app = FastAPI(title="DeckForge API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Authorization", "Content-Type"],
)

app.include_router(generate.router, prefix="/api", tags=["generate"])
app.include_router(templates.router, prefix="/api", tags=["templates"])
app.include_router(export.router, prefix="/api", tags=["export"])

@app.get("/")
async def root():
    return {"message": "Welcome to DeckForge API"}
