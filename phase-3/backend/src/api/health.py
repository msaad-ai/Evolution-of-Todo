"""
Health check endpoint.
"""
from fastapi import APIRouter

router = APIRouter(tags=["health"])


@router.get("/health")
def health_check():
    """
    Health check endpoint (no authentication required).

    Returns:
        dict: API health status
    """
    return {"status": "healthy"}
