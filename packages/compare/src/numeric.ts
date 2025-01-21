// SPDX-License-Identifier: Apache-2.0
import type { Comparator } from "@thi.ng/api";

/**
 * Numeric comparator (ascending order)
 *
 * @param a -
 * @param b -
 */
export const compareNumAsc: Comparator<number> = (a, b) => a - b;

/**
 * Numeric comparator (descending order)
 *
 * @param a -
 * @param b -
 */
export const compareNumDesc: Comparator<number> = (a, b) => b - a;
