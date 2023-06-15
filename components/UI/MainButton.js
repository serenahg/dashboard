import React from "react";

const MainButton = ({ title, fun, ...props }) => {
  console.log("props", props);

  return (
    <button
      type={props.type}
      className="bg-blue-700 px-6 py-2 rounded-md text-white shadow-md"
      onClick={(e) => {
        props.type !== "submit" && fun(e);
      }}
      {...props}
    >
      {title}
    </button>
  );
};

export default MainButton;
