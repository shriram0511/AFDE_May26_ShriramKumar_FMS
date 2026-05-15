import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getFeedbackById, updateFeedback, deleteFeedback } from "../services/feedbackService";

const RATING_LABELS = { 1: "Poor", 2: "Fair", 3: "Good", 4: "Very Good", 5: "Excellent" };
const RATING_COLORS = { 1: "#ef4444", 2: "#f97316", 3: "#eab308", 4: "#22c55e", 5: "#16a34a" };

function FeedbackDetail({ role }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getFeedbackById(id)
      .then((res) => {
        setFeedback(res.data);
        setForm({ participant_name: res.data.participant_name, program_name: res.data.program_name,
          rating: res.data.rating, comments: res.data.comments || "" });
      })
      .catch(() => alert("Feedback not found"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleUpdate = async () => {
    setSaving(true);
    try {
      const res = await updateFeedback(id, { ...form, rating: Number(form.rating) });
      setFeedback(res.data);
      setEditing(false);
    } catch { alert("Update failed"); }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this feedback?")) return;
    try { await deleteFeedback(id); navigate("/list"); }
    catch { alert("Delete failed"); }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (!feedback) return <div className="loading">Feedback not found.</div>;

  return (
    <div className="page-sm">
      <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>

      <div className="detail-card">
        {!editing ? (
          <>
            <div className="detail-header">
              <h2 className="detail-name">{feedback.participant_name}</h2>
              <span className="badge" style={{ backgroundColor: RATING_COLORS[feedback.rating], fontSize: "13px", padding: "5px 14px" }}>
                {feedback.rating} ★ {RATING_LABELS[feedback.rating]}
              </span>
            </div>
            <p className="detail-program">📌 {feedback.program_name}</p>
            <p className="detail-label">Comments</p>
            <p className="detail-comments">{feedback.comments || "No comments provided."}</p>
            <p className="detail-date">🕐 Submitted on {new Date(feedback.submitted_at).toLocaleString("en-IN", {
              day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit",
            })}</p>
            {role === "admin" && (
              <div className="btn-actions">
                <button onClick={() => setEditing(true)} className="btn-primary">✏️ Edit</button>
                <button onClick={handleDelete} className="btn-danger">🗑️ Delete</button>
              </div>
            )}
          </>
        ) : (
          <>
            <h2 className="detail-name" style={{ marginBottom: "24px" }}>Edit Feedback</h2>

            <div className="form-field">
              <label className="form-label">Participant Name</label>
              <input className="form-input" value={form.participant_name}
                onChange={(e) => setForm({ ...form, participant_name: e.target.value })} />
            </div>
            <div className="form-field">
              <label className="form-label">Program Name</label>
              <input className="form-input" value={form.program_name}
                onChange={(e) => setForm({ ...form, program_name: e.target.value })} />
            </div>
            <div className="form-field">
              <label className="form-label">Rating</label>
              <select className="form-input" value={form.rating}
                onChange={(e) => setForm({ ...form, rating: e.target.value })}>
                {[1, 2, 3, 4, 5].map((r) => (
                  <option key={r} value={r}>{r} - {RATING_LABELS[r]}</option>
                ))}
              </select>
            </div>
            <div className="form-field">
              <label className="form-label">Comments</label>
              <textarea className="form-textarea" rows={4} value={form.comments}
                onChange={(e) => setForm({ ...form, comments: e.target.value })} />
            </div>

            <div className="btn-actions">
              <button onClick={() => setEditing(false)} className="btn-secondary">Cancel</button>
              <button onClick={handleUpdate} disabled={saving} className="btn-primary">
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default FeedbackDetail;
