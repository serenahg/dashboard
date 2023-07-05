import { useState } from "react";
import { Tab } from "@headlessui/react";
import { BiDownload, BiHide } from "react-icons/bi";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const TabOptionsMenu = ({ children }) => {
  let [categories] = useState(children);

  return (
    <div className="w-full">
      <Tab.Group>
        <Tab.List className="flex w-24 rounded-xl bg-blue-900/20 ">
          {Object.keys(categories).map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  "w-full flex justify-center items-center rounded-lg py-1 text-sm font-medium leading-5 text-primary-menu",
                  "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                  selected
                    ? "bg-white shadow"
                    : "text-primary-menu hover:bg-white/[0.12] hover:text-white"
                )
              }
            >
              {category === "showHide" ? (
                <BiHide size={20} className="text-primary-menu  " />
              ) : (
                <BiDownload size={20} className="text-primary-menu " />
              )}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2 w-full bg-red-500">
          {Object.values(categories).map((posts, idx) => (
            <Tab.Panel key={idx} className="w-full bg-white">
              <div className="flex w-full">{posts}</div>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};
