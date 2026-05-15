function RoleSelect({ onSelect }) {
  return (
    <div className="role-wrapper">
      <div className="role-header">
        <div className="role-logo">💬</div>
        <h1 className="role-title">Feedback Management System</h1>
        <p className="role-subtitle">Select your role to continue</p>
      </div>

      <div className="role-cards">
        <div className="role-card" onClick={() => onSelect("admin")}>
          <div className="role-card-top admin">🛡️</div>
          <div className="role-card-body">
            <div className="role-card-title">Admin</div>
            <div className="role-card-desc">Manage feedback, view reports & search records</div>
            <button className="role-card-btn admin">Continue as Admin</button>
          </div>
        </div>

        <div className="role-card" onClick={() => onSelect("user")}>
          <div className="role-card-top user">👤</div>
          <div className="role-card-body">
            <div className="role-card-title">User</div>
            <div className="role-card-desc">Submit feedback & view all submitted responses</div>
            <button className="role-card-btn user">Continue as User</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoleSelect;
