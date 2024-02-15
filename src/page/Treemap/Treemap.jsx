import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import TreemapTooltip from "./TreemapTooltip/TreemapTooltip";
import "./Treemap.css";
import { getChangeColor, getChangeFormat } from "../../utils/fx";

const height = 500;
const width = 500;

const Treemap = ({ data }) => {
  const ref = useRef();
  const tooltipRef = useRef();

  const [tooltipData, setTooltipData] = useState();
  const handleTooltip = (e, d, tool) => {
    tool.style("left", e.pageX + 30 + "px");
    tool.style("top", e.pageY - 10 + "px");
    tool.style("display", "inline-block");
    if (tooltipData?.currentData !== d.data) {
      setTooltipData({
        ...d.parent.data,
        currentData: d.data,
        parentName: d.parent.parent.data.name,
      });
    }
  };

  useEffect(() => {
    let svg = d3
      .select(ref.current)
      .attr("width", width)
      .attr("height", height);

    let hierarchy = d3
      .hierarchy(data)
      .sum((d) => d.price)
      .sort((a, b) => b.value - a.value);

    let root = d3.treemap().size([width, height]).round(true)(hierarchy);

    var tool = d3.select(tooltipRef.current);

    let childArray = root.descendants().filter((d) => d.depth == 2);

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
      .style("fill", (d) => getChangeColor(d.data.change))
      .on("mousemove", function (e, d) {
        handleTooltip(e, d, tool);
      })
      .on("mouseout", function () {
        tool.style("display", "none");
      });

    svg
      .selectAll(".text")
      .data(childArray)
      .enter()
      .append("text")
      .attr("x", (d) => d.x0 + (d.x1 - d.x0) / 2)
      .attr("y", (d) => d.y0 + (d.y1 - d.y0) / 2 + 8)
      .attr("id", "treemapTitle")
      .text(function (d) {
        var cellWidth = d.x1 - d.x0;
        var cellHeight = d.y1 - d.y0;

        var tempText = svg
          .append("text")
          .attr("opacity", 0)
          .attr("id", "treemapTitle")
          .text(d.data.ticker);
        var textWidth = tempText.node().getBBox().width;
        var textHeight = tempText.node().getBBox().height;
        tempText.remove();

        return textWidth <= cellWidth && textHeight <= cellHeight
          ? d.data.ticker
          : "";
      })
      .on("mousemove", function (e, d) {
        handleTooltip(e, d, tool);
      })
      .on("mouseout", function () {
        tool.style("display", "none");
      });

    // and to add the text labels
    svg
      .selectAll("vals")
      .data(childArray)
      .enter()
      .append("text")
      .attr("x", (d) => d.x0 + (d.x1 - d.x0) / 2 - 20)
      .attr("y", (d) => d.y0 + (d.y1 - d.y0) / 2 + 24)
      .attr("id", "treemapSubTitle")
      .text(function (d) {
        var cellWidth = d.x1 - d.x0;
        var cellHeight = d.y1 - d.y0;

        var tempText = svg
          .append("text")
          .attr("opacity", 0)
          .attr("id", "treemapTitle")
          .text(d.data.ticker);
        var textWidth = tempText.node().getBBox().width;
        var textHeight = tempText.node().getBBox().height;

        var subText = svg
          .append("text")
          .attr("opacity", 0)
          .attr("id", "treemapSubTitle")
          .text(d.data.change);
        var subTextWidth = subText.node().getBBox().width;
        var subTextHeight = subText.node().getBBox().height;
        subText.remove();

        return textWidth <= cellWidth &&
          subTextWidth <= cellWidth &&
          textHeight + subTextHeight <= cellHeight
          ? getChangeFormat(d.data.change)
          : "";
      })
      .on("mousemove", function (e, d) {
        handleTooltip(e, d, tool);
      })
      .on("mouseout", function () {
        tool.style("display", "none");
      });
  }, [tooltipData, data]);

  return (
    <div
      style={{
        position: "relative",
        minWidth: width,
        minHeight: height,
        backgroundColor: "#fff",
      }}
    >
      <div className="sectorTitle">{data.name}</div>
      <TreemapTooltip tooltipRef={tooltipRef} data={tooltipData} />
      <svg
        ref={ref}
        viewBox={`0 0 ${width} ${height}`}
        className="noselect"
        style={{
          maxWidth: "100%",
          height: "auto",
          font: "12px sans-serif",
          backgroundColor: "#fff",
        }}
      ></svg>
    </div>
  );
};

export default Treemap;
