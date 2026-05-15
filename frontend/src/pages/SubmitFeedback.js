import { useState } from "react";
import { createFeedback } from "../services/feedbackService";

const RATING_LABELS = { 1: "Poor", 2: "Fair", 3: "Good", 4: "Very Good", 5: "Excellent" };

function SubmitFeedback() {
  const [form, setForm] = useState({ participant_name: "", program_name: "", rating: "", comments: "" });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs = {};
    if (!form.participant_name.trim()) errs.participant_name = "Name is required";
    if (!form.program_name.trim()) errs.program_name = "Program name is required";
    if (!form.rating) errs.rating = "Please select a rating";
    return errs;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setSubmitting(true);
    try {
      await createFeedback({ ...form, rating: Number(form.rating) });
      setForm({ participant_name: "", program_name: "", rating: "", comments: "" });
      setSubmitted(true);
    } catch {
      alert("Failed to submit feedback");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="page-sm">
        <div className="success-box">
          <div className="success-icon">✓</div>
          <h2 className="success-title">Feedback Submitted!</h2>
          <p className="success-msg">Thank you. Your feedback has been recorded successfully.</p>
          <button className="btn-primary" onClick={() => setSubmitted(false)}>Submit Another</button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-sm">
      <h2 className="page-title">Submit Feedback</h2>
      <form onSubmit={handleSubmit} className="form-card">
        <div className="form-field">
          <label className="form-label">Participant Name</label>
          <input name="participant_name" value={form.participant_name} onChange={handleChange}
            className="form-input" placeholder="Enter your name" />
          {errors.participant_name && <span className="form-error">{errors.participant_name}</span>}
        </div>

        <div className="form-field">
          <label className="form-label">Training / Event / Product</label>
          <input name="program_name" value={form.program_name} onChange={handleChange}
            className="form-input" placeholder="Enter program or event name" />
          {errors.program_name && <span className="form-error">{errors.program_name}</span>}
        </div>

        <div className="form-field">
          <label className="form-label">Rating</label>
          <div className="rating-row">
            {[1, 2, 3, 4, 5].map((r) => (
              <button type="button" key={r}
                onClick={() => { setForm({ ...form, rating: r }); setErrors({ ...errors, rating: "" }); }}
                className={`rating-btn${form.rating === r ? " active" : ""}`}>
                {r}
                <span className="rating-btn-label">{RATING_LABELS[r]}</span>
              </button>
            ))}
          </div>
          {errors.rating && <span className="form-error">{errors.rating}</span>}
        </div>

        <div className="form-field">
          <label className="form-label">Comments</label>
          <textarea name="comments" value={form.comments} onChange={handleChange}
            className="form-textarea" placeholder="Share your thoughts (optional)" rows={4} />
        </div>

        <div className="btn-actions-right">
          <button type="button" onClick={() => setForm({ participant_name: "", program_name: "", rating: "", comments: "" })}
            className="btn-secondary">Clear</button>
          <button type="submit" disabled={submitting} className="btn-primary">
            {submitting ? "Submitting..." : "Submit Feedback"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default SubmitFeedback;
