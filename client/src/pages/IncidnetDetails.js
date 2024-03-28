import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "../styles/incident.css";
import { useNavigate } from "react-router-dom";

const IncidentDetails = () => {
  const { id } = useParams();
  const [incidentData, setIncidentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchIncidentDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5100/api/incident/${id}`
        );
        const incidentDetails = response.data.incident;
        setIncidentData(incidentDetails);
      } catch (error) {
        console.error("Error fetching incident details:", error);
        setError("Dicka shkoi keq. Ju lutemi provoni përsëri më vonë.");
      } finally {
        setTimeout(() => setLoading(false), 500);
      }
    };

    fetchIncidentDetails();
  }, [id]);

  const handleBackButton = () => {
    navigate("/incidents");
  };

  return (
    <>
      {loading && (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      )}
      <div
        className="incident-details-container"
        style={{ maxWidth: "1600px" }}
      >
        <div className="title-details">
          <button className="button-back" onClick={handleBackButton}>
            &#8592;
          </button>
          <h2>Detajet e incidentit</h2>
        </div>
        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}
        {incidentData && (
          <div className="incident-details">
            <p>Përshkrimi: {incidentData.message}</p>
            <div style={{ height: "400px", width: "100%" }}>
              <MapContainer
                center={[incidentData.latitude, incidentData.longitude]}
                zoom={15}
                style={{ height: "100%", width: "100%", zIndex: "1" }}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker
                  position={[incidentData.latitude, incidentData.longitude]}
                >
                  <Popup>{`Latitude: ${incidentData.latitude}, Longitude: ${incidentData.longitude}`}</Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default IncidentDetails;
