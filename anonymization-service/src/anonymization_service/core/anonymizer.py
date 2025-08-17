import hashlib
import os
from typing import Dict, Any

# It's crucial that this salt is managed securely, e.g., via a secrets manager.
# For this example, we'll get it from an environment variable.
# A default is provided for development, but it should be overridden in production.
SALT = os.environ.get("ANONYMIZATION_SALT", "default_salt_for_development").encode('utf-8')

def anonymize_event(raw_event: Dict[str, Any]) -> Dict[str, Any]:
    """
    Takes a raw event dictionary, removes PII, and returns an anonymized event.

    Args:
        raw_event: A dictionary representing the event, conforming to raw_event_schema.json.

    Returns:
        A dictionary representing the anonymized event, conforming to anonymized_event_schema.json.

    Raises:
        ValueError: If the event is missing the user_id for anonymization.
    """
    user_context = raw_event.get("user_context", {})
    user_id = user_context.get("user_id")

    if not user_id:
        raise ValueError("Event is missing user_id for anonymization.")

    # Create a salted hash of the user_id
    hashed_user_id = hashlib.sha256(SALT + user_id.encode('utf-8')).hexdigest()

    # Build the anonymized event, carefully selecting which fields to carry over.
    # Note that 'notes' from the payload and the entire 'user_context' are excluded
    # to prevent accidental PII leakage.
    payload = raw_event.get("payload", {})
    anonymized_event = {
        "event_id": raw_event.get("event_id"),
        "event_timestamp": raw_event.get("event_timestamp"),
        "event_type": raw_event.get("event_type"),
        "anonymous_user_id": hashed_user_id,
        "payload": {
            "node_id": payload.get("node_id"),
            "node_type": payload.get("node_type"),
            "node_title": payload.get("node_title"),
        }
    }

    # Remove any keys that have None values from the payload for cleanliness
    anonymized_event["payload"] = {k: v for k, v in anonymized_event["payload"].items() if v is not None}

    return anonymized_event
