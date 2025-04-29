// SPDX-License-Identifier: Apache-2.0
import { $add } from "@thi.ng/vectors/ops";
import { defOpRT } from "./defoprt.js";

const [a, b, c, d] = defOpRT($add, () => 0);

/**
 * Componentwise sum of given nD tensor. Multi-method.
 *
 * @param a - input tensor
 */
export const sum = a;

/**
 * Componentwise sum of given 1D tensor.
 *
 * @param a - input tensor
 */
export const sum1 = b;

/**
 * Componentwise sum of given 2D tensor.
 *
 * @param a - input tensor
 */
export const sum2 = c;

/**
 * Componentwise sum of given 3D tensor.
 *
 * @param a - input tensor
 */
export const sum3 = d;
