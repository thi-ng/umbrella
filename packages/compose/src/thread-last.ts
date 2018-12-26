import { FnAny } from "@thi.ng/api/api";

/**
 * Takes an `init` value and a number of functions and/or function
 * tuples, consisting of: `[fn, ...args]`. Executes each function
 * (or tuple) with the return value of the previous expression inserted
 * as last argument, using `init` for the first expression.
 *
 * ```
 * const neg = (x) => -x;
 * const sub = (a, b) => a - b;
 * const div = (a, b) => a / b;
 *
 * threadLast(
 *   5,
 *   neg,       // -5
 *   [sub, 10], // 20 - (-5) = 15
 *   [div, 10]  // 10 / 25 = 0.4
 * );
 *
 * // 0.4
 * ```
 *
 * @see threadFirst
 *
 * @param init
 * @param fns
 */
export function threadLast(init: any, ...fns: (FnAny<any> | [FnAny<any>, ...any[]])[]) {
    return fns.reduce(
        (acc, expr) =>
            typeof expr === "function" ?
                expr(acc) :
                expr[0](...expr.slice(1), acc)
        ,
        init
    );
}
