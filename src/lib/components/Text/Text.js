//@ts-check
import React, { useEffect, useState } from "react";


//validationString
const Text = (props) => {
  console.log("Text = (props) => ", props);
  const [inputError, setInputError] = useState(props.error);

  useEffect(() => {
    if (props.error && props.validationString) {
      if (props.error === " is not valid") {
        setInputError(props.validationString)
      }
    } else {
      setInputError(props.error)
    }
  }, [props.error])



  return (
    <div className="schemeReg_textInput">
      {props.label ? <label data-testid="default-input-label" htmlFor={props.id} className={props.required ? "required" : null}>{props.label}</label> : null}

      <input
        id={props.id}
        name={props.id}
        type={props.type}
        data-testid="default-input"
        pattern={props.pattern ? props.pattern : null}
        value={props.value ? props.value : ""}
        onChange={props.handle}
        required={props.required ? props.required : false}
        onInvalid={props.handle}
        readOnly={props.isAdmin ? (props.regOnBehalf ? props.readOnly : true) : props.readOnly}
      />

      <div style={{ display: "flex", justifyContent: "flex-start", width: "100%", margin: 0, padding: 0 }}>

        {inputError ? <span style={{ fontSize: "0.6rem", color: "#FF0000" }}>{`${props.label ? props.label : null} ${inputError}`}</span> : null}

      </div>
    </div>
  );
};

export default Text;
