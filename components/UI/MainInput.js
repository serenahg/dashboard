import React from "react";

const MainInput = ({ type, title, fun, inputValue, ...props }) => {
  return (
    <div className="flex flex-col" {...props}>
      <label className=" text-blue-800" htmlFor="password">
        {title}
      </label>
      <input
        className="rounded text-blue-800 border border-blue-800"
        type={type}
        name={title}
        required
        value={inputValue}
        onChange={(e) => fun(e.target.value)}
      />
    </div>
  );
};

export default MainInput;
