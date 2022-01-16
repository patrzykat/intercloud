import { Tab } from "@headlessui/react";
import { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import VMResultsTable from "./vmResultsTable";
import RadioGroupOption from "./radioGroupOption";
import addRatings from "../helpers/addRatings";
import { ResultType, CompleteResultType } from "../interfaces";
import { db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";

const plans = [
  {
    name: "Low Budget",
    ram: "1GB",
    cpus: "1 CPU",
    disk: "25GB SSD disk",
  },
  {
    name: "Medium Budget",
    ram: "4GB",
    cpus: "2 CPUs",
    disk: "60GB SSD disk",
  },
  {
    name: "Large Budget",
    ram: "8GB",
    cpus: "4 CPUs",
    disk: "160GB SSD disk",
  },
  {
    name: "Mega Budget",
    ram: "16GB",
    cpus: "8 CPUs",
    disk: "320GB SSD disk",
  },
];

export default function VMPanel() {
  const [results, setResults] = useState<false | CompleteResultType[]>(false);
  const [selected, setSelected] = useState(plans[0]);
  const [spotOn, setSpotOn] = useState(false);

  async function computeResults() {
    const currentConfigName = selected.name;
    const data = await getDocs(collection(db, "virtual-machines"));
    const newResults: ResultType[] = [];

    data.docs.forEach((doc) => {
      const data = doc.data();
      const spotAppend = spotOn === true ? "-spot" : "";

      const entry: ResultType = {
        serviceName: data["service-name"],
        provider: data["provider"],
        price: "0.00",
      };

      if (currentConfigName === "Low Budget") {
        entry["price"] = (730 * data["sm" + spotAppend]).toFixed(2);
        entry["configName"] = data["sm-config-name"];
      } else if (currentConfigName === "Medium Budget") {
        entry["price"] = (730 * data["md" + spotAppend]).toFixed(2);
        entry["configName"] = data["md-config-name"];
      } else if (currentConfigName === "Large Budget") {
        entry["price"] = (730 * data["lg" + spotAppend]).toFixed(2);
        entry["configName"] = data["lg-config-name"];
      } else if (currentConfigName === "Mega Budget") {
        entry["price"] = (730 * data["xl" + spotAppend]).toFixed(2);
        entry["configName"] = data["xl-config-name"];
      }
      newResults.push(entry);
    });
    setResults(addRatings("virtual-machines", newResults));
  }

  return (
    <Tab.Panel className="bg-white rounded-xl p-3 focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60">
      <div className="w-full px-4 pt-12">
        <div className="w-full max-w-md mx-auto">
          <RadioGroup value={selected} onChange={setSelected}>
            <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
            <div className="space-y-2">
              {plans.map((plan) => (
                <RadioGroupOption plan={plan} />
              ))}
            </div>
          </RadioGroup>
        </div>
      </div>
      <button
        onClick={() => computeResults()}
        className="bg-blue-900 text-sm leading-5 mt-8 font-medium text-white p-2 m-2 mb-5 rounded-lg block mx-auto"
        type="button"
      >
        Calculate Prices
      </button>
      {results && <VMResultsTable results={results} />}
    </Tab.Panel>
  );
}
