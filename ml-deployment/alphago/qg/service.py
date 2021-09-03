from typing import Any, Dict
from injector import inject

from .interface import IQGService, QGSpec, QASpec, SumSpec
from .algo.question_generator import QuestionGenerator, QuestionGeneratorIndo
from .algo.qa import QuestionAnswer
from .algo.summarize import Summarization

ANSWER_STYLE = ['all', 'sentences', 'multiple_choice']
LANGUANGES = ['indonesia', 'english']


class QGService(IQGService):
    @inject
    def __init__(
        self,
        qg: QuestionGenerator,
        qg_indo: QuestionGeneratorIndo,
        qa_indo: QuestionAnswer,
        summ: Summarization,
    ):
        self.qg = qg
        self.qg_indo = qg_indo
        self.qa_indo = qa_indo
        self.summ = summ

    def _generate_eng(self, spec: QGSpec) -> Dict[str, Any]:

        return self.qg.generate(
            spec.text, 
            num_questions=spec.num_questions, 
            answer_style=spec.answer_style
        )

    def _generate_indo(self, spec: QGSpec) -> Dict[str, Any]:

        return self.qg_indo.generate(
            spec.text, 
            num_questions=spec.num_questions, 
            answer_style=spec.answer_style
        )

    def generate_qg(self, spec: QGSpec) -> Dict[str, Any]:
        if spec.answer_style not in ANSWER_STYLE:
            raise Exception("Answer Style not supported")

        if spec.languange not in LANGUANGES:
            raise Exception("Languange is not supported")

        if spec.languange == "indonesia":
            return self._generate_indo(spec)

        if spec.languange == "english":
            return self._generate_eng(spec)
    
    def question_answer(self, spec: QASpec) -> Dict[str, Any]:
        return self.qa_indo.generate(spec.context, spec.question)

    def summarize(self, spec: SumSpec) -> str:
        return self.summ.generate(spec.text)
