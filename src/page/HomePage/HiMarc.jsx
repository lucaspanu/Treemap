import React from "react";
import { useState } from "react";
import * as d3 from "d3";

const HiMarc = () => {
  const [data, setData] = useState(() => d3.ticks(-2, 2, 200).map(Math.sin));

  function onMouseMove(event) {
    const [x, y] = d3.pointer(event);
    setData(data.slice(-200).concat(Math.atan2(x, y)));
  }

  return (
    <div>
      <h1>Hi Marc</h1>
      {/* <div onMouseMove={onMouseMove}>
        <LinePlot data={data} />
      </div> */}
    </div>
  );
};

export default HiMarc;
