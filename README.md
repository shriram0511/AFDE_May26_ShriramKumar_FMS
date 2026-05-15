# Feedback Management System
A centralized web-based Feedback Management System to collect, view, search, and manage feedback records efficiently.

## Project Overview
Organizations collect feedback from participants across multiple programs and events, resulting in scattered data with no centralized management. This system digitizes and streamlines feedback operations through a centralized web application built with React, FastAPI, and SQLite.

## Features Implemented
- Submit feedback with participant name, program, rating, and comments
- View all submitted feedback records
- View detailed feedback entries with timestamps
- Edit and delete feedback (Admin only)
- Role-based access — Admin and User roles
- Admin Dashboard with stats (total feedback, average rating, recent entries)
- Keyword search across participant name, program name, and comments
- Filter feedback by program name and rating

## Technology Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, React Router v6, Axios |
| Backend | FastAPI, SQLAlchemy |
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
│   ├── routers/
│   │   └── feedback.py
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
│       │   └── FeedbackDetail.js
│       ├── services/
│       │   ├── api.js
│       │   └── feedbackService.js
│       ├── App.js
│       ├── index.css
│       └── index.js
├── database/
│   └── schema.sql
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

Full API documentation with request/response examples: `docs/api.md`

## Screenshots

Screenshots are available in the `screenshots/` folder.

## Database Schema

| Table | Columns |
|-------|---------|
| feedback | feedback_id, participant_name, program_name, rating, comments, submitted_at |
