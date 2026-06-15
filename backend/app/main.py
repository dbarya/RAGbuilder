from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import generate, templates, export

app = FastAPI(title="DeckForge API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(generate.router, prefix="/api", tags=["generate"])
app.include_router(templates.router, prefix="/api", tags=["templates"])
app.include_router(export.router, prefix="/api", tags=["export"])

@app.get("/")
async def root():
    return {"message": "Welcome to DeckForge API"}
