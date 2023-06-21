"use client";

import Image from "next/image";
import React from "react";
import { usePathname } from "next/navigation";
import MainButton from "./MainButton";

const Header = () => {
  const pathname = usePathname();
  console.log("router", pathname);

  const extractingRoute = (path) => {
    const parts = path.split("/");
    console.log("parts", parts);
    const lastPart = parts[parts.length - 1];
    console.log("last parts", lastPart);
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
      <div className="flex flex-col justify-end items-end px-4">
        <h3 className="text-3xl font-bold text-primary-button pb-1">
          {extractingRoute(pathname)}
        </h3>
        <MainButton
          fun={() => console.log("clicking")}
          title="Refresh "
          style={{ padding: "2px 10px", fontSize: "13px" }}
        />
      </div>
    </div>
  );
};

export default Header;
