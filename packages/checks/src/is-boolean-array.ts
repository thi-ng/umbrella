import { isArrayOf } from "./is-array-of.js";
import { isBoolean } from "./is-boolean.js";

export const isBooleanArray = isArrayOf(isBoolean);
