"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.split.js");

var _react = _interopRequireDefault(require("react"));

var _FormInputs = _interopRequireDefault(require("../FormInputs/FormInputs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const addresses = {
  PHY: 'Physical Address',
  POS: 'Postal Address'
};

function AddressInput(props) {
  if (!props.value.address) return null;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "schemeReg_tabContentLayout"
  }, props.fields.length ? props.fields.map((rows, i) => {
    return /*#__PURE__*/_react.default.createElement("div", {
      id: "address",
      "data-testid": "address-block",
      className: "schemeReg_tabContentSectionOne",
      key: 'row_' + i
    }, /*#__PURE__*/_react.default.createElement("h6", {
      "data-testid": "address-block-title"
    }, props.value.address.length > 0 && addresses[props.value.address[i].type]), rows.map((field, x) => {
      const fieldId = "address.".concat(field.id, ".").concat(i);
      if (!Object.keys(props.value).length) return;
      const [id, key] = field.id.split(".");
      let value;

      if (props.value.address.length > 0) {
        value = key ? props.value.address[i][id][key] : props.value.address[i][id];
      } // let value = key ? props.value.address[i][id][key] : props.value.address[i][id];


      let checkId;

      if (value === undefined) {
        checkId = field.id;
        value = props.value[checkId];
      }

      return /*#__PURE__*/_react.default.createElement(_FormInputs.default, {
        handle: props.handle // data={  props.data ? props.data : field.data}
        ,
        data: field.id === "province" ? field.data ? field.data : props.data : props.data ? props.data : field.data,
        value: value,
        key: field.label + "_field." + x + "." + i,
        name: field.id + "." + i,
        id: checkId ? checkId : fieldId,
        label: field.label,
        type: field.type,
        handleToggle: props.handleToggle,
        pattern: field.pattern ? field.pattern : null,
        error: props.errors ? props.errors[fieldId] : null,
        required: field.required ? field.required : false,
        isAdmin: props.isAdmin,
        readOnly: props.readOnly,
        regOnBehalf: props.regOnBehalf
      });
    }));
  }) : null);
}

var _default = AddressInput;
exports.default = _default;