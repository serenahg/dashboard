"use client";

import Image from "next/image";
import React from "react";
import { usePathname } from "next/navigation";

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
      <div>
        <h3 className="text-3xl font-bold px-4 text-primary-menu">
          {extractingRoute(pathname)}
        </h3>
      </div>
    </div>
  );
};

export default Header;
