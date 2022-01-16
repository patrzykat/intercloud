export default function calculateStorageCost(
  capacity: number,
  ranges: number[],
  prices: number[]
) {
  let c = capacity;
  let cost = 0;
  while (c > 0) {
    const range = ranges.shift();
    const priceForRange = prices.shift();
    const diff = range !== undefined && capacity > range ? range : capacity;
    if (priceForRange !== undefined) {
      cost += diff * priceForRange;
      c -= diff;
    }
  }
  return cost;
}
