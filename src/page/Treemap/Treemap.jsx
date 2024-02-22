import React, { useLayoutEffect, useRef, useState } from "react";
import * as d3 from "d3";
import TreemapTooltip from "./TreemapTooltip/TreemapTooltip";
import "./Treemap.css";
import {
  getChangeColor,
  getChangeFormat,
  getChangePercentage,
} from "../../utils/fx";

export default function Treemap({ data, width, height }) {
  const svgRef = useRef(null);

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

  function renderTreemap() {
    const svg = d3.select(svgRef.current);

    svg.selectAll("g").remove();
    svg.selectAll("text").remove();
    svg.selectAll("rect").remove();

    svg.attr("width", width).attr("height", height);

    const root = d3
      .hierarchy(data)
      .sum((d) => d.revenueLM)
      .sort((a, b) => b.value - a.value);

    const treemapRoot = d3
      .treemap()
      .size([width, height])
      .paddingOuter(3)
      .paddingTop(16)
      .paddingInner(1)(root);

    const titleArray = treemapRoot.descendants().filter((d) => d.depth == 1);
    const subTitleArray = treemapRoot.descendants().filter((d) => d.depth == 2);
    const collectionArray = treemapRoot
      .descendants()
      .filter((d) => d.depth == 3);

    // TITLE
    svg
      .selectAll(".title")
      .data(titleArray)
      .join("text")
      .attr("x", (d) => d.x0 + 6)
      .attr("y", (d) => d.y0 + 12)
      .style("text-transform", "uppercase")
      .style("font-weight", "bold")
      .attr("font-size", "15px")
      .text(function (d) {
        var cellWidth = d.x1 - d.x0;

        var tempText = svg
          .append("text")
          .attr("opacity", 0)
          .style("text-transform", "uppercase")
          .style("font-weight", "bold")
          .attr("font-size", "15px")
          .text(d.data.name[0]);
        var textWidth = tempText.node().getBBox().width - 1;
        tempText.remove();
        const maxCaracters = cellWidth / textWidth;
        return d.data.name.substr(0, maxCaracters);
      })
      .attr("fill", "white");

    // SUB TITLE
    svg
      .selectAll(".cell-sub-title")
      .data(subTitleArray)
      .join("rect")
      .attr("x", (d) => d.x0 + 3.5)
      .attr("y", (d) => d.y0)
      .attr("width", (d) => d.x1 - d.x0 - 7)
      .attr("height", "16px")
      .style("fill", (d) => {
        const { revenuePM, moM } = d.data.children.sort(
          (a, b) => b.revenueLM - a.revenueLM
        )[0];
        const changePercentage = getChangePercentage(revenuePM, moM);
        return getChangeColor(changePercentage);
      })
      .attr("display", (d) => {
        var cellWidth = d.x1 - d.x0;
        var cellHeight = d.y1 - d.y0;
        return cellWidth > 20 && cellHeight > 16 ? "inherit" : "none";
      });

    svg
      .selectAll(".sub-title")
      .data(subTitleArray)
      .join("text")
      .attr("x", (d) => d.x0 + 7)
      .attr("y", (d) => d.y0 + 12)
      .text(function (d) {
        var cellWidth = d.x1 - d.x0;

        var tempText = svg
          .append("text")
          .attr("opacity", 0)
          .style("font-weight", "bold")
          .attr("font-size", "11px")
          .text(d.data.name[0]);
        var textWidth = tempText.node().getBBox().width - 1;
        tempText.remove();
        const maxCaracters = cellWidth / textWidth - 1;
        return d.data.name.substr(0, maxCaracters);
      })
      .attr("display", (d) => {
        var cellWidth = d.x1 - d.x0;
        var cellHeight = d.y1 - d.y0;
        return cellWidth > 20 && cellHeight > 16 ? "inherit" : "none";
      })
      .style("font-weight", "bold")
      .attr("font-size", "11px")
      .attr("fill", "white");

    // CELLS
    svg
      .selectAll(".cells")
      .data(collectionArray)
      .join("rect")
      .attr("x", (d) => d.x0)
      .attr("y", (d) => d.y0)
      .attr("width", (d) => d.x1 - d.x0)
      .attr("height", (d) => d.y1 - d.y0)
      .style("stroke", "rgb(38,41,49)")
      .style("fill", (d) => {
        const { revenuePM, moM } = d.data;
        const changePercentage = getChangePercentage(revenuePM, moM);
        return getChangeColor(changePercentage);
      });

    svg
      .selectAll(".text")
      .data(collectionArray)
      .join("text")
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
          .text(d.data.collection);
        var textWidth = tempText.node().getBBox().width;
        var textHeight = tempText.node().getBBox().height;
        tempText.remove();

        return textWidth <= cellWidth && textHeight <= cellHeight
          ? d.data.collection
          : "";
      });

    // and to add the text labels
    svg
      .selectAll(".sub-text")
      .data(collectionArray)
      .join("text")
      .attr("x", (d) => d.x0 + (d.x1 - d.x0) / 2)
      .attr("y", (d) => d.y0 + (d.y1 - d.y0) / 2 + 24)
      .attr("id", "treemapSubTitle")
      .text(function (d) {
        // Text
        const { revenuePM, moM } = d.data;
        const changePercentage = getChangePercentage(revenuePM, moM);
        const text = getChangeFormat(changePercentage);

        // Calc
        var cellWidth = d.x1 - d.x0;
        var cellHeight = d.y1 - d.y0;

        var tempText = svg
          .append("text")
          .attr("opacity", 0)
          .attr("id", "treemapTitle")
          .text(d.data.collection);
        var textWidth = tempText.node().getBBox().width;
        var textHeight = tempText.node().getBBox().height;
        tempText.remove();

        var subText = svg
          .append("text")
          .attr("opacity", 0)
          .attr("id", "treemapSubTitle")
          .text(text);
        var subTextWidth = subText.node().getBBox().width;
        var subTextHeight = subText.node().getBBox().height;
        subText.remove();

        return textWidth <= cellWidth &&
          subTextWidth + 10 <= cellWidth &&
          textHeight + subTextHeight <= cellHeight - 20 // -> Padding
          ? text
          : "";
      });
  }

  // TOOLTIP
  function renderTreemapTooltip() {
    const tool = d3.select(tooltipRef.current);
    const svg = d3.select(svgRef.current);

    svg.attr("width", width).attr("height", height);

    const root = d3
      .hierarchy(data)
      .sum((d) => d.revenueLM)
      .sort((a, b) => b.value - a.value);

    const treemapRoot = d3
      .treemap()
      .size([width, height])
      .paddingOuter(3)
      .paddingTop(16)
      .paddingInner(1)(root);

    const collectionArray = treemapRoot
      .descendants()
      .filter((d) => d.depth == 3);

    const collectionNodes = svg
      .selectAll("g")
      .data(collectionArray)
      .join("g")
      .attr("transform", (d) => `translate(${d.x0},${d.y0})`);

    collectionNodes
      .append("rect")
      .attr("width", (d) => d.x1 - d.x0)
      .attr("height", (d) => d.y1 - d.y0)
      .style("opacity", 0)
      .on("click", function (e, d) {
        handleTooltip(e, d, tool);
      })
      .on("mousemove", function (e, d) {
        handleTooltip(e, d, tool);
      })
      .on("mouseout", function () {
        tool.style("display", "none");
      });
  }

  useLayoutEffect(() => {
    renderTreemap();
  }, [data]);

  useLayoutEffect(() => {
    renderTreemapTooltip();
  }, [tooltipData, data]);

  return (
    <>
      <div
        style={{
          minWidth: width,
          minHeight: height,
          backgroundColor: "rgb(38,41,49)",
        }}
      >
        <svg
          ref={svgRef}
          className="noselect"
          style={{
            font: "12px sans-serif",
            backgroundColor: "rgb(38,41,49)",
          }}
        />
      </div>
      <TreemapTooltip tooltipRef={tooltipRef} data={tooltipData} />
    </>
  );
}
