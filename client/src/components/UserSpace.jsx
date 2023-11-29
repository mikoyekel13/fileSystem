import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import File from "./File";
import Dir from "./Dir";

function UserSpace() {
  let location = useLocation();
  const currUser = location.pathname;
  const [userFiles, setUserFiles] = useState([]);

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

    loadFiles().then((value) => {
      setUserFiles(value);
    });
  }, [currUser]);

  return (
    <>
      {userFiles.length > 0 &&
        userFiles.map((file, index) => {
          {
            return file.type === "File" ? (
              <File
                key={index}
                name={file.name}
                size={file.size_KiloByte}
                extension={file.extensionName}
              />
            ) : (
              <Dir key={index} name={file.name} size={file.size_kilobite} />
            );
          }
        })}
    </>
  );
}

export default UserSpace;
