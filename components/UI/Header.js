import Image from "next/image";
import React from "react";

const Header = () => {
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
    </div>
  );
};

export default Header;
