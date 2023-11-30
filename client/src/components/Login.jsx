import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [userName, setUserName] = useState("");
  const [passWord, setPassword] = useState("");
  const [userFound, setUserFound] = useState(true);
  const goToUserSpace = useNavigate();
  async function checkUser(e) {
    e.preventDefault();
    try {
      const found = await fetch(" http://localhost:3000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: userName, password: passWord }),
      });
      if (!found.ok) throw new Error("user was not found");
      setUserFound(true);
      localStorage.setItem("currUser", userName);
      goToUserSpace(`/${userName}`);
    } catch (err) {
      console.log(err);
      setUserFound(false);
    }
  }
  return (
    <>
      <div id="container-form">
        <form className="form">
          <div>
            <label htmlFor="username">username:</label>
            <input
              name="username"
              type="text"
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="password">password:</label>
            <input
              name="password"
              type="password"
              value={passWord}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>

          <button className="btns" onClick={checkUser}>
            Login
          </button>
        </form>
      </div>
    </>
  );
}
export default Login;
