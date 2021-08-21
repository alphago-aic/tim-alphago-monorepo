import torch
import re
import random
import json
import en_core_web_sm
from transformers import (
    AutoTokenizer,
    AutoModelForSeq2SeqLM,
    AutoModelForTokenClassification,
    pipeline
)
from injector import inject

from .qa_evaluator import QAEvaluator, QAEvaluatorIndo
from alphago.constants import QG_PRETRAINED, QG_INDO_PRETRAINED


class QuestionGenerator:
    @inject
    def __init__(self, qa_evaluator: QAEvaluator, model_dir=None):
        self.ANSWER_TOKEN = "<answer>"
        self.CONTEXT_TOKEN = "<context>"
        self.SEQ_LENGTH = 512

        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        print(f"Using device {self.device}")

        self.qg_tokenizer = AutoTokenizer.from_pretrained(QG_PRETRAINED, use_fast=False)
        self.qg_model = AutoModelForSeq2SeqLM.from_pretrained(QG_PRETRAINED)
        self.qg_model.to(self.device)

        self.qa_evaluator = qa_evaluator

    def generate(
        self, article, use_evaluator=True, num_questions=None, answer_style="all"
    ):

        print("Generating questions...\n")

        qg_inputs, qg_answers = self.generate_qg_inputs(article, answer_style)
        generated_questions = self.generate_questions_from_inputs(qg_inputs)

        message = "{} questions doesn't match {} answers".format(
            len(generated_questions), len(qg_answers)
        )
        assert len(generated_questions) == len(qg_answers), message

        if use_evaluator:

            print("Evaluating QA pairs...\n")

            encoded_qa_pairs = self.qa_evaluator.encode_qa_pairs(
                generated_questions, qg_answers
            )
            scores = self.qa_evaluator.get_scores(encoded_qa_pairs)
            if num_questions:
                qa_list = self._get_ranked_qa_pairs(
                    generated_questions, qg_answers, scores, num_questions
                )
            else:
                qa_list = self._get_ranked_qa_pairs(
                    generated_questions, qg_answers, scores
                )

        else:
            print("Skipping evaluation step.\n")
            qa_list = self._get_all_qa_pairs(generated_questions, qg_answers)

        return qa_list

    def generate_qg_inputs(self, text, answer_style):

        VALID_ANSWER_STYLES = ["all", "sentences", "multiple_choice"]

        if answer_style not in VALID_ANSWER_STYLES:
            raise ValueError(
                "Invalid answer style {}. Please choose from {}".format(
                    answer_style, VALID_ANSWER_STYLES
                )
            )

        inputs = []
        answers = []

        if answer_style == "sentences" or answer_style == "all":
            segments = self._split_into_segments(text)
            for segment in segments:
                sentences = self._split_text(segment)
                prepped_inputs, prepped_answers = self._prepare_qg_inputs(
                    sentences, segment
                )
                inputs.extend(prepped_inputs)
                answers.extend(prepped_answers)

        if answer_style == "multiple_choice" or answer_style == "all":
            sentences = self._split_text(text)
            prepped_inputs, prepped_answers = self._prepare_qg_inputs_MC(sentences)
            inputs.extend(prepped_inputs)
            answers.extend(prepped_answers)

        return inputs, answers

    def generate_questions_from_inputs(self, qg_inputs):
        generated_questions = []

        for qg_input in qg_inputs:
            question = self._generate_question(qg_input)
            generated_questions.append(question)

        return generated_questions

    def _split_text(self, text):
        MAX_SENTENCE_LEN = 128

        sentences = re.findall(".*?[.!\?]", text)

        cut_sentences = []
        for sentence in sentences:
            if len(sentence) > MAX_SENTENCE_LEN:
                cut_sentences.extend(re.split("[,;:)]", sentence))
        # temporary solution to remove useless post-quote sentence fragments
        cut_sentences = [s for s in sentences if len(s.split(" ")) > 5]
        sentences = sentences + cut_sentences

        return list(set([s.strip(" ") for s in sentences]))

    def _split_into_segments(self, text):
        MAX_TOKENS = 490

        paragraphs = text.split("\n")
        tokenized_paragraphs = [
            self.qg_tokenizer(p)["input_ids"] for p in paragraphs if len(p) > 0
        ]

        segments = []
        while len(tokenized_paragraphs) > 0:
            segment = []
            while len(segment) < MAX_TOKENS and len(tokenized_paragraphs) > 0:
                paragraph = tokenized_paragraphs.pop(0)
                segment.extend(paragraph)
            segments.append(segment)
        return [self.qg_tokenizer.decode(s) for s in segments]

    def _prepare_qg_inputs(self, sentences, text):
        inputs = []
        answers = []

        for sentence in sentences:
            qg_input = "{} {} {} {}".format(
                self.ANSWER_TOKEN, sentence, self.CONTEXT_TOKEN, text
            )
            inputs.append(qg_input)
            answers.append(sentence)

        return inputs, answers

    def _prepare_qg_inputs_MC(self, sentences):

        spacy_nlp = en_core_web_sm.load()
        docs = list(spacy_nlp.pipe(sentences, disable=["parser"]))
        inputs_from_text = []
        answers_from_text = []

        for i in range(len(sentences)):
            entities = docs[i].ents
            if entities:
                for entity in entities:
                    qg_input = "{} {} {} {}".format(
                        self.ANSWER_TOKEN, entity, self.CONTEXT_TOKEN, sentences[i]
                    )
                    answers = self._get_MC_answers(entity, docs)
                    inputs_from_text.append(qg_input)
                    answers_from_text.append(answers)

        return inputs_from_text, answers_from_text

    def _get_MC_answers(self, correct_answer, docs):

        entities = []
        for doc in docs:
            entities.extend([{"text": e.text, "label_": e.label_} for e in doc.ents])

        # remove duplicate elements
        entities_json = [json.dumps(kv) for kv in entities]
        pool = set(entities_json)
        num_choices = (
            min(4, len(pool)) - 1
        )  # -1 because we already have the correct answer

        # add the correct answer
        final_choices = []
        correct_label = correct_answer.label_
        final_choices.append({"answer": correct_answer.text, "correct": True})
        pool.remove(
            json.dumps({"text": correct_answer.text, "label_": correct_answer.label_})
        )

        # find answers with the same NER label
        matches = [e for e in pool if correct_label in e]

        # if we don't have enough then add some other random answers
        if len(matches) < num_choices:
            choices = matches
            pool = pool.difference(set(choices))
            choices.extend(random.sample(pool, num_choices - len(choices)))
        else:
            choices = random.sample(matches, num_choices)

        choices = [json.loads(s) for s in choices]
        for choice in choices:
            final_choices.append({"answer": choice["text"], "correct": False})
        random.shuffle(final_choices)
        return final_choices

    def _generate_question(self, qg_input):
        self.qg_model.eval()
        encoded_input = self._encode_qg_input(qg_input)
        with torch.no_grad():
            output = self.qg_model.generate(input_ids=encoded_input["input_ids"])
        question = self.qg_tokenizer.decode(output[0], skip_special_tokens=True)
        return question

    def _encode_qg_input(self, qg_input):
        return self.qg_tokenizer(
            qg_input,
            padding='max_length',
            max_length=self.SEQ_LENGTH,
            truncation=True,
            return_tensors="pt",
        ).to(self.device)

    def _get_ranked_qa_pairs(
        self, generated_questions, qg_answers, scores, num_questions=5
    ):
        if num_questions > len(scores):
            num_questions = len(scores)
            print(
                "\nWas only able to generate {} questions. For more questions, please input a longer text.".format(
                    num_questions
                )
            )

        qa_list = []
        for i in range(num_questions):
            index = scores[i]
            qa = self._make_dict(
                generated_questions[index].split("?")[0] + "?", qg_answers[index]
            )
            qa_list.append(qa)
        return qa_list

    def _get_all_qa_pairs(self, generated_questions, qg_answers):
        qa_list = []
        for i in range(len(generated_questions)):
            qa = self._make_dict(
                generated_questions[i].split("?")[0] + "?", qg_answers[i]
            )
            qa_list.append(qa)
        return qa_list

    def _make_dict(self, question, answer):
        qa = {}
        qa["question"] = question
        qa["answer"] = answer
        return qa


