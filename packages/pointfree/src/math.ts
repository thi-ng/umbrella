// SPDX-License-Identifier: Apache-2.0
import type { StackContext } from "./api.js";
import { defOp1, defOp2 } from "./ops.js";
import { swap } from "./stack.js";
import { defWord } from "./word.js";

//////////////////// Math ops ////////////////////

/**
 * Stack effect: `( x y -- x+y )`
 *
 * @param ctx -
 */
export const add = defOp2((b, a) => a + b);

/**
 * Stack effect: `( x y -- x*y )`
 *
 * @param ctx -
 */
export const mul = defOp2((b, a) => a * b);

/**
 * Stack effect: `( x y -- x-y )`
 *
 * @param ctx -
 */
export const sub = defOp2((b, a) => a - b);

/**
 * Stack effect: `( x y -- x/y )`
 *
 * @param ctx -
 */
export const div = defOp2((b, a) => a / b);

/**
 * Stack effect: `( x -- 1/x )`
 *
 * @param ctx -
 */
export const oneover = defWord([1, swap, div]);

/**
 * Stack effect: `( x y -- x%y )`
 *
 * @param ctx -
 */
export const mod = defOp2((b, a) => a % b);

/**
 * Stack effect: `( x y -- min(x,y) )`
 *
 * @param ctx -
 */
export const min = defOp2(Math.min);

/**
 * Stack effect: `( x y -- max(x,y) )`
 *
 * @param ctx -
 */
export const max = defOp2(Math.max);

/**
 * Stack effect: `( x -- -x )`
 *
 * @param ctx -
 */
export const neg = defOp1((x) => -x);

/**
 * Stack effect: `( x y -- pow(x,y) )`
 *
 * @param ctx -
 */
export const pow = defOp2((b, a) => Math.pow(a, b));

/**
 * Stack effect: `( x -- sqrt(x) )`
 *
 * @param ctx -
 */
export const sqrt = defOp1(Math.sqrt);

/**
 * Stack effect: `( x -- exp(x) )`
 *
 * @param ctx -
 */
export const exp = defOp1(Math.exp);

/**
 * Stack effect: `( x -- log(x) )`
 *
 * @param ctx -
 */
export const log = defOp1(Math.log);

/**
 * Stack effect: `( x -- sin(x) )`
 *
 * @param ctx -
 */
export const sin = defOp1(Math.sin);

/**
 * Stack effect: `( x -- cos(x) )`
 *
 * @param ctx -
 */
export const cos = defOp1(Math.cos);

/**
 * Stack effect: `( x -- tan(x) )`
 *
 * @param ctx -
 */
export const tan = defOp1(Math.tan);

/**
 * Stack effect: `( x -- tanh(x) )`
 *
 * @param ctx -
 */
export const tanh = defOp1(Math.tanh);

/**
 * Stack effect: `( x -- floor(x) )`
 *
 * @param ctx -
 */
export const floor = defOp1(Math.floor);

/**
 * Stack effect: `( x -- ceil(x) )`
 *
 * @param ctx -
 */
export const ceil = defOp1(Math.ceil);

/**
 * Stack effect: `( x y -- sqrt(x*x+y*y) )`
 *
 * @param ctx -
 */
export const hypot = defOp2(Math.hypot);

/**
 * Stack effect: `( x y -- atan2(y,x) )`
 *
 * @param ctx -
 */
export const atan2 = defOp2(Math.atan2);

/**
 * Stack effect: `( -- Math.random() )`
 *
 * @param ctx -
 */
export const rand = (ctx: StackContext) => (ctx[0].push(Math.random()), ctx);

/**
 * Stack effect: `( x -- bool )`
 *
 * @param ctx -
 */
export const even = defOp1((x) => !(x & 1));

/**
 * Stack effect: `( x -- bool )`
 *
 * @param ctx -
 */
export const odd = defOp1((x) => !!(x & 1));
