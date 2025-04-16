// src/Components/Navbar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/"); // Redirect to home after logout
  };

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.link}>Home</Link>
      <Link to="/battle" style={styles.link}>Battle</Link>
      <Link to="/profile" style={styles.link}>Profile</Link>
      {token && (
        <button onClick={handleLogout} style={styles.button}>
          Logout
        </button>
      )}
    </nav>
  );
};

const styles = {
  nav: {
    display: "flex",
    gap: "1rem",
    padding: "1rem",
    backgroundColor: "#f2f2f2",
    justifyContent: "center",
    alignItems: "center",
  },
  link: {
    textDecoration: "none",
    color: "#333",
    fontSize: "1.1rem",
  },
  button: {
    backgroundColor: "#e53935",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    cursor: "pointer",
    borderRadius: "4px",
  },
};

export default Navbar;
