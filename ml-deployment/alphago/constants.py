import os


APP_ENV = os.getenv("APP_ENV") or "local"

QG_ANS_MODEL = os.getenv("QG_ANS_MODEL") or "valhalla/t5-small-qa-qg-hl"
QG_MODEL = os.getenv("QG_MODEL") or "valhalla/t5-small-qg-hl"
E2EQG_MODEL = os.getenv("E2EQG_MODEL") or "valhalla/t5-small-e2e-qg"
QAQG_MODEL = os.getenv("QAQG_MODEL") or "valhalla/t5-small-qa-qg-hl"

QAE_PRETRAINED = "iarfmoose/bert-base-cased-qa-evaluator"
QG_PRETRAINED = "iarfmoose/t5-base-question-generator"

QAE_INDO_PRETRAINED = "widyanto/indobert-base-uncased-qa-evaluator"
QG_INDO_PRETRAINED = "widyanto/IndoT5-small-qg"
