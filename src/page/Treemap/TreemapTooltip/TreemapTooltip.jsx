import React from "react";
import "./TreemapTooltip.css";
import { SparkLineChart } from "@mui/x-charts";
import { getChangeColor, getChangeFormat } from "../../../utils/fx";

const TreemapTooltip = ({ tooltipRef, data }) => {
  if (!data) return null;

  const tooltipTitle = data.parentName
    ? `${data.parentName} - ${data.name}`
    : data.name;

  const childrens =
    data.children.length > 1
      ? [data.currentData, ...data.children]
      : [data.currentData];

  return (
    <div ref={tooltipRef} className="tooltip">
      <h3 className="tooltipTitle"> {tooltipTitle} </h3>
      <table className="table">
        <tbody>
          {childrens.map((x, idx) => {
            const isHovered = idx === 0;
            const backgroundColor = isHovered
              ? getChangeColor(x.change)
              : "#fff";
            return (
              <>
                <tr
                  className={isHovered ? "hovered" : ""}
                  style={{ backgroundColor }}
                >
                  <TableRow data={x} isHovered={isHovered} />
                </tr>
                {isHovered && (
                  <tr className="hovered" style={{ backgroundColor }}>
                    <td colSpan={4} className="description">
                      {x.description}
                    </td>
                  </tr>
                )}
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const TableRow = ({ data, isHovered }) => {
  return (
    <>
      <td className="ticker">{data.ticker}</td>
      <td>
        <SparkLineChart
          data={data.graph}
          height={26}
          width={65}
          colors={isHovered ? ["#fff"] : ["#000"]}
        />
      </td>
      <td className="price">{data.price}</td>
      <td
        className="change"
        style={{ color: isHovered ? "#fff" : getChangeColor(data.change) }}
      >
        {getChangeFormat(data.change)}
      </td>
    </>
  );
};

export default TreemapTooltip;
