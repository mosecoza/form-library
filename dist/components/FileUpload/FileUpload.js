"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const FileUpload = props => {
  const [selectedFile, setSelectedFile] = (0, _react.useState)();
  const [isSelected, setIsSelected] = (0, _react.useState)(false);

  const changeHandler = event => {
    props.handle(event, props.id, props.schemeid);
    setSelectedFile(event.target.files[0]);
    setIsSelected(true);
    let flag = false;
    event.preventDefault();

    for (let x in props.formDataArray) {
      //if the document type has already been uploaded, set flag to true
      if (props.formDataArray[x].documentType === props.documentType) {
        flag = true;
      }
    } //only allow documents that haven't been uploaded already to be set in the array


    if (!flag) {
      props.setFormDataArray(state => [...state, {
        documentType: props.id,
        fileName: event.target.files[0].name,
        file: event.target.files[0]
      }]);
    }
  };

  const fileRef = (0, _react.useRef)(null);

  const clickFile = () => {
    fileRef.current.click();
  };

  return /*#__PURE__*/_react.default.createElement("div", {
    className: "file-upload-inputs",
    id: props.id
  }, /*#__PURE__*/_react.default.createElement("label", {
    className: "schemeReg_tabInputLabel"
  }, props.label), /*#__PURE__*/_react.default.createElement("div", {
    className: "fileUpload_button"
  }, /*#__PURE__*/_react.default.createElement("button", {
    onClick: clickFile
  }, "Browse..."), /*#__PURE__*/_react.default.createElement("input", {
    ref: fileRef,
    id: "getFile",
    type: "file",
    name: "file",
    onChange: changeHandler
  }), props.value.file_name !== "" ? /*#__PURE__*/_react.default.createElement("p", {
    className: "fileUpload_text"
  }, "Uploaded File: ", props.value.file_name) : /*#__PURE__*/_react.default.createElement("p", {
    className: "fileUpload_text"
  }, "No File Selected")));
};

var _default = FileUpload;
exports.default = _default;