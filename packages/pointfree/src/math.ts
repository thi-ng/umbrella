import type { StackContext } from "./api.js";
import { defOp1, defOp2 } from "./ops.js";
import { swap } from "./stack.js";
import { defWord } from "./word.js";

//////////////////// Math ops ////////////////////

/**
 * ( x y -- x+y )
 *
 * @param ctx -
 */
export const add = defOp2((b, a) => a + b);

/**
 * ( x y -- x*y )
 *
 * @param ctx -
 */
export const mul = defOp2((b, a) => a * b);

/**
 * ( x y -- x-y )
 *
 * @param ctx -
 */
export const sub = defOp2((b, a) => a - b);

/**
 * ( x y -- x/y )
 *
 * @param ctx -
 */
export const div = defOp2((b, a) => a / b);

/**
 * ( x -- 1/x )
 *
 * @param ctx -
 */
export const oneover = defWord([1, swap, div]);

/**
 * ( x y -- x%y )
 *
 * @param ctx -
 */
export const mod = defOp2((b, a) => a % b);

/**
 * ( x y -- min(x,y) )
 *
 * @param ctx -
 */
export const min = defOp2(Math.min);

/**
 * ( x y -- max(x,y) )
 *
 * @param ctx -
 */
export const max = defOp2(Math.max);

/**
 * ( x -- -x )
 *
 * @param ctx -
 */
export const neg = defOp1((x) => -x);

/**
 * ( x y -- pow(x,y) )
 *
 * @param ctx -
 */
export const pow = defOp2((b, a) => Math.pow(a, b));

/**
 * ( x -- sqrt(x) )
 *
 * @param ctx -
 */
export const sqrt = defOp1(Math.sqrt);

/**
 * ( x -- exp(x) )
 *
 * @param ctx -
 */
export const exp = defOp1(Math.exp);

/**
 * ( x -- log(x) )
 *
 * @param ctx -
 */
export const log = defOp1(Math.log);

/**
 * ( x -- sin(x) )
 *
 * @param ctx -
 */
export const sin = defOp1(Math.sin);

/**
 * ( x -- cos(x) )
 *
 * @param ctx -
 */
export const cos = defOp1(Math.cos);

/**
 * ( x -- tan(x) )
 *
 * @param ctx -
 */
export const tan = defOp1(Math.tan);

/**
 * ( x -- tanh(x) )
 *
 * @param ctx -
 */
export const tanh = defOp1(Math.tanh);

/**
 * ( x -- floor(x) )
 *
 * @param ctx -
 */
export const floor = defOp1(Math.floor);

/**
 * ( x -- ceil(x) )
 *
 * @param ctx -
 */
export const ceil = defOp1(Math.ceil);

/**
 * ( x y -- sqrt(x*x+y*y) )
 *
 * @param ctx -
 */
export const hypot = defOp2(Math.hypot);

/**
 * ( x y -- atan2(y,x) )
 *
 * @param ctx -
 */
export const atan2 = defOp2(Math.atan2);

/**
 * ( -- Math.random() )
 *
 * @param ctx -
 */
export const rand = (ctx: StackContext) => (ctx[0].push(Math.random()), ctx);

/**
 * ( x -- bool )
 *
 * @param ctx -
 */
export const even = defOp1((x) => !(x & 1));

/**
 * ( x -- bool )
 *
 * @param ctx -
 */
export const odd = defOp1((x) => !!(x & 1));
