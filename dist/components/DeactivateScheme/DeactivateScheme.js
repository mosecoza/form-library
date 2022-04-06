"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.regexp.to-string.js");

var _material = require("@mui/material");

var _notistack = require("notistack");

var _react = _interopRequireWildcard(require("react"));

var _reactRouterDom = require("react-router-dom");

var _FetchDrop = require("../../../utils/FetchDrop");

var _FileUploadFunc = require("../../../utils/FileUploadFunc");

var _FormHook = _interopRequireDefault(require("../../../utils/FormHook"));

var _FormDialog = _interopRequireDefault(require("../../UI/FormDialog"));

var _Modal = _interopRequireDefault(require("../../UI/Modal"));

var _DocumentUpload = _interopRequireDefault(require("../DocumentUpload/DocumentUpload"));

var _TextArea = _interopRequireDefault(require("../TextArea/TextArea"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// let deactivateSchemeForm = {};
let labels = {};

const DeactivateSchemeContent = props => {
  console.log(props, "DEACTIVATE SCHEME PROPS");
  const [load, setLoad] = (0, _react.useState)(false);
  let [formDataArray, setFormDataArray] = (0, _react.useState)([]);
  const {
    enqueueSnackbar
  } = (0, _notistack.useSnackbar)();
  const [isLoading, setIsLoading] = (0, _react.useState)(false);
  const [openDialog, setOpenDialog] = (0, _react.useState)(false);
  const [approvedCode, setApprovedCode] = (0, _react.useState)();
  const [canceledCode, setCanceledCode] = (0, _react.useState)();
  const [dialogWording, setDialogWording] = (0, _react.useState)();
  (0, _react.useEffect)(() => {
    if (props.view) {
      (0, _FetchDrop.fetchDrop)("/micro", {
        lookups: ["A_StatusSchReg"]
      }, {
        topic: "REGCS",
        command: "load",
        userid: props.userid
      }).then(function (data) {
        if (data.status === "OK") {
          for (let i in data.data.returns.A_StatusSchReg) {
            switch (data.data.returns.A_StatusSchReg[i].name) {
              case "APP":
                setApprovedCode(data.data.returns.A_StatusSchReg[i].value);
                break;

              case "CAN":
                setCanceledCode(data.data.returns.A_StatusSchReg[i].value);
                break;

              default:
                break;
            }
          }
        }
      }).catch(function (response) {});
    }

    let deactivateSchemeFormTemp = {};
    let docArray = [];
    props.inputs[0].fields.map(input => {
      docArray.push({
        file_name: "",
        id: "",
        type: input.id
      });
    });
    deactivateSchemeFormTemp["docs"] = docArray;
    deactivateSchemeFormTemp["note"] = props.inputs[1];
    console.log(deactivateSchemeFormTemp, "FORM DEACT");
    props.inputs.map(input => labels[input.id] = input.label);
    setLoad(true);
  }, [props.inputs, props.userid, props.view]);

  const submitHandler = event => {
    event.preventDefault();
    setIsLoading(true);
    let notification = {
      message: "Request for Scheme Cancellation has been submitted",
      group: "Admin",
      recipient: "",
      id: ""
    };
    (0, _FileUploadFunc.fileUploadFunc)({
      body: _objectSpread(_objectSpread({}, formState), {}, {
        schemeid: props.schemeid,
        notification: notification
      }),
      formDataArray: formDataArray,
      userid: props.userid,
      uploadCommand: "upload.deactivatescheme"
    }).then(function (response) {
      if (response.status === "OK") {
        setDialogWording(["Cancel Request for Community Scheme successfully submitted", /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement("br", null)]);
        setOpenDialog(true);
        setIsLoading(false);
      } else if (response.status === "SYSFAIL") {
        props.setIsLoading(false);
        enqueueSnackbar([response.message], {
          variant: "error",
          autoHideDuration: 4000,
          anchorOrigin: {
            vertical: "top",
            horizontal: "right"
          }
        });
      }
    }).catch(function (response) {
      if (response.status === "USERFAIL") {
        setIsLoading(false);
        enqueueSnackbar([response.message], {
          variant: "error",
          autoHideDuration: 4000,
          anchorOrigin: {
            vertical: "top",
            horizontal: "right"
          }
        });
      } else {
        setIsLoading(false);
      }
    });
  };

  const handleAccept = event => {
    event.preventDefault();
    setIsLoading(true);
    let notification = {
      message: "Scheme with reference number ".concat(props.schemeid, " has been canceled"),
      group: "",
      recipient: props.userid,
      id: ""
    };

    let body = _objectSpread(_objectSpread({}, formState), {}, {
      schemeid: props.schemeid,
      status: canceledCode,
      notification: notification
    });

    (0, _FetchDrop.fetchDrop)("/micro", _objectSpread({}, body), {
      topic: "REGCS",
      command: "approve.deactivatescheme",
      userid: props.userid
    }).then(function (data) {
      if (data.status === "OK") {
        setDialogWording(["Cancel Request for Community Scheme successfully submitted", /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement("br", null)]);
        setOpenDialog(true);
        setIsLoading(false);
      } else {
        enqueueSnackbar([data.message], {
          variant: "error",
          autoHideDuration: 4000,
          anchorOrigin: {
            vertical: "top",
            horizontal: "right"
          }
        });
        setIsLoading(false);
      }
    }).catch(function (response) {
      enqueueSnackbar([response.message], {
        variant: "error",
        autoHideDuration: 4000,
        anchorOrigin: {
          vertical: "top",
          horizontal: "right"
        }
      });
      setIsLoading(false);
    });
  };

  const handleDecline = event => {
    event.preventDefault();
    let notification = {
      message: "Scheme with reference number ".concat(props.schemeid, " has not been canceled"),
      group: "",
      recipient: props.userid,
      id: ""
    };

    let body = _objectSpread(_objectSpread({}, formState), {}, {
      schemeid: props.schemeid,
      status: approvedCode,
      notification: notification
    });

    (0, _FetchDrop.fetchDrop)("/micro", _objectSpread({}, body), {
      topic: "REGCS",
      command: "approve.deactivatescheme",
      userid: props.userid
    }).then(function (data) {
      if (data.status === "OK") {
        setDialogWording(["Cancel Request for Community Scheme successfully declined", /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement("br", null)]);
        setOpenDialog(true);
        setIsLoading(false);
      } else {
        enqueueSnackbar([data.message], {
          variant: "error",
          autoHideDuration: 4000,
          anchorOrigin: {
            vertical: "top",
            horizontal: "right"
          }
        });
        setIsLoading(false);
      }
    }).catch(function (response) {
      enqueueSnackbar([response.message], {
        variant: "error",
        autoHideDuration: 4000,
        anchorOrigin: {
          vertical: "top",
          horizontal: "right"
        }
      });
      setIsLoading(false);
    });
  };

  const {
    formState,
    handleFileUpload,
    handleInputChange
  } = (0, _FormHook.default)(props.state);

  const renderInputs = () => {
    if (load) {
      return /*#__PURE__*/_react.default.createElement(_react.Fragment, null, /*#__PURE__*/_react.default.createElement(_react.Suspense, {
        fallback: /*#__PURE__*/_react.default.createElement("div", null, "Loading IdentityAndAccessManagement...")
      }, /*#__PURE__*/_react.default.createElement(_DocumentUpload.default, {
        value: formState,
        tableHeaders: props.inputs[0].tableHeaders,
        handle: handleFileUpload,
        fields: props.inputs[0].fields,
        schemeid: props.schemeid,
        userid: props.userid.toString(),
        view: props.view,
        formDataArray: formDataArray,
        setFormDataArray: setFormDataArray,
        creatorID: props.creatorID
      })), /*#__PURE__*/_react.default.createElement(_material.Box, {
        id: "adminActions-actionsContainer",
        className: "schemeAction_parent"
      }, /*#__PURE__*/_react.default.createElement(_material.Box, {
        className: "schemeReg_actionsTextAreaContainer"
      }, /*#__PURE__*/_react.default.createElement(_TextArea.default, {
        key: "test",
        id: "note",
        type: "textarea",
        value: formState["note"],
        handle: handleInputChange,
        required: true,
        label: "Add reason" //   error={formErrors[input.id]}
        ,
        isAdmin: props.isAdmin,
        readOnly: props.view
      })), /*#__PURE__*/_react.default.createElement(_material.Box, {
        className: "schemeReg_actionsBTNSContainer"
      }, props.view ? /*#__PURE__*/_react.default.createElement(_react.Fragment, null, /*#__PURE__*/_react.default.createElement(_material.Button, {
        "data-testid": "tabs-submit-form-button",
        variant: "contained",
        onClick: handleAccept
      }, "Accept"), /*#__PURE__*/_react.default.createElement(_material.Button, {
        "data-testid": "tabs-submit-form-button",
        variant: "contained",
        onClick: handleDecline
      }, "Decline")) : /*#__PURE__*/_react.default.createElement(_material.Button, {
        type: "submit",
        "data-testid": "tabs-submit-form-button",
        variant: "contained"
      }, "Submit Form"))));
    }
  };

  return /*#__PURE__*/_react.default.createElement(_react.Fragment, null, /*#__PURE__*/_react.default.createElement(_Modal.default, {
    open: isLoading
  }), /*#__PURE__*/_react.default.createElement("form", {
    onSubmit: submitHandler
  }, renderInputs()), /*#__PURE__*/_react.default.createElement(_FormDialog.default, {
    open: openDialog,
    text: dialogWording,
    cancel: false,
    buttons: props.admin ? /*#__PURE__*/_react.default.createElement(_reactRouterDom.NavLink, {
      to: "/admin"
    }, /*#__PURE__*/_react.default.createElement(_material.Button, {
      key: "home"
    }, "Home")) : /*#__PURE__*/_react.default.createElement(_reactRouterDom.NavLink, {
      to: "/portal"
    }, /*#__PURE__*/_react.default.createElement(_material.Button, {
      key: "home"
    }, "Home"))
  }));
};

var _default = DeactivateSchemeContent;
exports.default = _default;