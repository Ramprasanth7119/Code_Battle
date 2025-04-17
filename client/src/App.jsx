// src/App.jsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Register from './Components/Register';
import Login from './Components/Login';
import Room from './Components/CreateRoom';
import Profile from './Components/Profile';
import ProtectedRoute from './Components/ProtectedRoute';
import Navbar from './Components/Navbar';
import OAuth2RedirectHandler from './Components/OAuth2RedirectHandler';

function App() {

  const token = localStorage.getItem("token");

  console.log("Token from localStorage:", token);

  return (
    <Router>
      {/* Show Navbar only if token exists */}
      {token && <Navbar />}
      
      <Routes>
        <Route path="/battle" element={<Room />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />

        {/* Protected Routes */}
        {/* <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        /> */}
        <Route
          path="/battle"
          element={
            <ProtectedRoute>
              <h2 style={{ textAlign: "center", marginTop: "2rem" }}>Battle Page Placeholder</h2>
            </ProtectedRoute>
          }
        />
        <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />
      </Routes>
    </Router>
  );
}

export default App;
