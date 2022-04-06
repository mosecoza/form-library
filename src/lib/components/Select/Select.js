import React from "react";

function Select(props) {
  let test = props.isAdmin ? !props.regOnBehalf : props.readOnly
  return (
    <div className="schemeReg_textInput">
      <label
        data-testid="select-label"
        htmlFor={props.id}
        className={props.required ? "required" : null}
      >
        {props.label}
      </label>
      <select
        data-testid="select-input"
        onChange={props.handle}
        value={props.value}
        name={props.id}
        id={props.id}
        onInvalid={props.handle}
        required={props.required ? props.required : false}
        defaultValue={props.default ? props.default : ""}
        disabled={test}
      >
        {/* <option disabled selected value="Select Option">Select Option</option> */}
        <option value="" disabled defaultValue="Select option">
          Select option
        </option>

        {props.data ? (
          props.data.map((entry, i) =>
            props.isAdmin ? (props.regOnBehalf ? <option
              data-testid="select-option"
              style={{ color: "#000", backgroundColor: "#fff" }}
              key={entry.value + "_" + i}
              value={entry.value}
            // disabled
            >
              {entry.label}
            </option> : <option
              data-testid="select-option"
              style={{ color: "#000", backgroundColor: "#fff" }}
              key={entry.value + "_" + i}
              value={entry.value}
              disabled
            >
              {entry.label}
            </option>)
              //  (
              //   <option
              //     data-testid="select-option"
              //     style={{ color: "#000", backgroundColor: "#fff" }}
              //     key={entry.value + "_" + i}
              //     value={entry.value}
              //     disabled
              //   >
              //     {entry.label}
              //   </option>
              // ) 
              : (
                <option
                  data-testid="select-option"
                  style={{ color: "#000", backgroundColor: "#fff" }}
                  key={entry.value + "_" + i}
                  value={entry.value}
                >
                  {entry.label}
                </option>
              )
          )
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
        {props.error ? (
          <span style={{ fontSize: "0.6rem", color: "#FF0000" }}>{`${props.label ? props.label : null
            } ${props.error}`}</span>
        ) : null}
      </div>
    </div>
  );
}

export default Select;
