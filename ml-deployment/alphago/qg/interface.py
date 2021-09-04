from abc import ABC, abstractmethod
from typing import Any, Dict, Optional
from pydantic import BaseModel


class QGSpec(BaseModel):
    text: str
    num_questions: Optional[int] 
    answer_style: str
    languange: str


class QASpec(BaseModel):
    context: str
    question: str


class SumSpec(BaseModel):
    text: str


class IQGService(ABC):
    @abstractmethod
    def generate_qg(self, spec: QGSpec) -> Dict[str, Any]:
        raise NotImplementedError

    @abstractmethod
    def question_answer(self, spec: QASpec) -> Dict[str, Any]:
        raise NotImplementedError

    @abstractmethod
    def summarize(self, article: str) -> str:
        raise NotImplementedError
