import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

const Dir = (props) => {
  const [dirData, setDirData] = useState([]);
  const [showData, setShowData] = useState(false);
  const goToDirData = useNavigate();
  let location = useLocation();
  const currUser = location.pathname;

  async function showDataFunc() {
    try {
      let found = await fetch(`http://localhost:3000${currUser}/${props.name}`);
      if (!found.ok) throw new Error("error accoured");
      found = await found.json();
      setDirData(found);
      setShowData((prev) => !prev);
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  function enterDir() {
    goToDirData(`${currUser}/${props.name}`);
  }

  async function renameDir() {
    const newName = window.prompt("What is the new name?");
    try {
      const found = await fetch(
        `http://localhost:3000${currUser}/${props.name}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: newName }),
        }
      );
      if (!found.ok) throw new Error("error accoured");
      props.setFilesChanged((prev) => !prev);
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteDir() {
    try {
      const found = await fetch(
        `http://localhost:3000${currUser}/${props.name}`,
        {
          method: "DELETE",
        }
      );
      if (!found.ok) throw new Error("error accoured");
      props.setFilesChanged((prev) => !prev);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <h3>{props.name} (directory)</h3>
      <form>
        <button type="button" onClick={showDataFunc}>
          Show
        </button>
        <button type="button" onClick={enterDir}>
          Enter
        </button>
        <button type="button" onClick={renameDir}>
          Rename
        </button>
        <button type="button" onClick={deleteDir}>
          Delete
        </button>
      </form>
      {showData && <div>{dirData}</div>}
    </>
  );
};

export default Dir;
