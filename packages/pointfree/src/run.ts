import { isArray } from "@thi.ng/checks/is-array";
import { isFunction } from "@thi.ng/checks/is-function";
import type { StackContext, StackProc } from "./api";
import { unwrap } from "./word";

/**
 * Executes program / quotation with given stack context (initial D/R
 * stacks and optional environment). Returns updated context.
 *
 * @param prog -
 * @param ctx -
 */
export const run = (
    prog: StackProc,
    ctx: StackContext = [[], [], {}]
): StackContext => {
    if (isFunction(prog)) {
        return prog(ctx);
    }
    for (
        let p = isArray(prog) ? prog : [prog], n = p.length, i = 0, w;
        i < n;
        i++
    ) {
        if (isFunction((w = p[i]))) {
            ctx = w(ctx);
        } else {
            ctx[0].push(w);
        }
    }
    return ctx;
};

/**
 * Like {@link run}, but returns unwrapped result. Syntax sugar for:
 * `unwrap(run(...),n)`
 *
 * @param prog -
 * @param ctx -
 * @param n -
 */
export const runU = (prog: StackProc, ctx?: StackContext, n = 1) =>
    unwrap(run(prog, ctx), n);

/**
 * Like {@link run}, but returns result environment. Syntax sugar for:
 * `run(...)[2]`
 *
 * @param prog -
 * @param ctx -
 * @param n -
 */
export const runE = (prog: StackProc, ctx?: StackContext) => run(prog, ctx)[2];
