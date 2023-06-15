"use client";
import React, { useState } from "react";

const MainCheckBox = ({ label, isChecked, checked, ...props }) => {
  return (
    <div className="flex " {...props}>
      <input
        name={label}
        onChange={() => isChecked((prev) => !prev)}
        checked={checked}
        type="checkbox"
        className=" border bg-white rounded border-blue-800 w-6 h-6 focus:outline-solid focus:outline-blue-500 focus:border-blue-500"
      />
      <label className="text-blue-800 ml-2">{label}</label>
    </div>
  );
};

export default MainCheckBox;
