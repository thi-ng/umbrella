import { isArray, isPlainObject } from "@thi.ng/checks";
import { illegalArgs, illegalState } from "@thi.ng/errors";
import { StackContext, StackFn } from "./api";
import { op1, op2, op2v } from "./ops";
import { $, $n } from "./safe";
import { invrot, swap } from "./stack";
import { $stackFn, word } from "./word";

//////////////////// Array / list ops  ////////////////////

/**
 * Pushes a new empty array on the d-stack. While it's easily possible to
 * use `[]` as part of a stack program, the `list` word is intended to
 * be used as part of re-usuable `word()` definitions to ensure a new
 * array is being created for every single invocation of the word (else
 * only a single instance is created due to the mutable nature of JS
 * arrays).
 *
 * Compare:
 *
 * ```
 * // using array literal within word definition
 * foo = pf.word([ [], 1, pf.pushl ])
 * pf.runU(foo)
 * // [ 1 ]
 * pf.runU(foo)
 * // [ 1, 1 ] // wrong!
 *
 * // using `list` instead
 * bar = pf.word([ pf.list, 1, pf.pushl ])
 * pf.runU(bar)
 * // [ 1 ]
 * pf.runU(bar)
 * // [ 1 ] // correct!
 * ```
 *
 * ( -- [] )
 *
 * @param ctx
 */
export const list = (ctx: StackContext) => (ctx[0].push([]), ctx);

/**
 * Pushes new empty JS object on d-stack.
 * Same reasoning as for `list`.
 *
 * ( -- {} )
 *
 * @param ctx
 */
export const obj = (ctx: StackContext) => (ctx[0].push({}), ctx);

/**
 * Pushes `val` on the LHS of array.
 *
 * ( val arr -- arr )
 *
 * @param ctx
 */
export const pushl = (ctx: StackContext) => {
    $(ctx[0], 2);
    const stack = ctx[0];
    const a = stack.pop();
    a.unshift(stack.pop());
    stack.push(a);
    return ctx;
};

/**
 * Pushes `val` on the RHS of array.
 *
 * ( arr val -- arr )
 *
 * @param ctx
 */
export const pushr = (ctx: StackContext) => {
    const stack = ctx[0];
    const n = stack.length - 2;
    $n(n, 0);
    stack[n].push(stack[n + 1]);
    stack.length--;
    return ctx;
};

/**
 * Removes RHS from array as new TOS on d-stack.
 * Throws error is `arr` is empty.
 *
 * ( arr -- arr arr[-1] )
 *
 * @param ctx
 */
export const popr = (ctx: StackContext) => {
    const stack = ctx[0];
    const n = stack.length - 1;
    $n(n, 0);
    const a = stack[n];
    !a.length && illegalState("can't pop empty array");
    stack.push(a.pop());
    return ctx;
};

export const pull = word([popr, swap]);
export const pull2 = word([pull, pull]);
export const pull3 = word([pull2, pull]);
export const pull4 = word([pull2, pull2]);

export const vadd = op2v((b, a) => a + b);
export const vsub = op2v((b, a) => a - b);
export const vmul = op2v((b, a) => a * b);
export const vdiv = op2v((b, a) => a / b);

/**
 * Splits vector / array at given index `x`.
 *
 * ( arr x -- [...] [...] )
 *
 * @param ctx
 */
export const split = (ctx: StackContext) => {
    const stack = ctx[0];
    const n = stack.length - 2;
    $n(n, 0);
    const a = stack[n];
    const b = stack[n + 1];
    stack[n + 1] = a.splice(b, a.length - b);
    return ctx;
};

/**
 * Concatenates two arrays on d-stack:
 *
 * ( arr1 arr2 -- arr )
 *
 * @param ctx
 */
export const cat = (ctx: StackContext) => {
    const stack = ctx[0];
    const n = stack.length - 2;
    $n(n, 0);
    stack[n] = stack[n].concat(stack.pop());
    return ctx;
};

/**
 * Generic array transformer.
 *
 * ( arr q -- ? )
 *
 * Pops both args from d-stack, then executes quotation for each array
 * item (each pushed on d-stack prior to calling quotation). Can produce
 * any number of results and therefore also be used as filter, mapcat,
 * reduce...
 *
 * ```
 * // each item times 10
 * run([[1, 2, 3, 4], [10, mul], mapl])
 * // [ [ 10, 20, 30, 40 ], [], {} ]
 * ```
 *
 * Use for filtering:
 *
 * ```
 * // drop even numbers, duplicate odd ones
 * run([[1, 2, 3, 4], [dup, even, cond(drop, dup)], mapl])
 * // [ [ 1, 1, 3, 3 ], [], {} ]
 * ```
 *
 * Reduction:
 *
 * ```
 * // the `0` is the initial reduction result
 * runU([0, [1, 2, 3, 4], [add], mapl])
 * // 10
 * ```
 *
 * **Important**: `mapl` does not produce a result array. However,
 * there're several options to collect results as array, e.g.
 *
 * Use `mapll()` to transform:
 *
 * ```
 * runU([[1, 2, 3, 4], [10, mul], mapll])
 * // [ 10, 20, 30, 40]
 * ```
 *
 * Collecting results as array is a form of reduction, so we can use
 * `list` to produce an initial new array and `pushr` to push each new
 * interim value into the result:
 *
 * ```
 * runU([list, [1, 2, 3, 4], [10, mul, pushr], mapl])
 * // [ 10, 20, 30, 40 ]
 * ```
 *
 * If the array size is known & not changed by transformation:
 *
 * ```
 * runU([[1, 2, 3, 4], [10, mul], mapl, 4, collect])
 * // [ 10, 20, 30, 40 ]
 * ```
 *
 * @param ctx
 */
