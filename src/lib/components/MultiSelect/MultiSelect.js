// @ts-check
import React from "react";
import PropTypes from "prop-types";
import { FormControl } from "@mui/material";
function MultiSelect({
  value,
  id,
  multiple,
  handle,
  error,
  required,
  data,
  label,
}) {
  return (
    <FormControl className="schemeReg_textInput">
      <label htmlFor={id} className={required ? "required" : null}>
        {label}
      </label>
      <select
        value={value}
        id={id}
        data-testid="select-input"
        onChange={handle}
        onInvalid={handle}
        size={data.length + 1}
        multiple={multiple}
        required={required ? required : false}
      >
        {/* <option disabled selected value="Select Option">Select Option</option> */}

        <option value="" disabled defaultValue="Select option">
          Select option
        </option>

        {data ? (
          data.map((entry, i) => (
            <option
              data-testid="select-option"
              style={{ color: "#000" }}
              key={entry.value + "_" + i}
              value={entry.value}
            >
              {entry.label}
            </option>
          ))
        ) : (
          <option value="Options Not Provided">Options Not Provided</option>
        )}
      </select>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          width: "100%",
          margin: 0,
          padding: 0,
        }}
      >
        {error ? (
          <span style={{ fontSize: "0.6rem", color: "#FF0000" }}>{`${
            label ? label : null
          } ${error}`}</span>
        ) : null}
      </div>
    </FormControl>
  );
}

export default MultiSelect;

MultiSelect.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.array.isRequired,
  multiple: PropTypes.bool.isRequired,
  handle: PropTypes.func.isRequired,
  required: PropTypes.bool.isRequired,
  data: PropTypes.array.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
};
