import React, { useState, useEffect } from "react";
import axios from "axios";
import GridExample from "../components/NewsCards";
import "../styles/home.css";

const Home = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleNewsCount, setVisibleNewsCount] = useState(6);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://newsdata.io/api/1/news?country=al&apikey=pub_39662a788aad9a9a1ea2a57b03e81b018fb36`
        );

        if (response.data.status === "success") {
          //filter news in albanian language if any
          const albanianNews = response.data.results.filter(
            (article) => article.language === "albanian"
          );
          // setNews(response.data.results);
          setNews(albanianNews);
        } else {
          throw new Error("Failed to fetch news");
        }
      } catch (error) {
        console.error("Error fetching news:", error);
        setError("Sorry, we have a problem fetching this information.");
      } finally {
        setTimeout(() => setLoading(false), 500);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const preloadImages = () => {
      news.forEach((article) => {
        const img = new Image();
        img.src = article.image_url;
      });
    };

    preloadImages();
  }, [news]);

  const loadMore = () => {
    setVisibleNewsCount((prevCount) => prevCount + 3);
  };

  const renderNewsCards = () => {
    if (!Array.isArray(news) || news.length === 0) {
      return (
        <p className="nuk-ka">
          Dicka shkoi keq. Ju lutemi provoni përsëri më vonë.
        </p>
      );
    }

    const newsToShow = news.slice(0, visibleNewsCount);

    const rows = [];
    for (let i = 0; i < newsToShow.length; i += 3) {
      const row = newsToShow
        .slice(i, i + 3)
        .map((article, index) => <GridExample key={index} article={article} />);
      rows.push(
        <div className="news-row" key={i}>
          {row}
        </div>
      );
    }

    return rows;
  };

  return (
    <>
      {loading && (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      )}
      <div style={{ maxWidth: "2500px", margin: "0 auto" }}>
        <div>
          {error && <p>{error}</p>}
          <div className="news-container">{renderNewsCards()}</div>
          {news.length > visibleNewsCount && (
            <button className="load-more-btn" onClick={loadMore}>
              Shfaq më shumë
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