class QuestionGeneratorIndo:
    @inject
    def __init__(self, qa_evaluator: QAEvaluatorIndo, model_dir=None):
        self.ANSWER_TOKEN = "<answer>"
        self.CONTEXT_TOKEN = "<context>"
        self.SEQ_LENGTH = 512

        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

        self.qg_tokenizer = AutoTokenizer.from_pretrained(QG_INDO_PRETRAINED, use_fast=False)
        self.qg_model = AutoModelForSeq2SeqLM.from_pretrained(QG_INDO_PRETRAINED)
        self.qg_model.to(self.device)

        self.qa_evaluator = qa_evaluator

        tokenizer_nlp = AutoTokenizer.from_pretrained("cahya/bert-base-indonesian-NER")
        model_nlp = AutoModelForTokenClassification.from_pretrained("cahya/bert-base-indonesian-NER")
        self.nlp = pipeline("ner", model=model_nlp, tokenizer=tokenizer_nlp,  grouped_entities=True)

    def generate(
        self, article, use_evaluator=True, num_questions=None, answer_style="all"
    ):

        print("Generating questions...\n")

        qg_inputs, qg_answers = self.generate_qg_inputs(article, answer_style)
        generated_questions = self.generate_questions_from_inputs(qg_inputs)
        
        message = "{} questions doesn't match {} answers".format(
            len(generated_questions), len(qg_answers)
        )
        assert len(generated_questions) == len(qg_answers), message

        if use_evaluator:

            print("Evaluating QA pairs...\n")

            encoded_qa_pairs = self.qa_evaluator.encode_qa_pairs(
                generated_questions, qg_answers
            )
            scores = self.qa_evaluator.get_scores(encoded_qa_pairs)
            if num_questions:
                qa_list = self._get_ranked_qa_pairs(
                    generated_questions, qg_answers, scores, num_questions
                )
            else:
                qa_list = self._get_ranked_qa_pairs(
                    generated_questions, qg_answers, scores
                )

        else:
            print("Skipping evaluation step.\n")
            qa_list = self._get_all_qa_pairs(generated_questions, qg_answers)

        return qa_list

    def generate_qg_inputs(self, text, answer_style):

        VALID_ANSWER_STYLES = ["all", "sentences", "multiple_choice"]

        if answer_style not in VALID_ANSWER_STYLES:
            raise ValueError(
                "Invalid answer style {}. Please choose from {}".format(
                    answer_style, VALID_ANSWER_STYLES
                )
            )

        inputs = []
        answers = []

        if answer_style == "sentences" or answer_style == "all":
            segments = self._split_into_segments(text)
            for segment in segments:
                sentences = self._split_text(segment)
                prepped_inputs, prepped_answers = self._prepare_qg_inputs(
                    sentences, segment
                )
                inputs.extend(prepped_inputs)
                answers.extend(prepped_answers)

        if answer_style == "multiple_choice" or answer_style == "all":
            sentences = self._split_text(text)
            prepped_inputs, prepped_answers = self._prepare_qg_inputs_MC(sentences)
            inputs.extend(prepped_inputs)
            answers.extend(prepped_answers)

        return inputs, answers

    def generate_questions_from_inputs(self, qg_inputs):
        generated_questions = []

        for qg_input in qg_inputs:
            question = self._generate_question(qg_input)
            generated_questions.append(question)

        return generated_questions

    def _split_text(self, text):
        MAX_SENTENCE_LEN = 128

        sentences = re.findall(".*?[.!\?]", text)

        cut_sentences = []
        for sentence in sentences:
            if len(sentence) > MAX_SENTENCE_LEN:
                cut_sentences.extend(re.split("[,;:)]", sentence))
        # temporary solution to remove useless post-quote sentence fragments
        cut_sentences = [s for s in sentences if len(s.split(" ")) > 5]
        sentences = sentences + cut_sentences

        return list(set([s.strip(" ") for s in sentences]))

    def _split_into_segments(self, text):
        MAX_TOKENS = 490

        paragraphs = text.split("\n")
        tokenized_paragraphs = [
            self.qg_tokenizer(p)["input_ids"] for p in paragraphs if len(p) > 0
        ]

        segments = []
        while len(tokenized_paragraphs) > 0:
            segment = []
            while len(segment) < MAX_TOKENS and len(tokenized_paragraphs) > 0:
                paragraph = tokenized_paragraphs.pop(0)
                segment.extend(paragraph)
            segments.append(segment)
        return [self.qg_tokenizer.decode(s) for s in segments]

    def _prepare_qg_inputs(self, sentences, text):
        inputs = []
        answers = []

        for sentence in sentences:
            qg_input = "{} {} {} {}".format(
                self.ANSWER_TOKEN, sentence, self.CONTEXT_TOKEN, text
            )
            inputs.append(qg_input)
            answers.append(sentence)

        return inputs, answers

    def _prepare_qg_inputs_MC(self, sentences):
        
        inputs_from_text = []
        answers_from_text = []
        docs = []
        
        for sentence in sentences:
            stc_token = self.nlp(sentence)
            docs.append([tok for tok in stc_token])
            
        for i in range(len(sentences)):
            entities = docs[i]
            if entities:
                for entity in entities:
                    qg_input = "{} {} {} {}".format(
                        self.ANSWER_TOKEN, entity['word'], self.CONTEXT_TOKEN, sentences[i]
                    )
                    answers = self._get_MC_answers(entity, docs)
                    inputs_from_text.append(qg_input)
                    answers_from_text.append(answers)
        return inputs_from_text, answers_from_text

    def _get_MC_answers(self, correct_answer, docs):

        entities = []
        for doc in docs:
            entities.extend([{"text": e['word'], "label_": e['entity_group']} for e in doc])

        # remove duplicate elements
        entities_json = [json.dumps(kv) for kv in entities]
        pool = set(entities_json)
        num_choices = (
            min(4, len(pool)) - 1
        )  # -1 because we already have the correct answer

        # add the correct answer
        final_choices = []
        correct_label = correct_answer['entity_group']
        final_choices.append({"answer": correct_answer['word'], "correct": True})
        pool.remove(
            json.dumps({"text": correct_answer['word'], "label_": correct_answer['entity_group']})
        )

        # find answers with the same NER label
        matches = [e for e in pool if correct_label in e]

        # if we don't have enough then add some other random answers
        if len(matches) < num_choices:
            choices = matches
            pool = pool.difference(set(choices))
            choices.extend(random.sample(pool, num_choices - len(choices)))
        else:
            choices = random.sample(matches, num_choices)

        choices = [json.loads(s) for s in choices]
        for choice in choices:
            final_choices.append({"answer": choice["text"], "correct": False})
        random.shuffle(final_choices)
        return final_choices

    def _generate_question(self, qg_input):
        self.qg_model.eval()
        encoded_input = self._encode_qg_input(qg_input)
        with torch.no_grad():
            output = self.qg_model.generate(input_ids=encoded_input["input_ids"])
        question = self.qg_tokenizer.decode(output[0], skip_special_tokens=True)
        return question

    def _encode_qg_input(self, qg_input):
        return self.qg_tokenizer(
            qg_input,
            padding='max_length',
            max_length=self.SEQ_LENGTH,
            truncation=True,
            return_tensors="pt",
        ).to(self.device)

    def _get_ranked_qa_pairs(
        self, generated_questions, qg_answers, scores, num_questions=5
    ):
        if num_questions > len(scores):
            num_questions = len(scores)
            print(
                "\nWas only able to generate {} questions. For more questions, please input a longer text.".format(
                    num_questions
                )
            )

        qa_list = []
        for i in range(num_questions):
            index = scores[i]
            qa = self._make_dict(
                generated_questions[index].split("?")[0] + "?", qg_answers[index]
            )
            qa_list.append(qa)
        return qa_list

    def _get_all_qa_pairs(self, generated_questions, qg_answers):
        qa_list = []
        for i in range(len(generated_questions)):
            qa = self._make_dict(
                generated_questions[i].split("?")[0] + "?", qg_answers[i]
            )
            qa_list.append(qa)
        return qa_list

    def _make_dict(self, question, answer):
        qa = {}
        qa["question"] = question
        qa["answer"] = answer
        return qa
