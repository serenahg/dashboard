"use client";
import React, { useState } from "react";
import MainInputAutoCom from "./MainInputAutoCom";
import MainButton from "./MainButton";

const list = [
  { id: 1, name: "Wade Cooper" },
  { id: 2, name: "Arlene Mccoy" },
  { id: 3, name: "Devon Webb" },
  { id: 4, name: "Tom Cook" },
  { id: 5, name: "Tanya Fox" },
  { id: 6, name: "Hellen Schmidt" },
];

const MainInputButton = ({ selected, setSelected, list }) => {
  return (
    <div className="flex h-12 w-[400px] shadow-md rounded-md mb-2 items-center justify-between">
      <div className="w-1/2 flex grow ">
        <MainInputAutoCom
          list={list}
          selected={selected}
          setSelected={setSelected}
        />
      </div>

      <div className="p-2 flex justify-end">
        <MainButton
          title="Request Access"
          fun={() => console.log("clicking")}
        />
      </div>
    </div>
  );
};

export default MainInputButton;
