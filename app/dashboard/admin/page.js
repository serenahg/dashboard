import MainChart from "@/components/UI/MainChart";
import { data } from "@/utils/dashboardMock";
import React from "react";

const Admin = () => {
  return (
    <div>
      <MainChart items={data} />
    </div>
  );
};

export default Admin;
