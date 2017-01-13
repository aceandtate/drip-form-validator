import Validator from "../validator";
import isEqual from "lodash.isequal";
import { hasProp } from "../utils";

Validator.addRule("same", { required: true }, (value, { key }, _, values) => (
  hasProp(values, key) && isEqual(value, values[key])
));