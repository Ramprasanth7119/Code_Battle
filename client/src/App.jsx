// src/App.jsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Register from './Components/Register';
import Login from './Components/Login';
import Room from './Components/CreateRoom';
import Profile from './Components/Profile';
import Landing from './Components/LandingPage';
import ProtectedRoute from './Components/ProtectedRoute';
import Navbar from './Components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />

        {/* Protected routes */}
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
              <Room/>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
