from abc import ABC, abstractmethod
from typing import Any, Dict, Optional
from pydantic import BaseModel


class QGSpec(BaseModel):
    article: str
    num_questions: Optional[int] 
    answer_style: str


class QG2Spec(BaseModel):
    task: str
    model: Optional[str]


class IQGService(ABC):
    @abstractmethod
    def generate_qg1(self, spec: QGSpec) -> Dict[str, Any]:
        raise NotImplementedError

    @abstractmethod
    def generate_qg2(self, spec: QG2Spec) -> Dict[str, Any]:
        raise NotImplementedError
