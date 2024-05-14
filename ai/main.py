import uvicorn
from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from dto.TopProcessRequestDto import TopProcessRequestDto

from openai import OpenAI
import argparse

app = FastAPI()

origins = [
    "https://mogaknyang-back.duckdns.org",
    "http://localhost:3003",
    "http://127.0.0.1:3003"
]

client = OpenAI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.post("/topprocess")
def read_item(requestDto : TopProcessRequestDto):
    completion = client.chat.completions.create(
        model="gpt-4-turbo",
        messages=[
            {"role": "system",
             "content": "너는 판별기로서, 사용자가 작성한 목표와 관련이 있는 프로세스 이름이면 \"YES\",  상관없는 프로세스 이름을 가졌다면 \"NO\"를 보낸다."},
            {"role": "user", "content": f"goal:\"{requestDto.goal}\" , process: \"{requestDto.process}\""},
        ]
    )
    return { "result" : completion.choices[0].message.content }


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument('--reload', action='store_true', help=' : debug mode', default=False)
    args = parser.parse_args()
    uvicorn.run(app, host="0.0.0.0", port=3003)
