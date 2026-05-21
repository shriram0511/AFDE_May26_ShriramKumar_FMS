from sqlalchemy import Column, Integer, String, Text, DateTime
from datetime import datetime
from database import Base


class Feedback(Base):
    __tablename__ = "feedback"

    feedback_id = Column(Integer, primary_key=True, index=True)
    participant_name = Column(String, nullable=False)
    program_name = Column(String, nullable=False)
    rating = Column(Integer, nullable=False)
    comments = Column(Text)
    submitted_at = Column(DateTime, default=datetime.utcnow)


class ETLRun(Base):
    __tablename__ = "etl_runs"

    run_id = Column(Integer, primary_key=True, index=True)
    filename = Column(String, nullable=False)
    total_rows = Column(Integer, default=0)
    valid_rows = Column(Integer, default=0)
    duplicate_rows = Column(Integer, default=0)
    invalid_rows = Column(Integer, default=0)
    run_at = Column(DateTime, default=datetime.utcnow)
