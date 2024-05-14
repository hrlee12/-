FROM python:3.10

RUN --mount=target=/var/cache/apt,type=cache,sharing=locked \
    apt-get update &&  \
    apt-get install -y pkg-config build-essential libgl1-mesa-glx

COPY . /ai
WORKDIR /ai

RUN --mount=type=cache,target=/root/.cache/pip pip install --no-cache-dir -r requirements.txt

EXPOSE 3003
CMD ["python","main.py"]