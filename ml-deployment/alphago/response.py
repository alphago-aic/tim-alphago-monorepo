from pydantic import BaseModel
from typing import Any, Optional


class BaseResponse(BaseModel):
    status: str
    message: Optional[str]
    data: Optional[Any]
