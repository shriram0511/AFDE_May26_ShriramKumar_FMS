import { useEffect, useState } from "react";
import { getAllFeedback, searchFeedback } from "../services/feedbackService";
import FeedbackCard from "../components/FeedbackCard";

function FeedbackList() {
  const [feedbackList, setFeedbackList] = useState([]);
  const [allFeedback, setAllFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState("");
  const [rating, setRating] = useState("");
  const [programName, setProgramName] = useState("");

  const fetchAll = () => {
    setLoading(true);
    getAllFeedback()
      .then((res) => { setFeedbackList(res.data); setAllFeedback(res.data); })
      .catch(() => alert("Failed to load feedback"))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchAll(); }, []);

  const uniquePrograms = [...new Set(allFeedback.map((f) => f.program_name))];

  const handleSearch = () => {
    const params = {};
    if (keyword) params.keyword = keyword;
    if (rating) params.rating = Number(rating);
    if (programName) params.program_name = programName;
    setLoading(true);
    searchFeedback(params)
      .then((res) => setFeedbackList(res.data))
      .catch(() => alert("Search failed"))
      .finally(() => setLoading(false));
  };

  const handleReset = () => {
    setKeyword(""); setRating(""); setProgramName("");
    fetchAll();
  };

  return (
    <div className="page">
      <h2 className="page-title">All Feedback</h2>

      <div className="filter-box">
        <input className="filter-input" placeholder="Search by keyword..."
          value={keyword} onChange={(e) => setKeyword(e.target.value)} />
        <select className="filter-select" value={programName} onChange={(e) => setProgramName(e.target.value)}>
          <option value="">All Programs</option>
          {uniquePrograms.map((p) => <option key={p} value={p}>{p}</option>)}
        </select>
        <select className="filter-select" value={rating} onChange={(e) => setRating(e.target.value)}>
          <option value="">All Ratings</option>
          <option value="1">1 - Poor</option>
          <option value="2">2 - Fair</option>
          <option value="3">3 - Good</option>
          <option value="4">4 - Very Good</option>
          <option value="5">5 - Excellent</option>
        </select>
        <button className="btn-primary" onClick={handleSearch}>Search</button>
        <button className="btn-secondary" onClick={handleReset}>Reset</button>
      </div>

      {loading ? (
        <div className="loading">Loading...</div>
      ) : feedbackList.length === 0 ? (
        <p className="empty">No feedback found.</p>
      ) : (
        <>
          <p className="result-count">{feedbackList.length} record(s) found</p>
          {feedbackList.map((f) => <FeedbackCard key={f.feedback_id} feedback={f} />)}
        </>
      )}
    </div>
  );
}

export default FeedbackList;
