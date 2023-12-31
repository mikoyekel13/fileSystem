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
      setDirData(found.map((item) => item.name));
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
      <div className="fileForm-container dir">
        <h3>{props.name} (directory)</h3>
        <form className="file-dir">
          <button className="inbtn" type="button" onClick={showDataFunc}>
            Show
          </button>
          <button className="inbtn" type="button" onClick={enterDir}>
            Enter
          </button>
          <button className="inbtn" type="button" onClick={renameDir}>
            Rename
          </button>
          <button className="inbtn" type="button" onClick={deleteDir}>
            Delete
          </button>
        </form>
        {showData &&
          dirData &&
          dirData.map((file, index) => (
            <div key={index}>
              <h4>{file}</h4>
              <br />
            </div>
          ))}
      </div>
    </>
  );
};

export default Dir;
