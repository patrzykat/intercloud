import { ResultType } from "../interfaces";
import getPriceRating from "./getPriceRating";

export default function vmRating(res: ResultType, cheapestPrice: number) {
  const priceRating = getPriceRating(parseFloat(res.price), cheapestPrice);
  return parseInt(priceRating.toFixed(0));
}
