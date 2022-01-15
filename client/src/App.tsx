import { Tab } from "@headlessui/react";
import VMPanel from "./components/vmPanel";
import CFPanel from "./components/cfPanel";
import StoragePanel from "./components/storagePanel";
import MakeTab from "./components/tab";
import "./App.css";

function App() {
  return (
    <div className="App min-w-full min-h-screen bg-unsplash-cloud bg-cover">
      <div className="w-full max-w-4xl px-2 py-16 sm:px-0 mx-auto">
        <Tab.Group>
          <Tab.List className="flex p-1 my-5 space-x-1 bg-blue-900 rounded-xl">
            <MakeTab nm="Virtual Machine" />
            <MakeTab nm="Storage" />
            <MakeTab nm="Cloud Functions" />
          </Tab.List>
          <Tab.Panels className="mt-2">
            <VMPanel />
            <StoragePanel />
            <CFPanel />
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
}

export default App;
