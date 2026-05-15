function RoleSelect({ onSelect }) {
  return (
    <div className="role-wrapper">
      <div className="role-card">
        <h1 className="role-title">Feedback Management System</h1>
        <p className="role-subtitle">Select your role to continue</p>
        <div className="role-buttons">
          <button className="role-btn-admin" onClick={() => onSelect("admin")}>Admin</button>
          <button className="role-btn-user" onClick={() => onSelect("user")}>User</button>
        </div>
      </div>
    </div>
  );
}

export default RoleSelect;
