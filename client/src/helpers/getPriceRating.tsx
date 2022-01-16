export default function getPriceRating(
  itemPrice: number,
  cheapestPrice: number
): number {
  const difference = itemPrice - cheapestPrice;
  const priceDeduction = (difference / cheapestPrice) * 100;
  const res = 100 - priceDeduction;
  if (itemPrice === 0) {
    return 100;
  } else if (res < 50) {
    return 50;
  } else {
    return res;
  }
}
