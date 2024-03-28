import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/fa.css";

const FA = () => {
  const [secretKey, setSecretKey] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGenerateKey = async () => {
    try {
      const userEmail = localStorage.getItem("userEmail");
      const response = await axios.put(
        "http://localhost:5100/api/generate-key",
        {
          userEmail,
        }
      );
      if (response.status === 201) {
        alert("Secret key generated successfully");
        const generatedKey = response.data.secretKey;
        setSecretKey(generatedKey);
        console.log("Secret key:", generatedKey);
      } else {
        setError("Failed to generate secret key");
      }
    } catch (error) {
      console.error("Error generating secret key:", error);
      setError("Failed to generate secret key");
    }
  };

  const handleValidateCode = async (enteredCode) => {
    try {
      setLoading(true);
      const userEmail = localStorage.getItem("userEmail");
      const response = await axios.post(
        "http://localhost:5100/api/validate-code",
        {
          userEmail,
          code: enteredCode,
        }
      );
      if (response.status === 200) {
        alert("Code confirmed. You're all set!");
        navigate("/home");
      } else {
        setError("Failed to validate code");
      }
    } catch (error) {
      console.error("Error validating code:", error);
      setError("Failed to validate code");
    } finally {
      setLoading(false);
    }
  };

  const handleActivate2FA = async () => {
    const enteredCode = prompt("Enter the code from your authenticator app:");
    if (enteredCode) {
      handleValidateCode(enteredCode);
    }
  };

  return (
    <>
      <div className="update-container">
        <div className="update-card">
          <h2 className="update-heading">Two-Factor Authentication</h2>
          {error && <p className="text-danger">{error}</p>}
          {secretKey && <p className="secret-key">Secret Key: {secretKey}</p>}
          <div className="form-group">
            <button className="fa" onClick={handleGenerateKey}>
              Gjenero kodin sekret
            </button>
            <button className="fa" onClick={handleActivate2FA}>
              Aktivizo
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FA;
