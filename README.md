# Feedback Management System

Full-stack web application — React frontend, FastAPI backend, SQLite database.

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
└── frontend/
    ├── public/index.html
    ├── src/
    │   ├── components/FeedbackCard.js
    │   ├── pages/
    │   │   ├── RoleSelect.js
    │   │   ├── Dashboard.js
    │   │   ├── SubmitFeedback.js
    │   │   ├── FeedbackList.js
    │   │   └── FeedbackDetail.js
    │   ├── services/feedbackService.js
    │   ├── App.js
    │   ├── index.css
    │   ├── index.js
    │   └── api.js
    └── package.json
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

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /feedback | Get all feedback |
| GET | /feedback/{id} | Get feedback by ID |
| POST | /feedback | Submit feedback |
| PUT | /feedback/{id} | Update feedback |
| DELETE | /feedback/{id} | Delete feedback |
| GET | /search | Search & filter feedback |

## Tech Stack

- **Frontend**: React 18, React Router v6, Axios
- **Backend**: FastAPI, SQLAlchemy
- **Database**: SQLite