export const mapl = (ctx: StackContext) => {
    $(ctx[0], 2);
    const stack = ctx[0];
    const w = $stackFn(stack.pop());
    const list = stack.pop();
    const n = list.length;
    for (let i = 0; i < n; i++) {
        ctx[0].push(list[i]);
        ctx = w(ctx);
    }
    return ctx;
};

/**
 * Similar to `mapl()`, but produces new array of transformed values.
 *
 * ( arr q -- arr )
 *
 * ```
 * runU([[1, 2, 3, 4], [10, mul], mapll])
 * // [ 10, 20, 30, 40]
 * ```
 *
 * Filter / mapcat:
 *
 * ```
 * // drop even numbers, duplicate odd ones
 * run([[1, 2, 3, 4], [dup, even, cond(drop, dup)], mapll])
 * // [ [ [ 1, 1, 3, 3 ] ], [], {} ]
 * ```
 *
 * @param ctx
 */
export const mapll = (ctx: StackContext) => {
    $(ctx[0], 2);
    let stack = ctx[0];
    const w = $stackFn(stack.pop());
    const list = stack.pop();
    const n = list.length;
    let r = 0;
    for (let i = 0; i < n; i++) {
        let m = stack.length;
        stack.push(list[i]);
        ctx = w(ctx);
        stack = ctx[0];
        r += stack.length - m;
    }
    stack.push(stack.splice(stack.length - r, r));
    return ctx;
};

/**
 * Convenience wrapper for `mapl` to provide an alternative stack layout
 * for reduction purposes:
 *
 * ( arr q init -- reduction )
 */
export const foldl = word([invrot, mapl]);

/**
 * Pops TOS (a number) and then forms a tuple of the top `n` remaining
 * values and pushes it as new TOS. The original collected stack values
 * are removed from d-stack.
 *
 * ( ... n --- ... [...] )
 *
 * @param ctx
 */
export const collect = (ctx: StackContext) => {
    const stack = ctx[0];
    let n = stack.length - 1,
        m;
    $n(n, 0);
    $n((n -= m = stack.pop()), 0);
    stack.push(stack.splice(n, m));
    return ctx;
};

/**
 * Higher order helper word to `collect()` tuples of pre-defined size
 * `n`. The size can be given as number or a stack function producing a
 * number.
 *
 * ( ... -- [...])
 *
 * @param n
 */
export const tuple = (n: number | StackFn) => word([n, collect]);

export const vec2 = tuple(2);
export const vec3 = tuple(3);
export const vec4 = tuple(4);

/**
 * Higher order helper word to convert a TOS tuple/array into a string
 * using `Array.join()` with given `sep`arator.
 *
 * @param sep
 */
export const join = (sep = "") => op1((x) => x.join(sep));

/**
 * Pushes length of TOS on d-stack.
 *
 * ( x -- x.length )
 *
 * @param ctx
 */
export const length = op1((x) => x.length);

/**
 * Replaces TOS with its shallow copy. MUST be an array or plain object.
 *
 * ( x -- copy )
 */
export const copy = op1((x) =>
    isArray(x)
        ? x.slice()
        : isPlainObject(x)
        ? { ...x }
        : illegalArgs(`can't copy type ${typeof x}`)
);

/**
 * Reads key/index from object/array.
 *
 * ( obj k -- obj[k] )
 *
 * @param ctx
 */
export const at = op2((b, a) => a[b]);

/**
 * Writes `val` at key/index in object/array.
 *
 * ( val obj k -- obj )
 *
 * @param ctx
 */
export const setat = (ctx: StackContext) => {
    const stack = ctx[0];
    const n = stack.length - 3;
    $n(n, 0);
    stack[n + 1][stack[n + 2]] = stack[n];
    stack[n] = stack[n + 1];
    stack.length -= 2;
    return ctx;
};

//////////////////// Objects  ////////////////////

/**
 * Takes an array of keys and target object, then pops & binds deeper
 * stack values to respective keys in object. Pushes result object back
 * on stack at the end. Throws error if there're less stack values than
 * keys in given array.
 *
 * ```
 * runU([1,2,3, ["a","b","c"], {}, bindkeys])
 * // { c: 3, b: 2, a: 1 }
 * ```
 *
 * (v1 v2 .. [k1 k2 ..] obj -- obj )
 *
 * @param ctx
 */
export const bindkeys = (ctx: StackContext) => {
    const stack = ctx[0];
    $(stack, 2);
    const obj = stack.pop();
    const keys = stack.pop();
    $(stack, keys.length);
    for (let i = keys.length - 1; i >= 0; i--) {
        obj[keys[i]] = stack.pop();
    }
    stack.push(obj);
    return ctx;
};
