import json
from typing import Any, Dict


def extract_json_from_response(content: str) -> Dict[str, Any]:
    """Parse JSON from an LLM response, stripping markdown fences if present."""
    if "```json" in content:
        content = content.split("```json")[1].split("```")[0].strip()
    elif "```" in content:
        content = content.split("```")[1].split("```")[0].strip()
    return json.loads(content)
