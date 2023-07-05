"use client";
import React, { useState } from "react";

export const IconWithDescription = ({ icon: Icon, description, onclick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative flex items-center w-full h-auto "
      onClick={() => (onclick ? onclick() : null)}
    >
      <div
        className="text-primary-menu cursor-pointer mr-2 rounded-sm bg-white m-1 shadow-lg hover:bg-white hover:shadow-none"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Icon size={20} />
      </div>
      {isHovered && (
        <span className="bg-white font-thin px-1 text-primary-menu text-xs rounded absolute bottom-6 left-2 opacity-85 flex whitespace-nowrap z-60">
          {description}
        </span>
      )}
    </div>
  );
};
