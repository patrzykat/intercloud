import cfRating from "./cfRating";
import storageRating from "./storageRating";
import vmRating from "./vmRating";
import { ResultType } from "../interfaces";

export default function addRatings(collection: string, results: ResultType[]) {
  const extractedPrices = results.map((res: ResultType) =>
    parseFloat(res.price)
  );
  const cheapestPrice = Math.min(...extractedPrices);
  const ratingFunction =
    collection === "storage"
      ? storageRating
      : collection === "cloud-functions"
      ? cfRating
      : vmRating;
  return results.map((res: ResultType) => ({
    ...res,
    rating: ratingFunction(res, cheapestPrice),
  }));
}
