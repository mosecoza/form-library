"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Select(props) {
  console.log("Select props: ==> ", props);
  let test = props.isAdmin ? !props.regOnBehalf : props.readOnly;
  console.log(test, props.id, "SELECT PROPS ++++++++++++++++++++++++++++++++++++++", props);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "schemeReg_textInput"
  }, /*#__PURE__*/_react.default.createElement("label", {
    "data-testid": "select-label",
    htmlFor: props.id,
    className: props.required ? "required" : null
  }, props.label), /*#__PURE__*/_react.default.createElement("select", {
    "data-testid": "select-input",
    onChange: props.handle,
    value: props.value,
    name: props.id,
    id: props.id,
    onInvalid: props.handle,
    required: props.required ? props.required : false,
    defaultValue: props.default ? props.default : "",
    disabled: test
  }, /*#__PURE__*/_react.default.createElement("option", {
    value: "",
    disabled: true,
    defaultValue: "Select option"
  }, "Select option"), props.data ? props.data.map((entry, i) => props.isAdmin ? props.regOnBehalf ? /*#__PURE__*/_react.default.createElement("option", {
    "data-testid": "select-option",
    style: {
      color: "#000",
      backgroundColor: "#fff"
    },
    key: entry.value + "_" + i,
    value: entry.value // disabled

  }, entry.label) : /*#__PURE__*/_react.default.createElement("option", {
    "data-testid": "select-option",
    style: {
      color: "#000",
      backgroundColor: "#fff"
    },
    key: entry.value + "_" + i,
    value: entry.value,
    disabled: true
  }, entry.label) //  (
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
  : /*#__PURE__*/_react.default.createElement("option", {
    "data-testid": "select-option",
    style: {
      color: "#000",
      backgroundColor: "#fff"
    },
    key: entry.value + "_" + i,
    value: entry.value
  }, entry.label)) : /*#__PURE__*/_react.default.createElement("option", {
    value: "Options Not Provided"
  }, "Options Not Provided")), /*#__PURE__*/_react.default.createElement("div", {
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
}

var _default = Select;
exports.default = _default;