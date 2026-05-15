# Feedback Management System

Full-stack web application for centralized feedback collection and management. Built as part of the AFDE Capstone Project — Phase 1.

## Project Overview

Organizations collect feedback from participants, employees, and customers across multiple platforms, resulting in scattered data and no centralized management. This system provides a single platform to submit, view, search, filter, and manage feedback records efficiently.

## Features

- Role-based access (Admin / User)
- Submit feedback with name, program, rating (1–5), and comments
- View all feedback records
- View detailed feedback entries with timestamps
- Edit and delete feedback (Admin only)
- Keyword-based search across name, program, and comments
- Filter by program name and rating

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
│   ├── src/
│   │   ├── components/FeedbackCard.js
│   │   ├── pages/
│   │   │   ├── RoleSelect.js
│   │   │   ├── Dashboard.js
│   │   │   ├── SubmitFeedback.js
│   │   │   ├── FeedbackList.js
│   │   │   └── FeedbackDetail.js
│   │   ├── services/feedbackService.js
│   │   ├── App.js
│   │   ├── index.css
│   │   ├── index.js
│   │   └── api.js
│   └── package.json
├── database/
│   └── schema.sql
├── docs/
│   └── api.md
├── screenshots/
├── README.md
└── requirements.txt
```

## Setup & Run

### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

API runs at: http://localhost:8000  
Swagger docs: http://localhost:8000/docs

### Frontend

```bash
cd frontend
npm install
npm start
```

App runs at: http://localhost:3000

### Database

SQLite database (`feedback.db`) is auto-created on first backend run.  
Schema reference: `database/schema.sql`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /feedback | Get all feedback |
| GET | /feedback/{id} | Get feedback by ID |
| POST | /feedback | Submit feedback |
| PUT | /feedback/{id} | Update feedback |
| DELETE | /feedback/{id} | Delete feedback |
| GET | /search | Search & filter feedback |

Full API documentation with request/response examples: `docs/api.md`

## Tech Stack

- **Frontend**: React 18, React Router v6, Axios
- **Backend**: FastAPI, SQLAlchemy
- **Database**: SQLite
