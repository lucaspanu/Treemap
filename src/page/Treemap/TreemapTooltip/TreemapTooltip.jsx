import React from "react";
import "./TreemapTooltip.css";
import {
  getChangeColor,
  getChangeFormat,
  getChangePercentage,
  numberToCurrency,
} from "../../../utils/fx";

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
            const percentage = getChangePercentage(x.revenuePM, x.moM);
            const backgroundColor = isHovered
              ? getChangeColor(percentage)
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
  const percentage = getChangePercentage(data.revenuePM, data.moM);
  return (
    <>
      <td className="collection">{data.collection}</td>
      <td />
      <td className="revenue">{numberToCurrency(data.revenueLM)}</td>
      <td
        className="change"
        style={{
          color: isHovered ? "#fff" : getChangeColor(percentage),
        }}
      >
        {getChangeFormat(percentage)}
      </td>
    </>
  );
};

export default TreemapTooltip;
