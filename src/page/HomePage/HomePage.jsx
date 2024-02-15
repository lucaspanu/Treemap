import React from "react";
import Treemap from "../Treemap/Treemap";
import data from "./mockData.json";
import "./HomePage.css";
// import { TextareaAutosize } from "@mui/material";

const HomePage = () => {
  // const [treemapData, setTreemapData] = useState(data);

  // const handleChangeData = (e) => {
  //   setTreemapData(JSON.parse(e.target.value));
  // };

  return (
    <div className="pageContainer">
      <Treemap data={data} />
      {/* <TextareaAutosize
        value={JSON.stringify(treemapData)}
        onChange={handleChangeData}
      /> */}
    </div>
  );
};

export default HomePage;
