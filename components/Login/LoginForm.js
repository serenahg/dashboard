"use client";
import React, { useState } from "react";
import MainButton from "../UI/MainButton";
import MainInput from "../UI/MainInput";
import MainCheckBox from "../UI/MainCheckBox";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const router = useRouter();

  const submitting = (event) => {
    console.log(event);
    event.preventDefault();
    console.log(username, password, isChecked);
    router.push("/dashboard");
  };

  return (
    <div className=" h-2/3 justify-start  flex ">
      <form onSubmit={submitting} className=" items-start flex flex-col ">
        <MainInput
          type="text"
          title="Username"
          fun={setUsername}
          inputValue={username}
          style={{ marginTop: "10px" }}
        />
        <MainInput
          type="password"
          title="Password"
          fun={setPassword}
          inputValue={password}
          style={{ marginTop: "10px" }}
        />
        <MainCheckBox
          label="Remember Me"
          checked={isChecked}
          isChecked={setIsChecked}
          style={{ marginTop: "10px" }}
        />
        <MainButton style={{ marginTop: "10px" }} type="submit" title="Login" />
      </form>
    </div>
  );
};

export default LoginForm;

/*
       <label for="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          required
          onChange={(e) => setUsername(e.target.value)}
        />
        <label for="password">Password</label>
        <input
          type="text"
          id="password"
          name="pwssword"
          required
          onChange={(e) => setPassword(e.target.value)}
        />

*/
