import React from "react";

const MainButton = ({ title, fun, ...props }) => {
  console.log(props);
  return (
    <button
      type={props.type}
      className=" disabled:opacity-75 bg-primary-button px-6 py-1 text-sm rounded-md text-white shadow-lg enabled:hover:bg-secondary-button enabled:hover:shadow-sm"
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
