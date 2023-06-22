"use client";
import MainChart from "@/components/UI/MainChart";
import { MainListBox } from "@/components/UI/MainListBox";
import MainTable from "@/components/UI/MainTable";
import {
  allProjects,
  currentAccessStatus,
  data,
  recentActivities,
  recentProjects,
  supplierUpdates,
  userInfo,
  yourTenderReceveid,
} from "@/utils/dashboardMock";
import React, { useState } from "react";

const Dashboard = () => {
  const [selectedProject, setSelectedProject] = useState(allProjects[0]);
  return (
    <div className="w-full h-full grid grid-cols-2 grid-rows-3 gap-2 px-2 ">
      <div className="bg-slate-100 rounded-md w-full h-full grow flex flex-col ">
        <div className="flex justify-between">
          <MainListBox
            list={allProjects}
            displayKey="projects"
            setSelectedProject={setSelectedProject}
            selected={selectedProject}
          />
          <h3 className="text-lg font-semibold px-6 py-2 text-right">
            Number of Items
          </h3>
        </div>

        <MainChart items={selectedProject ? selectedProject.data : data} />
      </div>
      <div className="bg-slate-100 rounded-md">
        <h3 className="text-lg font-semibold px-6 py-2">
          Current Access Status
        </h3>
        <MainTable tableItems={currentAccessStatus} />
      </div>
      <div className="bg-slate-100 rounded-md overflow-hidden pb-8">
        <h3 className="text-lg font-semibold px-6 py-2">Recent Projects</h3>
        <MainTable
          tableItems={recentProjects}
          linkableKey="projects"
          linkable="/dashboard/projects/project-list"
        />
      </div>

      <div className="bg-slate-100 rounded-md overflow-hidden pb-8">
        <h3 className="text-lg font-semibold px-6 py-2">
          Your recent Activities
        </h3>
        <MainTable tableItems={recentActivities} />
      </div>

      <div className="bg-slate-100 rounded-md overflow-hidden pb-8">
        <h3 className="text-lg font-semibold px-6 py-2">
          Supplier / Manifacturer Updates
        </h3>
        <MainTable tableItems={supplierUpdates} />
      </div>
      <div className="bg-slate-100 rounded-md overflow-hidden pb-8">
        <h3 className="text-lg font-semibold px-6 py-2">
          Your Tenders Received
        </h3>
        <MainTable tableItems={yourTenderReceveid} />
      </div>
    </div>
  );
};

export default Dashboard;

/*
"use client";
import MainTable from "@/components/UI/MainTable";
import { currentAccessStatus, orderStatus } from "@/utils/dashboardMock";
import React, { useState } from "react";

const Dashboard = () => {
  return (
    <div className="w-full h-full grid grid-cols-2 grid-rows-3 gap-2 px-2 ">
      <div className="bg-pink-200  ">
        <h3 className="text-lg font-semibold px-6 py-2">Orders Receipt</h3>
        <div className="max-h-full overflow-y-scroll">
          <MainTable tableItems={orderStatus} />
        </div>
      </div>
      <div className="bg-violet-200">
        <h3 className="text-lg font-semibold px-6 py-2">
          Current Access Status
        </h3>
        <MainTable tableItems={currentAccessStatus} />
      </div>

      <div className="bg-green-200"></div>
      <div className="bg-blue-200"></div>
      <div className="bg-yellow-200"></div>
      <div className="bg-purple-200"></div>
    </div>
  );
};

export default Dashboard;


*/
