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

## Rating Scale

| Value | Label |
|---|---|
| 1 | Poor |
| 2 | Fair |
| 3 | Good |
| 4 | Very Good |
| 5 | Excellent |
