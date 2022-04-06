"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _FormInputs = _interopRequireDefault(require("../FormInputs/FormInputs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function DateRange(props) {
  console.log("DateRange props: ==> ", props);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "schemeReg_textInput"
  }, /*#__PURE__*/_react.default.createElement("label", {
    htmlFor: props.id,
    className: props.required ? "required" : null
  }, props.label), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%"
    }
  }, /*#__PURE__*/_react.default.createElement(_FormInputs.default, {
    isAdmin: props.isAdmin,
    id: props.id + ".from",
    handle: props.handle,
    value: props.value.from,
    type: "date",
    label: "from",
    readOnly: props.readOnly,
    regOnBehalf: props.regOnBehalf
  }), /*#__PURE__*/_react.default.createElement(_FormInputs.default, {
    isAdmin: props.isAdmin,
    id: props.id + ".to",
    handle: props.handle,
    value: props.value.to,
    type: "date",
    label: "to",
    regOnBehalf: props.regOnBehalf
  })), /*#__PURE__*/_react.default.createElement("div", {
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

var _default = DateRange;
exports.default = _default;