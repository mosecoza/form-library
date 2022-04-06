"use strict";

require("core-js/modules/es.object.assign.js");

require("core-js/modules/es.promise.js");

var _react = require("@testing-library/react");

var _AddressInput = _interopRequireDefault(require("./AddressInput"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const testData = {
  type: "address",
  fields: [[{
    id: "municipality",
    type: "text",
    value: "",
    required: true,
    label: "Municipality"
  }, {
    id: "city",
    type: "text",
    value: "",
    required: true,
    label: "City"
  }, {
    id: "suburb",
    type: "text",
    value: "",
    required: true,
    label: "Suburb"
  }], [{
    id: "postl_add_line_1",
    type: "text",
    value: "",
    required: true,
    label: "Postal Address Line 1"
  }, {
    id: "postl_add_line_2",
    type: "text",
    value: "",
    required: true,
    label: "Postal Address Line 2"
  }, {
    id: "postl_add_line_3",
    type: "text",
    value: "",
    required: true,
    label: "Postal Address Line 3"
  }, {
    id: "postal_code",
    type: "number",
    value: "",
    required: true,
    label: "Postal Code"
  }]]
};
const value = {
  address: [{
    municipality: "",
    city: "",
    suburb: ''
  }, {
    postl_add_line_1: "",
    postl_add_line_2: "",
    postl_add_line_3: "",
    postal_code: ""
  }]
};
test('creates address inputs', async () => {
  (0, _react.render)( /*#__PURE__*/React.createElement(_AddressInput.default, _extends({}, testData, {
    value: value
  }))); // Click button
  //   fireEvent.click(screen.getByText(/'address'/i))
  // Wait for page to update with query text

  const items = _react.screen.queryAllByTestId('default-input');

  expect(items).toHaveLength(7);
});