import { Tab } from "@headlessui/react";

function classNames(class1: string, class2: string, class3: string) {
  const classes = [class1, class2, class3];
  return classes.filter(Boolean).join(" ");
}

export default function MakeTab({ nm }: { nm: string }) {
  return (
    <Tab
      className={({ selected }) =>
        classNames(
          "w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg",
          "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60",
          selected
            ? "bg-white shadow"
            : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
        )
      }
    >
      {nm}
    </Tab>
  );
}
