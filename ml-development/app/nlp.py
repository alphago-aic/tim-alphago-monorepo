from question_generator import QuestionGenerator
from question_generator import print_qa
import torch
import time
print("IN")
# device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
# assert device == torch.device('cuda'), "Not using CUDA. Set: Runtime > Change runtime type > Hardware Accelerator: GPU"

qg = QuestionGenerator()

with open('../articles/indian_matchmaking.txt', 'r') as a:
    article = a.read()

start = time.time()
qa_list = qg.generate(
    article, 
    num_questions=10, 
    answer_style='all'
)
print(str((time.time()-start)/60)+" mins")
print()
print_qa(qa_list)