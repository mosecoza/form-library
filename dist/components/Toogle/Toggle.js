"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

const Toggle = props => {
  console.log("Toggle = (props) => ", props.value);
  const labelClassname = props.value === true ? "toggle-switch-label toggle-switch-active-color" : "toggle-switch-label ";
  return /*#__PURE__*/React.createElement(_react.Fragment, null, /*#__PURE__*/React.createElement("label", {
    "data-testid": "toogle-label"
  }, props.label), /*#__PURE__*/React.createElement("input", {
    className: "toggle-switch-checkbox",
    "data-testid": "toogle-input",
    id: props.id,
    name: props.id,
    type: "checkbox" // name={props.inputNames[props.inputNames.indexOf(props.id)]}
    ,
    value: props.value,
    onChange: props.handle,
    onInvalid: props.handle,
    checked: props.value
  }), /*#__PURE__*/React.createElement("label", {
    className: labelClassname,
    htmlFor: props.id
  }, /*#__PURE__*/React.createElement("p", {
    className: "toggle-switch-no"
  }, "No"), /*#__PURE__*/React.createElement("span", {
    className: "toggle-switch-button"
  }), /*#__PURE__*/React.createElement("p", {
    className: "toggle-switch-yes"
  }, "Yes")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "flex-start",
      width: "100%",
      margin: 0,
      padding: 0
    }
  }, props.error ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "0.6rem",
      color: "#FF0000"
    }
  }, "".concat(props.label ? props.label : null, " ").concat(props.error)) : null));
};

var _default = Toggle;
exports.default = _default;