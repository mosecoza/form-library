import React from "react";
import FormInputs from "../FormInputs/FormInputs";

function DateRange(props) {
  console.log("DateRange props: ==> ", props);
  return (
    <div className="schemeReg_textInput">
      <label htmlFor={props.id} className={props.required ? "required" : null}>
        {props.label}
      </label>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <FormInputs
          isAdmin={props.isAdmin}
          id={props.id + ".from"}
          handle={props.handle}
          value={props.value.from}
          type="date"
          label="from"
          readOnly={props.readOnly}
          regOnBehalf={props.regOnBehalf}
        />
        <FormInputs
          isAdmin={props.isAdmin}
          id={props.id + ".to"}
          handle={props.handle}
          value={props.value.to}
          type="date"
          label="to"
          regOnBehalf={props.regOnBehalf}
        />
      </div>
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
          <span style={{ fontSize: "0.6rem", color: "#FF0000" }}>{`${
            props.label ? props.label : null
          } ${props.error}`}</span>
        ) : null}
      </div>
    </div>
  );
}

export default DateRange;
