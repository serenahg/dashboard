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
      <div className="flex flex-col px-4 ">
        <h3 className="text-3xl font-bold text-primary-button">
          {extractingRoute(pathname)}
        </h3>
        <div className="flex justify-between w-full items-center">
          <h4 className="text-primary-button text-3xl pb-1">{userInfo.dpt}</h4>
          <MainButton
            fun={() => console.log("clicking")}
            title="Refresh"
            style={{ padding: "3px 11px", fontSize: "13px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
