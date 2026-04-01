FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Install system dependencies
# hadolint ignore=DL3008
RUN apt-get update && \
    apt-get install -y --no-install-recommends curl && \
    rm -rf /var/lib/apt/lists/*

# Copy requirements first (for caching)
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Expose port
EXPOSE 5000

# Run app with gunicorn
CMD ["gunicorn", "-b", "0.0.0.0:5000", "app:app"]
