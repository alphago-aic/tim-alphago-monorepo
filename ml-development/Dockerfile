FROM python:3.9-slim

RUN apt-get update && apt-get install -y git

COPY ./requirements.txt ./requirements.txt
RUN pip3 install -r requirements.txt

ENV PORT 8080
ENV HOST 0.0.0.0

COPY ./app /app
RUN useradd -m myuser
USER myuser


CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8080"]