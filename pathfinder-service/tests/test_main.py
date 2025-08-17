import pytest
from fastapi.testclient import TestClient
from pathfinder_service.main import app, get_cache

# Create a TestClient instance based on our FastAPI app
client = TestClient(app)

def test_health_check():
    """Tests the /health endpoint with a mocked cache."""
    # Define a mock cache for this specific test
    def override_get_cache():
        return {"Some Goal": {"suggestion_text": "Some Step", "count": 1}}

    # Override the dependency
    app.dependency_overrides[get_cache] = override_get_cache

    response = client.get("/health")
    assert response.status_code == 200
    json_response = response.json()
    assert json_response["status"] == "ok"
    assert json_response["cache_loaded"] is True
    assert json_response["cached_items"] == 1

    # Clean up the override after the test
    app.dependency_overrides.clear()

def test_get_suggestion_success():
    """Tests a successful request by injecting a mock cache."""
    def override_get_cache():
        return {"Learn Python": {"suggestion_text": "Install Python & VS Code", "count": 3}}

    app.dependency_overrides[get_cache] = override_get_cache

    response = client.get("/suggestion/text?goal=Learn%20Python")

    assert response.status_code == 200
    data = response.json()
    assert data["suggestion_text"] == "Install Python & VS Code"
    assert data["count"] == 3

    app.dependency_overrides.clear()

def test_get_suggestion_not_found():
    """Tests a 404 case by injecting a cache that doesn't contain the goal."""
    def override_get_cache():
        return {"Some Other Goal": {"suggestion_text": "Some Step", "count": 1}}

    app.dependency_overrides[get_cache] = override_get_cache

    response = client.get("/suggestion/text?goal=Learn%20Go")

    assert response.status_code == 404
    assert "No suggestion found" in response.json()["detail"]

    app.dependency_overrides.clear()

def test_get_suggestion_empty_cache():
    """Tests the 503 case by injecting an empty cache."""
    def override_get_cache_empty():
        return {}

    app.dependency_overrides[get_cache] = override_get_cache_empty

    response = client.get("/suggestion/text?goal=Learn%20Python")

    assert response.status_code == 503
    assert "Suggestion cache is not loaded or empty" in response.json()["detail"]

    app.dependency_overrides.clear()
