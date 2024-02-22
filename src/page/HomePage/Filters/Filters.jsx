import React from "react";
import "./Filters.css";
import sectionData from "../../../client/sectionData.mock.json";
import Filter from "./Filter/Filter";

const FiltersConfig = [
  {
    key: "brand",
    label: "Brand",
    options: ["All", "DV", "CDV", "BL", "NAMESAKE", "MDBF", "NW", "UB"],
  },
  {
    key: "itemType",
    label: "Item Type",
    options: ["All", ...sectionData.flatMap((x) => x.itemType)],
  },
  {
    key: "lifeCycleStatus",
    label: "Lifecycle Status",
    options: ["All", "Active", "Disco"],
  },
  {
    separator: true,
  },
  {
    label: "Date",
    options: ["x", "b", "c"],
    defaultValue: "x",
    disabled: true,
  },
  {
    label: "Change Period",
    options: ["MoM", "WoW "],
    defaultValue: "MoM",
    disabled: true,
  },
  {
    label: "Metric",
    options: [
      "Revenue",
      "Units Sold",
      "Glance Views",
      "Ad Spend",
      "Ad Sales",
      "Ad Units",
    ],
    defaultValue: "Revenue",
    disabled: true,
  },
];

const Filters = ({ setFilters }) => {
  return (
    <div className="filtersContainer">
      <div className="filtersTitle">MAP FILTERS</div>
      <div className="filtersList">
        {FiltersConfig.map(
          ({ key, label, options, separator, defaultValue, disabled }) => {
            if (separator) return <div className="separator" />;
            return (
              <Filter
                key={key}
                label={label}
                options={options}
                defaultValue={defaultValue}
                disabled={disabled}
                onChange={(x) => setFilters(key, x)}
              />
            );
          }
        )}
      </div>
    </div>
  );
};

export default Filters;
