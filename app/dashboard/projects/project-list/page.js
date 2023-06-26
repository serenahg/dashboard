"use client";
import MainInputAutoCom from "@/components/UI/MainInputAutoCom";
import MainInputButton from "@/components/UI/MainInputButton";
import MainTable from "@/components/UI/MainTable";
import MainTableFilter from "@/components/UI/MainTableFilter";
import { userInfo } from "@/utils/dashboardMock";
import { Combobox } from "@headlessui/react";
import React, { useState } from "react";
const data = [
  { id: 1, name: "John", age: 25 },
  { id: 2, name: "Jane", age: 30 },
  { id: 3, name: "Bob", age: 35 },
  // ...
];
const List = () => {
  const [selected, setSelected] = useState("");
  console.log("allProjects", userInfo.dashboard[0].content);
  console.log("selected", selected);
  const excludedKeys = ["last access date"];
  const projectsWithoutData = userInfo.dashboard[0].content.map((project) => {
    const {
      data,
      projects,
      "last access date": access,
      ...projectWithoutData
    } = project;
    return projectWithoutData;
  });
  console.log("rest", projectsWithoutData);
  return (
    <div className="flex flex-col m-2 ">
      <div className=" z-50 pb-2">
        <MainInputButton
          selected={selected}
          setSelected={setSelected}
          list={userInfo.dashboard[0].content}
        />
      </div>
      <div className="p-2 bg-slate-100 rounded-md z-20">
        <MainTableFilter tableItems={projectsWithoutData} />
      </div>
    </div>
  );
};

export default List;

//
