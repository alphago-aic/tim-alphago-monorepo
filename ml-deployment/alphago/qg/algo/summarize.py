from transformers import (
    T5Tokenizer,
    T5ForConditionalGeneration
)
from injector import inject
import torch

from alphago.constants import SUMMARIZE_INDO_PRETRAINED


class Summarization:
    @inject
    def __init__(self) -> None:
        print("load summarize model")
        self.tokenizer = T5Tokenizer.from_pretrained(SUMMARIZE_INDO_PRETRAINED)
        self.model = T5ForConditionalGeneration.from_pretrained(SUMMARIZE_INDO_PRETRAINED)
        device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        self.model.to(device)

    def generate(self, article: str) -> str:
        input_ids = self.tokenizer.encode(article, return_tensors='pt')
        summary_ids = self.model.generate(input_ids,
                    max_length=100, 
                    num_beams=2,
                    repetition_penalty=2.5, 
                    length_penalty=1.0, 
                    early_stopping=True,
                    no_repeat_ngram_size=2,
                    use_cache=True)

        return self.tokenizer.decode(summary_ids[0], skip_special_tokens=True)
