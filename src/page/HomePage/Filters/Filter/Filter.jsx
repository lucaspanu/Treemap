import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import "./Filter.css";

const Filter = ({
  label,
  options,
  onChange,
  value,
  defaultValue,
  disabled,
}) => {
  const handleChange = (e) => {
    if (e.target.value === "All") return onChange(null);
    onChange(e.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="select-label" size="small">
        {label}
      </InputLabel>
      <Select
        labelId="select-label"
        id="simple-select"
        value={value}
        label={label}
        onChange={handleChange}
        displayEmpty
        defaultValue={defaultValue || "All"}
        disabled={disabled}
        size="small"
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option === "All" ? <em>All</em> : option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Filter;
