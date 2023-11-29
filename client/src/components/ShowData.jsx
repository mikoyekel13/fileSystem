import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const ShowData = () => {
  const [fileData, setFileData] = useState(null);
  let location = useLocation();
  const currLocation = location.pathname;
  let extension = currLocation.split(".");
  extension = extension[extension.length - 1];
  let imgName = currLocation.split("/");
  imgName = imgName[extension.length - 1];
  console.log(imgName);

  useEffect(() => {
    async function loadFileData() {
      try {
        let fileData = await fetch(`http://localhost:3000${currLocation}`);
        if (fileData.status !== 200) throw new Error("no data found");
        fileData = await fileData.json();
        return fileData;
      } catch (err) {
        console.log(err);
        return null;
      }
    }

    loadFileData().then((value) => {
      setFileData(value);
    });
  }, [currLocation]);

  return (
    <div>
      {extension === "txt" ? (
        <p>{fileData}</p>
      ) : (
        <img src={`http://localhost:3000/users/miko/${imgName}`} />
      )}
    </div>
  );
};

export default ShowData;
