from transformers import (
    AutoTokenizer,
    pipeline
)
from injector import inject
from typing import Dict
import torch

from alphago.constants import QA_INDO_PRETRAINED


class QuestionAnswer:
    @inject
    def __init__(self) -> None:
        self.tokenizer = AutoTokenizer.from_pretrained(QA_INDO_PRETRAINED)
        device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        print("load qa model")
        self.qa_pipeline = pipeline(
            "question-answering",
            model=QA_INDO_PRETRAINED,
            tokenizer=self.tokenizer,
            device=device,
        )

    def generate(self, context: str, question: str) -> Dict[str, str]:
        result = self.qa_pipeline({
            'context': context,
            'question': question
        })

        return result
