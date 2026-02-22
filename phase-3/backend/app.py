"""
Hugging Face Spaces entry point for TaskForge API.
This file serves as the main entry point for deployment to Hugging Face Spaces.
"""
import os
import sys

# Add the src directory to the path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "src"))

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import SQLModel, create_engine
from src.api.health import router as health_router
from src.api.auth import router as auth_router
from src.api.tasks import router as tasks_router

# Configure database URL for Hugging Face (SQLite)
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./taskforge.db")

# Create engine
engine = create_engine(
    DATABASE_URL,
    echo=False,
    connect_args={"check_same_thread": False} if "sqlite" in DATABASE_URL else {}
)

def create_db_and_tables():
    """Create all database tables."""
    SQLModel.metadata.create_all(engine)

# Initialize FastAPI app
app = FastAPI(
    title="TaskForge API",
    description="JWT-secured REST API for TaskForge - Organize smarter. Build better habits.",
    version="1.0.0"
)

# Configure CORS for Hugging Face Spaces
HF_SPACE_URL = os.getenv("HF_SPACE_URL", "")
allowed_origins = ["http://localhost:3000", "https://*"]
if HF_SPACE_URL:
    allowed_origins.append(HF_SPACE_URL)

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(health_router)
app.include_router(auth_router)
app.include_router(tasks_router)

@app.on_event("startup")
def on_startup():
    """Create database tables on application startup."""
    create_db_and_tables()

@app.get("/")
def root():
    """Root endpoint."""
    return {
        "message": "TaskForge API",
        "tagline": "Organize smarter. Build better habits.",
        "version": "1.0.0",
        "docs": "/docs",
        "deployed_on": "Hugging Face Spaces"
    }

# For uvicorn to run
if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", "7860"))
    uvicorn.run(app, host="0.0.0.0", port=port)
