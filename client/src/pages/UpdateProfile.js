import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/update.css";

const UpdateProfile = () => {
  const [userData] = useState(null);
  const userEmail = localStorage.getItem("userEmail");
  const navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [instagram, setInstagram] = useState("");
  const [facebook, setFacebook] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [codeConfirmed, setCodeConfirmed] = useState(false);

  useEffect(() => {
    const codeConfirmed = localStorage.getItem("codeConfirmed") === "true";
    setCodeConfirmed(codeConfirmed);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const socialMediaUpdated =
      userData.linkedin !== linkedin ||
      userData.instagram !== instagram ||
      userData.facebook !== facebook;

    if (socialMediaUpdated && !newPassword && !confirmPassword) {
      try {
        const response = await axios.put(
          `http://localhost:5100/api/update-user/${userEmail}`,
          {
            email: userEmail,
            linkedin,
            instagram,
            facebook,
          }
        );
        if (response.status === 200) {
          alert("Social media links updated successfully");
          navigate("/home");
        } else {
          setError("Failed to update social media links");
        }
      } catch (error) {
        console.error("Error updating social media links:", error);
        setError("Failed to update social media links");
      }
    } else if (newPassword === confirmPassword) {
      try {
        const formattedLinkedin = linkedin.trim();
        const formattedInstagram = instagram.trim();
        const formattedFacebook = facebook.trim();
        if (
          formattedLinkedin &&
          !formattedLinkedin.startsWith("https://www.linkedin.com/in")
        ) {
          setError("Jepni një URL të vlefshme të LinkedIn.");
          return;
        }
        if (
          formattedInstagram &&
          (!formattedInstagram.startsWith("https://www.instagram.com/") ||
            !isValidUrl(formattedInstagram))
        ) {
          setError("Jepni një URL të vlefshme të Instagram.");
          return;
        }
        if (
          formattedFacebook &&
          (!formattedFacebook.startsWith("https://www.facebook.com/") ||
            !isValidUrl(formattedFacebook))
        ) {
          setError("Jepni një URL të vlefshme të Facebook.");
          return;
        }
        const response = await axios.put(
          `http://localhost:5100/api/update-user/${userEmail}`,
          {
            email: userEmail,
            newPassword,
            linkedin: formattedLinkedin || "",
            instagram: formattedInstagram || "",
            facebook: formattedFacebook || "",
          }
        );
        if (response.status === 200) {
          alert("Profile updated successfully");
          navigate("/home");
        } else {
          setError("Failed to update profile");
        }
      } catch (error) {
        console.error("Error updating profile:", error);
        setError("Failed to update profile");
      }
    } else {
      setError("New passwords do not match");
    }
  };

  const isValidUrl = (url) => {
    const pattern = /^(http|https):\/\/[a-zA-Z0-9]+(\.[a-zA-Z]{2,})?(\/.*)?$/;
    return pattern.test(url);
  };

  const handle2FA = async (e) => {
    navigate(`/2fa-activate`);
  };

  return (
    <>
      <div className="update-container">
        <div className="update-card">
          <h2 className="update-heading">Përditëso</h2>
          {error && <p className="text-danger">{error}</p>}
          <form onSubmit={handleSubmit} className="update-form">
            <div className="form-group">
              <label htmlFor="oldPassword">Fjalëkalimi i vjetër:</label>
              <input
                type="password"
                id="oldPassword"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="newPassword">Fjalëkalimi i ri:</label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">
                Konfirmo fjalëkalimin e ri:
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="linkedin">LinkedIn:</label>
              <input
                type="text"
                id="linkedin"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="instagram">Instagram:</label>
              <input
                type="text"
                id="instagram"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="facebook">Facebook:</label>
              <input
                type="text"
                id="facebook"
                value={facebook}
                onChange={(e) => setFacebook(e.target.value)}
                className="form-control"
              />
            </div>
            <button type="submit" className="update-p-button">
              Përditësoje profilin
            </button>
            {!codeConfirmed && (
              <button type="button" className="fa-button" onClick={handle2FA}>
                Aktivizo 2FA
              </button>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateProfile;
