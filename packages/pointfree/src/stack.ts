import { Stack, StackContext } from "./api";
import { $, $n } from "./safe";

export const tos = (stack: Stack) => stack[stack.length - 1];

//////////////////// Stack manipulation words ////////////////////

/**
 * Utility word w/ no stack nor side effect.
 */
export const nop = (ctx: StackContext) => ctx;

/**
 * Pushes current d-stack size on d-stack.
 *
 * ( -- n )
 * @param ctx
 */
export const dsp = (ctx: StackContext) => (ctx[0].push(ctx[0].length), ctx);

/**
 * Uses TOS as index to look up a deeper d-stack value, then places it
 * as new TOS. Throws error if stack depth is < `x`.
 *
 * ( ... x -- ... stack[x] )
 *
 * @param ctx
 */
export const pick = (ctx: StackContext) => {
    const stack = ctx[0];
    let n = stack.length - 1;
    $n(n, 0);
    $n((n -= stack.pop() + 1), 0);
    stack.push(stack[n]);
    return ctx;
};

/**
 * Removes TOS from d-stack.
 *
 * ( x -- )
 *
 * @param ctx
 */
export const drop = (ctx: StackContext) => ($(ctx[0], 1), ctx[0].length--, ctx);

/**
 * Removes top 2 vals from d-stack.
 *
 * ( x y -- )
 *
 * @param ctx
 */
export const drop2 = (ctx: StackContext) => (
    $(ctx[0], 2), (ctx[0].length -= 2), ctx
);

/**
 * If TOS is truthy then drop it:
 *
 * ( x -- )
 *
 * Else, no effect:
 *
 * ( x -- x )
 */
export const dropif = (ctx: StackContext) => (
    $(ctx[0], 1), tos(ctx[0]) && ctx[0].length--, ctx
);

/**
 * Higher order word. Pushes given args verbatim on d-stack.
 *
 * ( -- ...args )
 *
 * @param args
 */
export const push = (...args: any[]) => (ctx: StackContext) => (
    ctx[0].push(...args), ctx
);

/**
 * Duplicates TOS on d-stack.
 *
 * ( x -- x x )
 *
 * @param ctx
 */
export const dup = (ctx: StackContext) => (
    $(ctx[0], 1), ctx[0].push(tos(ctx[0])), ctx
);

/**
 * Duplicates top 2 vals on d-stack.
 *
 * ( x y -- x y x y )
 *
 * @param ctx
 */
export const dup2 = (ctx: StackContext) => {
    const stack = ctx[0];
    let n = stack.length - 2;
    $n(n, 0);
    stack.push(stack[n], stack[n + 1]);
    return ctx;
};

/**
 * Duplicates top 3 vals on d-stack.
 *
 * ( x y -- x y x y )
 *
 * @param ctx
 */
export const dup3 = (ctx: StackContext) => {
    const stack = ctx[0];
    let n = stack.length - 3;
    $n(n, 0);
    stack.push(stack[n], stack[n + 1], stack[n + 2]);
    return ctx;
};

/**
 * If TOS is truthy then push copy of it on d-stack:
 *
 * ( x -- x x )
 *
 * Else, no effect:
 *
 * ( x -- x )
 *
 * @param ctx
 */
export const dupif = (ctx: StackContext) => {
    $(ctx[0], 1);
    const x = tos(ctx[0]);
    x && ctx[0].push(x);
    return ctx;
};

const _swap = (i: number) => (ctx: StackContext) => {
    const stack = ctx[i];
    const n = stack.length - 2;
    $n(n, 0);
    const a = stack[n];
    stack[n] = stack[n + 1];
    stack[n + 1] = a;
    return ctx;
};

const _swap2 = (i: number) => (ctx: StackContext) => {
    const stack = ctx[i];
    let n = stack.length - 1;
    $n(n, 3);
    let a = stack[n];
    stack[n] = stack[n - 2];
    stack[n - 2] = a;
    n--;
    a = stack[n];
    stack[n] = stack[n - 2];
    stack[n - 2] = a;
    return ctx;
};

/**
 * Swaps the two topmost d-stack items.
 *
 * ( x y -- y x )
 *
 * @param ctx
 */
export const swap = _swap(0);

/**
 * Swaps the two topmost d-stack pairs.
 *
 * ( a b c d -- c d a b )
 *
 * @param ctx
 */
export const swap2 = _swap2(0);

/**
 * Removes second topmost item from d-stack.
 *
 * ( x y -- y )
 *
 * @param ctx
 */
