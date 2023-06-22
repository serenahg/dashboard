"use client";
import MainChart from "@/components/UI/MainChart";
import { data } from "@/utils/dashboardMock";
import React from "react";

const Admin = () => {
  return (
    <div className=" w-full h-full">
      <MainChart items={data} />
    </div>
  );
};

export default Admin;
