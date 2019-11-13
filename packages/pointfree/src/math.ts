import { StackContext } from "./api";
import { op1, op2 } from "./ops";
import { swap } from "./stack";
import { word } from "./word";

//////////////////// Math ops ////////////////////

/**
 * ( x y -- x+y )
 *
 * @param ctx -
 */
export const add = op2((b, a) => a + b);

/**
 * ( x y -- x*y )
 *
 * @param ctx -
 */
export const mul = op2((b, a) => a * b);

/**
 * ( x y -- x-y )
 *
 * @param ctx -
 */
export const sub = op2((b, a) => a - b);

/**
 * ( x y -- x/y )
 *
 * @param ctx -
 */
export const div = op2((b, a) => a / b);

/**
 * ( x -- 1/x )
 *
 * @param ctx -
 */
export const oneover = word([1, swap, div]);

/**
 * ( x y -- x%y )
 *
 * @param ctx -
 */
export const mod = op2((b, a) => a % b);

/**
 * ( x y -- min(x,y) )
 *
 * @param ctx -
 */
export const min = op2(Math.min);

/**
 * ( x y -- max(x,y) )
 *
 * @param ctx -
 */
export const max = op2(Math.max);

/**
 * ( x -- -x )
 *
 * @param ctx -
 */
export const neg = op1((x) => -x);

/**
 * ( x y -- pow(x,y) )
 *
 * @param ctx -
 */
export const pow = op2((b, a) => Math.pow(a, b));

/**
 * ( x -- sqrt(x) )
 *
 * @param ctx -
 */
export const sqrt = op1(Math.sqrt);

/**
 * ( x -- exp(x) )
 *
 * @param ctx -
 */
export const exp = op1(Math.exp);

/**
 * ( x -- log(x) )
 *
 * @param ctx -
 */
export const log = op1(Math.log);

/**
 * ( x -- sin(x) )
 *
 * @param ctx -
 */
export const sin = op1(Math.sin);

/**
 * ( x -- cos(x) )
 *
 * @param ctx -
 */
export const cos = op1(Math.cos);

/**
 * ( x -- tan(x) )
 *
 * @param ctx -
 */
export const tan = op1(Math.tan);

/**
 * ( x -- tanh(x) )
 *
 * @param ctx -
 */
export const tanh = op1(Math.tanh);

/**
 * ( x -- floor(x) )
 *
 * @param ctx -
 */
export const floor = op1(Math.floor);

/**
 * ( x -- ceil(x) )
 *
 * @param ctx -
 */
export const ceil = op1(Math.ceil);

/**
 * ( x y -- sqrt(x*x+y*y) )
 *
 * @param ctx -
 */
export const hypot = op2(Math.hypot);

/**
 * ( x y -- atan2(y,x) )
 *
 * @param ctx -
 */
export const atan2 = op2(Math.atan2);

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
export const even = op1((x) => !(x & 1));

/**
 * ( x -- bool )
 *
 * @param ctx -
 */
export const odd = op1((x) => !!(x & 1));
