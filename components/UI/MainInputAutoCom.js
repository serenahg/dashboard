import { Fragment, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { TiArrowUnsorted } from "react-icons/ti";
import { TbCheck } from "react-icons/tb";

const MainInputAutoCom = ({ list, selected, setSelected }) => {
  const [query, setQuery] = useState("");

  const filteredList =
    query === ""
      ? list
      : list.filter((item) =>
          item.projects
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <div className="z-60 w-full ">
      <Combobox value={selected} onChange={setSelected}>
        <div className="relative px-2 py-1">
          <div className=" relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left sm:text-sm">
            <Combobox.Input
              className="!outline-none w-full border-none py-2 pl-3 pr-10 text-sm text-primary-menu "
              displayValue={(item) => {
                return item.projects;
              }}
              placeholder="Type the project"
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <TiArrowUnsorted
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg  sm:text-sm">
              {filteredList.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredList.map((item) => (
                  <Combobox.Option
                    key={item.projects}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active
                          ? "bg-secondary-button text-white"
                          : "text-gray-900"
                      }`
                    }
                    value={item}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {item.projects}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? "text-white" : "text-teal-600"
                            }`}
                          >
                            <TbCheck className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
};

export default MainInputAutoCom;
