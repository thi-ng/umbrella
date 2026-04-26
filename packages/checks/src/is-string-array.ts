// SPDX-License-Identifier: Apache-2.0
import { isArrayOf } from "./is-array-of.js";
import { isString } from "./is-string.js";

export const isStringArray = isArrayOf(isString);
