import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [userName, setUserName] = useState("");
  const [passWord, setPassword] = useState("");
  const goToUserSpace = useNavigate();
  async function checkUser(e) {
    e.preventDefault();
    try {
      const found = await fetch(" http://localhost:3000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: { username: userName, password: passWord },
      });
      if ((found.status = 404)) throw new Error("user was not found");
      goToUserSpace(`/${userName}`);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <>
      <form action="http://localhost:3000/" method="post">
        <label htmlFor="username">username:</label>
        <input
          name="username"
          type="text"
          value={userName}
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        />
        <label htmlFor="password">password:</label>
        <input
          name="password"
          type="password"
          value={passWord}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />

        <button onClick={checkUser}></button>
      </form>
    </>
  );
}
export default Login;
