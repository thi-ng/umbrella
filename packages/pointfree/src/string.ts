import type { StackContext } from "./api";
import { $n, $ } from "./safe";

/**
 * Takes a string and stringified regexp (w/o flags), returns true if
 * regexp matches the string.
 *
 * ( str re -- bool )
 *
 * @param ctx
 */
export const ismatch = (ctx: StackContext) => {
    const stack = ctx[0];
    const n = stack.length - 2;
    $n(n, 0);
    stack[n] = new RegExp(stack[n + 1]).test(stack[n]);
    stack.length--;
    return ctx;
};

/**
 * ( str -- obj )
 *
 * @param ctx
 */
export const fromjson = (ctx: StackContext) => {
    const stack = ctx[0];
    $(stack, 1);
    stack.push(JSON.parse(stack.pop()));
    return ctx;
};

/**
 * ( x -- str )
 *
 * @param ctx
 */
export const tojson = (ctx: StackContext) => {
    const stack = ctx[0];
    $(stack, 1);
    stack.push(JSON.stringify(stack.pop(), null, 4));
    return ctx;
};
