from injector import Binder, Module, singleton

from .interface import IQGService
from .service import QGService
from .algo.question_generator import QuestionGenerator
from .algo.qa_evaluator import QAEvaluator
from .algo.qg_pipeline import Pipeline, QGPipeline


class QGModule(Module):
    def configure(self, binder: Binder) -> None:
        binder.bind(IQGService, to=QGService, scope=singleton)
        binder.bind(QuestionGenerator, to=QuestionGenerator, scope=singleton)
        binder.bind(QAEvaluator, to=QAEvaluator, scope=singleton)
        binder.bind(Pipeline, to=Pipeline, scope=singleton)
        binder.bind(QGPipeline, to=QGPipeline, scope=singleton)
