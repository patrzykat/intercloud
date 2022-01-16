import { ResultType } from "../interfaces";
import getPriceRating from "./getPriceRating";
import getEaseOfUseRatings from "./getEOURating";

export default function cfRating(res: ResultType, cheapestPrice: number) {
  const priceRating = getPriceRating(parseFloat(res.price), cheapestPrice);
  const coldStartRating = getColdStartRatings(res.provider);
  const easeOfUseRatings = getEaseOfUseRatings(res.provider);
  return parseFloat(
    (
      priceRating * 0.8 +
      coldStartRating * 0.1 +
      easeOfUseRatings * 0.1
    ).toFixed(0)
  );
}

// Source: Information for cold start times taken from https://mikhail.io/serverless/coldstarts/big3/
// Measurement: Source measures average cold start times for AWS, GCP, Azure across JS, Python, and Go
// Takeaways: AWS > GCP > Azure
function getColdStartRatings(provider: string) {
  switch (provider) {
    // AWS averages 550ms
    case "AWS":
      return 73;
    // GCP averages 960ms
    case "GCP":
      return 48;
    // Azure averages 2000ms
    case "Azure":
      return 0;
    default:
      return 0;
  }
}
