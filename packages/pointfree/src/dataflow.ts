import type { StackContext } from "./api.js";
import { and, or } from "./logic.js";
import { $ } from "./safe.js";
import { dup, dup2, dup3, over, swap } from "./stack.js";
import { $stackFn, defWord, exec } from "./word.js";

//////////////////// Dataflow combinators  ////////////////////

// these combinators have been ported from Factor:
// http://docs.factorcode.org:8080/content/article-dataflow-combinators.html

/**
 * Removes `x` from d-stack, calls `q` and restores `x` to the top of
 * the d-stack after quotation is finished.
 *
 * ( x q -- x )
 *
 * Same behavior as: `[swap, movdr, exec, movrd]`, only the current
 * implementation doesn't use r-stack and stashes `x` off stack.
 *
 * @param ctx -
 */
export const dip = (ctx: StackContext) => {
    const stack = ctx[0];
    $(stack, 2);
    const q = stack.pop();
    const x = stack.pop();
    ctx = $stackFn(q)(ctx);
    ctx[0].push(x);
    return ctx;
};

/**
 * Removes `x y` from d-stack, calls `q` and restores removed vals
 * to the top of the d-stack after quotation is finished.
 *
 * ( x y q -- x y )
 */
export const dip2 = defWord([swap, [dip], dip]);

/**
 * Removes `x y z` from d-stack, calls `q` and restores removed
 * vals to the top of the d-stack after quotation is finished.
 *
 * ( x y z q -- x y z )
 */
export const dip3 = defWord([swap, [dip2], dip]);

/**
 * Removes `x y z w` from d-stack, calls `q` and restores removed
 * vals to the top of the d-stack after quotation is finished.
 *
 * ( x y z w q -- x y z w )
 */
export const dip4 = defWord([swap, [dip3], dip]);

/**
 * Calls a quotation with a value on the d-stack, restoring the value
 * after quotation finished.
 *
 * ( x q -- .. x )
 */
export const keep = defWord([over, [exec], dip]);

/**
 * Call a quotation with two values on the stack, restoring the values
 * after quotation finished.
 *
 * ( x y q -- .. x y )
 */
export const keep2 = defWord([[dup2], dip, dip2]);

/**
 * Call a quotation with three values on the stack, restoring the values
 * after quotation finished.
 *
 * ( x y z q -- .. x y z )
 */
export const keep3 = defWord([[dup3], dip, dip3]);

/**
 * First applies `p` to the value `x`, then applies `q` to the same
 * value.
 *
 * ( x p q -- px qx )
 */
export const bi = defWord([[keep], dip, exec]);

/**
 * First applies `p` to the two input values `x y`, then applies `q` to
 * the same values.
 *
 * ( x y p q -- pxy qxy )
 */
export const bi2 = defWord([[keep2], dip, exec]);

/**
 * First applies `p` to the three input values `x y z`, then applies `q`
 * to the same values.
 *
 * ( x y z p q -- pxyz qxyz )
 */
export const bi3 = defWord([[keep3], dip, exec]);

/**
 * Applies `p` to `x`, then `q` to `x`, and finally `r` to `x`
 *
 * ( x p q r -- px qx rx )
 */
export const tri = defWord([[[keep], dip, keep], dip, exec]);

/**
 * Applies `p` to the two input values `x y`, then same with `q`, and
 * finally with `r`.
 *
 * ( x y p q r -- pxy qxy rxy )
 */
export const tri2 = defWord([[[keep2], dip, keep2], dip, exec]);

/**
 * Applies `p` to the three input values `x y z`, then same with `q`,
 * and finally with `r`.
 *
 * ( x y z p q r -- pxyz qxyz rxyz )
 */
export const tri3 = defWord([[[keep3], dip, keep3], dip, exec]);

/**
 * Applies `p` to `x`, then applies `q` to `y`.
 *
 * ( x y p q -- px qy )
 */
export const bis = defWord([[dip], dip, exec]);

/**
 * Applies `p` to `a b`, then applies `q` to `c d`.
 *
 * ( a b c d p q -- pab qcd )
 */
export const bis2 = defWord([[dip2], dip, exec]);

/**
 * Applies `p` to `x`, then `q` to `y`, and finally `r` to `z`.
 *
 * ( x y z p q r -- )
 */
export const tris = defWord([[[dip2], dip, dip], dip, exec]);

/**
 * Applies `p` to `u v`, then `q` to `w x`, and finally `r` to `y z`.
 *
 * ( u v w x y z p q r -- puv qwx ryz )
 */
export const tris2 = defWord([[dip4], dip2, bis2]);

/**
 * Applies the quotation `q` to `x`, then to `y`.
 *
 * ( x y q -- qx qy )
 */
export const bia = defWord([dup, bis]);

/**
 * Applies the quotation `q` to `x y`, then to `z w`.
 *
 * ( x y z w q -- qxy qzw )
 */
export const bia2 = defWord([dup, bis2]);

/**
 * Applies the `q` to `x`, then to `y`, and finally to `z`.
 *
 * ( x y z q -- qx qy qz )
 */
export const tria = defWord([dup, dup, tris]);

/**
 * Applies the quotation to `u v`, then to `w x`, and then to `y z`.
 *
 * ( u v w x y z q -- quv qwx qyz )
 */
export const tria2 = defWord([dup, dup, tris2]);

/**
 * Applies `q` individually to both input vals `x y` and combines
 * results with `and`. The final result will be true if both interim
 * results were truthy.
 *
 * ( x y q -- qx && qy )
 */
export const both = defWord([bia, and]);

/**
 * Applies `q` individually to both input vals `x y` and combines results with `or`.
 * The final result will be true if at least one of the interim results
 * was truthy.
 *
 * ( x y q -- qx || qy )
 */
export const either = defWord([bia, or]);
