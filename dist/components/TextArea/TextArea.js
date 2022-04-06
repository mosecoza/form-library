"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = require("react");

const TextArea = props => {
  const [inputError, setInputError] = (0, _react.useState)(props.error);
  (0, _react.useEffect)(() => {
    if (props.error && props.validationString) {
      if (props.error === " is not valid") {
        setInputError(props.validationString);
      }
    } else {
      setInputError(props.error);
    }
  }, [props.error]);
  return /*#__PURE__*/React.createElement("div", {
    className: "schemeReg_textInput"
  }, props.label ? /*#__PURE__*/React.createElement("p", {
    "data-testid": "default-input-label",
    htmlFor: props.id,
    className: props.required ? "required" : null
  }, props.label) : null, /*#__PURE__*/React.createElement("textarea", {
    className: "schemeAction_ta",
    id: props.id,
    name: props.id,
    "data-testid": "default-input",
    pattern: props.pattern ? props.pattern : null,
    value: props.value,
    onChange: props.handle,
    required: props.required,
    readOnly: props.readOnly
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "flex-start",
      width: "100%",
      margin: 0,
      padding: 0
    }
  }, inputError ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "0.6rem",
      color: "#FF0000"
    }
  }, "".concat(props.label ? props.label : null, " ").concat(inputError)) : null));
};

var _default = TextArea;
exports.default = _default;