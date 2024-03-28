import React from "react";
import notfoundimg from "../images/notFound.svg";
import "../styles/notFound.css";
import { useState } from "react";
import { useEffect } from "react";

const NotFound = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
  }, []);
  return (
    <>
      {loading && (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      )}
      <div className="not-found-container">
        <h1 className="not-found-title">Oops!</h1>
        <img src={notfoundimg} alt="404 Not Found" className="notfound-image" />
        <div className="not-found-info">
          <p className="not-found-text">
            Faqja që po kërkoni mund të jetë hequr, kishte emrin e saj
            ndryshuar, ose është përkohësisht i padisponueshëm.
          </p>
        </div>
      </div>
    </>
  );
};

export default NotFound;
