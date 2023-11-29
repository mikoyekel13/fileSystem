import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
function UserSpace() {
  let location = useLocation();
  const currUser = location.pathname;
  const [userFiles, setUserFiles] = useState([]);
  async function loadFiles() {
    try {
      const resUserFiles = await fetch(`http://localhost:3000${currUser}`);
      if (resUserFiles.status !== 200)
        throw new Error("problem with importing the user's files");
      const userFilesData = await resUserFiles.json();
      console.log(userFilesData);
      return userFilesData;
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    setUserFiles(loadFiles());
  }, []);

  return (
    <>
      {userFiles.map(file, (index) => {
        {
          file.type === "File" ? (
            <File
              key={index}
              name={file.name}
              type={file.type}
              size={file.size_kilobite}
              extension={file.extensionName}
            />
          ) : (
            <Folder
              key={index}
              name={file.name}
              type={file.type}
              size={file.size_kilobite}
            />
          );
        }
      })}
    </>
  );
}

export default UserSpace;
