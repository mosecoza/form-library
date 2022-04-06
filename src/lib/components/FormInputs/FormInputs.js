import PropTypes from "prop-types";
import React from "react";
import CheckBox from "../CheckBox/CheckBox";
import FileUpload from "../FileUpload/FileUpload";
import MultiSelect from "../MultiSelect/MultiSelect";
import Select from "../Select/Select";
import Text from "../Text/Text";
import TextArea from "../TextArea/TextArea";

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
export default function FormInputs(input) {
  switch (input.type) {
    case "select":
      return <Select {...input} />;

    case "checkbox":
      return <CheckBox {...input} />;
    case "file":
      return <FileUpload {...input} />;
    case "multi-select":
      return <MultiSelect {...input} />;
    case "textarea":
      return <TextArea {...input} />;
    default:
      return <Text {...input} />;
  }
}
FormInputs.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  handle: PropTypes.func.isRequired,
  required: PropTypes.bool.isRequired,
  value: PropTypes.any.isRequired,
  label: PropTypes.string,
  pattern: PropTypes.string,
  error: PropTypes.any,
  data: PropTypes.array,
};
