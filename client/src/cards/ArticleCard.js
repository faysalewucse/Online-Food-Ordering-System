import React from "react";
import "./ArticleCard.css";

export default function ArticleCard({ image, title, article }) {
  const articleShortLenth = 20;
  return (
    <div className="col article-card">
      <img className="img-fluid" src={`images/article/${image}`} alt="burger" />
      <h4 className="mt-5">
        <b>{title}</b>
      </h4>
      <p className="my-3 text-success">
        {/* Take first some word to display */}
        {article.split(" ").slice(0, articleShortLenth).join(" ")}...
      </p>
      <h6>
        Read More
        <span>
          <i className="ms-2 fa-solid fa-arrow-right"></i>
        </span>
      </h6>
    </div>
  );
}
