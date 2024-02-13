import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import data from "./data.json";

const height = 800;
const width = 500;

const Treemap = () => {
  const ref = useRef();
  const tooltipRef = useRef();

  useEffect(() => {
    let svg = d3
      .select(ref.current)
      .attr("width", width)
      .attr("height", height);
    const color = d3.scaleOrdinal(d3.schemeSet2);

    let hierarchy = d3
      .hierarchy(data)
      .sum((d) => d.sold)
      .sort((a, b) => b.value - a.value);

    let root = d3.treemap().size([width, height]).paddingInner(5).round(true)(
      hierarchy
    );

    var tool = d3.select(tooltipRef.current);

    let childArray = root.descendants().filter((d) => d.depth == 2);
    let parentArray = root.descendants().filter((d) => d.depth == 1);
    let matchParent = (category) => {
      return parentArray.findIndex((x) => x.data.name === category);
    };

    // svg
    //   .selectAll(".node")
    //   .data(childArray)
    //   .enter()
    //   .append("div")
    //   .attr("class", "node")
    //   .style("left", function (d) {
    //     return d.x + "px";
    //   })
    //   .style("top", function (d) {
    //     return d.y + "px";
    //   })
    //   .style("width", function (d) {
    //     return Math.max(0, d.dx - 1) + "px";
    //   })
    //   .style("height", function (d) {
    //     return Math.max(0, d.dy - 1) + "px";
    //   })
    //   .style("background", function (d) {
    //     return d.children ? color(d.name) : null;
    //   })
    //   .text((d) => d.data.name + " - " + d.value)

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
      .style("fill", (d) => color(matchParent(d.parent.data.name)))
      .on("mousemove", function (e, d) {
        console.log(e, d);
        tool.style("left", e.pageX + 10 + "px");
        tool.style("top", e.pageY + 20 + "px");
        tool.style("display", "inline-block");
        tool.html(d.data.name);
      })
      .on("mouseout", function (d) {
        tool.style("display", "none");
      });

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
  }, []);

  return (
    <div style={{ position: "relative" }}>
      <div
        ref={tooltipRef}
        style={{
          position: "absolute",
          display: "none",
          width: "auto",
          height: "auto",
          background: "none repeat scroll 0 0 white",
          border: "0 none",
          borderRadius: "8px 8px 8px 8px",
          boxShadow: "-3px 3px 15px #888888",
          color: "black",
          font: "12px sans-serif",
          padding: "5px",
          textAlign: "center",
        }}
      >
        Hola
      </div>
      <svg
        ref={ref}
        viewBox={`0 0 ${width} ${height}`}
        style={{
          maxWidth: "100%",
          height: "auto",
          font: "12px sans-serif",
          cursor: "pointer",
        }}
      ></svg>
    </div>
  );
};

export default Treemap;
