from fastapi import FastAPI
from typing import Optional
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from .nlp import NLP
from .question_generator import print_qa

class Message(BaseModel):
    '''Setting up pydantic object to handle typing for request messages'''
    input: str
    num: Optional[int] = 1
    mode: Optional[str] = 'all'
    output: str = None

# with open('../articles/indian_matchmaking.txt', 'r') as a:
#     article = a.read()

app = FastAPI()
nlp = NLP()

app.add_middleware(
    CORSMiddleware,
    allow_origins = ["*"],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

@app.post("/generative/")
async def  generate(message: Message):
    message.output  = nlp.generate(message.input, num=message.num, mode=message.mode)
    return {"output" : message.output}

@app.get('/')
async def main():
    return {"output":"Hello World!?"}