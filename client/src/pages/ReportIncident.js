import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import "../styles/report.css";

const ReportIncident = () => {
  const [incidentData, setIncidentData] = useState({
    description: "",
    address: "",
    location: { lat: 0, lng: 0 },
  });
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) {
      setEmail(storedEmail);
    }
    setTimeout(() => setLoading(false), 500);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setIncidentData({ ...incidentData, [name]: value });
  };

  const handleMapClick = async (e) => {
    const { lat, lng } = e.latlng;

    try {
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?key=26506b44e9ad4e48a828ae9fb7a74e82&language=en&q=${lat}+${lng}`
      );

      if (response.status === 200) {
        const data = response.data;
        const address =
          data.results && data.results.length > 0
            ? data.results[0].formatted
            : "";

        setIncidentData({
          ...incidentData,
          location: { lat, lng },
          address: address,
        });
      } else {
        console.log("Error getting location data:", response.statusText);
      }
    } catch (error) {
      console.log("Error getting location data:", error);
    }
  };

  const handleGetCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const response = await axios.get(
            `https://api.opencagedata.com/geocode/v1/json?key=26506b44e9ad4e48a828ae9fb7a74e82&language=en&q=${latitude}+${longitude}`
          );

          if (response.status === 200) {
            const data = response.data;
            const address =
              data.results && data.results.length > 0
                ? data.results[0].formatted
                : "";

            setIncidentData({
              ...incidentData,
              location: { lat: latitude, lng: longitude },
              address: `Current Location: ${address}`,
            });
          } else {
            console.error("Error getting location data:", response.statusText);
          }
        } catch (error) {
          console.error("Error getting location data:", error);
        }
      },
      (error) => {
        console.error("Error getting current location:", error);
      }
    );
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5100/api/create-incident/${email}`,
        {
          message: incidentData.description,
          latitude: incidentData.location.lat,
          longitude: incidentData.location.lng,
        }
      );

      const incidentId = response.data.incident._id;

      localStorage.setItem("reportedIncidentId", incidentId);

      alert("Incident reported successfully!");

      navigate("/");
    } catch (error) {
      console.error("Error reporting incident:", error);
      alert("Dështoi të raportohej incidentin. Ju lutemi provoni përsëri.");
    }
  };

  const LocationMarker = ({ onClick }) => {
    const map = useMapEvents({
      click: (e) => {
        handleMapClick(e);
        onClick && onClick(e.latlng);
      },
    });

    useEffect(() => {
      if (incidentData.location.lat !== 0 && incidentData.location.lng !== 0) {
        map.setView([incidentData.location.lat, incidentData.location.lng], 15);
      }
    }, [incidentData.location, map]);

    return (
      <>
        {incidentData.location.lat !== 0 && incidentData.location.lng !== 0 && (
          <Marker
            position={[incidentData.location.lat, incidentData.location.lng]}
          >
            <Popup>Vendodhja e selektuar</Popup>
          </Marker>
        )}
      </>
    );
  };

  return (
    <>
      {loading && (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      )}
      <div
        className="report-container"
        style={{ maxWidth: "1600px", margin: "0 auto" }}
      >
        <div className="report-form">
          <h2 className="report-header">Raporto një incident</h2>
          <form>
            <label>Pershkrimi:</label>
            <textarea
              name="description"
              value={incidentData.description}
              onChange={handleInputChange}
              rows="4"
            />

            <label>Adresa:</label>
            <input
              type="text"
              name="address"
              value={incidentData.address}
              onChange={handleInputChange}
            />

            <button
              type="button"
              className="location-button"
              onClick={handleGetCurrentLocation}
            >
              Përdor vendodhjen aktuale
            </button>

            <button
              type="button"
              className="report-button"
              onClick={handleSubmit}
            >
              Raporto
            </button>
          </form>
        </div>

        <div className="map-container">
          <MapContainer
            center={[0, 0]}
            zoom={2}
            style={{ height: "80%", width: "100%" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <LocationMarker onClick={(latlng) => handleMapClick(latlng)} />
          </MapContainer>
        </div>
      </div>
    </>
  );
};

export default ReportIncident;
