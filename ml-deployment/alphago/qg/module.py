from injector import Binder, Module, singleton

from .interface import IQGService
from .service import QGService
from .algo.question_generator import QuestionGenerator, QuestionGeneratorIndo
from .algo.qa_evaluator import QAEvaluator, QAEvaluatorIndo
from .algo.qa import QuestionAnswer
from .algo.summarize import Summarization
# from .algo.qg_pipeline import Pipeline, QGPipeline


class QGModule(Module):
    def configure(self, binder: Binder) -> None:
        binder.bind(IQGService, to=QGService, scope=singleton)
        # binder.bind(QuestionGenerator, to=QuestionGenerator, scope=singleton)
        # binder.bind(QAEvaluator, to=QAEvaluator, scope=singleton)
        binder.bind(QAEvaluatorIndo, to=QAEvaluatorIndo, scope=singleton)
        binder.bind(QuestionGeneratorIndo, to=QuestionGeneratorIndo, scope=singleton)
        binder.bind(QuestionAnswer, to=QuestionAnswer, scope=singleton)
        binder.bind(Summarization, to=Summarization, scope=singleton)
