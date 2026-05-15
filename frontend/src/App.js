import { useState } from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import SubmitFeedback from "./pages/SubmitFeedback";
import FeedbackList from "./pages/FeedbackList";
import FeedbackDetail from "./pages/FeedbackDetail";
import RoleSelect from "./pages/RoleSelect";
import "./index.css";

function App() {
  const [role, setRole] = useState(null);

  if (!role) return <RoleSelect onSelect={setRole} />;

  return (
    <BrowserRouter>
      <nav className="navbar">
        <span className="brand">💬 FMS</span>
        <div className="nav-links">
          {role === "admin" && <NavLink to="/" end>🏠 Dashboard</NavLink>}
          <NavLink to="/list">📋 All Feedback</NavLink>
          {role === "user" && <NavLink to="/submit">✏️ Submit Feedback</NavLink>}
        </div>
        <button className="logout-btn" onClick={() => setRole(null)}>
          🚪 Logout ({role})
        </button>
      </nav>

      <Routes>
        {role === "admin" ? (
          <>
            <Route path="/" element={<Dashboard />} />
            <Route path="/list" element={<FeedbackList />} />
            <Route path="/feedback/:id" element={<FeedbackDetail role={role} />} />
          </>
        ) : (
          <>
            <Route path="/" element={<SubmitFeedback />} />
            <Route path="/submit" element={<SubmitFeedback />} />
            <Route path="/list" element={<FeedbackList />} />
            <Route path="/feedback/:id" element={<FeedbackDetail role={role} />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
