import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav style={styles.nav}>
      <div style={styles.brand}>Feedback Management System</div>
      <div style={styles.links}>
        <Link to="/" style={{ ...styles.link, ...(isActive("/") ? styles.active : {}) }}>
          Dashboard
        </Link>
        <Link to="/submit" style={{ ...styles.link, ...(isActive("/submit") ? styles.active : {}) }}>
          Submit Feedback
        </Link>
        <Link to="/list" style={{ ...styles.link, ...(isActive("/list") ? styles.active : {}) }}>
          All Feedback
        </Link>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#2563eb",
    padding: "12px 24px",
    color: "#fff",
  },
  brand: {
    fontWeight: "bold",
    fontSize: "18px",
  },
  links: {
    display: "flex",
    gap: "20px",
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    fontSize: "14px",
    padding: "6px 12px",
    borderRadius: "4px",
  },
  active: {
    backgroundColor: "#1d4ed8",
    fontWeight: "bold",
  },
};

export default Navbar;
