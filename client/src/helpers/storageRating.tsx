import { ResultType } from "../interfaces";
import getPriceRating from "./getPriceRating";
import getEaseOfUseRatings from "./getEOURating";

export default function storageRating(res: ResultType, cheapestPrice: number) {
  const priceRating = getPriceRating(parseFloat(res.price), cheapestPrice);
  const easeOfUseRatings = getEaseOfUseRatings(res.provider);
  return parseInt((priceRating * 0.9 + easeOfUseRatings * 0.1).toFixed(0));
}
