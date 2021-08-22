FROM python:3.9

ENV NVIDIA_VISIBLE_DEVICES all
ENV NVIDIA_DRIVER_CAPABILITIES compute,utility

RUN apt-get update

COPY ./requirements.txt ./requirements.txt
RUN pip3 install -r requirements.txt

COPY ./alphago /app
RUN useradd -m myuser
USER myuser


CMD ["uvicorn", "alphago:app", "--host", "0.0.0.0", "--port", "8080"]
