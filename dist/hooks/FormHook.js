"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.json.stringify.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.split.js");

require("core-js/modules/es.object.assign.js");

require("core-js/modules/es.regexp.constructor.js");

require("core-js/modules/es.regexp.to-string.js");

var _react = require("react");

var _validation = require("../utils/validation");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @param {Object} props - These are the form inputs id's e.g {email:'', password: ''}
 * 
 *  
 * @example 
 * 
 * const userRegistrationInit = {email: "", password:"", useCases:[], firstTimeUsingService:true}
 * 
 * const {formState, formErrors, handleInputChange, handleMultiSelect, handleToggleChange } = useFormHook(userRegistrationInit);
 * 
 * return <form>
 * ...
 * 
 * <input
    * id="password" 
    * type="password" 
    * label="Password" 
    * error={formErrors["password"]} 
    * pattern='[a-zA-Z0-9!@#$%^&* ]{8,24}' 
    * value={formState["password"]} 
    * onChange={handleInputChange}
    * onInvalid={handleInputChange}
 * />
 * ...
 * 
 * </form>
 * 
 * @typedef { formState:object, formErrors:object, handleInputChange:(event: React.ChangeEvent<HTMLInputElement>) => void, handleToggleChange:(event: React.ChangeEvent<HTMLInputElement>) => void, handleSelected:(event: React.ChangeEvent<HTMLInputElement>) => void, handleFileUpload:(event: React.ChangeEvent<HTMLInputElement>) => void, handleDateChange:(event: React.ChangeEvent<HTMLInputElement>) => void, handleTableFormField:(event: React.ChangeEvent<HTMLInputElement>) => void, handleAddTableField:(event: React.ChangeEvent<HTMLInputElement>) => void, initTableState:(event: React.ChangeEvent<HTMLInputElement>) => void, handleRemoveTableField:(event: React.ChangeEvent<HTMLInputElement>) => void, handleIndexedInputChange:(event: React.ChangeEvent<HTMLInputElement>) => void, handleMultiSelect:(event: React.ChangeEvent<HTMLInputElement>) => void, handleDateRangeInputChange:(event: React.ChangeEvent<HTMLInputElement>) => void} useFormHookReturns
 * 
 * @returns {useFormHookReturns}
 * 
 */
