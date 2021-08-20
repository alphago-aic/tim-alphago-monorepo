from fastapi import FastAPI

from alphago.qg.interface import IQGService, QGSpec, QG2Spec
from alphago.di import injector

app = FastAPI()


@app.get("/ping")
async def ping():
    return {"message": "pong"}


@app.on_event("startup")
async def startup():
    injector.get(IQGService)


@app.post("/generate-qg1")
def generaet_qg(spec: QGSpec):
    qg_service = injector.get(IQGService)

    result = qg_service.generate_qg1(spec)
    return result
