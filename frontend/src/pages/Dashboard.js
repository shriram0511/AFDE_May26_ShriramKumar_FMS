import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllFeedback } from "../services/feedbackService";
import FeedbackCard from "../components/FeedbackCard";

function Dashboard() {
  const [feedbackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getAllFeedback()
      .then((res) => setFeedbackList(res.data))
      .catch(() => alert("Failed to load feedback"))
      .finally(() => setLoading(false));
  }, []);

  const totalCount = feedbackList.length;
  const avgRating =
    totalCount > 0
      ? (feedbackList.reduce((sum, f) => sum + f.rating, 0) / totalCount).toFixed(2)
      : "—";
  const recent = feedbackList.slice(0, 5);

  if (loading) return <div className="loading">Loading dashboard...</div>;

  return (
    <div className="page">
      <h2 className="page-title">Dashboard</h2>

      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-icon blue">📝</div>
          <div className="stat-info">
            <div className="stat-value">{totalCount}</div>
            <div className="stat-label">Total Feedback</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon green">⭐</div>
          <div className="stat-info">
            <div className="stat-value">{avgRating}</div>
            <div className="stat-label">Average Rating</div>
          </div>
        </div>
      </div>

      <p className="section-title">🕐 Recent Feedback</p>
      {recent.length === 0 ? (
        <div className="empty">No feedback submitted yet.</div>
      ) : (
        recent.map((f) => <FeedbackCard key={f.feedback_id} feedback={f} />)
      )}

      {totalCount > 5 && (
        <button className="btn-primary view-all-btn" onClick={() => navigate("/list")}>
          View All ({totalCount}) →
        </button>
      )}
    </div>
  );
}

export default Dashboard;
