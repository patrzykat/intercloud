import { useState } from "react";
import { Tab } from "@headlessui/react";
import ResultsTable from "./resultsTable";
import storageRating from "../ratings/storageRating";

function classNames(class1: string, class2: string) {
  const classes = [class1, class2];
  return classes.filter(Boolean).join(" ");
}

export default function StoragePanel() {
  const [reads, setReads] = useState<any>(0);
  const [writes, setWrites] = useState<any>(0);
  const [capacity, setCapacity] = useState<any>(0);
  const [showResults, setShowResults] = useState<boolean>(false);

  const placeholderResults = [
    {
      provider: "AWS",
      serviceName: "AWS S3",
      price: "10.25",
      rating: storageRating(),
    },
    {
      provider: "GCP",
      serviceName: "Google Cloud Storage",
      price: "10.26",
      rating: storageRating(),
    },
    {
      provider: "Azure",
      serviceName: "Azure Blob",
      price: "10.27",
      rating: storageRating(),
    },
  ];

  return (
    <Tab.Panel
      className={classNames(
        "bg-white rounded-xl p-3",
        "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60"
      )}
    >
      <input
        placeholder="Capacity (in GB)"
        onChange={(e) => setCapacity(e.target.value)}
        className="max-w-[200px] mx-auto block mt-8 rounded-md"
        type="number"
      />
      <input
        placeholder="Reads (in thousands)"
        onChange={(e) => setReads(e.target.value)}
        className="max-w-[200px] mx-auto block mt-3 rounded-md"
        type="number"
      />
      <input
        placeholder="Writes (in thousands)"
        onChange={(e) => setWrites(e.target.value)}
        className="max-w-[200px] mx-auto block mt-3 rounded-md"
        type="number"
      />
      <button
        onClick={() => setShowResults(!showResults)}
        className="bg-blue-900 text-sm leading-5 mt-6 font-medium text-white p-2 m-2 mb-5 rounded-lg block mx-auto"
        type="button"
      >
        Calculate Prices
      </button>
      {showResults && <ResultsTable results={placeholderResults} />}
    </Tab.Panel>
  );
}