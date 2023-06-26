"use client";
import Image from "next/image";
import React from "react";
import { usePathname } from "next/navigation";
import MainButton from "./MainButton";
import { userInfo } from "@/utils/dashboardMock";

const Header = () => {
  const pathname = usePathname();
  const extractingRoute = (path) => {
    const parts = path.split("/");
    const lastPart = parts[parts.length - 1];
    const capitalized = lastPart.charAt(0).toUpperCase() + lastPart.slice(1);
    return capitalized;
  };

  return (
    <div className="flex justify-between items-center">
      <Image
        className="p-6"
        priority
        src="/logo.png"
        width={150}
        height={150}
        alt="HID Company Logo"
      />
      {pathname !== "/" && (
        <div className="flex flex-col px-4 ">
          <div className="flex items-baseline justify-between">
            <h4 className="text-primary-button text-3xl pb-1 pr-2 font-bold">
              {userInfo.dpt}
            </h4>
            <h3 className="text-3xl font-bold text-primary-button text-right">
              {extractingRoute(pathname)}
            </h3>
          </div>
          <div className="flex w-full items-center justify-end">
            <MainButton
              fun={() => console.log("clicking")}
              title="Refresh"
              style={{ padding: "3px 11px", fontSize: "13px" }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
