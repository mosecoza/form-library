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

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const AuthorisedRep = props => {
  const [fields, setFields] = (0, _react.useState)([]);
  (0, _react.useEffect)(() => {
    fnCreateFields();
  }, []);

  const fnCreateFields = async () => {
    if (props.value && props.value.length) {
      const newFields = generateFields(props.value.length);
      setFields(newFields);
    } else {
      setFields([props.fields]);
    }
  };

  function generateFields(n) {
    return Array(n).fill({}).map(each => props.fields);
  }

  return /*#__PURE__*/_react.default.createElement(_material.Paper, null, /*#__PURE__*/_react.default.createElement(_material.Table, {
    "aria-label": "customized table"
  }, /*#__PURE__*/_react.default.createElement(_material.TableHead, null, /*#__PURE__*/_react.default.createElement(_material.TableRow, null, /*#__PURE__*/_react.default.createElement(_material.TableCell, {
    className: "register_table-head-field"
  }, props.tableHeaders.name), /*#__PURE__*/_react.default.createElement(_material.TableCell, {
    className: "register_table-head-field"
  }, props.tableHeaders.surname), /*#__PURE__*/_react.default.createElement(_material.TableCell, {
    className: "register_table-head-field"
  }, props.tableHeaders.id), /*#__PURE__*/_react.default.createElement(_material.TableCell, {
    className: "register_table-head-field"
  }, props.tableHeaders.email), /*#__PURE__*/_react.default.createElement(_material.TableCell, {
    className: "register_table-head-field"
  }, props.tableHeaders.tel))), /*#__PURE__*/_react.default.createElement(_material.TableBody, null, fields.length ? fields.map((rows, i) => {
    return /*#__PURE__*/_react.default.createElement(_material.TableRow, {
      "data-testid": "input-table-row",
      key: "row_" + i
    }, rows.map((field, x) => {
      if (field.type === "address") {
        return null;
      }

      if (!Object.keys(props.value).length) return null;
      const [id, key] = field.id.split(".");
      let value;

      if (props.value.hasOwnProperty(field.id) || props.value.hasOwnProperty([id])) {
        value = key ? props.value[id][key] : props.value[field.id];
      }

      return /*#__PURE__*/_react.default.createElement(_material.TableCell, {
        className: "".concat(x ? "" : "table-body-1st-column"),
        "data-testid": "input-table-cell",
        key: field.id
      }, /*#__PURE__*/_react.default.createElement("input", {
        key: field.label + "_field." + x + "." + i,
        id: field.id,
        name: field.id,
        type: field.type,
        value: value,
        required: field.required ? field.required : false,
        placeholder: "".concat(field.label, " ").concat(props.errors && props.errors[field.id + "." + i] ? props.errors[field.id + "." + i] : ""),
        onChange: key ? props.handleIndexed : props.handle,
        "data-testid": "input-table-field",
        pattern: field.pattern ? field.pattern : null,
        readOnly: props.isAdmin ? !props.regOnBehalf : props.readOnly
      }));
    }));
  }) : null)));
};

var _default = AuthorisedRep; // export default DocumentUpload;

exports.default = _default;