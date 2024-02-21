import React from "react";
import "./Filters.css";
import { Autocomplete, TextField } from "@mui/material";
// import { ViewQuilt, AccountTree } from "@mui/icons-material";

const Filters = () => {
  return (
    <div className="filtersContainer">
      {/* <div className="viewSelector">
        VIEW
        <div>
          <ViewQuilt fontSize="small" /> Map
        </div>
        <div>
          <AccountTree fontSize="small" disabled /> Graph
        </div>
      </div> */}
      <div className="filtersTitle">MAP FILTERS</div>
      <div className="filtersList">
        <Autocomplete
          disablePortal
          size="small"
          options={["all", "b", "c"]}
          defaultValue={"all"}
          disableClearable
          disabled
          renderInput={(params) => <TextField {...params} label="Brand" />}
        />
        <Autocomplete
          disablePortal
          options={["all", "b", "c"]}
          defaultValue={"all"}
          size="small"
          disableClearable
          disabled
          renderInput={(params) => <TextField {...params} label="Item Type" />}
        />
        <Autocomplete
          disablePortal
          options={["all", "b", "c"]}
          defaultValue={"all"}
          size="small"
          disableClearable
          disabled
          renderInput={(params) => (
            <TextField {...params} label="Lifecycle Status" />
          )}
        />
        <div className="separator" />
        <Autocomplete
          disablePortal
          options={["x", "b", "c"]}
          defaultValue={"x"}
          size="small"
          disableClearable
          disabled
          renderInput={(params) => <TextField {...params} label="Date" />}
        />
        <Autocomplete
          disablePortal
          options={["MoM", "WoW "]}
          defaultValue={"MoM"}
          size="small"
          disableClearable
          disabled
          renderInput={(params) => (
            <TextField {...params} label="Change Period" />
          )}
        />
        <Autocomplete
          disablePortal
          options={[
            "Revenue",
            "Units Sold",
            "Glance Views",
            "Ad Spend",
            "Ad Sales",
            "Ad Units",
          ]}
          defaultValue={"Revenue"}
          size="small"
          disableClearable
          disabled
          renderInput={(params) => <TextField {...params} label="Metric" />}
        />
      </div>
    </div>
  );
};

export default Filters;
