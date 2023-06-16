import React from "react";

const MainButton = ({ title, fun, ...props }) => {
  console.log("props", props);

  return (
    <button
      type={props.type}
      className="bg-primary-button px-6 py-1 text-sm rounded-md text-white shadow-lg hover:bg-secondary-button hover:shadow-sm"
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
