// SPDX-License-Identifier: Apache-2.0
import { equiv as _equiv } from "@thi.ng/equiv";
import { defOp1, defOp2 } from "./ops.js";

//////////////////// Logic ops ////////////////////

/**
 * Stack effect: `( x y -- x===y )`
 *
 * @param ctx -
 */
export const eq = defOp2((b, a) => a === b);

/**
 * Stack effect: `( x y -- equiv(x,y) )`
 *
 * @param ctx -
 */
export const equiv = defOp2(_equiv);

/**
 * Stack effect: `( x y -- x!==y )`
 *
 * @param ctx -
 */
export const neq = defOp2((b, a) => a !== b);

/**
 * Stack effect: `( x y -- x&&y )`
 *
 * @param ctx -
 */
export const and = defOp2((b, a) => !!a && !!b);

/**
 * Stack effect: `( x y -- x||y )`
 *
 * @param ctx -
 */
export const or = defOp2((b, a) => !!a || !!b);

/**
 * Stack effect: `( x -- !x )`
 *
 * @param ctx -
 */
export const not = defOp1((x) => !x);

/**
 * Stack effect: `( x y -- x<y )`
 *
 * @param ctx -
 */
export const lt = defOp2((b, a) => a < b);

/**
 * Stack effect: `( x y -- x>y )`
 *
 * @param ctx -
 */
export const gt = defOp2((b, a) => a > b);

/**
 * Stack effect: `( x y -- x<=y )`
 *
 * @param ctx -
 */
export const lteq = defOp2((b, a) => a <= b);

/**
 * Stack effect: `( x y -- x>=y )`
 *
 * @param ctx -
 */
export const gteq = defOp2((b, a) => a >= b);

/**
 * Stack effect: `( x -- x===0 )`
 *
 * @param ctx -
 */
export const iszero = defOp1((x) => x === 0);

/**
 * Stack effect: `( x -- x>0 )`
 *
 * @param ctx -
 */
export const ispos = defOp1((x) => x > 0);

/**
 * Stack effect: `( x -- x<0 )`
 *
 * @param ctx -
 */
export const isneg = defOp1((x) => x < 0);

/**
 * Stack effect: `( x -- x==null )`
 *
 * @param ctx -
 */
export const isnull = defOp1((x) => x == null);
