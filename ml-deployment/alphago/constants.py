import os


APP_ENV = os.getenv("APP_ENV") or "local"

QG_ANS_MODEL = os.getenv("QG_ANS_MODEL") or "valhalla/t5-small-qa-qg-hl"
QG_MODEL = os.getenv("QG_MODEL") or "valhalla/t5-small-qg-hl"
E2EQG_MODEL = os.getenv("E2EQG_MODEL") or "valhalla/t5-small-e2e-qg"
QAQG_MODEL = os.getenv("QAQG_MODEL") or "valhalla/t5-small-qa-qg-hl"

QAE_PRETRAINED = os.getenv("QAE_PRETRAINED") or "iarfmoose/bert-base-cased-qa-evaluator"
QG_PRETRAINED = os.getenv("QG_PRETRAINED") or "iarfmoose/t5-base-question-generator"
