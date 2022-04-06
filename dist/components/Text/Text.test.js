"use strict";

require("core-js/modules/es.object.assign.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.promise.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.regexp.constructor.js");

require("core-js/modules/es.regexp.to-string.js");

var _react = require("@testing-library/react");

var _react2 = require("react");

var _Constants = require("../../../utils/Constants");

var _validation = require("../../../utils/validation");

var _Text = _interopRequireDefault(require("./Text"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});
afterEach(() => _react.cleanup);
let input = {
  required: true,
  type: "text",
  placeholder: "Test input",
  id: "test",
  pattern: _Constants.PATTERN_CIPC,
  value: ""
};

function MyInput() {
  const [value, setValue] = (0, _react2.useState)('');
  const [error, setError] = (0, _react2.useState)(null);

  function handleInput(e) {
    e.preventDefault();
    const validate = (0, _validation.validateFields)(e.currentTarget);

    if (validate) {
      setError(validate);
    } else {
      setError(null);
    }

    setValue(e.currentTarget.value);
  }

  return /*#__PURE__*/React.createElement(_Text.default, _extends({}, input, {
    handle: handleInput,
    value: value,
    error: error
  }));
}

const setup = () => {
  const utils = (0, _react.render)( /*#__PURE__*/React.createElement(MyInput, null));
  const input = utils.getByTestId('default-input');
  return _objectSpread({
    input
  }, utils);
}; //:=> text input removes extra invalid characters on ID number


test(':=> text input removes extra invalid characters on ID number', async () => {
  const {
    input
  } = setup(); // fill out the form

  _react.fireEvent.change(input, {
    target: {
      value: new RegExp(input.pattern).exec('65121557230811233')[0]
    }
  });

  expect(input.value).toBe('6512155723081');
}); //:=> text input removes extra invalid characters on CIPC number

test(':=> text input removes extra invalid characters on CIPC number', async () => {
  const {
    input
  } = setup(); // fill out the form

  _react.fireEvent.change(input, {
    target: {
      value: new RegExp(input.pattern).exec('2011/327734/074')[0]
    }
  });

  expect(input.value).toBe('2011/327734/07');
});