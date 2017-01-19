import Validator from "../validator";
import { isString, isNumber, isArray } from "../utils";

Validator.addRule("min", { required: true }, (value, { min }) => {
  if (isString(value) || isArray(value)) {
    return value.length >= min;
  } else if (isNumber(value)) {
    return value >= min;
  } else {
    return false;
  }
});