# DevOps Dashboard

A minimal Flask-based DevOps dashboard with a clean white & blue UI showing tool statuses, pipeline runs, and system health.

## Project Structure

```
devops-dashboard/
├── app.py               # Flask application
├── testapp.py           # Pytest tests
├── requirements.txt     # Python dependencies
├── Dockerfile           # Container image definition
├── docker-compose.yml   # Multi-container setup
├── templates/
│   └── index.html       # Dashboard UI
└── static/
    └── style.css        # White & blue styles
```

## Routes

| Route     | Method | Description            |
|-----------|--------|------------------------|
| `/`       | GET    | Renders the dashboard  |
| `/health` | GET    | Returns health status  |

## Run Locally

```bash
pip install -r requirements.txt
python app.py
```

Visit: http://localhost:5000

## Run with Docker

```bash
docker build -t devops-dashboard .
docker run -p 5000:5000 devops-dashboard
```

## Run with Docker Compose

```bash
docker-compose up --build
```

## Run Tests

```bash
pytest testapp.py -v
```

## Health Check

```bash
curl http://localhost:5000/health
# Server is up and running
```
