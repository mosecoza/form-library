import { useEffect, useState } from "react";

const TextArea = (props) => {
  const [inputError, setInputError] = useState(props.error);

  useEffect(() => {
    if (props.error && props.validationString) {
      if (props.error === " is not valid") {
        setInputError(props.validationString);
      }
    } else {
      setInputError(props.error);
    }
  }, [props.error]);

  return (
    <div className="schemeReg_textInput">
      {props.label ? (
        <p
          data-testid="default-input-label"
          htmlFor={props.id}
          className={props.required ? "required" : null}
        >
          {props.label}
        </p>
      ) : null}

      <textarea
        className="schemeAction_ta"
        id={props.id}
        name={props.id}
        data-testid="default-input"
        pattern={props.pattern ? props.pattern : null}
        value={props.value}
        onChange={props.handle}
        required={props.required}
        readOnly={props.readOnly}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          width: "100%",
          margin: 0,
          padding: 0,
        }}
      >
        {inputError ? (
          <span style={{ fontSize: "0.6rem", color: "#FF0000" }}>{`${
            props.label ? props.label : null
          } ${inputError}`}</span>
        ) : null}
      </div>
    </div>
  );
};

export default TextArea;
