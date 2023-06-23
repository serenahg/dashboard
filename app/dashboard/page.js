"use client";
import AllItemsChart from "@/components/UI/AllItemsChart";
import MainTable from "@/components/UI/MainTable";
import { userInfo } from "@/utils/dashboardMock";
import React, { useState } from "react";

const Dashboard = () => {
  const [selectedProject, setSelectedProject] = useState(
    userInfo.dashboard[0].content[0]
  );

  const sortTableItemsByContentKeys = (userInfo) => {
    const tableItems = userInfo.dashboard.filter(
      (item) => item.kind !== "chart"
    );

    const sortedTableItems = tableItems.sort((a, b) => {
      const aKeys = Object.keys(a.content[0]).length;
      const bKeys = Object.keys(b.content[0]).length;
      return aKeys - bKeys;
    });

    const sortedDashboard = [
      userInfo.dashboard.find((item) => item.kind === "chart"),
      ...sortedTableItems,
    ];

    return { ...userInfo, dashboard: sortedDashboard };
  };

  const sortedUserInfo = sortTableItemsByContentKeys(userInfo);

  const normalTables = sortedUserInfo.dashboard.filter(
    (table) => table.kind !== "chart"
  );
  const normalTableCount = normalTables.length;
  const hasEvenNormalTables = normalTableCount % 2 === 0;
  const normalTablesLessThan8Keys = normalTables.filter(
    (table) => Object.keys(table.content[0]).length <= 8
  );
  const lastNormalTable =
    normalTablesLessThan8Keys[normalTablesLessThan8Keys.length - 1];

  return (
    <div
      className="w-full h-full grid grid-cols-2  gap-2 px-2"
      style={{ gridTemplateRows: "300px repeat(auto-fill, 300px) 400px" }}
    >
      {sortedUserInfo.dashboard.map((table, index) => {
        if (table.kind !== "chart") {
          console.log("test", sortedUserInfo.dashboard.length);
          const shouldDisplayHorizontally =
            (hasEvenNormalTables && table === lastNormalTable) ||
            Object.keys(table.content[0]).length > 8 ||
            (index === sortedUserInfo.dashboard.length - 1 &&
              hasEvenNormalTables) ||
            (!hasEvenNormalTables &&
              index === sortedUserInfo.dashboard.length - 2 &&
              sortedUserInfo.dashboard.length !== 4);
          const tableContainerClassName = shouldDisplayHorizontally
            ? "col-span-2 bg-slate-100 rounded-md overflow-hidden "
            : "bg-slate-100 rounded-md overflow-hidden ";

          return (
            <div className={tableContainerClassName} key={index}>
              <h3 className="text-md font-semibold px-2 py-1">{table.title}</h3>
              {table.linkables ? (
                <MainTable
                  tableItems={table.content}
                  linkables={table.linkables}
                />
              ) : (
                <MainTable tableItems={table.content} />
              )}
            </div>
          );
        } else {
          return (
            <AllItemsChart
              allProjects={table.content}
              selectedProject={selectedProject}
              setSelectedProject={setSelectedProject}
              key={index}
            />
          );
        }
      })}
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


*/
