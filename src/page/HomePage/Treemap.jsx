import React from "react";
import * as d3 from "d3";
import data from "./data.json";

const height = 800;
const width = 500;

const Treemap = () => {
  let svg = d3.select("#tree").attr("width", width).attr("height", height);
  const color = d3.scaleOrdinal(d3.schemeSet2);

  let hierarchy = d3
    .hierarchy(data)
    .sum((d) => d.sold)
    .sort((a, b) => b.value - a.value);

  let root = d3.treemap().size([width, height]).paddingInner(5).round(true)(
    hierarchy
  );

  let childArray = root.descendants().filter((d) => d.depth == 2);
  let parentArray = root.descendants().filter((d) => d.depth == 1);
  let matchParent = (category) => {
    return parentArray.findIndex((x) => x.data.name === category);
  };

  svg
    .selectAll(".cells")
    .data(childArray)
    .enter()
    .append("rect")
    .attr("x", (d) => d.x0)
    .attr("y", (d) => d.y0)
    .attr("width", (d) => d.x1 - d.x0)
    .attr("height", (d) => d.y1 - d.y0)
    .style("stroke", "white")
    .style("fill", (d) => color(matchParent(d.parent.data.name)));

  svg
    .selectAll(".text")
    .data(childArray)
    .enter()
    .append("text")
    .attr("x", (d) => d.x0 + (d.x1 - d.x0) / 2)
    .attr("y", (d) => d.y0 + (d.y1 - d.y0) / 2)
    .attr("text-anchor", "middle")
    .attr("fill", "black")
    .text((d) => d.data.name + " - " + d.value);

  d3.selectAll("rect").on("click", function (d) {
    window.open("http://localhost:5173/hiMarc", "_blank");
  });

  return (
    <svg
      id="tree"
      viewBox="[0, 0, width, height]"
      style={{ maxWidth: "100%", height: "auto", font: "12px sans-serif" }}
    ></svg>
  );
};

export default Treemap;