function useFormHook(props) {
  const [formState, setFormState] = (0, _react.useState)(props);
  const [formErrors, setFormErrors] = (0, _react.useState)({});
  (0, _react.useEffect)(() => {
    if (JSON.stringify(props) !== JSON.stringify(formState)) {
      setFormState(props);
    }
  }, [props]);
  (0, _react.useEffect)(() => {
    if (Object.keys(formErrors).length) {
      Object.keys(formErrors).map(error => {
        if (formErrors[error]) {
          document.getElementById(error).classList.add("invalid-input-value");
        }
      });
    }
  }, [formErrors]);
  (0, _react.useEffect)(() => {
    if (formState.agentvalidation) {
      if (formState.agentvalidation.from && formState.agentvalidation.to) {
        const date1 = new Date(formState.agentvalidation.from);
        const date2 = new Date(formState.agentvalidation.to);
        const diff = (date2.getTime() - date1.getTime()) / (1000 * 60 * 60 * 24);

        if (diff > 0) {
          setFormErrors(_objectSpread(_objectSpread({}, formErrors), {}, {
            agentvalidation: null
          }));
          document.getElementById('agentvalidation').classList.remove("invalid-input-value");
        } else {
          setFormErrors(_objectSpread(_objectSpread({}, formErrors), {}, {
            agentvalidation: "Expiry date is older than issue date"
          }));
        }
      } else {
        setFormErrors(_objectSpread(_objectSpread({}, formErrors), {}, {
          agentvalidation: "both dates are required"
        }));
      }
    }
  }, [formState.agentvalidation]);

  function handleTableFormField(e) {
    const validate = (0, _validation.validateFields)(e.currentTarget);
    validate ? setFormErrors(_objectSpread(_objectSpread({}, formErrors), {}, {
      [e.currentTarget.id]: validate
    })) : delete formErrors[e.currentTarget.id];
    let newValue = e.currentTarget.value;

    if (!validate) {
      e.currentTarget.classList.remove("invalid-input-value");
      e.currentTarget.classList.add("valid-input-value");
    } else {// newValue = new RegExp(e.currentTarget.pattern).exec(e.currentTarget.value)[0]
    }

    const [id, key, index] = e.currentTarget.id.split(".");
    let updatingEntry = {};
    let updatingState = [];

    if (index && formState[id]) {
      let temp = formState[id][index];
      temp = _objectSpread(_objectSpread({}, temp), {}, {
        [key]: newValue
      });
      updatingState = [...formState[id].slice(0, index), temp, ...formState[id].slice(index + 1)];
      updatingEntry = _objectSpread(_objectSpread({}, formState), {}, {
        [id]: updatingState
      });
      setFormState(updatingEntry);
    } else if (index) {
      updatingEntry = _objectSpread(_objectSpread({}, formState[index]), {}, {
        [id]: _objectSpread(_objectSpread({}, formState[index][id]), {}, {
          [key]: newValue
        })
      });
      updatingState = [...formState.slice(0, index), updatingEntry, ...formState.slice(index + 1)];
      setFormState(updatingState);
    } else {
      updatingEntry = _objectSpread(_objectSpread({}, formState[key]), {}, {
        [id]: newValue
      });
      updatingState = [...formState.slice(0, key), updatingEntry, ...formState.slice(key + 1)];
      setFormState(updatingState);
    }
  }

  function handleAddTableField() {
    let temp = {};

    for (let x in props[0]) {
      temp = Object.assign(temp, {
        [x]: ""
      });
    }

    const toUpdate = [...formState, temp];
    setFormState(toUpdate);
  }

  function initTableState() {
    setFormState(props);
  }

  function handleMultiSelect(e) {
    let arr = [];
    arr = [...formState[e.currentTarget.id]];
    const index = arr.indexOf(e.currentTarget.value);

    if (index >= 0) {
      arr.splice(index, 1);
    } else {
      arr.push(e.currentTarget.value);
    }

    setFormState(_objectSpread(_objectSpread({}, formState), {}, {
      [e.currentTarget.id]: arr
    }));

    if (arr.length < 1) {
      setFormErrors(_objectSpread(_objectSpread({}, formErrors), {}, {
        [e.currentTarget.id]: "select at least one option"
      }));
      e.currentTarget.classList.add("invalid-input-value");
    } else {
      setFormErrors(_objectSpread(_objectSpread({}, formErrors), {}, {
        [e.currentTarget.id]: null
      }));
      e.currentTarget.classList.remove("invalid-input-value");
    }
  }

  function handleRemoveTableField(i) {
    try {
      let tmp = [...formState.slice(0, i), ...formState.slice(i + 1)]; // tmp.splice(i, 1)

      setFormState([...tmp]);
    } catch (e) {
      console.log("catch e ", e);
    } // setFormState([...formState])

  }

  function handleInputChange(e) {
    const validate = (0, _validation.validateFields)(e.currentTarget);
    let newValue = e.currentTarget.value;
    validate ? setFormErrors(_objectSpread(_objectSpread({}, formErrors), {}, {
      [e.currentTarget.id]: validate
    })) : delete formErrors[e.currentTarget.id];

    if (!validate) {
      if (e.currentTarget.pattern) {
        newValue = new RegExp(e.currentTarget.pattern).exec(e.currentTarget.value)[0];
      }

      e.currentTarget.classList.remove("invalid-input-value");
      e.currentTarget.classList.add("valid-input-value");
    }

    setFormState(_objectSpread(_objectSpread({}, formState), {}, {
      [e.currentTarget.id]: newValue
    }));
  }

  function handleIndexedInputChange(e) {
    const [id, key] = e.currentTarget.id.split(".");
    let newValue = e.currentTarget.value;
    const validate = (0, _validation.validateFields)(e.currentTarget);
    validate ? setFormErrors(_objectSpread(_objectSpread({}, formErrors), {}, {
      [e.currentTarget.id]: validate
    })) : delete formErrors[e.currentTarget.id];

    if (!validate) {
      e.currentTarget.classList.remove("invalid-input-value");
      e.currentTarget.classList.add("valid-input-value");
      newValue = new RegExp(e.currentTarget.pattern).exec(e.currentTarget.value)[0];
    }

    let temp = formState[id];
    temp = _objectSpread(_objectSpread({}, temp), {}, {
      [key]: newValue
    });
    setFormState(_objectSpread(_objectSpread({}, formState), {}, {
      [id]: temp
    }));
  }

  function handleDateRangeInputChange(e) {
    const [id, key] = e.currentTarget.id.split(".");
    let temp = formState[id];
    temp = _objectSpread(_objectSpread({}, temp), {}, {
      [key]: e.currentTarget.value
    });
    setFormState(_objectSpread(_objectSpread({}, formState), {}, {
      [id]: temp
    }));
  }

  function handleSelected(e) {
    const validate = (0, _validation.validateFields)(e.currentTarget);
    validate ? setFormErrors(_objectSpread(_objectSpread({}, formErrors), {}, {
      [e.currentTarget.id]: validate
    })) : delete formErrors[e.currentTarget.id];

    if (!validate) {
      e.currentTarget.classList.remove("invalid-input-value");
      e.currentTarget.classList.add("valid-input-value");
    }

    setFormState(_objectSpread(_objectSpread({}, formState), {}, {
      [e.currentTarget.id]: e.currentTarget.value
    }));
  }

  function handleFileUpload(e, type, schemeid) {
    setFormState(_objectSpread(_objectSpread({}, formState), {}, {
      [type]: {
        file_name: e.target.files[0].name,
        user_id: localStorage.getItem("user_id"),
        schemeid: schemeid,
        date_uploaded: new Date()
      }
    }));
  }

  function handleToggleChange(e) {
    const validate = (0, _validation.validateFields)(e.currentTarget);
    validate ? setFormErrors(_objectSpread(_objectSpread({}, formErrors), {}, {
      [e.currentTarget.id]: validate
    })) : delete formErrors[e.currentTarget.id];

    if (!validate) {
      e.currentTarget.classList.remove("invalid-input-value");
      e.currentTarget.classList.add("valid-input-value");
    }

    setFormState(_objectSpread(_objectSpread({}, formState), {}, {
      [e.currentTarget.id]: e.currentTarget.checked
    }));
  }

  const handleDateChange = date => {
    const validate = (0, _validation.validateFields)(date.currentTarget);
    validate ? setFormErrors(_objectSpread(_objectSpread({}, formErrors), {}, {
      [date.currentTarget.id]: validate
    })) : delete formErrors[date.currentTarget.id];

    if (!validate) {
      date.currentTarget.classList.remove("invalid-input-value");
      date.currentTarget.classList.add("valid-input-value");
    }

    setFormState(_objectSpread(_objectSpread({}, formState), {}, {
      [date.currentTarget.id]: new Date(date.currentTarget.value)
    }));
  };

  function formSubmitHandler(e) {
    e.preventDefault();
    const form = e.target;
    const inputs = form.querySelectorAll('input,select,select-one');
    const values = Object.values(inputs).map(input => {
      const validate = (0, _validation.validateFields)(input);
      validate ? setFormErrors(_objectSpread(_objectSpread({}, formErrors), {}, {
        [input.id]: validate
      })) : delete formErrors[input.id];
      return validate;
    }).filter(val => val != false);
    return values.length == 0 ? false : true;
  }

  return {
    formState,
    formErrors,
    handleInputChange,
    handleToggleChange,
    handleSelected,
    handleFileUpload,
    handleDateChange,
    handleTableFormField,
    handleAddTableField,
    initTableState,
    handleRemoveTableField,
    handleIndexedInputChange,
    handleMultiSelect,
    formSubmitHandler,
    handleDateRangeInputChange
  };
}

var _default = useFormHook;
exports.default = _default;