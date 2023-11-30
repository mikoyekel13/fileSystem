import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import File from "./File";
import Dir from "./Dir";

function UserSpace() {
  let location = useLocation();
  const currUser = location.pathname;
  const [userFiles, setUserFiles] = useState([]);
  const [filesChanged, setFilesChanged] = useState(false);
  const toLogin = useNavigate();

  useEffect(() => {
    async function loadFiles() {
      try {
        const resUserFiles = await fetch(`http://localhost:3000${currUser}`);
        if (resUserFiles.status !== 200)
          throw new Error("problem with importing the user's files");
        const userFilesData = await resUserFiles.json();
        return userFilesData;
      } catch (err) {
        console.log(err);
        return null;
      }
    }
    if (localStorage.getItem("currUser") === "undefined") {
      toLogin("/");
    }
    loadFiles().then((value) => {
      setUserFiles(value);
    });
  }, [currUser, filesChanged, toLogin]);

  function logOut() {
    localStorage.setItem("currUser", "undefined");
    toLogin("/");
  }

  return (
    <>
      <h2>
        {localStorage.getItem("currUser")} {"=>"} Home Directory
      </h2>
      <button type="button" onClick={logOut}>
        Log out
      </button>
      {userFiles.length > 0 &&
        userFiles.map((file, index) => {
          {
            return file.type === "File" ? (
              <File
                key={index}
                name={file.name}
                size={file.size_KiloByte}
                extension={file.extensionName}
                setFilesChanged={setFilesChanged}
              />
            ) : (
              <Dir
                key={index}
                name={file.name}
                setFilesChanged={setFilesChanged}
              />
            );
          }
        })}
    </>
  );
}

export default UserSpace;
