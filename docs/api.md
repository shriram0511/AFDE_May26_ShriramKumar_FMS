# Feedback Management System — API Documentation

Base URL: `http://localhost:8000`

---

## 1. Get All Feedback

**GET** `/feedback`

**Response**
```json
[
  {
    "feedback_id": 1,
    "participant_name": "Shriram",
    "program_name": "Hackathon",
    "rating": 5,
    "comments": "Great experience!",
    "submitted_at": "2026-05-15T10:30:00"
  }
]
```

---

## 2. Get Feedback by ID

**GET** `/feedback/{id}`

**Response**
```json
{
  "feedback_id": 1,
  "participant_name": "Shriram",
  "program_name": "Hackathon",
  "rating": 5,
  "comments": "Great experience!",
  "submitted_at": "2026-05-15T10:30:00"
}
```

**Error Response (404)**
```json
{ "detail": "Feedback not found" }
```

---

## 3. Submit Feedback

**POST** `/feedback`

**Request Body**
```json
{
  "participant_name": "Shriram",
  "program_name": "Hackathon",
  "rating": 5,
  "comments": "Great experience!"
}
```

**Response (201)**
```json
{
  "feedback_id": 1,
  "participant_name": "Shriram",
  "program_name": "Hackathon",
  "rating": 5,
  "comments": "Great experience!",
  "submitted_at": "2026-05-15T10:30:00"
}
```

---

## 4. Update Feedback

**PUT** `/feedback/{id}`

**Request Body** (all fields optional)
```json
{
  "participant_name": "Shriram Kumar",
  "rating": 4,
  "comments": "Updated comment"
}
```

**Response**
```json
{
  "feedback_id": 1,
  "participant_name": "Shriram Kumar",
  "program_name": "Hackathon",
  "rating": 4,
  "comments": "Updated comment",
  "submitted_at": "2026-05-15T10:30:00"
}
```

---

## 5. Delete Feedback

**DELETE** `/feedback/{id}`

**Response**
```json
{ "message": "Feedback deleted successfully" }
```

**Error Response (404)**
```json
{ "detail": "Feedback not found" }
```

---

## 6. Search & Filter Feedback

**GET** `/search`

**Query Parameters**

| Parameter | Type | Description |
|---|---|---|
| keyword | string | Search in name, program, comments |
| rating | integer | Filter by exact rating (1–5) |
| program_name | string | Filter by program name |

**Example Requests**
```
GET /search?keyword=hackathon
GET /search?rating=5
GET /search?program_name=Hackathon
GET /search?keyword=great&rating=5
```

**Response**
```json
[
  {
    "feedback_id": 1,
    "participant_name": "Shriram",
    "program_name": "Hackathon",
    "rating": 5,
    "comments": "Great experience!",
    "submitted_at": "2026-05-15T10:30:00"
  }
]
```

---

## 7. Upload CSV / Run ETL

**POST** `/etl/upload`

**Request Body** — `multipart/form-data`

| Field | Type | Description |
|-------|------|-------------|
| file | file | CSV or Excel file (.csv, .xlsx, .xls) |

**Response**
```json
{
  "run_id": 1,
  "filename": "sample_feedback.csv",
  "total_rows": 110,
  "valid_rows": 100,
  "duplicate_rows": 5,
  "invalid_rows": 5,
  "errors": [
    "5 rows dropped due to invalid rating (must be 1–5)",
    "5 duplicate rows removed"
  ]
}
```

**Error Response (400)**
```json
{ "detail": "Only CSV and Excel files are supported" }
```

---

## 8. ETL Run History

**GET** `/etl/history`

**Response**
```json
[
  {
    "run_id": 1,
    "filename": "sample_feedback.csv",
    "total_rows": 110,
    "valid_rows": 100,
    "duplicate_rows": 5,
    "invalid_rows": 5,
    "run_at": "2026-05-21T10:30:00"
  }
]
```

---

## 9. Program-wise Analytics

**GET** `/etl/analytics`

**Response**
```json
[
  {
    "program_name": "React Training",
    "total_feedback": 25,
    "avg_rating": 4.5,
    "highest_rating": 5,
    "lowest_rating": 3
  }
]
```

---

## 10. Download Feedback Report

**GET** `/etl/report/download`

Returns all feedback records as a downloadable CSV file.

**Response** — `text/csv` file download (`feedback_report.csv`)

---

## Rating Scale

| Value | Label |
|---|---|
| 1 | Poor |
| 2 | Fair |
| 3 | Good |
| 4 | Very Good |
| 5 | Excellent |
