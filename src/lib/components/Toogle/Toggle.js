import { Fragment } from "react";

const Toggle = (props) => {
  console.log("Toggle = (props) => ", props.value);
  const labelClassname =
  props.value === true
    ? "toggle-switch-label toggle-switch-active-color"
    : "toggle-switch-label ";
  return (
    <Fragment>
      <label data-testid="toogle-label">{props.label}</label>
      <input
        className="toggle-switch-checkbox"
        data-testid="toogle-input"
        id={props.id}
        name={props.id}
        type="checkbox"
        // name={props.inputNames[props.inputNames.indexOf(props.id)]}
        value={props.value}
        onChange={props.handle}
        onInvalid={props.handle}
        checked={props.value}
      />
      <label className={labelClassname} htmlFor={props.id}>
        <p className="toggle-switch-no">No</p>
        <span className={`toggle-switch-button`} />
        <p className="toggle-switch-yes">Yes</p>
      </label>
      <div style={{display:"flex", justifyContent:"flex-start", width:"100%", margin:0, padding:0}}>
      {props.error?<span style={{fontSize:"0.6rem", color:"#FF0000"}}>{`${props.label?props.label:null} ${props.error}`}</span>:null}

      </div>
     
    </Fragment>
  );
};

export default Toggle;
