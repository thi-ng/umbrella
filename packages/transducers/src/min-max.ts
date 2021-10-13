import { juxtR } from "./juxtr.js";
import { max } from "./max.js";
import { min } from "./min.js";

/**
 * Returns a reducer which computes both the min and max values of given inputs.
 * If the input source is empty the final result will be `[-∞,∞]`.
 */
export const minMax = () => juxtR(min(), max());
