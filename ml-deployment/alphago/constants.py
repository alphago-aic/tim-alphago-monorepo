import os


APP_ENV = os.getenv("APP_ENV") or "local"

QG_ANS_MODEL = "valhalla/t5-small-qa-qg-hl"
QG_MODEL = "valhalla/t5-small-qg-hl"
E2EQG_MODEL = "valhalla/t5-small-e2e-qg"
QAQG_MODEL = "valhalla/t5-small-qa-qg-hl"

