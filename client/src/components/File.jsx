import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const File = (props) => {
  const [showInfo, setShowInfo] = useState(false);
  const goToFileData = useNavigate();
  let location = useLocation();
  const currUser = location.pathname;
  let extension = props.name.split(".");
  extension = extension[extension.length - 1];

  async function showData() {
    goToFileData(`${currUser}/${props.name}`);
  }

  async function renameFile() {
    const newName = window.prompt("What is the new name?");
    try {
      const found = await fetch(
        `http://localhost:3000${currUser}/${props.name}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: `${newName}.${extension}` }),
        }
      );
      if (!found.ok) throw new Error("error accoured");
      props.setFilesChanged((prev) => !prev);
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteFile() {
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
