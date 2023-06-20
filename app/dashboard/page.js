"use client";
import MainTable from "@/components/UI/MainTable";
import { currentAccessStatus, orderStatus } from "@/utils/dashboardMock";
import React, { useState } from "react";

const Dashboard = () => {
  return (
    <div className="w-full h-full grid grid-cols-2 grid-rows-3 gap-2 px-2">
      <div className=" overflow-auto">
        <h3 className="text-lg font-semibold px-6 py-2">Orders Receipt</h3>
        <MainTable tableItems={orderStatus} />
      </div>
      <div className="overflow-auto">
        <h3 className="text-lg font-semibold px-6 py-2">
          Current Access Status{" "}
        </h3>
        <MainTable tableItems={currentAccessStatus} />
      </div>

      <div className="bg-green-200">p</div>
      <div className="bg-blue-200">p</div>
      <div className="bg-yellow-200">p</div>
      <div className="bg-purple-200">p</div>
    </div>
  );
};

export default Dashboard;
