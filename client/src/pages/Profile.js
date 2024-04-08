import "../styles/ProfileCard.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import cardImage from "../images/bg-pattern-card.svg";

function ProfileCard() {
  const [userData, setUserData] = useState(null);
  const userEmail = localStorage.getItem("userEmail");
  const navigate = useNavigate();
  const [linkedin, setLinkedin] = useState("");
  const [instagram, setInstagram] = useState("");
  const [facebook, setFacebook] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [codeConfirmed, setCodeConfirmed] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (userEmail) {
          const response = await fetch(
            `http://localhost:5100/api/user/${userEmail}`
          );
          if (response.ok) {
            const data = await response.json();
            setUserData(data.user);
            setLinkedin(data.user.linkedin || "");
            setInstagram(data.user.instagram || "");
            setFacebook(data.user.facebook || "");
            setCodeConfirmed(data.user.codeConfirmed || false);
            console.log("User code", codeConfirmed);
            localStorage.setItem("codeConfirmed", data.user.codeConfirmed);
          } else if (response.status === 504) {
            setError("Dicka shkoi keq. Kërkesa ka tejkaluar kohën e lejuar. Provoni perseri me vone");
          } else {
            console.error("Error fetching user data:", response.statusText);
            setError("Dicka shkoi keq. Ju lutemi provoni përsëri më vonë.");
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Dicka shkoi keq. Ju lutemi provoni përsëri më vonë.");
      } finally {
        setTimeout(() => setLoading(false), 500);
      }
    };

    fetchUserData();
  }, [userEmail]);

  const handleIsEditing = () => {
    navigate("/update-profile");
  };

  const handleGetIncidentsByUser = async (e) => {
    navigate(`/incidents/${userEmail}`);
  };

  const getInitials = (name) => {
    if (!name) return "";
    const nameArray = name.split(" ");
    return nameArray[0][0] + nameArray[nameArray.length - 1][0];
  };

  return (
    <>
      {loading && (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      )}
      <div className="div-profile">
        <h1 className="profile-name">Profili yt {userData && userData.name}</h1>
        <div className="profileCard">
          {error && (
            <div className="error-message">
              <p>{error}</p>
            </div>
          )}
          {userData && (
            <>
              <div className="avatar">
                {userData.profileImage ? (
                  <img src={userData.profileImage} alt="Profile Avatar" />
                ) : (
                  <div className="initials">
                    {getInitials(userData.name + " " + userData.surname)}
                  </div>
                )}
              </div>
              <img className="banner" src={cardImage} alt="" />
              <div className="basic-info">
                <h3 className="name">
                  {" "}
                  {userData.name}{" "}
                  <span className="age">{userData.surname}</span>{" "}
                </h3>
              </div>
              <h2 className="profession">{userData.profession}</h2>
              <div className="divider"></div>
              <h2 className="social-icons">Rrjetet Sociale</h2>

              <div className="social-wrapper">
                <div className="social-container">
                  <div className="followers">
                    <a
                      href={userData.linkedin}
                      target="_blank"
                      className="bold-text"
                      rel="noopener noreferrer"
                    >
                      LinkedIn
                    </a>
                  </div>
                  <div className="likes">
                    <a
                      href={userData.instagram}
                      target="_blank"
                      className="bold-text"
                      rel="noopener noreferrer"
                    >
                      Instagram
                    </a>
                  </div>
                  <div className="photos">
                    <a
                      href={userData.facebook}
                      target="_blank"
                      className="bold-text"
                      rel="noopener noreferrer"
                    >
                      Facebook
                    </a>
                  </div>
                </div>
                {!userData.linkedin &&
                  !userData.instagram &&
                  !userData.facebook && (
                    <div className="social-warning">
                      <p>Ju lutemi përditësoni rrjetet tuaja sociale.</p>
                    </div>
                  )}
              </div>

              <button onClick={handleIsEditing} className="update">
                Përditëso
              </button>
              <button
                onClick={handleGetIncidentsByUser}
                className="look-reports"
              >
                Shih reportet e tua
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default ProfileCard;
