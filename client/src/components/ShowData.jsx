import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import File from "./File";

const ShowData = () => {
  const [currData, setCurrData] = useState(null);
  const [isFile, setIsFile] = useState(true);
  const [filesChanged, setFilesChanged] = useState(false);
  let location = useLocation();
  const currLocation = location.pathname;
  let extension = currLocation.split(".");
  extension = extension[extension.length - 1];
  let imgName = currLocation.split("/");
  imgName = imgName[extension.length - 1];

  useEffect(() => {
    async function loadFileData() {
      try {
        let fileData = await fetch(`http://localhost:3000${currLocation}`);
        if (!fileData.ok) throw new Error("no data found");
        fileData = await fileData.json();
        console.log(fileData);
        if (fileData.length > 0) {
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
        currData.map((file, index) => (
          <File
            key={index}
            name={file.name}
            size={file.size_KiloByte}
            extension={file.extensionName}
            setFilesChanged={setFilesChanged}
          />
        ))}
      {isFile && (
        <div>
          {extension === "txt" ? (
            <p>{currData}</p>
          ) : (
            <img src={`http://localhost:3000/users/miko/${imgName}`} />
          )}
        </div>
      )}
    </>
  );
};

export default ShowData;
