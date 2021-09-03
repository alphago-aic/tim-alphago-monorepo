from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from alphago.qg.interface import IQGService, QGSpec, QASpec, SumSpec
from alphago.di import injector
from .response import BaseResponse

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins = ["*"],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

@app.get("/ping")
async def ping():
    return {"message": "pong"}


@app.on_event("startup")
async def startup():
    injector.get(IQGService)


@app.post("/generate", response_model=BaseResponse)
def generate_qg(spec: QGSpec):
    qg_service = injector.get(IQGService)

    try:
        result = qg_service.generate_qg(spec)
        return BaseResponse(
            status="success", data=result
        )
    except Exception as e:
        return BaseResponse(
            status="failed", message=f"Error: {e}"
        )


@app.post("/qa", response_model=BaseResponse)
def generate_qa(spec: QASpec):
    qg_service = injector.get(IQGService)

    try:
        result = qg_service.question_answer(spec)
        return BaseResponse(
            status="success", data=result
        )
    except Exception as e:
        return BaseResponse(
            status="failed", message=f"Error: {e}"
        )

@app.post("/summarize", response_model=BaseResponse)
def generate_sum(spec: SumSpec):
    qg_service = injector.get(IQGService)

    try:
        result = qg_service.summarize(spec)
        return BaseResponse(
            status="success", data=result
        )
    except Exception as e:
        return BaseResponse(
            status="failed", message=f"Error: {e}"
        )
