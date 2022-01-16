import { useState } from "react";
import { Tab } from "@headlessui/react";
import ResultsTable from "./resultsTable";
import addRatings from "../helpers/addRatings";
import { CompleteResultType } from "../interfaces";
import { db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";

export default function CFPanel() {
  const [invos, setInvos] = useState<number>(0);
  const [results, setResults] = useState<false | CompleteResultType[]>(false);

  const computeResults = async () => {
    const data = await getDocs(collection(db, "cloud-functions"));
    const newResults = data.docs.map((doc) => {
      const { provider, serviceName, freeTier, costPerMillion } = doc.data();
      const amt = invos > freeTier ? invos - freeTier : 0;
      const servicePrice = costPerMillion * amt;
      return {
        provider: provider,
        serviceName: serviceName,
        price: servicePrice.toFixed(2),
      };
    });
    setResults(addRatings("cloud-functions", newResults));
  };

  return (
    <Tab.Panel className="bg-slate-50 rounded-xl p-3 focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60">
      <input
        placeholder="Invocations (in millions)"
        onChange={(e) => setInvos(parseFloat(e.target.value))}
        className="w-auto mx-auto block mt-8 rounded-md"
        type="number"
      />
      <button
        onClick={() => computeResults()}
        className="bg-blue-900 text-sm leading-5 mt-6 font-medium text-white p-2 m-2 mb-5 rounded-lg block mx-auto"
        type="button"
      >
        Calculate Prices
      </button>
      {results && <ResultsTable results={results} />}
    </Tab.Panel>
  );
}
