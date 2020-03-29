import { StackContext } from "./api";
import { $n } from "./safe";

/**
 * Takes a string and stringified regexp, returns true if regexp matches
 * the string.
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
