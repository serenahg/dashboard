import { Popover, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { BiAlarm, BiCheck, BiHide, BiLock } from "react-icons/bi";
import { IconWithDescription } from "./IconWithDescription";

const UpperMenuAnimated = ({ children }) => {
  return (
    <div className="flex flex-col pb-2">
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button
              className={`
          ${open ? "" : "text-opacity-90 "}
          group inline-flex items-center rounded-md  text-base font-medium text-white hover:text-opacity-100 focus:outline-none `}
            >
              <IconWithDescription icon={BiHide} description="Hide Columns" />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="flex w-full z-10 mt-1 ">
                <div className="overflow-hidden w-full rounded-lg shadow-lg ">
                  <div className="flex  bg-white w-full p-2">{children}</div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
};

export default UpperMenuAnimated;
