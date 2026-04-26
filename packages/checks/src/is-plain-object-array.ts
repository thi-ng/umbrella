// SPDX-License-Identifier: Apache-2.0
import { isArrayOf } from "./is-array-of.js";
import { isPlainObject } from "./is-plain-object.js";

export const isPlainObjectArray = isArrayOf(isPlainObject);
