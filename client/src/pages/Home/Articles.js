import React from "react";
import ArticleCard from "../../cards/ArticleCard";

export default function Articles() {
  const articles = [
    {
      image: "burger.jpg",
      title: "New sea food recipe for losing weight",
      article:
        "Mass communication has led to modern marketing strategies to continue focusing on brand awareness.",
    },
    {
      image: "lemon.jpg",
      title: "New sea food recipe for losing weight",
      article:
        "Mass communication has led to modern marketing strategies to continue focusing on brand awareness.",
    },
    {
      image: "sea-food.jpg",
      title: "New sea food recipe for losing weight",
      article:
        "Mass communication has led to modern marketing strategies to continue focusing on brand awareness.",
    },
  ];
  return (
    <div className="bg-dark order-procedure py-5">
      <div className="container text-center text-light">
        <h1 className="fw-bold">Articles and Useful Tips</h1>
        <p className="w-50 mx-auto">
          Read on for useful Information about tasty healthy food. Interesting
          events and recepes, New Meal Plans and specialized diet for weith loss
          or grain.
        </p>
        <div className="row py-5">
          {articles?.map((article, index) => (
            <ArticleCard
              key={index}
              image={article.image}
              title={article.title}
              article={article.article}
            />
          ))}
        </div>
      </div>
      <h5 className="mt-5 all-res-btn text-center">See All...</h5>
    </div>
  );
}
