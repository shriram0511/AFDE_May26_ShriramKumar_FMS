import pandas as pd
from sqlalchemy.orm import Session
from models import Feedback, ETLRun
from datetime import datetime


REQUIRED_COLUMNS = {"participant_name", "program_name", "rating"}


def run_etl(db: Session, filename: str, file_bytes: bytes, file_ext: str) -> dict:
    errors = []

    # Extract
    try:
        if file_ext == ".csv":
            df = pd.read_csv(pd.io.common.BytesIO(file_bytes))
        else:
            df = pd.read_excel(pd.io.common.BytesIO(file_bytes))
    except Exception as e:
        return {"error": f"Failed to read file: {str(e)}"}

    total_rows = len(df)

    # Check required columns
    missing = REQUIRED_COLUMNS - set(df.columns.str.strip().str.lower())
    if missing:
        return {"error": f"Missing required columns: {missing}"}

    df.columns = df.columns.str.strip().str.lower()

    # Transform — clean strings
    df["participant_name"] = df["participant_name"].astype(str).str.strip().str.title()
    df["program_name"] = df["program_name"].astype(str).str.strip()
    df["comments"] = df.get("comments", pd.Series([""] * len(df))).fillna("").astype(str).str.strip()

    # Transform — parse submitted_at if present
    if "submitted_at" in df.columns:
        df["submitted_at"] = pd.to_datetime(df["submitted_at"], errors="coerce")
    else:
        df["submitted_at"] = datetime.utcnow()

    # Transform — drop rows with missing required fields
    before = len(df)
    df = df[df["participant_name"].notna() & df["program_name"].notna() & df["rating"].notna()]
    dropped_missing = before - len(df)
    if dropped_missing:
        errors.append(f"{dropped_missing} rows dropped due to missing required fields")

    # Transform — validate ratings
    df["rating"] = pd.to_numeric(df["rating"], errors="coerce")
    invalid_mask = ~df["rating"].between(1, 5)
    invalid_rows = int(invalid_mask.sum()) + dropped_missing
    if invalid_mask.sum():
        errors.append(f"{int(invalid_mask.sum())} rows dropped due to invalid rating (must be 1–5)")
    df = df[~invalid_mask]
    df["rating"] = df["rating"].astype(int)

    # Transform — remove duplicates
    subset = ["participant_name", "program_name", "rating", "comments"]
    before_dedup = len(df)
    df = df.drop_duplicates(subset=subset)
    duplicate_rows = before_dedup - len(df)
    if duplicate_rows:
        errors.append(f"{duplicate_rows} duplicate rows removed")

    valid_rows = len(df)

    # Load — insert into feedback table
    for _, row in df.iterrows():
        submitted = row["submitted_at"] if pd.notna(row["submitted_at"]) else datetime.utcnow()
        db_feedback = Feedback(
            participant_name=row["participant_name"],
            program_name=row["program_name"],
            rating=int(row["rating"]),
            comments=row["comments"] or None,
            submitted_at=submitted,
        )
        db.add(db_feedback)

    # Save ETL run summary
    etl_run = ETLRun(
        filename=filename,
        total_rows=total_rows,
        valid_rows=valid_rows,
        duplicate_rows=duplicate_rows,
        invalid_rows=invalid_rows,
    )
    db.add(etl_run)
    db.commit()
    db.refresh(etl_run)

    return {
        "run_id": etl_run.run_id,
        "filename": filename,
        "total_rows": total_rows,
        "valid_rows": valid_rows,
        "duplicate_rows": duplicate_rows,
        "invalid_rows": invalid_rows,
        "errors": errors,
    }
