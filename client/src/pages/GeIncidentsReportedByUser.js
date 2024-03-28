import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/reportsbyuser.css";

const GetIncidentsReportedByUser = () => {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("userEmail");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5100/api/incidents/${userEmail}`
        );
        const incidentsData = response.data.incidents || [];
        const filteredIncidents = incidentsData.filter(
          (incident) => !incident.deleted
        );
        const updatedIncidents = await Promise.all(
          filteredIncidents.map(async (incident) => {
            const streetName = await fetchStreetName(
              incident.latitude,
              incident.longitude
            );
            return { ...incident, streetName };
          })
        );
        setIncidents(updatedIncidents);
      } catch (error) {
        console.error("Error fetching incidents:", error);
        setError("Dicka shkoi keq. Ju lutemi provoni përsëri më vonë.");
      } finally {
        setTimeout(() => setLoading(false), 500);
      }
    };

    if (userEmail) {
      fetchIncidents();
    }
  }, [userEmail]);

  const fetchStreetName = async (latitude, longitude) => {
    try {
      const reverseGeocodeResponse = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?key=26506b44e9ad4e48a828ae9fb7a74e82&q=${latitude}+${longitude}`
      );
      const addressData = reverseGeocodeResponse.data.results[0];
      const street =
        addressData.components.road ||
        addressData.components.pedestrian ||
        "Unknown Street";
      return street;
    } catch (error) {
      console.error("Error fetching street name:", error);
      return "Unknown Street";
    }
  };

  const handleIncidentClick = (incidentId) => {
    navigate(`/incident-details/${incidentId}`);
  };

  const handleSoftDelete = async (incidentId) => {
    try {
      await axios.delete("http://localhost:5100/api/delete-incident", {
        data: { id: incidentId },
      });
      setIncidents(incidents.filter((incident) => incident._id !== incidentId));
    } catch (error) {
      console.error("Error deleting incident:", error);
    }
  };

  const handleBackToProfile = () => {
    navigate("/profile");
  };

  const handleReport = () => {
    navigate("/report");
  };

  return (
    <>
      {loading && (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      )}
      <div
        className="container"
        style={{ maxWidth: "1800px", margin: "0 auto" }}
      >
        <div className="title-container">
          <button className="send-back" onClick={handleBackToProfile}>
            &#8592;
          </button>
          <h1 className="title">Incidentet e raportuara nga ju</h1>
        </div>
        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}
        {incidents.length === 0 ? (
          <p className="no-reports">
            Nuk keni raportuar asnjë incident. Raportoni një tani!
          </p>
        ) : (
          <ul className="incident-grid">
            {incidents.map((incident) => (
              <li key={incident._id} className="incident-item">
                <div
                  className="incident-description"
                  onClick={() => handleIncidentClick(incident._id)}
                >
                  <p className="pershkrimi">Përshkrimi: {incident.message}</p>
                  <p className="rruga">Emri rrugës: {incident.streetName}</p>
                </div>
                <button
                  className="delete"
                  onClick={() => handleSoftDelete(incident._id)}
                >
                  Fshije
                </button>
              </li>
            ))}
          </ul>
        )}
        <button className="raporto" onClick={handleReport}>
          Raporto
        </button>
      </div>
    </>
  );
};

export default GetIncidentsReportedByUser;
