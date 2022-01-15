import { Tab } from "@headlessui/react";
import { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import VMResultsTable from "./vmResultsTable";
import RadioGroupOption from "./radioGroupOption";
import vmRating from "../ratings/vmRating";

function classNames(classes1: string, classes2: string) {
  const classes = [classes1, classes2];
  return classes.filter(Boolean).join(" ");
}

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

const placeholderResults = [
  {
    provider: "AWS",
    serviceName: "AWS EC2",
    configName: "VM config for AWS",
    price: "10.25",
    rating: vmRating(),
  },
  {
    provider: "GCP",
    serviceName: "Google Compute Engine",
    configName: "VM config for GCP",
    price: "10.26",
    rating: vmRating(),
  },
  {
    provider: "Azure",
    serviceName: "Azure B1",
    configName: "VM config for Azure",
    price: "10.27",
    rating: vmRating(),
  },
];

export default function VMPanel() {
  const [showResults, setShowResults] = useState<boolean>(false);
  const [selected, setSelected] = useState(plans[0]);

  return (
    <Tab.Panel
      className={classNames(
        "bg-white rounded-xl p-3",
        "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60"
      )}
    >
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
        onClick={() => setShowResults(!showResults)}
        className="bg-blue-900 text-sm leading-5 mt-8 font-medium text-white p-2 m-2 mb-5 rounded-lg block mx-auto"
        type="button"
      >
        Calculate Prices
      </button>
      {showResults && <VMResultsTable results={placeholderResults} />}
    </Tab.Panel>
  );
}
