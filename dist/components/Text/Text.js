"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

//@ts-check
//validationString
const Text = props => {
  console.log("Text = (props) => ", props);
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
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "schemeReg_textInput"
  }, props.label ? /*#__PURE__*/_react.default.createElement("label", {
    "data-testid": "default-input-label",
    htmlFor: props.id,
    className: props.required ? "required" : null
  }, props.label) : null, /*#__PURE__*/_react.default.createElement("input", {
    id: props.id,
    name: props.id,
    type: props.type,
    "data-testid": "default-input",
    pattern: props.pattern ? props.pattern : null,
    value: props.value ? props.value : "",
    onChange: props.handle,
    required: props.required ? props.required : false,
    onInvalid: props.handle,
    readOnly: props.isAdmin ? props.regOnBehalf ? props.readOnly : true : props.readOnly
  }), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "flex-start",
      width: "100%",
      margin: 0,
      padding: 0
    }
  }, inputError ? /*#__PURE__*/_react.default.createElement("span", {
    style: {
      fontSize: "0.6rem",
      color: "#FF0000"
    }
  }, "".concat(props.label ? props.label : null, " ").concat(inputError)) : null));
};

var _default = Text;
exports.default = _default;