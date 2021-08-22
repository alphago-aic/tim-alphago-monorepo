from abc import ABC, abstractmethod
from typing import Any, Dict, Optional
from pydantic import BaseModel


class QGSpec(BaseModel):
    text: str
    num_questions: Optional[int] 
    answer_style: str
    languange: str


class IQGService(ABC):
    @abstractmethod
    def generate(self, spec: QGSpec) -> Dict[str, Any]:
        raise NotImplementedError
