"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const CheckBox = props => {
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "schemeReg_textInput"
  }, props.label ? /*#__PURE__*/_react.default.createElement("label", {
    className: props.required ? "required" : null,
    "data-testid": "checkbox-label",
    dangerouslySetInnerHTML: {
      __html: props.label
    }
  }) : null, /*#__PURE__*/_react.default.createElement("input", {
    id: props.id,
    name: props.id,
    type: "checkbox",
    "data-testid": "checkbox-input",
    required: props.required,
    onInvalid: e => e.currentTarget.setCustomValidity(props.validationString ? props.validationString : '') // name={props.inputNames[props.inputNames.indexOf(props.id)]}
    ,
    onChange: props.handleToggle ? props.handleToggle : props.handle,
    checked: props.value ? props.value : null,
    disabled: props.isAdmin ? props.regOnBehalf ? props.readOnly : true : props.readOnly
  }), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "flex-start",
      width: "100%",
      margin: 0,
      padding: 0
    }
  }, props.error ? /*#__PURE__*/_react.default.createElement("span", {
    style: {
      fontSize: "0.6rem",
      color: "#FF0000"
    }
  }, "".concat(props.label ? props.label : null, " ").concat(props.error)) : null));
};

var _default = CheckBox;
exports.default = _default;