import { RadioGroup } from "@headlessui/react";

export default function RadioGroupOption({ plan }: any) {
  return (
    <RadioGroup.Option
      key={plan.name}
      value={plan}
      className={({ active, checked }) =>
        `${
          active
            ? "ring-2 ring-offset-2 ring-offset-sky-300 ring-white ring-opacity-60"
            : ""
        }
        ${checked ? "bg-sky-900 bg-opacity-75 text-white" : "bg-white"}
          relative rounded-lg shadow-md px-5 py-4 cursor-pointer flex focus:outline-none`
      }
    >
      {({ active, checked }) => (
        <>
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center">
              <div className="text-sm">
                <RadioGroup.Label
                  as="p"
                  className={`font-medium  ${
                    checked ? "text-white" : "text-gray-900"
                  }`}
                >
                  {plan.name}
                </RadioGroup.Label>
                <RadioGroup.Description
                  as="span"
                  className={`inline ${
                    checked ? "text-sky-100" : "text-gray-500"
                  }`}
                >
                  <span>
                    {plan.ram}/{plan.cpus}
                  </span>{" "}
                  <span aria-hidden="true">&middot;</span>{" "}
                  <span>{plan.disk}</span>
                </RadioGroup.Description>
              </div>
            </div>
            {checked && (
              <div className="flex-shrink-0 text-white">
                <CheckIcon className="w-6 h-6" />
              </div>
            )}
          </div>
        </>
      )}
    </RadioGroup.Option>
  );
}

function CheckIcon(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
      <path
        d="M7 13l3 3 7-7"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}