export const nip = (ctx: StackContext) => {
    const stack = ctx[0];
    const n = stack.length - 2;
    $n(n, 0);
    stack[n] = stack.pop();
    return ctx;
};

/**
 * Inserts copy of TOS @ TOS-2 in d-stack.
 *
 * ( x y -- y x y )
 *
 * @param ctx
 */
export const tuck = (ctx: StackContext) => {
    $(ctx[0], 2);
    const stack = ctx[0];
    const a = stack.pop();
    stack.push(a, stack.pop(), a);
    return ctx;
};

/**
 * Rotates three topmost d-stack items downwards/to the left.
 *
 * ( x y z -- y z x )
 *
 * @param ctx
 */
export const rot = (ctx: StackContext) => {
    const stack = ctx[0];
    const n = stack.length - 1;
    $n(n, 2);
    const c = stack[n - 2];
    stack[n - 2] = stack[n - 1];
    stack[n - 1] = stack[n];
    stack[n] = c;
    return ctx;
};

/**
 * Rotates three topmost d-stack items upwards/to the right.
 *
 * ( x y z -- z x y )
 *
 * @param ctx
 */
export const invrot = (ctx: StackContext) => {
    const stack = ctx[0];
    const n = stack.length - 1;
    $n(n, 2);
    const c = stack[n];
    stack[n] = stack[n - 1];
    stack[n - 1] = stack[n - 2];
    stack[n - 2] = c;
    return ctx;
};

/**
 * Pushes copy of TOS-1 as new TOS on d-stack.
 *
 * ( x y -- x y x )
 *
 * @param ctx
 */
export const over = (ctx: StackContext) => {
    const stack = ctx[0];
    const n = stack.length - 2;
    $n(n, 0);
    stack.push(stack[n]);
    return ctx;
};

//////////////////// R-Stack ops ////////////////////

/**
 * Pushes current r-stack size on d-stack.
 *
 * ( -- n )
 *
 * @param ctx
 */
export const rsp = (ctx: StackContext) => (ctx[0].push(ctx[1].length), ctx);

/**
 * Removes TOS from r-stack.
 *
 * ( x -- )
 *
 * @param ctx
 */
export const rdrop = (ctx: StackContext) => (
    $(ctx[1], 1), ctx[1].length--, ctx
);

/**
 * Removes top 2 vals from r-stack.
 *
 * ( x y -- )
 *
 * @param ctx
 */
export const rdrop2 = (ctx: StackContext) => (
    $(ctx[1], 2), (ctx[1].length -= 2), ctx
);

export const movdr = (ctx: StackContext) => (
    $(ctx[0], 1), ctx[1].push(ctx[0].pop()), ctx
);

export const movrd = (ctx: StackContext) => (
    $(ctx[1], 1), ctx[0].push(ctx[1].pop()), ctx
);

export const cpdr = (ctx: StackContext) => (
    $(ctx[0], 1), ctx[1].push(tos(ctx[0])), ctx
);

export const cprd = (ctx: StackContext) => (
    $(ctx[1], 1), ctx[0].push(tos(ctx[1])), ctx
);

const mov2 = (a: number, b: number) => (ctx: StackContext) => {
    const src = ctx[a];
    $(src, 2);
    const v = src.pop();
    ctx[b].push(src.pop(), v);
    return ctx;
};

const cp2 = (a: number, b: number) => (ctx: StackContext) => {
    const src = ctx[a];
    const n = src.length - 2;
    $n(n, 0);
    ctx[b].push(src[n], src[n + 1]);
    return ctx;
};

export const movdr2 = mov2(0, 1);
export const movrd2 = mov2(1, 0);
export const cpdr2 = cp2(0, 1);
export const cprd2 = cp2(1, 0);

/**
 * Swaps the two topmost r-stack items.
 *
 * ( x y -- y x )
 *
 * @param ctx
 */
export const rswap = _swap(1);

/**
 * Swaps the two topmost d-stack pairs.
 *
 * ( a b c d -- c d a b )
 *
 * @param ctx
 */
export const rswap2 = _swap2(1);

/**
 * Like `inc`, but applies to r-stack TOS.
 *
 * @param ctx
 */
export const rinc = (ctx: StackContext) => (
    $(ctx[1], 1), ctx[1][ctx[1].length - 1]++, ctx
);

/**
 * Like `dec`, but applies to r-stack TOS.
 *
 * @param ctx
 */
export const rdec = (ctx: StackContext) => (
    $(ctx[1], 1), ctx[1][ctx[1].length - 1]--, ctx
);
