import type { Fn, Fn2 } from "@thi.ng/api";
import { isArray } from "@thi.ng/checks/is-array";
import { illegalArgs } from "@thi.ng/errors/illegal-arguments";
import type { StackContext } from "./api.js";
import { $, $n } from "./safe.js";

//////////////////// Operator generators ////////////////////

/**
 * Higher order word. Replaces TOS of d-stack with result of given op.
 *
 * ( x -- y )
 *
 * @param op -
 */
export const defOp1 = (op: Fn<any, any>) => {
    return (ctx: StackContext) => {
        const stack = ctx[0];
        const n = stack.length - 1;
        $n(n, 0);
        stack[n] = op(stack[n]);
        return ctx;
    };
};

/**
 * Higher order word. Takes 2 values from d-stack and writes back result
 * from given op. The arg order is (TOS, TOS-1)
 *
 * ( a b -- c )
 *
 * @param op -
 */
export const defOp2 = (op: Fn2<any, any, any>) => (ctx: StackContext) => {
    const stack = ctx[0];
    const n = stack.length - 2;
    $n(n, 0);
    stack[n] = op(stack.pop(), stack[n]);
    return ctx;
};

/**
 * Similar to {@link map2}, but for array operators. Either `a` or `b` can be a
 * non-array value, but not both. Creates new array of result values.
 * The result will have the same length as the shortest arg (if `a` and
 * `b` have different lengths).
 *
 * - ( a b -- a ), if `a` is an array
 * - ( a b -- b ), if `a` is not an array
 *
 * @param f -
 */
export const defOp2v =
    (f: Fn2<any, any, any>) =>
    (ctx: StackContext): StackContext => {
        $(ctx[0], 2);
        const stack = ctx[0];
        const b = stack.pop();
        const n = stack.length - 1;
        const a = stack[n];
        const isa = isArray(a);
        const isb = isArray(b);
        stack[n] =
            isa && isb
                ? op2vAB(f, a, b)
                : isb && !isa
                ? op2vB(f, a, b)
                : isa && !isb
                ? op2vA(f, a, b)
                : illegalArgs("at least one arg must be an array");
        return ctx;
    };

const op2vAB = (f: Fn2<any, any, any>, a: any, b: any) => {
    const res = new Array(Math.min(a.length, b.length));
    for (let i = res.length - 1; i >= 0; i--) {
        res[i] = f(b[i], a[i]);
    }
    return res;
};

const op2vA = (f: Fn2<any, any, any>, a: any, b: any) => {
    const res = new Array(a.length);
    for (let i = res.length - 1; i >= 0; i--) {
        res[i] = f(b, a[i]);
    }
    return res;
};

const op2vB = (f: Fn2<any, any, any>, a: any, b: any) => {
    const res = new Array(b.length);
    for (let i = res.length - 1; i >= 0; i--) {
        res[i] = f(b[i], a);
    }
    return res;
};
