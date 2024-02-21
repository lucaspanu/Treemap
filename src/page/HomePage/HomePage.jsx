import React from "react";
import Treemap from "../Treemap/Treemap";
import "./HomePage.css";
import data from "../../client/data.mock.json";
import sectionData from "../../client/sectionData.mock.json";
import { uniq } from "lodash/fp";
import Filters from "./Filters/Filters";

const HomePage = () => {
  const parsedData = { children: getParsedData() };

  return (
    <div className="pageContainer">
      <Filters />
      <Treemap data={parsedData} />
    </div>
  );
};

export default HomePage;

const getParsedData = () =>
  uniq(sectionData.map((x) => x.parentItemType)).map((parentSection) => {
    return {
      name: parentSection,
      children: data
        .filter((x) => getParentSection(x.itemType) === parentSection)
        .reduce((acc, x) => {
          // If no item type add it
          if (!acc.some((a) => a.name === x.itemType)) {
            return [...acc, { name: x.itemType, children: [x] }];
          }
          // Else add on children
          const itemTypeIdx = acc.findIndex((a) => a.name === x.itemType);
          acc[itemTypeIdx].children.push(x);
          return acc;
        }, []),
    };
  });

const getParentSection = (itemType) =>
  sectionData.find((x) => x.itemType === itemType).parentItemType || "Other";

// 3 - Performance & tooltip
// Filtros

// - Improvements -
// Teemap Title size
// ZOOM
// hover treemap
// Responsive
