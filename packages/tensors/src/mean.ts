// SPDX-License-Identifier: Apache-2.0
import type { ITensor } from "./api.js";
import { sum } from "./sum.js";

/**
 * Computes the mean value of given nD tensor, aka `sum(a) / a.length`.
 *
 * @param a - input tensor
 */
export const mean = (a: ITensor) => sum(a) / a.length;
