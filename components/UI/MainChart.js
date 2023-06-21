import React from "react";
import {
  Area,
  Bar,
  BarChart,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const MainChart = ({ items }) => {
  return (
    <div className="w-full h-full  items-end">
      <div style={{ width: "100%", height: "100%" }}>
        <ResponsiveContainer>
          <ComposedChart
            layout="vertical"
            width={500}
            height={400}
            data={items}
          >
            <XAxis type="number" />
            <YAxis
              dataKey="name"
              type="category"
              scale="band"
              style={{
                fontSize: "10px",
                fontFamily: "Roboto",
                display: "flex",
              }}
            />
            <Tooltip />

            <Bar dataKey="uv" barSize={10} fill="#413ea0" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MainChart;
