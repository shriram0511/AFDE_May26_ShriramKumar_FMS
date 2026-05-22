# Feedback Management System
A centralized web-based Feedback Management System to collect, view, search, manage, and analyze feedback records efficiently.

## Project Overview
Organizations collect feedback from participants across multiple programs and events, resulting in scattered data with no centralized management. This system digitizes and streamlines feedback operations through a centralized web application built with React, FastAPI, and SQLite. Phase 2 extends the system with an ETL pipeline for bulk CSV imports, data validation, and program-wise analytics.

## Features Implemented

### Phase 1
- Submit feedback with participant name, program, rating, and comments
- View all submitted feedback records
- View detailed feedback entries with timestamps
- Edit and delete feedback (Admin only)
- Role-based access — Admin and User roles
- Admin Dashboard with stats (total feedback, average rating, recent entries)
- Keyword search across participant name, program name, and comments
- Filter feedback by program name and rating

### Phase 2 — ETL Pipeline
- Upload feedback dataset from CSV or Excel file
- Validate and clean records (invalid ratings, missing fields, duplicates)
- Load cleaned data into the feedback table
- Program-wise analytics (total feedback, average, highest, lowest rating)
- ETL run history with summary of each upload
- Download all feedback as a CSV report

## Technology Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, React Router v6, Axios |
| Backend | FastAPI, SQLAlchemy, Pandas |
| Database | SQLite |
| API Testing | Postman / Swagger UI |

## Project Structure

```
AFDE_May26_ShriramKumar_FMS/
├── backend/
│   ├── main.py
│   ├── database.py
│   ├── models.py
│   ├── schemas.py
│   ├── crud.py
│   ├── etl/
│   │   └── pipeline.py
│   ├── routers/
│   │   ├── feedback.py
│   │   └── etl.py
│   └── requirements.txt
├── frontend/
│   ├── public/index.html
│   └── src/
│       ├── components/FeedbackCard.js
│       ├── pages/
│       │   ├── RoleSelect.js
│       │   ├── Dashboard.js
│       │   ├── SubmitFeedback.js
│       │   ├── FeedbackList.js
│       │   ├── FeedbackDetail.js
│       │   └── ETLUpload.js
│       ├── services/
│       │   ├── api.js
│       │   ├── feedbackService.js
│       │   └── etlService.js
│       ├── App.js
│       ├── index.css
│       └── index.js
├── database/
│   └── schema.sql
├── dataset/
│   ├── sample_feedback.csv
│   ├── test_feedback.csv
│   └── test_small.csv
├── docs/
│   └── api.md
├── screenshots/
├── requirements.txt
├── README.md
└── .gitignore
```

## Setup Instructions

### Backend Setup

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

API runs at: http://localhost:8000  
Swagger Docs: http://localhost:8000/docs

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

App runs at: http://localhost:3000

### Database Setup

Database is automatically created as `feedback.db` inside the `backend/` folder when the backend starts for the first time.

Schema reference: `database/schema.sql`

## API Endpoints

### Feedback
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /feedback | Get all feedback |
| GET | /feedback/{id} | Get feedback by ID |
| POST | /feedback | Submit new feedback |
| PUT | /feedback/{id} | Update feedback |
| DELETE | /feedback/{id} | Delete feedback |
| GET | /search?keyword= | Search feedback by keyword |
| GET | /search?rating= | Filter feedback by rating |
| GET | /search?program_name= | Filter feedback by program |

### ETL Pipeline
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /etl/upload | Upload CSV/Excel and run ETL |
| GET | /etl/history | Get all ETL run history |
| GET | /etl/analytics | Program-wise analytics |
| GET | /etl/report/download | Download all feedback as CSV |

Full API documentation with request/response examples: `docs/api.md`

## Screenshots

Screenshots are available in the `screenshots/` folder.

## Database Schema

| Table | Columns |
|-------|---------|
| feedback | feedback_id, participant_name, program_name, rating, comments, submitted_at |
| etl_runs | run_id, filename, total_rows, valid_rows, duplicate_rows, invalid_rows, run_at |
