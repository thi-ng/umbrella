import { equiv as _equiv } from "@thi.ng/equiv";
import { op1, op2 } from "./ops";

//////////////////// Logic ops ////////////////////

/**
 * ( x y -- x===y )
 *
 * @param ctx
 */
export const eq = op2((b, a) => a === b);

/**
 * ( x y -- equiv(x,y) )
 *
 * @param ctx
 */
export const equiv = op2(_equiv);

/**
 * ( x y -- x!==y )
 *
 * @param ctx
 */
export const neq = op2((b, a) => a !== b);

/**
 * ( x y -- x&&y )
 *
 * @param ctx
 */
export const and = op2((b, a) => !!a && !!b);

/**
 * ( x y -- x||y )
 *
 * @param ctx
 */
export const or = op2((b, a) => !!a || !!b);

/**
 * ( x -- !x )
 *
 * @param ctx
 */
export const not = op1((x) => !x);

/**
 * ( x y -- x<y )
 *
 * @param ctx
 */
export const lt = op2((b, a) => a < b);

/**
 * ( x y -- x>y )
 *
 * @param ctx
 */
export const gt = op2((b, a) => a > b);

/**
 * ( x y -- x<=y )
 *
 * @param ctx
 */
export const lteq = op2((b, a) => a <= b);

/**
 * ( x y -- x>=y )
 *
 * @param ctx
 */
export const gteq = op2((b, a) => a >= b);

/**
 * ( x -- x===0 )
 *
 * @param ctx
 */
export const iszero = op1((x) => x === 0);

/**
 * ( x -- x>0 )
 *
 * @param ctx
 */
export const ispos = op1((x) => x > 0);

/**
 * ( x -- x<0 )
 *
 * @param ctx
 */
export const isneg = op1((x) => x < 0);

/**
 * ( x -- x==null )
 *
 * @param ctx
 */
export const isnull = op1((x) => x == null);
