import React from 'react';
import {useNavigate} from 'react-router-dom';

const GoogleLogin = () => {

    const navigate = useNavigate();
  return (
    <a href="http://localhost:5000/api/auth/google">
      <button style={{ backgroundColor: "#4285F4", color: "#fff", padding: "10px", border: "none", borderRadius: "4px" }}>
        Login with Google
      </button>

    </a>
  );
};

export default GoogleLogin;
