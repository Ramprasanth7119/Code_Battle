// src/Components/OAuth2RedirectHandler.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OAuth2RedirectHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');

    if (token) {
      localStorage.setItem('token', token);
      navigate('/'); // Redirect to home or desired route
    } else {
      alert('Authentication failed. No token received.');
      navigate('/login');
    }
  }, [navigate]);

  return <p>Processing authentication...</p>;
};

export default OAuth2RedirectHandler;
