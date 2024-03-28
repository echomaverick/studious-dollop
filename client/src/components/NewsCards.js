import React from "react";
import Card from "react-bootstrap/Card";
import placeholder from "../images/placeholder-news.jpg";
import "../styles/cards.css";

function GridExample({ article }) {
  return (
    <Card className="card">
      <Card.Img
        variant="top"
        src={article.image_url || placeholder}
        alt={article.title}
        className="card-img-top"
      />
      <Card.Body>
        <Card.Title className="card-title">{article.title}</Card.Title>
        <Card.Text className="card-text">{article.description}</Card.Text>
        <Card.Link
          href={article.link}
          target="_blank"
          rel="noopener noreferrer"
          className="card-link"
        >
          Lexo me shume
        </Card.Link>
      </Card.Body>
    </Card>
  );
}

export default GridExample;
