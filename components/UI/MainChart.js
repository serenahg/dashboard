import React from "react";
import {
  Bar,
  ComposedChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const CustomYAxisTick = ({ x, y, payload }) => {
  const { value } = payload;
  return (
    <text x={x} y={y} dy={2} textAnchor="end" fill="#666" fontSize={10}>
      <tspan>{value}</tspan>
    </text>
  );
};
const MainChart = ({ items }) => {
  console.log(items);
  return (
    <div className="w-full h-full  items-end">
      <div style={{ width: "98%", height: "98%" }}>
        <ResponsiveContainer>
          <ComposedChart
            layout="vertical"
            width={500}
            height={300}
            data={items}
            margin={{
              top: 10,
              left: 80,
            }}
          >
            <XAxis type="number" />
            <YAxis
              interval={0}
              tick={<CustomYAxisTick />}
              dataKey="name"
              type="category"
              style={{
                fontSize: "10px",

                fontFamily: "Roboto",
                display: "flex",
              }}
            ></YAxis>
            <Tooltip />

            <Bar dataKey="quantity" barSize={10} fill="#4472c4" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MainChart;
