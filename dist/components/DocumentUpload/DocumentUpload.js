"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.replace.js");

require("core-js/modules/es.string.split.js");

require("core-js/modules/es.string.includes.js");

require("core-js/modules/es.promise.js");

require("core-js/modules/web.url.js");

require("core-js/modules/web.url-search-params.js");

var _material = require("@mui/material");

var _react = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

//@ts-check
const DocumentUpload = props => {
  // console.log(props, "DOCUMENT PROPS");
  const [id, setId] = (0, _react.useState)("");
  const [uploadedFile, setUploadedFile] = (0, _react.useState)([]);

  const changeHandler = event => {
    event.preventDefault();
    const fsize = event.target.files[0].size;
    const file = Math.round(fsize / 1024); // if (file > 2048) {
    //   enqueueSnackbar(["The selected file is too large, maximum size is 2MB"], {
    //     variant: "error",
    //     autoHideDuration: 4000,
    //     anchorOrigin: {
    //       vertical: "top",
    //       horizontal: "right",
    //     },
    //   });
    //   return;
    // }

    setUploadedFile(state => [...state, {
      id: id,
      fileName: event.target.files[0]
    }]);
    props.handle(event, id);
    let flag = false;

    for (let x in props.formDataArray) {
      //if the document type has already been uploaded, set flag to true
      if (props.formDataArray[x].documentType === id) {
        flag = true;
      }
    } //only allow documents that haven't been uploaded already to be set in the array


    if (!flag) {
      props.setFormDataArray(state => [...state, {
        file: event.target.files[0],
        newName: event.target.files[0].name.replace(/\s/g, "")
      }]);
    }
  };

  const clickFile = event => {
    setId(id => id = event.target.id);
    document.getElementById("".concat(event.target.id, "_input")).click();
  };

  const viewFile = event => {
    let viewId = event.target.id.split("_")[0];

    if (uploadedFile.length === 0) {
      let fileName = props.value.docs.find(_ref => {
        let {
          type
        } = _ref;
        return event.target.id.includes(type);
      }).file_name;
      let id = props.creatorID ? props.creatorID : props.userid;
      let fileUrl = "/micro/downloads/csos-openId/FU/" + id + "/" + props.schemeid + "/" + fileName;
      props.setIsLoading(true);
      fetch(fileUrl).then(resp => {
        if (resp.ok) {
          let respUrl = resp.url;
          let link = document.createElement("a");
          document.body.appendChild(link); // link.style = "display: none";

          link.href = respUrl;
          link.target = "_blank";
          link.click();
          props.setIsLoading(false);
        } else {
          throw new Error("Error downloading file. Please try again later");
        }
      }).catch(error => {
        props.setIsLoading(false); // enqueueSnackbar([error.message], {
        //   variant: "error",
        //   autoHideDuration: 4000,
        //   anchorOrigin: {
        //     vertical: "top",
        //     horizontal: "right",
        //   },
        // });
      });
    } else {
      let objectURL;

      if (objectURL) {
        URL.revokeObjectURL(objectURL);
      }

      objectURL = URL.createObjectURL(uploadedFile.find(_ref2 => {
        let {
          id
        } = _ref2;
        return id === viewId;
      }).fileName);
      let link = document.createElement("a");
      document.body.appendChild(link); // link.style = "display: none";

      link.href = objectURL;
      link.target = "_blank";
      link.click();
    }
  };

  return /*#__PURE__*/_react.default.createElement(_material.Paper, null, /*#__PURE__*/_react.default.createElement(_material.Table, {
    "aria-label": "customized table"
  }, /*#__PURE__*/_react.default.createElement(_material.TableHead, null, /*#__PURE__*/_react.default.createElement(_material.TableRow, null, /*#__PURE__*/_react.default.createElement(_material.TableCell, {
    className: "register_table-head-field"
  }, props.tableHeaders.type), /*#__PURE__*/_react.default.createElement(_material.TableCell, {
    className: "register_table-head-field"
  }, props.tableHeaders.browse), /*#__PURE__*/_react.default.createElement(_material.TableCell, {
    className: "register_table-head-field"
  }, props.tableHeaders.view))), /*#__PURE__*/_react.default.createElement(_material.TableBody, null, /*#__PURE__*/_react.default.createElement(_react.Fragment, {
    key: "row_"
  }, props.fields.map((field, i) => {
    let index = 0;
    let value;

    if (props.value["docs"].length > 0) {
      for (let j in props.value["docs"]) {
        if (props.value["docs"][j] !== undefined) {
          if (field.id === props.value["docs"][j].type) {
            value = props.value["docs"][j].file_name; // console.log(value, "DOCUMENT NAME");
          }
        } else {
          value = undefined;
        }
      }
    }

    if (!field.display) {
      return;
    } else {
      index = i;
    }

    return /*#__PURE__*/_react.default.createElement(_material.TableRow, {
      key: field.id
    }, /*#__PURE__*/_react.default.createElement(_material.TableCell, {
      className: field.required ? "required" : null
    }, field.label), /*#__PURE__*/_react.default.createElement(_material.TableCell, null, /*#__PURE__*/_react.default.createElement("div", {
      className: "fileUpload_button"
    }, !props.view && /*#__PURE__*/_react.default.createElement(_react.Fragment, null, /*#__PURE__*/_react.default.createElement(_material.Button, {
      disabled: props.readOnly,
      id: field.id,
      onClick: clickFile
    }, "Browse..."), /*#__PURE__*/_react.default.createElement("input", {
      // ref={fileRef}
      id: "".concat(field.id, "_input"),
      type: "file",
      name: "file",
      onChange: changeHandler,
      accept: "application/pdf"
    })), /*#__PURE__*/_react.default.createElement("div", null, value !== undefined ? /*#__PURE__*/_react.default.createElement("p", {
      className: "fileUpload_text"
    }, !props.view ? "Uploaded File: ".concat(value) : value) : /*#__PURE__*/_react.default.createElement("p", {
      className: "fileUpload_text"
    }, "No File Selected.")))), /*#__PURE__*/_react.default.createElement(_material.TableCell, null, /*#__PURE__*/_react.default.createElement("div", {
      className: "fileUpload_view_button"
    }, /*#__PURE__*/_react.default.createElement(_material.Button, {
      disabled: value ? false : true,
      id: "".concat(field.id, "_view"),
      onClick: viewFile
    }, "View"))));
  })))));
};

const mapStateToProps = state => {
  return {// schemeid: state.form.form.schemeid,
    // userid: state.form.userid,
    // isLoading: state.form.isLoading,
  };
};

var _default = DocumentUpload;
exports.default = _default;