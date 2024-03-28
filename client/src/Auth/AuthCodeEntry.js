import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";

const AuthCodeEntry = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const userEmail = localStorage.getItem("userEmail");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5100/api/validate-code",
        {
          userEmail,
          code,
        }
      );
      if (response.status === 200) {
        navigate("/home");
      } else {
        setError("Invalid code. Please try again.");
      }
    } catch (error) {
      console.error("Error validating code:", error);
      setError("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="auth-container">
      <h2>Enter Authentication Code</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <div>
          <label>Code:</label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
            className="auth-input"
          />
        </div>
        <button type="submit" className="auth-button">
          Submit
        </button>
        {error && <p className="auth-error">{error}</p>}
      </form>
    </div>
  );
};

export default AuthCodeEntry;
