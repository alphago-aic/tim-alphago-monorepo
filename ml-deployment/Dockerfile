FROM python:3.9

RUN apt-get update

COPY ./requirements.txt ./requirements.txt
RUN pip3 install -r requirements.txt

COPY ./alphago /app
RUN useradd -m myuser
USER myuser


CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8080"]
