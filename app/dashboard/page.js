"use client";
import MainChart from "@/components/UI/MainChart";
import { MainListBox } from "@/components/UI/MainListBox";
import MainTable from "@/components/UI/MainTable";
import {
  currentAccessStatus,
  data,
  orderStatus,
  recentActivities,
} from "@/utils/dashboardMock";
import React, { useState } from "react";

const Dashboard = () => {
  return (
    <div className="w-full h-full grid grid-cols-2 grid-rows-3 gap-2 px-2 ">
      <div className="bg-yellow-200 w-full h-full">
        <MainChart items={data} />
      </div>
      <div className="bg-pink-200  ">
        <h3 className="text-lg font-semibold px-6 py-2">Orders Receipt</h3>
        <div className="max-h-full">
          <MainTable tableItems={orderStatus} />
        </div>
      </div>
      <div className="bg-violet-200">
        <h3 className="text-lg font-semibold px-6 py-2">
          Current Access Status
        </h3>
        <MainTable tableItems={currentAccessStatus} />
      </div>

      <div className="bg-green-200 overflow-hidden">
        <h3 className="text-lg font-semibold px-6 py-1">
          Your Recent Activities
        </h3>
        <MainTable tableItems={recentActivities} />
      </div>
      <div className="bg-blue-200">
        <MainListBox />
      </div>

      <div className="bg-purple-200"></div>
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
