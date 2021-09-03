import torch
from transformers import (
    AutoTokenizer,
    AutoModelForSequenceClassification,
)
from injector import inject

from alphago.constants import QAE_PRETRAINED, QAE_INDO_PRETRAINED


class QAEvaluator:
    @inject
    def __init__(self, model_dir=None):
        self.SEQ_LENGTH = 512

        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

        print(f"Using device: {self.device}")

        self.qae_tokenizer = AutoTokenizer.from_pretrained(QAE_PRETRAINED)
        self.qae_model = AutoModelForSequenceClassification.from_pretrained(
            QAE_PRETRAINED
        )
        self.qae_model.to(self.device)

    def encode_qa_pairs(self, questions, answers):
        encoded_pairs = []
        for i in range(len(questions)):
            encoded_qa = self._encode_qa(questions[i], answers[i])
            encoded_pairs.append(encoded_qa.to(self.device))
        return encoded_pairs

    def get_scores(self, encoded_qa_pairs):
        scores = {}
        self.qae_model.eval()
        with torch.no_grad():
            for i in range(len(encoded_qa_pairs)):
                scores[i] = self._evaluate_qa(encoded_qa_pairs[i])

        return [
            k for k, v in sorted(scores.items(), key=lambda item: item[1], reverse=True)
        ]

    def _encode_qa(self, question, answer):
        if type(answer) is list:
            for a in answer:
                if a["correct"]:
                    correct_answer = a["answer"]
        else:
            correct_answer = answer
        return self.qae_tokenizer(
            text=question,
            text_pair=correct_answer,
            padding="max_length",
            max_length=self.SEQ_LENGTH,
            truncation=True,
            return_tensors="pt",
        )

    def _evaluate_qa(self, encoded_qa_pair):
        output = self.qae_model(**encoded_qa_pair)
        return output[0][0][1]


class QAEvaluatorIndo:
    @inject
    def __init__(self, model_dir=None):
        self.SEQ_LENGTH = 512

        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

        self.qae_tokenizer = AutoTokenizer.from_pretrained(QAE_INDO_PRETRAINED)
        self.qae_model = AutoModelForSequenceClassification.from_pretrained(
            QAE_INDO_PRETRAINED
        )
        self.qae_model.to(self.device)

    def encode_qa_pairs(self, questions, answers):
        encoded_pairs = []
        for i in range(len(questions)):
            encoded_qa = self._encode_qa(questions[i], answers[i])
            encoded_pairs.append(encoded_qa.to(self.device))
        return encoded_pairs

    def get_scores(self, encoded_qa_pairs):
        scores = {}
        self.qae_model.eval()
        with torch.no_grad():
            for i in range(len(encoded_qa_pairs)):
                scores[i] = self._evaluate_qa(encoded_qa_pairs[i])

        return [
            k for k, v in sorted(scores.items(), key=lambda item: item[1], reverse=True)
        ]

    def _encode_qa(self, question, answer):
        if type(answer) is list:
            for a in answer:
                if a["correct"]:
                    correct_answer = a["answer"]
        else:
            correct_answer = answer
        return self.qae_tokenizer(
            text=question,
            text_pair=correct_answer,
            padding="max_length",
            max_length=self.SEQ_LENGTH,
            truncation=True,
            return_tensors="pt",
        )

    def _evaluate_qa(self, encoded_qa_pair):
        output = self.qae_model(**encoded_qa_pair)
        return output[0][0][1]
