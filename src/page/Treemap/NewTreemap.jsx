/* eslint-disable no-undef */
import React from "react";
import * as d3 from "d3";
import "./NewTreemap.css";
import data from "./data.json";

const Treemap = () => {
  var width = 1040,
    height = 600;

  var color = d3.scale
    .ordinal()
    .range([
      "#8CBAD1",
      "#70D64E",
      "#EF7087",
      "#DDA335",
      "#D981D5",
      "#82CE8C",
      "#839BE6",
      "#C6D445",
      "#C3B66B",
      "D1A7CC",
      "#70D3C5",
      "#DD9692",
    ]);

  var treemap = d3.layout
    .treemap()
    .size([width, height])
    .padding(0.25)
    .value(function (d) {
      return d.size;
    });

  var div = d3
    .select("body")
    .append("div")
    .attr("class", "treemap")
    .style("position", "relative")
    .style("width", width + "px")
    .style("height", height + "px");

  var ledg = d3
    .select("body")
    .append("div")
    .style("position", "relative")
    .style("width", width + "px")
    .style("height", 300 + "px");

  var tool = d3.select("body").append("div").attr("class", "toolTip");

  d3.select(self.frameElement).style("height", height + 300 + "px");
  d3.select(self.frameElement).style("width", width + 20 + "px");

  function formatMoney(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  function roundToTwo(num) {
    return +(Math.round(num + "e+2") + "e-2");
  }
  d3.json(data, function (error, root) {
    if (error) throw error;

    div
      .selectAll(".node")
      .data(treemap.nodes(root))
      .enter()
      .append("div")
      .attr("class", "node")
      .style("left", function (d) {
        return d.x + "px";
      })
      .style("top", function (d) {
        return d.y + "px";
      })
      .style("width", function (d) {
        return Math.max(0, d.dx - 1) + "px";
      })
      .style("height", function (d) {
        return Math.max(0, d.dy - 1) + "px";
      })
      .style("background", function (d) {
        return d.children ? color(d.name) : null;
      })
      .text(function (d) {
        return d.children
          ? null
          : d.dy < 10
          ? null
          : d.dx < 10
          ? null
          : d.name.length < d.dx / 4
          ? d.name + " " + roundToTwo((d.value / 16147370.2) * 100) + "%"
          : d.dy < 25
          ? null
          : d.name.length < d.dx / 2.5
          ? d.name + " " + roundToTwo((d.value / 16147370.2) * 100) + "%"
          : null;
      })
      .on("mousemove", function (d) {
        tool.style("left", d3.event.pageX + 10 + "px");
        tool.style("top", d3.event.pageY - 20 + "px");
        tool.style("display", "inline-block");
        tool.html(
          d.children
            ? null
            : d.name +
                "<br>" +
                " $ " +
                formatMoney(Math.round(d.size * 1000)) +
                " " +
                roundToTwo((d.value / 16147370.2) * 100) +
                "%"
        );
      })
      .on("mouseout", function (d) {
        tool.style("display", "none");
      });
  });

  ledg
    .append("text")
    .style("font-size", "10px")
    .style("position", "absolute")
    .style("text-anchor", "left")
    .attr("class", "source")
    .html(
      "Source: <a target='_blank' href='http://bber.unm.edu/visualizations/for_blogs/2017RecommendVolII.pdf' title='Source PDF'>State of New Mexico Report of the Legislative Finance Committee to the Fifty-Second Legislature Second Session.</a> All funding sources."
    )
    .style("left", "4px")
    .style("top", "2px");

  ledg
    .append("text")
    .style("position", "absolute")
    .style("font-size", "10px")
    .style("text-anchor", "left")
    .attr("class", "attribution")
    .html(
      "Prepared by: Nathan Dobie for UNM Bureau of Business & Economic Research, March 2016"
    )
    .style("left", "4px")
    .style("top", "16px");

  ledg
    .append("text")
    .style("position", "absolute")
    .style("text-anchor", "left")
    .attr("class", "attribution")
    .html("Branch of Government")
    .style("left", "5px")
    .style("top", "34px");

  var ledgColors = [
      "#70D64E",
      "#EF7087",
      "#DDA335",
      "#D981D5",
      "#82CE8C",
      "#839BE6",
      "#C6D445",
      "#C3B66B",
      "#D1A7CC",
      "#70D3C5",
      "#DD9692",
      "#8CBAD1",
    ],
    ledgLabels = [
      "Legislative",
      "Judicial",
      "General Control",
      "Commerce and Industry",
      "Agriculture, Energy, and Natural Resources",
      "Health, Hospitals, and Human Services",
      "Public Safety",
      "Transportation",
      "Other Education",
      "Higher Education",
      "Public School Support",
      "Quasi Government Agencies",
    ];

  for (i = 0; i < 12; i++) {
    ledg
      .append("div")
      .attr("class", "ledg")
      .style("width", "350px")
      .style("height", "15px")
      .style("left", "5px")
      .style("top", function (d) {
        return 55 + 18 * i + "px";
      })
      .text(function (d) {
        return ledgLabels[i];
      })
      .style("background", function (d) {
        return ledgColors[i];
      });
  }
  return <div />;
};

export default Treemap;
