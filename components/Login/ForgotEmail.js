"use client";
import React, { useState } from "react";
import MainInput from "../UI/MainInput";
import MainButton from "../UI/MainButton";

const ForgotEmail = () => {
  const [forgotEmail, setForgotEmail] = useState("");
  const retrievingEmail = (e) => {
    e.preventDefault();
    console.log("retrievening email if existing: ", forgotEmail);
  };
  return (
    <div className="md:w-1/4 h-1/3 justify-center items-center flex flex-col ">
      <form
        onSubmit={retrievingEmail}
        className=" justify-start items-start flex flex-col"
      >
        <p className="text-blue-800">Forgot Details?</p>
        <MainInput
          type="email"
          title="Email"
          fun={setForgotEmail}
          inputValue={forgotEmail}
          style={{ marginTop: "10px" }}
        />
        <MainButton type="submit" title="Email" style={{ marginTop: "10px" }} />
      </form>
    </div>
  );
};

export default ForgotEmail;
