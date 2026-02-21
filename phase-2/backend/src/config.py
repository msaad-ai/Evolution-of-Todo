"""
Configuration module for loading environment variables.
"""
import os
from dotenv import load_dotenv

# Load environment variables from .env file (only in development)
if os.path.exists(os.path.join(os.path.dirname(__file__), "..", ".env")):
    load_dotenv()

# Database configuration - use SQLite for Hugging Face deployment
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./taskforge.db")

# Authentication configuration
BETTER_AUTH_SECRET = os.getenv("BETTER_AUTH_SECRET", "default-secret-key-for-development-only")

# Validate secret length
if len(BETTER_AUTH_SECRET) < 32:
    BETTER_AUTH_SECRET = BETTER_AUTH_SECRET.ljust(32, "0")
