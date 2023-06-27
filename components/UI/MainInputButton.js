"use client";
import MainInputAutoCom from "./MainInputAutoCom";
import MainButton from "./MainButton";

const MainInputButton = ({ selected, setSelected, list }) => {
  return (
    <div className="flex h-12 w-[400px] shadow-md rounded-md mb-2 items-center justify-between">
      <div className="w-1/2 flex grow ">
        <MainInputAutoCom
          list={list}
          selected={selected}
          setSelected={setSelected}
        />
      </div>

      <div className="p-2 flex justify-end">
        <MainButton
          title="Request Access"
          fun={() => console.log("clicking")}
        />
      </div>
    </div>
  );
};

export default MainInputButton;
