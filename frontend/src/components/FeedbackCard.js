import { useNavigate } from "react-router-dom";

const RATING_LABELS = { 1: "Poor", 2: "Fair", 3: "Good", 4: "Very Good", 5: "Excellent" };
const RATING_COLORS = { 1: "#ef4444", 2: "#f97316", 3: "#eab308", 4: "#22c55e", 5: "#16a34a" };

function FeedbackCard({ feedback }) {
  const navigate = useNavigate();

  return (
    <div className="feedback-card" onClick={() => navigate(`/feedback/${feedback.feedback_id}`)}>
      <div className="card-header">
        <span className="card-name">{feedback.participant_name}</span>
        <span className="badge" style={{ backgroundColor: RATING_COLORS[feedback.rating] }}>
          {feedback.rating} - {RATING_LABELS[feedback.rating]}
        </span>
      </div>
      <div className="card-program">{feedback.program_name}</div>
      <div className="card-comments">{feedback.comments || "No comments"}</div>
      <div className="card-date">
        {new Date(feedback.submitted_at).toLocaleDateString("en-IN", {
          day: "2-digit", month: "short", year: "numeric",
        })}
      </div>
    </div>
  );
}

export default FeedbackCard;
