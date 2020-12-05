import React from "react";
import Ratings from "../components/rating";

export const showAverage = (product) => {
  if (product && product.reviews) {
    let ratingsArray = product && product.reviews;
    let total = [];
    let length = ratingsArray.length;

    ratingsArray.map((r) => total.push(r.rating));
    let totalReduced = total.reduce((product, n) => product + n, 0);

    let highest = length * 5;

    let result = (totalReduced * 5) / highest;

    return <Ratings value={result} text={`${product.reviewsNumber} ratings`} />;
  }
};
