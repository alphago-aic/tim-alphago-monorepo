from typing import Any, Dict
from injector import inject

from .interface import IQGService, QG2Spec, QGSpec
from .algo.question_generator import QuestionGenerator
from .algo.qg_pipeline import Pipeline, QGPipeline

ANSWER_STYLE = ['all', 'sentences', 'multiple_choice']


class QGService(IQGService):
    @inject
    def __init__(self, qg1: QuestionGenerator, qg2: Pipeline):
        self.qg1 = qg1
        self.qg2 = qg2

    def generate_qg1(self, spec: QGSpec) -> Dict[str, Any]:
        if spec.answer_style not in ANSWER_STYLE:
            raise Exception("Answer Style not supported")

        return self.qg1.generate(
            spec.text, 
            num_questions=spec.num_questions, 
            answer_style=spec.answer_style
        )

    def generate_qg2(self, spec: QG2Spec) -> Dict[str, Any]:
        return self.qg2.generate("question-generation", inputs=spec.text)