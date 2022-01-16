import { useState } from "react";
import { Tab } from "@headlessui/react";
import ResultsTable from "./resultsTable";
import addRatings from "../helpers/addRatings";
import calculateStorageCost from "../helpers/storageCost";
import { db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import { CompleteResultType } from "../interfaces";

export default function StoragePanel() {
  const [reads, setReads] = useState<number>(0);
  const [writes, setWrites] = useState<number>(0);
  const [capacity, setCapacity] = useState<number>(0);
  const [results, setResults] = useState<false | CompleteResultType[]>(false);

  const computeResults = async () => {
    const data = await getDocs(collection(db, "storage"));
    const newResults = data.docs.map((doc) => {
      const {
        provider,
        serviceName,
        read_cost_per_1000: readCost,
        write_cost_per_1000: writeCost,
        ranges,
        prices,
      } = doc.data();
      const cost = calculateStorageCost(capacity, ranges, prices);
      return {
        provider: provider,
        serviceName: serviceName,
        price: parseFloat((cost + readCost * reads + writeCost * writes).toFixed(2)),
      };
    });
    setResults(addRatings("storage", newResults));
  };

  return (
    <Tab.Panel className="bg-white rounded-xl p-3 focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60">
      <input
        placeholder="Capacity (in GB)"
        onChange={(e) => setCapacity(parseFloat(e.target.value))}
        className="max-w-[200px] mx-auto block mt-8 rounded-md"
        type="number"
      />
      <input
        placeholder="Reads (in thousands)"
        onChange={(e) => setReads(parseFloat(e.target.value))}
        className="max-w-[200px] mx-auto block mt-3 rounded-md"
        type="number"
      />
      <input
        placeholder="Writes (in thousands)"
        onChange={(e) => setWrites(parseFloat(e.target.value))}
        className="max-w-[200px] mx-auto block mt-3 rounded-md"
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
