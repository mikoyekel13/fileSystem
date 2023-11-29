import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const FileData = () => {
  const [fileData, setFileData] = useState(null);
  let location = useLocation();
  const currLocation = location.pathname;

  useEffect(() => {
    async function loadFileData() {
      try {
        const fileData = await fetch(`http://localhost:3000${currLocation}`);
        if (fileData.status !== 200) throw new Error("no data found");

        console.log(fileData);

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

  return <div>{fileData}</div>;
};

export default FileData;
