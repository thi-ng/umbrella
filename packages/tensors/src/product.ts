// SPDX-License-Identifier: Apache-2.0
import { $mul } from "@thi.ng/vectors/ops";
import { defOpRT } from "./defoprt.js";

const [a, b, c, d, e] = defOpRT($mul, () => 1);

/**
 * Componentwise product of given nD tensor. Multi-method.
 *
 * @param a - input tensor
 */
export const product = a;

/**
 * Componentwise product of given 1D tensor.
 *
 * @param a - input tensor
 */
export const product1 = b;

/**
 * Componentwise product of given 2D tensor.
 *
 * @param a - input tensor
 */
export const product2 = c;

/**
 * Componentwise product of given 3D tensor.
 *
 * @param a - input tensor
 */
export const product3 = d;

/**
 * Componentwise product of given 4D tensor.
 *
 * @param a - input tensor
 */
export const product4 = e;
