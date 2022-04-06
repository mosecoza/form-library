"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _material = require("@mui/material");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// @ts-check
function MultiSelect(_ref) {
  let {
    value,
    id,
    multiple,
    handle,
    error,
    required,
    data,
    label
  } = _ref;
  return /*#__PURE__*/_react.default.createElement(_material.FormControl, {
    className: "schemeReg_textInput"
  }, /*#__PURE__*/_react.default.createElement("label", {
    htmlFor: id,
    className: required ? "required" : null
  }, label), /*#__PURE__*/_react.default.createElement("select", {
    value: value,
    id: id,
    "data-testid": "select-input",
    onChange: handle,
    onInvalid: handle,
    size: data.length + 1,
    multiple: multiple,
    required: required ? required : false
  }, /*#__PURE__*/_react.default.createElement("option", {
    value: "",
    disabled: true,
    defaultValue: "Select option"
  }, "Select option"), data ? data.map((entry, i) => /*#__PURE__*/_react.default.createElement("option", {
    "data-testid": "select-option",
    style: {
      color: "#000"
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
  }, error ? /*#__PURE__*/_react.default.createElement("span", {
    style: {
      fontSize: "0.6rem",
      color: "#FF0000"
    }
  }, "".concat(label ? label : null, " ").concat(error)) : null));
}

var _default = MultiSelect;
exports.default = _default;
MultiSelect.propTypes = {
  id: _propTypes.default.string.isRequired,
  value: _propTypes.default.array.isRequired,
  multiple: _propTypes.default.bool.isRequired,
  handle: _propTypes.default.func.isRequired,
  required: _propTypes.default.bool.isRequired,
  data: _propTypes.default.array.isRequired,
  label: _propTypes.default.string.isRequired,
  error: _propTypes.default.string
};