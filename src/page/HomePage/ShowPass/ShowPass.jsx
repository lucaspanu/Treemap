import React from "react";
import "./ShowPass.css";
import { TextField } from "@mui/material";

const ShowPass = ({ setShowPass }) => {
  const handleInputChange = (e) => {
    if (e.target.value === "mdbshopsight") setShowPass(false);
  };

  return (
    <div className="passContainer">
      <TextField
        id="standard-basic"
        label="Password"
        variant="outlined"
        onChange={handleInputChange}
        sx={{
          input: { color: "white" },
        }}
      />
    </div>
  );
};

export default ShowPass;
