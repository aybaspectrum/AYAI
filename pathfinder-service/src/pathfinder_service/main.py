import json
import os
from functools import lru_cache
from typing import Dict

from fastapi import Depends, FastAPI, HTTPException, Query
from pydantic import BaseModel

# --- Path Resolution ---
try:
    SERVICE_DIR = os.path.dirname(os.path.abspath(__file__))
    PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.dirname(SERVICE_DIR)))
    CACHE_FILE = os.path.join(PROJECT_ROOT, "pathfinder-service/suggestion_cache.json")
except NameError:
    CACHE_FILE = "pathfinder-service/suggestion_cache.json"

app = FastAPI(
    title="Pathfinder Service",
    description="Provides path suggestions based on aggregated user data.",
    version="0.1.0",
)

# --- Dependency ---
@lru_cache()
def get_cache() -> Dict[str, Dict]:
    """
    This function acts as a dependency. It loads the cache from the JSON file.
    `lru_cache` ensures this file is read only once, on the first request.
    """
    print(f"Executing get_cache(). Loading from: {CACHE_FILE}")
    try:
        with open(CACHE_FILE, "r") as f:
            return json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        print(f"WARNING: suggestion_cache.json not found or invalid. Using empty cache.")
        return {}

# --- Pydantic Models ---
class SuggestionResponse(BaseModel):
    suggestion_text: str
    count: int

# --- API Endpoints ---
@app.get("/health", status_code=200, tags=["Monitoring"])
async def health_check(cache: Dict = Depends(get_cache)):
    """A simple health check endpoint to confirm the service is running."""
    return {
        "status": "ok",
        "cache_loaded": bool(cache),
        "cached_items": len(cache),
    }

@app.get("/suggestion/text", response_model=SuggestionResponse, tags=["Suggestions"])
async def get_text_suggestion(
    cache: Dict[str, Dict] = Depends(get_cache),
    goal: str = Query(..., min_length=1, description="The goal for which to find a suggestion."),
):
    """
    Provides a text-based suggestion for the most common first step for a given goal.
    The suggestion cache is injected as a dependency.
    """
    if not cache:
        raise HTTPException(
            status_code=503,  # Service Unavailable
            detail="Suggestion cache is not loaded or empty.",
        )

    suggestion = cache.get(goal)

    if not suggestion:
        raise HTTPException(
            status_code=404, detail=f"No suggestion found for the goal: '{goal}'"
        )

    return SuggestionResponse(**suggestion)
