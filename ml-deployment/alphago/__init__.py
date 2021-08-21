from fastapi import FastAPI

from alphago.qg.interface import IQGService, QGSpec
from alphago.di import injector
from .response import BaseResponse

app = FastAPI()


@app.get("/ping")
async def ping():
    return {"message": "pong"}


@app.on_event("startup")
async def startup():
    injector.get(IQGService)


@app.post("/generate", response_model=BaseResponse)
def generate(spec: QGSpec):
    qg_service = injector.get(IQGService)

    try:
        result = qg_service.generate(spec)
        return BaseResponse(
            status="success", data=result
        )
    except Exception as e:
        return BaseResponse(
            status="failed", message=f"Error: {e}"
        )
