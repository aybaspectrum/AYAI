import pytest
from anonymization_service.core.anonymizer import anonymize_event

# A sample raw event to be used as a fixture in tests
SAMPLE_RAW_EVENT = {
    "event_id": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
    "event_timestamp": "2025-09-21T12:00:00Z",
    "event_type": "GOAL_CREATED",
    "user_context": {
        "user_id": "user-12345",
        "user_email": "test@example.com",
        "session_id": "session-abcde"
    },
    "payload": {
        "node_id": "node-xyz",
        "node_type": "GOAL",
        "node_title": "Learn Python",
        "notes": "I want to learn it for data science."
    }
}

def test_anonymize_event_success():
    """
    Tests that a valid raw event is anonymized correctly, removing PII
    and preserving necessary data.
    """
    anonymized = anonymize_event(SAMPLE_RAW_EVENT)

    # 1. Check that PII fields are removed
    assert "user_context" not in anonymized
    assert "notes" not in anonymized.get("payload", {})

    # 2. Check that the anonymous_user_id is created and looks like a hash
    assert "anonymous_user_id" in anonymized
    assert isinstance(anonymized["anonymous_user_id"], str)
    assert len(anonymized["anonymous_user_id"]) == 64  # SHA-256 hash length in hex

    # 3. Check that essential non-PII fields are carried over
    assert anonymized["event_id"] == SAMPLE_RAW_EVENT["event_id"]
    assert anonymized["payload"]["node_title"] == "Learn Python"
    assert anonymized["payload"]["node_id"] == "node-xyz"

def test_anonymize_event_produces_consistent_hash():
    """
    Tests that the same user_id in two different events results in the
    same anonymous_user_id, ensuring we can track a user's journey.
    """
    # Create a second event for the same user
    event2 = SAMPLE_RAW_EVENT.copy()
    event2["event_id"] = "z9y8x7w6-v5u4-3210-fedc-ba9876543210"

    anonymized1 = anonymize_event(SAMPLE_RAW_EVENT)
    anonymized2 = anonymize_event(event2)

    assert anonymized1["anonymous_user_id"] == anonymized2["anonymous_user_id"]

def test_anonymize_event_missing_user_id_raises_error():
    """
    Tests that the function raises a ValueError if the user_id is missing,
    preventing the creation of an invalid anonymized event.
    """
    event_without_user_id = {
        "event_id": "bad-event-id",
        "user_context": {"user_email": "no-id@example.com"}
    }

    with pytest.raises(ValueError, match="Event is missing user_id"):
        anonymize_event(event_without_user_id)

def test_anonymize_event_empty_payload_is_handled():
    """
    Tests that the function does not fail if the payload is missing.
    """
    event_with_no_payload = {
        "event_id": "no-payload-event",
        "user_context": {"user_id": "user-67890"}
    }
    anonymized = anonymize_event(event_with_no_payload)
    assert "payload" in anonymized
    assert anonymized["payload"] == {}
