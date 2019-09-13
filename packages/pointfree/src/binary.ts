import { op1, op2 } from "./ops";

//////////////////// Binary ops ////////////////////

/**
 * ( x y -- x&y )
 *
 * @param ctx
 */
export const bitand = op2((b, a) => a & b);

/**
 * ( x y -- x|y )
 *
 * @param ctx
 */
export const bitor = op2((b, a) => a | b);

/**
 * ( x y -- x^y )
 *
 * @param ctx
 */
export const bitxor = op2((b, a) => a ^ b);

/**
 * ( x -- ~x )
 *
 * @param ctx
 */
export const bitnot = op1((x) => ~x);

/**
 * ( x y -- x<<y )
 *
 * @param ctx
 */
export const lsl = op2((b, a) => a << b);

/**
 * ( x y -- x>>y )
 *
 * @param ctx
 */
export const lsr = op2((b, a) => a >> b);

/**
 * ( x y -- x>>>y )
 *
 * @param ctx
 */
export const lsru = op2((b, a) => a >>> b);
