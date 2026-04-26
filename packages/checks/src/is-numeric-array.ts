// SPDX-License-Identifier: Apache-2.0
import { isNumberArray } from "./is-number-array.js";
import { isTypedArray } from "./is-typedarray.js";

/**
 * Returns true if `x` is a JS array of numbers or a typed array.
 *
 * @param x
 */
export const isNumericArray = (x: any) => isNumberArray(x) || isTypedArray(x);
