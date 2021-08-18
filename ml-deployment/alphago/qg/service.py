from typing import Any, Dict
from injector import inject

from .interface import IQGService, QG2Spec, QGSpec
from .algo.question_generator import QuestionGenerator

ANSWER_STYLE = ['all', 'sentences', 'multiple_choice']


class QGService(IQGService):
    @inject
    def __init__(self, qg1: QuestionGenerator):
        self.qg1 = qg1

    def generate_qg1(self, spec: QGSpec) -> Dict[str, Any]:
        if spec.answer_style not in ANSWER_STYLE:
            raise Exception("Answer Style not supported")

        return self.qg1.generate(
            spec.article, 
            num_questions=spec.num_questions, 
            answer_style=spec.answer_style
        )

    def generate_qg2(self, spec: QG2Spec) -> Dict[str, Any]:
        
