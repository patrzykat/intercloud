// Source: Browsing Reddit
// Measurement: Completely subjective
// Takeaways: For starting projects, GCP is favored because of firebase compatability and simple interface
export default function getEaseOfUseRatings(provider: string) {
  switch (provider) {
    case "AWS":
      return 90;
    case "GCP":
      return 95;
    case "Azure":
      return 90;
    default:
      return 0;
  }
}
