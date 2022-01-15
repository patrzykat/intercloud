import { useState } from "react";
import { Tab } from "@headlessui/react";
import ResultsTable from "./resultsTable";
import cfRating from "../ratings/cfRating";

function classNames(class1: string, class2: string) {
  const classes = [class1, class2];
  return classes.filter(Boolean).join(" ");
}

export default function CFPanel() {
  const [invos, setInvos] = useState<any>(0);
  const [showResults, setShowResults] = useState<boolean>(false);

  const placeholderResults = [
    {
      provider: "AWS",
      serviceName: "AWS Lambda",
      price: "10.25",
      rating: cfRating(),
    },
    {
      provider: "GCP",
      serviceName: "Google Cloud Functions",
      price: "10.26",
      rating: cfRating(),
    },
    {
      provider: "Azure",
      serviceName: "Azure Functions",
      price: "10.27",
      rating: cfRating(),
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
        placeholder="Invocations (in millions)"
        onChange={(e) => setInvos(e.target.value)}
        className="w-auto mx-auto block mt-8 rounded-md"
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
