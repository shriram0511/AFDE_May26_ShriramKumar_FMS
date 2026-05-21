from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session
from typing import List
import pandas as pd
import io
import os

from database import get_db
from models import ETLRun, Feedback
from schemas import ETLRunResponse, ETLSummary
from etl.pipeline import run_etl

router = APIRouter(prefix="/etl", tags=["ETL"])

ALLOWED_EXTENSIONS = {".csv", ".xlsx", ".xls"}


@router.post("/upload", response_model=ETLSummary)
async def upload_and_run_etl(file: UploadFile = File(...), db: Session = Depends(get_db)):
    ext = os.path.splitext(file.filename)[1].lower()
    if ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(status_code=400, detail="Only CSV and Excel files are supported")

    file_bytes = await file.read()
    result = run_etl(db, file.filename, file_bytes, ext)

    if "error" in result:
        raise HTTPException(status_code=400, detail=result["error"])

    return result


@router.get("/history", response_model=List[ETLRunResponse])
def get_etl_history(db: Session = Depends(get_db)):
    return db.query(ETLRun).order_by(ETLRun.run_at.desc()).all()


@router.get("/analytics")
def get_analytics(db: Session = Depends(get_db)):
    records = db.query(Feedback).all()
    if not records:
        return []

    from collections import defaultdict
    grouped = defaultdict(list)
    for r in records:
        grouped[r.program_name].append(r.rating)

    result = []
    for program, ratings in sorted(grouped.items()):
        result.append({
            "program_name": program,
            "total_feedback": len(ratings),
            "avg_rating": round(sum(ratings) / len(ratings), 2),
            "highest_rating": max(ratings),
            "lowest_rating": min(ratings),
        })
    return result


@router.get("/report/download")
def download_report(db: Session = Depends(get_db)):
    records = db.query(Feedback).order_by(Feedback.submitted_at.desc()).all()
    data = [
        {
            "feedback_id": r.feedback_id,
            "participant_name": r.participant_name,
            "program_name": r.program_name,
            "rating": r.rating,
            "comments": r.comments or "",
            "submitted_at": r.submitted_at.strftime("%Y-%m-%d %H:%M:%S"),
        }
        for r in records
    ]
    df = pd.DataFrame(data)
    stream = io.StringIO()
    df.to_csv(stream, index=False)
    stream.seek(0)
    return StreamingResponse(
        iter([stream.getvalue()]),
        media_type="text/csv",
        headers={"Content-Disposition": "attachment; filename=feedback_report.csv"},
    )
