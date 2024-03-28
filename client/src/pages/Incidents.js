import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/incident.css";

const Incidents = () => {
  const navigate = useNavigate();
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const response = await axios.get("http://localhost:5100/api/incidents");
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

    fetchIncidents();
  }, []);

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

  const handleIncidentClick = (incident) => {
    navigate(`/incident-details/${incident._id}`);
  };

  return (
    <>
      {loading && (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      )}
      <div
        className="incidents-container"
        style={{ maxWidth: "1800px", margin: "0 auto" }}
      >
        <h1 className="incidents">Incidentet e raportuara</h1>
        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}
        <div className="incident-grid">
          {incidents.map((incident) => (
            <div
              key={incident._id}
              className="incident-box"
              onClick={() => handleIncidentClick(incident)}
            >
              <h2>{incident.message}</h2>
              <p>Emri rrugës: {incident.streetName}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Incidents;
