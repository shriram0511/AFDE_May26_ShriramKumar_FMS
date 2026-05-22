-- Feedback Management System - Database Schema
-- Database: SQLite

CREATE TABLE IF NOT EXISTS feedback (
    feedback_id      INTEGER PRIMARY KEY AUTOINCREMENT,
    participant_name VARCHAR(255) NOT NULL,
    program_name     VARCHAR(255) NOT NULL,
    rating           INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comments         TEXT,
    submitted_at     DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS etl_runs (
    run_id         INTEGER PRIMARY KEY AUTOINCREMENT,
    filename       VARCHAR(255) NOT NULL,
    total_rows     INTEGER DEFAULT 0,
    valid_rows     INTEGER DEFAULT 0,
    duplicate_rows INTEGER DEFAULT 0,
    invalid_rows   INTEGER DEFAULT 0,
    run_at         DATETIME DEFAULT CURRENT_TIMESTAMP
);
