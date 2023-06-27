"use client";
import MainInputButton from "@/components/UI/MainInputButton";
import MainTableFilter from "@/components/UI/MainTableFilter";
import { removeKeys } from "@/utils/constants";
import { userInfo } from "@/utils/dashboardMock";
import React, { useState } from "react";

const List = () => {
  const [selected, setSelected] = useState("");

  const projectsWithoutData = removeKeys(userInfo.dashboard[0].content, [
    "data",
    "projects",
    "last access date",
  ]);

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
        <MainTableFilter
          tableItems={projectsWithoutData}
          linkables={userInfo.dashboard[0].linkables}
        />
      </div>
    </div>
  );
};

export default List;

//
