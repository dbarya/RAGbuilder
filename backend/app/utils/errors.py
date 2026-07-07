import functools
from typing import Callable

from fastapi import HTTPException


def handle_service_errors(status_code: int = 500) -> Callable:
    """Decorator that catches exceptions and raises HTTPException."""

    def decorator(func: Callable) -> Callable:
        @functools.wraps(func)
        async def wrapper(*args, **kwargs):
            try:
                return await func(*args, **kwargs)
            except HTTPException:
                raise
            except Exception as e:
                raise HTTPException(status_code=status_code, detail=str(e))

        return wrapper

    return decorator
