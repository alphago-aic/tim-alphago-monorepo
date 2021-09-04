This repo is used to run ML inference on Google Cloud Compute Engine instance.
The model used in this repo is English question generator.

# Alphago ML Inference Repository 

Repository for Inference Web (English) API of SQNA

## Development Requirement

- [Python](https://www.python.org)

## Components

- Framework: https://fastapi.tiangolo.com/
- Web Server: https://github.com/encode/uvicorn
- Naming Convention: https://www.python.org/dev/peps/pep-0008/

## Docker

### Build the App

- Run `docker compose build`

### Running the App

- Run `docker compose up`

### App is running on http://localhost:8000. To check the swagger documentation go to 
### http://localhost:8000/docs 