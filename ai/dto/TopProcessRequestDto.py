from pydantic import BaseModel

class TopProcessRequestDto(BaseModel):
    goal: str = None
    process: str = None