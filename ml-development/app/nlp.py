from .question_generator import QuestionGenerator
import torch
import time

# device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
# assert device == torch.device('cuda'), "Not using CUDA. Set: Runtime > Change runtime type > Hardware Accelerator: GPU"

class NLP:
    def __init__(self):
        self.qg = QuestionGenerator()
        
    def generate(self, text, num=1, mode='all'):
        self.qa_list = self.qg.generate(
            text, 
            num_questions=num, 
            answer_style=mode
        )
        return self.qa_list