import pytest
from app import app


@pytest.fixture
def client():
    return app.test_client()


def test_home_returns_200(client):
    response = client.get('/')
    assert response.status_code == 200  # nosec


def test_health_returns_200(client):
    response = client.get('/health')
    assert response.status_code == 200  # nosec


def test_health_body(client):
    response = client.get('/health')
    assert response.data == b'Server is up and running'  # nosec
