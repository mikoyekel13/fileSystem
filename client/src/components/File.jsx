import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const File = (props) => {
  const [showInfo, setShowInfo] = useState(false);
  const goToFileData = useNavigate();
  let location = useLocation();
  const currUser = location.pathname;

  async function showData() {
    goToFileData(`${currUser}/${props.name}`);
  }

  async function renameFile() {
    const newName = window.prompt("What is the new name?");
    try {
      const found = await fetch(`http://localhost:3000/${props.name}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newName }),
      });
      if (found.status !== 200) throw new Error("error accoured");
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteFile() {
    try {
      const found = await fetch(`http://localhost:3000/${props.name}`, {
        method: "DELETE",
      });
      if (found.status !== 200) throw new Error("error accoured");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <h3>{props.name}</h3>
      <form>
        <button type="button" onClick={() => setShowInfo((prev) => !prev)}>
          Info
        </button>
        <button type="button" onClick={showData}>
          Show
        </button>
        <button type="button" onClick={renameFile}>
          Rename
        </button>
        <button type="button" onClick={deleteFile}>
          Delete
        </button>
      </form>
      {showInfo && (
        <div>
          <h4>size in Kb: {props.size}</h4>
          <h4>extension name: {props.extension}</h4>
        </div>
      )}
    </>
  );
};

export default File;
