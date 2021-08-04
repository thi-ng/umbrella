import { juxtR } from "../func/juxtr";
import { max } from "./max";
import { min } from "./min";

/**
 * Returns a reducer which computes both the min and max values of given inputs.
 * If the input source is empty the final result will be `[-∞,∞]`.
 */
export const minMax = () => juxtR(min(), max());
