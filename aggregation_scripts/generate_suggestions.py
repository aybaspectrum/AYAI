import json
from collections import Counter, defaultdict
import os

# --- Start of Path Resolution Logic ---
# Get the absolute path of the directory containing this script.
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
# Navigate up one level to the project root directory (e.g., /app).
PROJECT_ROOT = os.path.dirname(SCRIPT_DIR)
# --- End of Path Resolution Logic ---


# Define file paths using absolute paths to ensure they are always found.
# This now correctly uses the underscore in the directory name.
INPUT_FILE = os.path.join(PROJECT_ROOT, "aggregation_scripts/simulated_warehouse_query_result.json")
OUTPUT_DIR = os.path.join(PROJECT_ROOT, "pathfinder-service")
OUTPUT_FILE = os.path.join(OUTPUT_DIR, "suggestion_cache.json")

def generate_suggestions():
    """
    Reads simulated warehouse data, finds the most common first step for each goal,
    and writes the result to a JSON file that acts as a cache for the API service.
    """
    print(f"Starting suggestion generation...")
    print(f"Reading data from {INPUT_FILE}...")
    try:
        with open(INPUT_FILE, 'r') as f:
            data = json.load(f)
    except FileNotFoundError:
        print(f"Error: Input data file not found at {INPUT_FILE}")
        return

    # Use defaultdict to group steps by goal
    goal_steps = defaultdict(list)
    for record in data:
        if 'goal' in record and 'first_step' in record:
            goal_steps[record['goal']].append(record['first_step'])

    print("Aggregating data to find most common steps...")
    suggestions = {}
    for goal, steps in goal_steps.items():
        if not steps:
            continue
        most_common_step, count = Counter(steps).most_common(1)[0]

        suggestions[goal] = {
            "suggestion_text": most_common_step,
            "count": count
        }
        print(f"  - For goal '{goal}', most common step is '{most_common_step}' ({count} times).")

    # Ensure the output directory exists
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    # Write the result to the output file
    print(f"Writing suggestions to {OUTPUT_FILE}...")
    with open(OUTPUT_FILE, 'w') as f:
        json.dump(suggestions, f, indent=2)

    print("Suggestion generation complete.")

if __name__ == "__main__":
    generate_suggestions()
