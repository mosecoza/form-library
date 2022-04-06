"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = FormInputs;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _CheckBox = _interopRequireDefault(require("../CheckBox/CheckBox"));

var _FileUpload = _interopRequireDefault(require("../FileUpload/FileUpload"));

var _MultiSelect = _interopRequireDefault(require("../MultiSelect/MultiSelect"));

var _Select = _interopRequireDefault(require("../Select/Select"));

var _Text = _interopRequireDefault(require("../Text/Text"));

var _TextArea = _interopRequireDefault(require("../TextArea/TextArea"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @component
 * The component renders a <div> element when the parent context is a header or otherwise a <td> element.
 *
 * @prop {Object}             input          - The props for the input.
 * @property {string}         input.id       - The id of the input or the input array or object used to target the input.
 * @property {string}         input.type     - The type is used to render the right input, i.e select, multiple-select, table, text.
 * @property {string}         input.label    - The text to label the input.
 * @property {bool}           input.required - This value determines if the input will have the HTML5 generic validation or not.
 * @property {array}          data           - This is the array for select fields
 * @property {string | object}error          - This is a runtime value, onChange or onSubmit
 * @property {func}           handle         - Function to change the state of the input, onchange / onChange
 * @property {string}         pattern        - This regex string enable HTML5 validation and .
 * @property {any}            value          - This is a runtime value, set by the user
 *
 * @example
 * <FormInputs
 * id="password"
 * type="password"
 * label="Password"
 * error={this.state.errors.password}
 * pattern='[a-zA-Z0-9!@#$%^&* ]{8,24}'
 * value={this.state.password}
 * handle={(e)=>this.setState((oldState)=>{...oldState, password:e.currentTarget.value})}
 * />
 *
 * @returns HTMLInputElement | HTMLElement
 */
function FormInputs(input) {
  switch (input.type) {
    case "select":
      return /*#__PURE__*/_react.default.createElement(_Select.default, input);

    case "checkbox":
      return /*#__PURE__*/_react.default.createElement(_CheckBox.default, input);

    case "file":
      return /*#__PURE__*/_react.default.createElement(_FileUpload.default, input);

    case "multi-select":
      return /*#__PURE__*/_react.default.createElement(_MultiSelect.default, input);

    case "textarea":
      return /*#__PURE__*/_react.default.createElement(_TextArea.default, input);

    default:
      return /*#__PURE__*/_react.default.createElement(_Text.default, input);
  }
}

FormInputs.propTypes = {
  type: _propTypes.default.string.isRequired,
  id: _propTypes.default.string.isRequired,
  handle: _propTypes.default.func.isRequired,
  required: _propTypes.default.bool.isRequired,
  value: _propTypes.default.any.isRequired,
  label: _propTypes.default.string,
  pattern: _propTypes.default.string,
  error: _propTypes.default.any,
  data: _propTypes.default.array
};