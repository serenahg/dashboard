import React from "react";
import { MainListBox } from "./MainListBox";
import MainChart from "./MainChart";

const AllItemsChart = ({
  allProjects,
  selectedProject,
  setSelectedProject,
}) => {
  return (
    <div className="bg-slate-100 rounded-md w-full  grow flex flex-col ">
      <div className="flex justify-between">
        <MainListBox
          list={allProjects}
          displayKey="project number - project name"
          setSelectedProject={setSelectedProject}
          selected={selectedProject}
        />
        <h3 className="text-lg font-semibold px-6 py-2 text-right">
          Number of Items
        </h3>
      </div>

      <MainChart items={selectedProject.data} />
    </div>
  );
};

export default AllItemsChart;
