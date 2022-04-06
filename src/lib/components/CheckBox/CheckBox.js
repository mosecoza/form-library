import React from 'react'

const CheckBox = (props) => {
  return <div className="schemeReg_textInput">
    {props.label ? <label className={props.required ? "required" : null} data-testid="checkbox-label" dangerouslySetInnerHTML={{ __html: props.label }}></label> : null}
    <input
      id={props.id}
      name={props.id}
      type="checkbox"
      data-testid="checkbox-input"
      required={props.required}
      onInvalid={e => e.currentTarget.setCustomValidity(props.validationString ? props.validationString : '')}
      // name={props.inputNames[props.inputNames.indexOf(props.id)]}
      onChange={props.handleToggle ? props.handleToggle : props.handle}
      checked={props.value ? props.value : null}
      disabled={props.isAdmin ? (props.regOnBehalf ? props.readOnly : true): props.readOnly}
    />
    <div style={{ display: "flex", justifyContent: "flex-start", width: "100%", margin: 0, padding: 0 }}>
      {props.error ? <span style={{ fontSize: "0.6rem", color: "#FF0000" }}>{`${props.label ? props.label : null} ${props.error}`}</span> : null}

    </div>
  </div>
}

export default CheckBox