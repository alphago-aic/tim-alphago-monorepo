# PMB 2021 Recommendation Repository

Repository for Inference Web API of SQNA

## Development Requirement

- [Python](https://www.python.org)

## Components

- Framework: https://fastapi.tiangolo.com/
- Web Server: https://github.com/encode/uvicorn
- Naming Convention: https://www.python.org/dev/peps/pep-0008/

## Non-docker

### Installing dependencies

- Clone the repo
- Run `python -m venv`
- Run `pip install -r requirements.txt`

### Running the App

- Enter virtual environment
- Run the app with `python main.py run`

### Running tests

- Run `pytest`

## Docker

### Build the App

- Run `docker compose build`

### Running the App

- Run `docker compose up`

## Database Setup

### Configure Postgres for Local Env
