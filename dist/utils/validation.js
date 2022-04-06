"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateFields = validateFields;

require("core-js/modules/es.string.trim.js");

require("core-js/modules/es.regexp.constructor.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.regexp.to-string.js");

require("core-js/modules/es.regexp.test.js");

require("core-js/modules/es.parse-int.js");

/**
 * @function
 * The component renders a <div> element when the parent context is a header or otherwise a <td> element.
 * 
 * @prop {Object}             input             - currentTarget of React.ChangeEvent<HTMLInputElement>
 * @property {string}         input.type        - The id of the input or the input array or object used to target the input.
 * @property {bool}           input.required    - This value determines if the input will have the HTML5 generic validation or not.
 * @property {any}            input.value       - This is a runtime value, set by the user
 * @property {string}         input.pattern     - This regex string enable HTML5 validation and .
 * @property {bool}           input.checked     - The type is used to render the right input, i.e select, multiple-select, table, text.
 * 
 * @returns string | boolean
 */
function validateFields(_ref) {
  let {
    type,
    required,
    value,
    pattern,
    checked
  } = _ref;
  const currentLength = value ? value.trim().length : 0;
  const regex = new RegExp(pattern);
  if (required && !currentLength) return " is required";

  switch (type) {
    case "checkbox":
      if (currentLength) {
        if (typeof checked !== "boolean") {
          return " is not valid";
        } else {
          return false;
        }
      } else return false;

    case "date-range":
      if (currentLength) {
        if (!regex.test(value)) {
          return " is not valid";
        } else {
          return false;
        }
      } else return false;

    case "select-one":
      if (currentLength) {
        if (value === "Options Not Provided") {
          return " Server error, try again later";
        } else if (value === "Select option") {
          return " select from the list";
        } else {
          return false;
        }
      } else return false;

    case "select-multiple":
      if (currentLength) {
        if (value === "Options Not Provided") {
          return " Server error, try again later";
        } else if (value === "Select option") {
          return " select from the list";
        } else {
          return false;
        }
      } else return false;

    case "number":
      if (currentLength && pattern) {
        if (!regex.test(value)) {
          return " is not valid";
        } else {
          return false;
        }
      } else return false;

    default:
      if (pattern) {
        // to validate ID numbers 
        // will also be used for credit card numbers 
        // if (PATTERN_ID.includes(pattern)) {
        //     if (!regex.test(value)) {
        //         return " is not valid"
        //     } else {
        //         const first = checkLuhn(value)
        //         const second = workingSum(value)
        //         if (first && second) {
        //             return false
        //         } else {
        //             return " is not valid"
        //         }
        //     }
        // } else {
        if (!regex.test(value)) {
          return " is not valid";
        } else {
          return false;
        } // }

      } else {
        return false;
      }

      ;
  }
}

function workingSum(iDNO) {
  let iRefNum = Number(iDNO);
  let iTotal = 0;
  let calc = 0;

  for (let i = iDNO.length; i > 0; i--) {
    calc = Math.trunc(iRefNum % 10);
    iTotal += calc;
    i--;
    iRefNum = iRefNum / 10;
    calc = Math.trunc(iRefNum % 10);
    calc = calc * 2;
    let calcInt = Number(calc);

    switch (calcInt) {
      case 10:
        calc = 1;
        break;

      case 12:
        calc = 3;
        break;

      case 14:
        calc = 5;
        break;

      case 16:
        calc = 7;
        break;

      case 18:
        calc = 9;
        break;

      default:
        break;
    }

    iRefNum = iRefNum / 10;
    iTotal += calc;
  }

  if (Math.trunc(iTotal % 10) != 0) {
    return false;
  } else {
    return true;
  }
}

function checkLuhn(idNo) {
  let nDigits = idNo.length;
  let nSum = 0;
  let isSecond = false;

  for (let i = nDigits - 1; i >= 0; i--) {
    let d = idNo[i].charCodeAt() - '0'.charCodeAt();
    if (isSecond == true) d = d * 2;
    nSum += parseInt(d / 10, 10);
    nSum += d % 10;
    isSecond = !isSecond;
  }

  return nSum % 10 == 0;
}