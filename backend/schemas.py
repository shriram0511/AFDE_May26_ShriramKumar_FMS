from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional, List


class FeedbackCreate(BaseModel):
    participant_name: str
    program_name: str
    rating: int = Field(..., ge=1, le=5)
    comments: Optional[str] = None


class FeedbackUpdate(BaseModel):
    participant_name: Optional[str] = None
    program_name: Optional[str] = None
    rating: Optional[int] = Field(None, ge=1, le=5)
    comments: Optional[str] = None


class FeedbackResponse(BaseModel):
    feedback_id: int
    participant_name: str
    program_name: str
    rating: int
    comments: Optional[str]
    submitted_at: datetime

    class Config:
        from_attributes = True


class ETLRunResponse(BaseModel):
    run_id: int
    filename: str
    total_rows: int
    valid_rows: int
    duplicate_rows: int
    invalid_rows: int
    run_at: datetime

    class Config:
        from_attributes = True


class ETLSummary(BaseModel):
    run_id: int
    filename: str
    total_rows: int
    valid_rows: int
    duplicate_rows: int
    invalid_rows: int
    errors: List[str]
