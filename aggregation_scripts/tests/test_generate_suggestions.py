import json
import os
import pytest
from aggregation_scripts.generate_suggestions import generate_suggestions

# Use pytest's tmp_path fixture to create temporary files and directories for testing
@pytest.fixture
def setup_test_files(tmp_path):
    """
    A pytest fixture to set up the necessary directory structure and dummy files for a test.
    """
    # Create temporary directories
    agg_scripts_dir = tmp_path / "aggregation_scripts"
    agg_scripts_dir.mkdir()
    pathfinder_dir = tmp_path / "pathfinder-service"
    pathfinder_dir.mkdir()

    # Create dummy input data
    dummy_input_data = [
        {"goal": "Test Goal", "first_step": "Step A"},
        {"goal": "Test Goal", "first_step": "Step A"},
        {"goal": "Test Goal", "first_step": "Step B"},
        {"goal": "Another Goal", "first_step": "Step C"},
    ]
    input_file_path = agg_scripts_dir / "simulated_warehouse_query_result.json"
    with open(input_file_path, 'w') as f:
        json.dump(dummy_input_data, f)

    # Return the paths to be used in the test function
    yield str(input_file_path), str(pathfinder_dir / "suggestion_cache.json")

def test_generate_suggestions_logic(setup_test_files, monkeypatch):
    """
    Tests the end-to-end logic of the generate_suggestions script.
    """
    input_file, output_file = setup_test_files

    # Use monkeypatch to override the script's hardcoded file paths
    # so it uses our temporary files instead.
    monkeypatch.setattr("aggregation_scripts.generate_suggestions.INPUT_FILE", input_file)
    monkeypatch.setattr("aggregation_scripts.generate_suggestions.OUTPUT_FILE", output_file)

    # Run the function we want to test
    generate_suggestions()

    # Verify the output file was created and has the correct content
    assert os.path.exists(output_file)
    with open(output_file, 'r') as f:
        result = json.load(f)

    # Check the aggregated results
    assert "Test Goal" in result
    assert result["Test Goal"]["suggestion_text"] == "Step A"
    assert result["Test Goal"]["count"] == 2

    assert "Another Goal" in result
    assert result["Another Goal"]["suggestion_text"] == "Step C"
    assert result["Another Goal"]["count"] == 1
