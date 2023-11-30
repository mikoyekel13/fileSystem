import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import File from "./File";

const ShowData = () => {
  const [currData, setCurrData] = useState(null);
  const [isFile, setIsFile] = useState(false);
  const [filesChanged, setFilesChanged] = useState(false);
  let location = useLocation();
  const currLocation = location.pathname;
  let extension = currLocation.split(".");
  extension = extension[extension.length - 1];
  let locationSplit = currLocation.split("/");
  const currDir = locationSplit[2];
  const imgName = locationSplit[extension.length - 1];

  useEffect(() => {
    async function loadFileData() {
      try {
        let fileData = await fetch(`http://localhost:3000${currLocation}`);
        if (!fileData.ok) throw new Error("no data found");
        fileData = await fileData.json();
        if (fileData && typeof fileData === "object") {
          setIsFile(false);
        } else {
          setIsFile(true);
        }
        return fileData;
      } catch (err) {
        console.log(err);
        return null;
      }
    }
    loadFileData().then((value) => {
      setCurrData(value);
    });
  }, [currLocation, filesChanged]);

  return (
    <>
      {!isFile &&
        !!currData &&
        currData.map((file, index) => (
          <File
            key={index}
            name={file.name}
            size={file.size_KiloByte}
            extension={file.extensionName}
            setFilesChanged={setFilesChanged}
          />
        ))}
      {isFile && !!imgName && (
        <div>
          {extension === "txt" ? (
            <p>{currData}</p>
          ) : currDir === imgName ? (
            <img src={`http://localhost:3000/users/miko/${imgName}`} />
          ) : (
            <img
              src={`http://localhost:3000/users/miko/${currDir}/${imgName}`}
            />
          )}
        </div>
      )}
    </>
  );
};

export default ShowData;
