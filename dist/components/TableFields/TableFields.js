"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.promise.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.split.js");

var _react = _interopRequireWildcard(require("react"));

var _material = require("@mui/material");

var _Close = _interopRequireDefault(require("@mui/icons-material/Close"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function TableFields(props) {
  const [fields, setFields] = (0, _react.useState)([]);
  const [load, setLoad] = (0, _react.useState)(false);
  const [showButtons, setShowButtons] = (0, _react.useState)(true);
  console.log(props, "TABLE PROPS");
  (0, _react.useEffect)(() => {
    setShowButtons(props.isAdmin ? props.regOnBehalf : true);

    if (props.tabId === "excom") {
      let newFields;
      console.log(props, "TABLE VALUES");

      if (props.value && props.value["excoms"].length) {
        newFields = fnGenerateFields(props.value["excoms"].length);
        setFields(newFields);
      }
    }

    fnCreateFields();
  }, []);
  (0, _react.useEffect)(() => {
    console.log(fields, "Use effect");
  }, [fields]);

  const fnCreateFields = async () => {
    let newFields;

    if (props.tabId === "excom") {
      if (props.value && props.value["excoms"].length) {
        newFields = fnGenerateFields(props.value["excoms"].length);
        setFields(newFields);
      } else {
        setFields(props.value["excoms"]);
      }
    } else if (props.value && props.value.length) {
      newFields = fnGenerateFields(props.value.length);
      setFields(newFields);
    } else {
      setFields([props.fields]);
    } // props.initState();

  };

  const fnAddFields = () => {
    props.addField();
    setFields([...fields, props.fields]);
  };

  function fnGenerateFields(n) {
    const ar = Array(n).fill({}).map(each => props.fields);
    setLoad(true);
    setFields(ar);
    return ar;
  }

  function fnHandleRemove(index) {
    fields.splice(index, 1);
    setFields([...fields]);
    props.handleRemoveTableField(index);
  } // console.log(fields, "TBALE CREATED FIELDS",)


  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_material.Paper, null, /*#__PURE__*/_react.default.createElement(_material.Table, {
    "aria-label": "customized table"
  }, /*#__PURE__*/_react.default.createElement(_material.TableHead, null, props.fields.map((field, index) => /*#__PURE__*/_react.default.createElement(_material.TableCell, {
    className: "register_table-head-field",
    key: field.label + "_header",
    "data-testid": "input-table-header-cell",
    padding: field.type
  }, field.label)), /*#__PURE__*/_react.default.createElement(_material.TableCell, {
    className: "register_table-head-field"
  }, "Remove")), /*#__PURE__*/_react.default.createElement("tbody", null, fields.length ? fields.map((rows, i) => {
    return /*#__PURE__*/_react.default.createElement(_material.TableRow, {
      "data-testid": "input-table-row",
      key: "row_" + i
    }, rows.map((field, x) => {
      // console.log('rows.map((field, x) => ', field);
      // console.log('rows.map((field, x) field.required => ', field.required);
      // console.log('props => ', props);
      // console.log(
      //   props.value.excoms,
      //   "TABLE VALUE FIELD",
      //   fields
      // );
      if (!Object.keys(props.value).length) return;
      const [id, key] = field.id.split(".");
      let flag = false;

      if (field.type === "checkbox") {
        console.log(props, "EXCOM PROPS");
        flag = true;
      }

      let value;

      if (props.tabId === "excom") {
        value = key ? props.value.excoms[i][id][key] : props.value.excoms[i][id];
      } else {
        value = key ? props.value[i][id][key] : props.value[i][id];
      }

      console.log(value, field.type, "TABLEFIELD VALUE PROP");
      return /*#__PURE__*/_react.default.createElement(_material.TableCell, {
        className: "".concat(x ? "" : "table-body-1st-column"),
        "data-testid": "input-table-cell",
        key: field.id
      }, /*#__PURE__*/_react.default.createElement("input", {
        key: field.label + "_field." + x + "." + i,
        id: field.id + "." + i,
        name: field.id + "." + i,
        type: field.type,
        value: load && value,
        placeholder: "".concat(field.label, " ").concat(props.errors && props.errors[field.id + "." + i] ? props.errors[field.id + "." + i] : ""),
        onChange: props.handle,
        onInvalid: props.handle,
        "data-testid": "input-table-field",
        pattern: field.pattern ? field.pattern : null,
        required: field.required ? field.required : false,
        checked: flag && value,
        readOnly: props.isAdmin ? props.regOnBehalf ? props.readOnly : true : props.readOnly,
        disabled: props.isAdmin ? props.regOnBehalf ? props.readOnly : true : props.readOnly
      }));
    }), props.tabId === "excom" && props.value.excoms[i] ? /*#__PURE__*/_react.default.createElement(_material.TableCell, null, /*#__PURE__*/_react.default.createElement(_material.Tooltip, {
      "data-testid": "input-table-row-delete-tootlTip",
      title: "Remove ".concat(props.value[i] ? props.value[i].name : "")
    }, /*#__PURE__*/_react.default.createElement(_material.IconButton, {
      "data-testid": "input-table-row-delete",
      onClick: () => fnHandleRemove(i),
      color: "error",
      size: "small",
      edge: "end",
      "aria-label": "remove director"
    }, /*#__PURE__*/_react.default.createElement(_Close.default, null)))) : null);
  }) : null))), showButtons && /*#__PURE__*/_react.default.createElement("div", {
    className: "schemeReg_tableButtonBar"
  }, /*#__PURE__*/_react.default.createElement(_material.Button, {
    type: "button",
    onClick: fnAddFields
  }, "Add Member")));
}

var _default = TableFields;
exports.default = _default;