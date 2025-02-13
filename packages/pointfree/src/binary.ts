// SPDX-License-Identifier: Apache-2.0
import { defOp1, defOp2 } from "./ops.js";

//////////////////// Binary ops ////////////////////

/**
 * Stack effect: `( x y -- x&y )`
 *
 * @param ctx -
 */
export const bitand = defOp2((b, a) => a & b);

/**
 * Stack effect: `( x y -- x|y )`
 *
 * @param ctx -
 */
export const bitor = defOp2((b, a) => a | b);

/**
 * Stack effect: `( x y -- x^y )`
 *
 * @param ctx -
 */
export const bitxor = defOp2((b, a) => a ^ b);

/**
 * Stack effect: `( x -- ~x )`
 *
 * @param ctx -
 */
export const bitnot = defOp1((x) => ~x);

/**
 * Stack effect: `( x y -- x<<y )`
 *
 * @param ctx -
 */
export const lsl = defOp2((b, a) => a << b);

/**
 * Stack effect: `( x y -- x>>y )`
 *
 * @param ctx -
 */
export const lsr = defOp2((b, a) => a >> b);

/**
 * Stack effect: `( x y -- x>>>y )`
 *
 * @param ctx -
 */
export const lsru = defOp2((b, a) => a >>> b);
