import numpy as np
import torch
from transformers import (
    AutoTokenizer,
    AutoModelForSequenceClassification,
)
from injector import inject

from alphago.constants import QAE_PRETRAINED


class QAEvaluator:
    @inject
    def __init__(self, model_dir=None):
        self.SEQ_LENGTH = 512

        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

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


def print_qa(qa_list, show_answers=True):
    for i in range(len(qa_list)):
        space = " " * int(np.where(i < 9, 3, 4))  # wider space for 2 digit q nums

        print("{}) Q: {}".format(i + 1, qa_list[i]["question"]))

        answer = qa_list[i]["answer"]

        # print a list of multiple choice answers
        if type(answer) is list:

            if show_answers:
                print(
                    "{}A: 1.".format(space),
                    answer[0]["answer"],
                    np.where(answer[0]["correct"], "(correct)", ""),
                )
                for j in range(1, len(answer)):
                    print(
                        "{}{}.".format(space + "   ", j + 1),
                        answer[j]["answer"],
                        np.where(answer[j]["correct"] == True, "(correct)", ""),
                    )

            else:
                print("{}A: 1.".format(space), answer[0]["answer"])
                for j in range(1, len(answer)):
                    print("{}{}.".format(space + "   ", j + 1), answer[j]["answer"])
            print("")

        # print full sentence answers
        else:
            if show_answers:
                print("{}A:".format(space), answer, "\n")
