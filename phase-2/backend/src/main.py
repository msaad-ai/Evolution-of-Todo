"""
FastAPI application entrypoint.
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.database import create_db_and_tables
from src.api.health import router as health_router
from src.api.tasks import router as tasks_router

# Initialize FastAPI app
app = FastAPI(
    title="Phase-2 Todo API",
    description="JWT-secured REST API for multi-user todo application",
    version="1.0.0"
)

# Configure CORS for local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(health_router)
app.include_router(tasks_router)


@app.on_event("startup")
def on_startup():
    """
    Create database tables on application startup.
    """
    create_db_and_tables()


@app.get("/")
def root():
    """
    Root endpoint.
    """
    return {
        "message": "Phase-2 Todo API",
        "version": "1.0.0",
        "docs": "/docs"
    }
