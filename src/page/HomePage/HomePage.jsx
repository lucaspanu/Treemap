import React, { useState } from "react";
import Treemap from "../Treemap/Treemap";
import "./HomePage.css";
import data from "../../client/data.mock.json";
import sectionData from "../../client/sectionData.mock.json";
import { uniq } from "lodash/fp";
import Filters from "./Filters/Filters";

const HomePage = () => {
  const [filters, setFilters] = useState({});
  const hangleSetFilter = (label, value) => {
    setFilters({ ...filters, [label]: value });
  };

  const parsedData = getParsedData(filters);
  const data = { children: parsedData };

  return (
    <div className="pageContainer">
      <Filters setFilters={hangleSetFilter} />
      <Treemap data={data} width={1400} height={800} />
    </div>
  );
};

export default HomePage;

const getParsedData = (filters) => {
  const filtersKeys = Object.keys(filters).filter((x) => filters[x]);
  const filteredData = filtersKeys.length
    ? data.filter((x) =>
        filtersKeys.reduce((acc, fk) => {
          if (fk === "lifeCycleStatus")
            return (
              acc && x[fk].toLowerCase().includes(filters[fk].toLowerCase())
            );
          return acc && x[fk] === filters[fk];
        }, true)
      )
    : data;

  return uniq(sectionData.map((x) => x.parentItemType)).map((parentSection) => {
    return {
      name: parentSection,
      children: filteredData
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
};

const getParentSection = (itemType) =>
  sectionData.find((x) => x.itemType === itemType).parentItemType || "Other";

// - Improvements -
// ZOOM
// hover treemap
// Teemap Title size
// Tooltip performance
// Responsive
