import { isArrayOf } from "./is-array-of.js";
import { isNumber } from "./is-number.js";

export const isNumberArray = isArrayOf(isNumber);
