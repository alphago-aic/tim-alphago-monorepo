from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from nlp import NLP
from question_generator import print_qa

class Message(BaseModel):
    '''Setting up pydantic object to handle typing for request messages'''
    input: str
    output: str = None

# with open('../articles/indian_matchmaking.txt', 'r') as a:
#     article = a.read()

app = FastAPI()
nlp = NLP()

origins = ["http://localhost",
    "http://localhost:3000",
    "http://127.0.0.1:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials=True,
    allow_methods=['POST'],
    allow_headers=['*'],
)

@app.post("/generative/")
async def  generate(message: Message, num: int, mode: str):
    message.output  = nlp.generate(message.input, num=num, mode=mode)
    return {"output" : message.output}