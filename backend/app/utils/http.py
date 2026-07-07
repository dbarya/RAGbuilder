import httpx
from typing import Any, Dict, List

from app.utils.parsing import extract_json_from_response


async def call_llm_provider(
    url: str,
    api_key: str,
    model: str,
    messages: List[Dict[str, str]],
    json_mode: bool = False,
    timeout: float = 30.0,
) -> Dict[str, Any]:
    """Send a chat-completion request to any OpenAI-compatible LLM endpoint.

    Args:
        url: Provider's chat completions endpoint.
        api_key: Bearer token for the provider.
        model: Model identifier string.
        messages: List of {"role": ..., "content": ...} dicts.
        json_mode: If True, include ``response_format: {type: "json_object"}``.
        timeout: HTTP request timeout in seconds.

    Returns:
        Parsed JSON dict from the assistant's response content.
    """
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
    }
    data: Dict[str, Any] = {
        "model": model,
        "messages": messages,
    }
    if json_mode:
        data["response_format"] = {"type": "json_object"}

    async with httpx.AsyncClient() as client:
        response = await client.post(url, headers=headers, json=data, timeout=timeout)
        response.raise_for_status()
        content = response.json()["choices"][0]["message"]["content"]
        return extract_json_from_response(content)
