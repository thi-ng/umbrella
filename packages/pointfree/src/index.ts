import { IObjectOf } from "@thi.ng/api/api";
import { isArray } from "@thi.ng/checks/is-array";
import { isFunction } from "@thi.ng/checks/is-function";
import { isPlainObject } from "@thi.ng/checks/is-plain-object";
import { equiv as _equiv } from "@thi.ng/equiv";
import { illegalArgs } from "@thi.ng/errors/illegal-arguments";
import { illegalState } from "@thi.ng/errors/illegal-state";

import {
    Stack,
    StackContext,
    StackEnv,
    StackFn,
    StackProc,
    StackProgram
} from "./api";
import { comp } from "./comp";

let SAFE = true;

export const safeMode = (state: boolean) => (SAFE = state);

/**
 * Executes program / quotation with given stack context (initial D/R
 * stacks and optional environment). Returns updated context.
 *
 * @param prog
 * @param ctx
 */
export const run = (prog: StackProc, ctx: StackContext = [[], [], {}]): StackContext => {
    // !ctx[0] && (ctx[0] = []);
    // !ctx[1] && (ctx[1] = []);
    // !ctx[2] && (ctx[2] = {});
    if (isFunction(prog)) {
        return prog(ctx);
    }
    for (let p = isArray(prog) ? prog : [prog], n = p.length, i = 0, w; i < n; i++) {
        if (isFunction(w = p[i])) {
            ctx = w(ctx);
        } else {
            ctx[0].push(w);
        }
    }
    return ctx;
};

/**
 * Like `run()`, but returns unwrapped result. Syntax sugar for:
 * `unwrap(run(...),n)`
 *
 * @param prog
 * @param ctx
 * @param n
 */
export const runU = (prog: StackProc, ctx?: StackContext, n = 1) =>
    unwrap(run(prog, ctx), n);

/**
 * Like `run()`, but returns result environment. Syntax sugar for:
 * `run(...)[2]`
 *
 * @param prog
 * @param ctx
 * @param n
 */
export const runE = (prog: StackProc, ctx?: StackContext) =>
    run(prog, ctx)[2];

/**
 * Creates a new StackContext tuple from given d-stack and/or
 * environment only (the r-stack is always initialized empty).
 *
 * @param stack initial d-stack
 * @param env initial environment
 */
export const ctx = (stack: Stack = [], env: StackEnv = {}): StackContext =>
    [stack, [], env];

const $n = SAFE ?
    (m: number, n: number) => (m < n) && <any>illegalState(`stack underflow`) :
    () => { };

const $ = SAFE ?
    (stack: Stack, n: number) => $n(stack.length, n) :
    () => { };

export {
    $ as ensureStack,
    $n as ensureStackN
}

const $stackFn = (f: StackProc) =>
    isArray(f) ? word(f) : f;

const tos = (stack: Stack) => stack[stack.length - 1];

const compile = (prog: StackProgram) =>
    comp.apply(null, prog.map(
        (w) => !isFunction(w) ?
            (ctx: StackContext) => (ctx[0].push(w), ctx) :
            w));

/**
 * Takes a result tuple returned by `run()` and unwraps one or more
 * items from result stack. If no `n` is given, defaults to single value
 * (TOS) and returns it as is. Returns an array for all other `n`.
 *
 * @param result
 * @param n
 */
export const unwrap = ([stack]: StackContext, n = 1) =>
    n === 1 ?
        tos(stack) :
        stack.slice(Math.max(0, stack.length - n));

//////////////////// Dynamic words & quotations  ////////////////////

/**
 * Higher order word. Takes a StackProgram and returns it as StackFn to
 * be used like any word. Unknown stack effect.
 *
 * If the optional `env` is given, uses a shallow copy of that
 * environment (one per invocation) instead of the current one passed by
 * `run()` at runtime. If `mergeEnv` is true (default), the user
 * provided env will be merged with the current env (also shallow
 * copies). This is useful in conjunction with `pushenv()` and `store()`
 * or `storekey()` to save results of sub procedures in the main env.
 *
 * Note: The provided (or merged) env is only active within the
 * execution scope of the word.
 *
 * ( ? -- ? )
 *
 * @param prog
 * @param env
 * @param mergeEnv
 */
export const word = (prog: StackProgram, env?: StackEnv, mergeEnv = true) => {
    const w: StackFn = compile(prog);
    return env ?
        mergeEnv ?
            (ctx: StackContext) => (w([ctx[0], ctx[1], { ...ctx[2], ...env }]), ctx) :
            (ctx: StackContext) => (w([ctx[0], ctx[1], { ...env }]), ctx) :
        w;
};

/**
 * Like `word()`, but automatically calls `unwrap()` on result context
 * to produced unwrapped value/tuple.
 *
 * **Importatant:** Words defined with this function CANNOT be used as
 * part of a larger stack program, only for standalone use.
 *
 * @param prog
 * @param n
 * @param env
 * @param mergeEnv
 */
export const wordU = (prog: StackProgram, n = 1, env?: StackEnv, mergeEnv = true) => {
    const w: StackFn = compile(prog);
    return env ?
        mergeEnv ?
            (ctx: StackContext) => unwrap(w([ctx[0], ctx[1], { ...ctx[2], ...env }]), n) :
            (ctx: StackContext) => unwrap(w([ctx[0], ctx[1], { ...env }]), n) :
        (ctx: StackContext) => unwrap(w(ctx), n);
};

/**
 * Executes TOS as stack function and places result back on d-stack. TOS
 * MUST be a valid word or quotation.
 *
 * ( x -- x() )
 *
 * @param ctx
 */
export const exec = (ctx: StackContext) =>
    ($(ctx[0], 1), $stackFn(ctx[0].pop())(ctx));

//////////////////// JS host calls ////////////////////

/**
 * Expects TOS to be a quotation with a vanilla JS function as first
 * element. Calls fn with all remaining items in quot as arguments and
 * pushes result back on d-stack (even if fn returned `undefined`).
 *
 * ( [f ...] -- f(...) )
 *
 * @param ctx
 */
export const execjs = (ctx: StackContext) => {
    const stack = ctx[0];
    $(stack, 1);
    const [fn, ...args] = stack.pop();
    stack.push(fn(...args));
    return ctx;
};

//////////////////// Operator generators ////////////////////

/**
* Higher order word. Replaces TOS of d-stack with result of given op.
*
* ( x -- y )
*
* @param op
*/
const op1 = (op: (x) => any) => {
    return (ctx: StackContext) => {
        const stack = ctx[0];
        const n = stack.length - 1;
        $n(n, 0);
        stack[n] = op(stack[n]);
        return ctx;
    }
};

/**
 * Higher order word. Takes 2 values from d-stack and writes back result
 * from given op. The arg order is (TOS, TOS-1)
 *
 * ( a b -- c )
 *
 * @param op
 */
const op2 = (op: (b, a) => any) =>
    (ctx: StackContext) => {
        const stack = ctx[0];
        const n = stack.length - 2;
        $n(n, 0);
        stack[n] = op(stack.pop(), stack[n]);
        return ctx;
    };

export {
    op1 as maptos,
    op2 as map2
}

/**
 * Similar to `op2`, but for array operators. Either `a` or `b` can be a
 * non-array value, but not both. Creates new array of result values.
 * The result will have the same length as the shortest arg (if `a` and
 * `b` have different lengths).
 *
 * - ( a b -- a ), if `a` is an array
 * - ( a b -- b ), if `a` is not an array
 *
 * @param f
 */
export const op2v = (f: (b, a) => any) =>
    (ctx: StackContext): StackContext => {
        $(ctx[0], 2);
        const stack = ctx[0];
        const b = stack.pop();
        const n = stack.length - 1;
        const a = stack[n];
        const isa = isArray(a);
        const isb = isArray(b);
        let c: any[];
        if (isa && isb) {
            c = new Array(Math.min(a.length, b.length));
            for (let i = c.length - 1; i >= 0; i--) {
                c[i] = f(b[i], a[i]);
            }
        } else {
            if (isb && !isa) {
                c = new Array(b.length);
                for (let i = c.length - 1; i >= 0; i--) {
                    c[i] = f(b[i], a);
                }
            } else if (isa && !isb) {
                c = new Array(a.length);
                for (let i = c.length - 1; i >= 0; i--) {
                    c[i] = f(b, a[i]);
                }
            } else {
                illegalArgs("at least one arg must be an array");
            }
        }
        stack[n] = c;
        return ctx;
    };

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
export const dsp = (ctx: StackContext) =>
    (ctx[0].push(ctx[0].length), ctx);


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
    $n(n -= stack.pop() + 1, 0);
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
export const drop = (ctx: StackContext) =>
    ($(ctx[0], 1), ctx[0].length-- , ctx);

/**
 * Removes top 2 vals from d-stack.
 *
 * ( x y -- )
 *
 * @param ctx
 */
export const drop2 = (ctx: StackContext) =>
    ($(ctx[0], 2), ctx[0].length -= 2, ctx);

/**
 * If TOS is truthy then drop it:
 *
 * ( x -- )
 *
 * Else, no effect:
 *
 * ( x -- x )
 */
export const dropif = (ctx: StackContext) =>
    ($(ctx[0], 1), tos(ctx[0]) && ctx[0].length-- , ctx);

/**
 * Higher order word. Pushes given args verbatim on d-stack.
 *
 * ( -- ...args )
 *
 * @param args
 */
export const push = (...args: any[]) =>
    (ctx: StackContext) => (ctx[0].push(...args), ctx);

/**
 * Duplicates TOS on d-stack.
 *
 * ( x -- x x )
 *
 * @param ctx
 */
export const dup = (ctx: StackContext) =>
    ($(ctx[0], 1), ctx[0].push(tos(ctx[0])), ctx);

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
}

//////////////////// R-Stack ops ////////////////////

/**
 * Pushes current r-stack size on d-stack.
 *
 * ( -- n )
 *
 * @param ctx
 */
export const rsp = (ctx: StackContext) =>
    (ctx[0].push(ctx[1].length), ctx);

/**
 * Removes TOS from r-stack.
 *
 * ( x -- )
 *
 * @param ctx
 */
export const rdrop = (ctx: StackContext) =>
    ($(ctx[1], 1), ctx[1].length-- , ctx);

/**
 * Removes top 2 vals from r-stack.
 *
 * ( x y -- )
 *
 * @param ctx
 */
export const rdrop2 = (ctx: StackContext) =>
    ($(ctx[1], 2), ctx[1].length -= 2, ctx);

export const movdr = (ctx: StackContext) =>
    ($(ctx[0], 1), ctx[1].push(ctx[0].pop()), ctx);

export const movrd = (ctx: StackContext) =>
    ($(ctx[1], 1), ctx[0].push(ctx[1].pop()), ctx);

export const cpdr = (ctx: StackContext) =>
    ($(ctx[0], 1), ctx[1].push(tos(ctx[0])), ctx);

export const cprd = (ctx: StackContext) =>
    ($(ctx[1], 1), ctx[0].push(tos(ctx[1])), ctx);

const mov2 = (a, b) => (ctx: StackContext) => {
    const src = ctx[a];
    $(src, 2);
    const v = src.pop();
    ctx[b].push(src.pop(), v);
    return ctx;
};

const cp2 = (a, b) => (ctx: StackContext) => {
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
export const rinc = (ctx: StackContext) =>
    ($(ctx[1], 1), ctx[1][ctx[1].length - 1]++ , ctx);

/**
 * Like `dec`, but applies to r-stack TOS.
 *
 * @param ctx
 */
export const rdec = (ctx: StackContext) =>
    ($(ctx[1], 1), ctx[1][ctx[1].length - 1]-- , ctx);


//////////////////// Math ops ////////////////////

/**
 * ( x y -- x+y )
 *
 * @param ctx
 */
export const add = op2((b, a) => a + b);

/**
 * ( x y -- x*y )
 *
 * @param ctx
 */
export const mul = op2((b, a) => a * b);

/**
 * ( x y -- x-y )
 *
 * @param ctx
 */
export const sub = op2((b, a) => a - b);

/**
 * ( x y -- x/y )
 *
 * @param ctx
 */
export const div = op2((b, a) => a / b);

/**
 * ( x -- 1/x )
 *
 * @param ctx
 */
export const oneover = word([1, swap, div]);

/**
 * ( x y -- x%y )
 *
 * @param ctx
 */
export const mod = op2((b, a) => a % b);

/**
 * ( x y -- min(x,y) )
 *
 * @param ctx
 */
export const min = op2(Math.min);

/**
 * ( x y -- max(x,y) )
 *
 * @param ctx
 */
export const max = op2(Math.max);

/**
 * ( x -- x+1 )
 *
 * @param ctx
 */
export const inc = (ctx: StackContext) =>
    ($(ctx[0], 1), ctx[0][ctx[0].length - 1]++ , ctx);

/**
 * ( x -- x-1 )
 *
 * @param ctx
 */
export const dec = (ctx: StackContext) =>
    ($(ctx[0], 1), ctx[0][ctx[0].length - 1]-- , ctx);

/**
 * ( x -- -x )
 *
 * @param ctx
 */
export const neg = op1((x) => -x);

/**
 * ( x y -- pow(x,y) )
 *
 * @param ctx
 */
export const pow = op2((b, a) => Math.pow(a, b));

/**
 * ( x -- sqrt(x) )
 *
 * @param ctx
 */
export const sqrt = op1(Math.sqrt);

/**
 * ( x -- exp(x) )
 *
 * @param ctx
 */
export const exp = op1(Math.exp);

/**
 * ( x -- log(x) )
 *
 * @param ctx
 */
export const log = op1(Math.log);

/**
 * ( x -- sin(x) )
 *
 * @param ctx
 */
export const sin = op1(Math.sin);

/**
 * ( x -- cos(x) )
 *
 * @param ctx
 */
export const cos = op1(Math.cos);

/**
 * ( x -- tan(x) )
 *
 * @param ctx
 */
export const tan = op1(Math.tan);

/**
 * ( x -- tanh(x) )
 *
 * @param ctx
 */
export const tanh = op1(Math.tanh);

/**
 * ( x -- floor(x) )
 *
 * @param ctx
 */
export const floor = op1(Math.floor);

/**
 * ( x -- ceil(x) )
 *
 * @param ctx
 */
export const ceil = op1(Math.ceil);

/**
 * ( x y -- sqrt(x*x+y*y) )
 *
 * @param ctx
 */
export const hypot = op2(Math.hypot);

/**
 * ( x y -- atan2(y,x) )
 *
 * @param ctx
 */
export const atan2 = op2(Math.atan2);

/**
 * ( -- Math.random() )
 *
 * @param ctx
 */
export const rand = (ctx: StackContext) =>
    (ctx[0].push(Math.random()), ctx);

/**
 * ( x -- bool )
 *
 * @param ctx
 */
export const even = op1((x) => !(x & 1));

/**
 * ( x -- bool )
 *
 * @param ctx
 */
export const odd = op1((x) => !!(x & 1));

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
 * @param ctx
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
export const dip2 = word([swap, [dip], dip]);

/**
 * Removes `x y z` from d-stack, calls `q` and restores removed
 * vals to the top of the d-stack after quotation is finished.
 *
 * ( x y z q -- x y z )
 */
export const dip3 = word([swap, [dip2], dip]);

/**
 * Removes `x y z w` from d-stack, calls `q` and restores removed
 * vals to the top of the d-stack after quotation is finished.
 *
 * ( x y z w q -- x y z w )
 */
export const dip4 = word([swap, [dip3], dip]);

/**
 * Calls a quotation with a value on the d-stack, restoring the value
 * after quotation finished.
 *
 * ( x q -- .. x )
 */
export const keep = word([over, [exec], dip]);

/**
 * Call a quotation with two values on the stack, restoring the values
 * after quotation finished.
 *
 * ( x y q -- .. x y )
 */
export const keep2 = word([[dup2], dip, dip2]);

/**
 * Call a quotation with two values on the stack, restoring the values
 * after quotation finished.
 *
 * ( x y z q -- .. x y z )
 */
export const keep3 = word([[dup3], dip, dip3]);

/**
 * First applies `p` to the value `x`, then applies `q` to the same
 * value.
 *
 * ( x p q -- px qx )
 */
export const bi = word([[keep], dip, exec]);

/**
 * First applies `p` to the two input values `x y`, then applies `q` to
 * the same values.
 *
 * ( x y p q -- pxy qxy )
 */
export const bi2 = word([[keep2], dip, exec]);

/**
 * First applies `p` to the three input values `x y z`, then applies `q`
 * to the same values.
 *
 * ( x y z p q -- pxyz qxyz )
 */
export const bi3 = word([[keep3], dip, exec]);

/**
 * Applies `p` to `x`, then `q` to `x`, and finally `r` to `x`
 *
 * ( x p q r -- px qx rx )
 */
export const tri = word([[[keep], dip, keep], dip, exec]);

/**
 * Applies `p` to the two input values `x y`, then same with `q`, and
 * finally with `r`.
 *
 * ( x y p q r -- pxy qxy rxy )
 */
export const tri2 = word([[[keep2], dip, keep2], dip, exec]);

/**
 * Applies `p` to the three input values `x y z`, then same with `q`,
 * and finally with `r`.
 *
 * ( x y z p q r -- pxyz qxyz rxyz )
 */
export const tri3 = word([[[keep3], dip, keep3], dip, exec]);

/**
 * Applies `p` to `x`, then applies `q` to `y`.
 *
 * ( x y p q -- px qy )
 */
export const bis = word([[dip], dip, exec]);

/**
 * Applies `p` to `a b`, then applies `q` to `c d`.
 *
 * ( a b c d p q -- pab qcd )
 */
export const bis2 = word([[dip2], dip, exec]);

/**
 * Applies `p` to `x`, then `q` to `y`, and finally `r` to `z`.
 *
 * ( x y z p q r -- )
 */
export const tris = word([[[dip2], dip, dip], dip, exec]);

/**
 * Applies `p` to `u v`, then `q` to `w x`, and finally `r` to `y z`.
 *
 * ( u v w x y z p q r -- puv qwx ryz )
 */
export const tris2 = word([[dip4], dip2, bis2]);

/**
 * Applies the quotation `q` to `x`, then to `y`.
 *
 * ( x y q -- qx qy )
 */
export const bia = word([dup, bis]);

/**
 * Applies the quotation `q` to `x y`, then to `z w`.
 *
 * ( x y z w q -- qxy qzw )
 */
export const bia2 = word([dup, bis2]);

/**
 * Applies the `q` to `x`, then to `y`, and finally to `z`.
 *
 * ( x y z q -- qx qy qz )
 */
export const tria = word([dup, dup, tris]);

/**
 * Applies the quotation to `u v`, then to `w x`, and then to `y z`.
 *
 * ( u v w x y z q -- quv qwx qyz )
 */
export const tria2 = word([dup, dup, tris2]);

/**
 * Applies `q` individually to both input vals `x y` and combines
 * results with `and`. The final result will be true if both interim
 * results were truthy.
 *
 * ( x y q -- qx && qy )
 */
export const both = word([bia, and]);

/**
 * Applies `q` individually to both input vals `x y` and combines results with `or`.
 * The final result will be true if at least one of the interim results
 * was truthy.
 *
 * ( x y q -- qx || qy )
 */
export const either = word([bia, or]);

//////////////////// Conditionals  ////////////////////

/**
 * Higher order word. Takes two stack programs: truthy and falsey
 * branches, respectively. When executed, pops TOS and runs only one of
 * the branches depending if TOS was truthy or not.
 *
 * Note: Unlike JS `if() {...} else {...}` constructs, the actual
 * conditional is NOT part of this word.
 *
 * ( bool -- ? )
 *
 * @param _then
 * @param _else
 */
export const cond = (_then: StackProc, _else: StackProc = nop) =>
    (ctx: StackContext) =>
        ($(ctx[0], 1), $stackFn(ctx[0].pop() ? _then : _else)(ctx));

/**
 * Non-HOF version of `cond`, expects `test` result and both branches on
 * d-stack. Executes `thenq` word/quotation if `test` is truthy, else
 * runs `elseq`.
 *
 * ( test thenq elseq -- ? )
 *
 * @param ctx
 */
export const condq = (ctx: StackContext) => {
    const stack = ctx[0];
    $(stack, 3);
    const _else = stack.pop();
    const _then = stack.pop();
    return $stackFn(stack.pop() ? _then : _else)(ctx);
};

/**
 * Higher order word. Takes an object of stack programs with keys in the
 * object being used to check for equality with TOS. If a match is
 * found, executes corresponding stack program. If a `default` key is
 * specified and no other cases matched, run `default` program. In all
 * other cases throws an error.
 *
 * Important: The default case has the original TOS re-added to the
 * d-stack before execution.
 *
 * @param cases
 */
export const cases = (cases: IObjectOf<StackProc>) =>
    (ctx: StackContext) => {
        $(ctx[0], 1);
        const stack = ctx[0];
        const tos = stack.pop();
        const cas = cases[tos];
        if (cas !== undefined) {
            return $stackFn(cas)(ctx);
        }
        if (cases.default) {
            stack.push(tos);
            return $stackFn(cases.default)(ctx);
        }
        illegalState(`no matching case for: ${tos}`);
    };

export const casesq = (ctx: StackContext) => {
    const stack = ctx[0];
    $(stack, 2);
    return cases(stack.pop())(ctx);
};

//////////////////// Loop constructs  ////////////////////

/**
 * Higher order word. Takes a `test` and `body` stack program. Applies
 * test to copy of TOS and executes body. Repeats while test is truthy.
 *
 * ( -- ? )
 *
 * ```
 * run([loop([dup, ispos], [dup, print, dec])], [[3]])
 * // 3
 * // 2
 * // 1
 * // [ true, [ 0 ], undefined ]
 * ```
 * @param test
 * @param body
 */
export const loop = (test: StackProc, body: StackProc) => {
    const _test = $stackFn(test);
    const _body = $stackFn(body);
    return (ctx: StackContext) => {
        while (true) {
            ctx = _test(ctx);
            $(ctx[0], 1);
            if (!ctx[0].pop()) {
                return ctx;
            }
            ctx = _body(ctx);
        }
    }
};

/**
 * Non-HOF version of `loop`. Expects test result and body quotation /
 * word on d-stack.
 *
 * ( testq bodyq -- ? )
 *
 * @param ctx
 */
export const loopq = (ctx: StackContext) => {
    const stack = ctx[0];
    $(stack, 2);
    const body = stack.pop();
    return loop(stack.pop(), body)(ctx);
};

/**
 * Executes given `body` word/quotation `n` times. In each iteration
 * pushes current counter on d-stack prior to executing body.
 *
 * ```
 * pf.run([3, ["i=", pf.swap, pf.add, pf.print], pf.dotimes])
 * // i=0
 * // i=1
 * // i=2
 * ```
 *
 * With empty body acts as finite range generator 0 .. n:
 *
 * ```
 * // range gen
 * pf.run([3, [], pf.dotimes])
 * [ [ 0, 1, 2 ], [], {} ]
 *
 * // range gen (collect results as array)
 * pf.runU([3, pf.cpdr, [], pf.dotimes, pf.movrd, pf.collect])
 * // [ 0, 1, 2 ]
 * ```
 *
 * ( n body -- ? )
 *
 * @param body
 */
export const dotimes = (ctx: StackContext) => {
    let stack = ctx[0];
    $(stack, 2);
    const w = $stackFn(stack.pop());
    for (let i = 0, n = stack.pop(); i < n; i++) {
        ctx[0].push(i);
        ctx = w(ctx);
    }
    return ctx;
};

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
export const list = (ctx: StackContext) =>
    (ctx[0].push([]), ctx);

/**
 * Pushes new empty JS object on d-stack.
 * Same reasoning as for `list`.
 *
 * ( -- {} )
 *
 * @param ctx
 */
export const obj = (ctx: StackContext) =>
    (ctx[0].push({}), ctx);

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
    let n = stack.length - 1, m;
    $n(n, 0);
    $n(n -= (m = stack.pop()), 0);
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
    isArray(x) ?
        [...x] :
        isPlainObject(x) ? { ...x } :
            illegalArgs(`can't copy type ${typeof x}`));

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

//////////////////// Environment  ////////////////////

/**
 * Pushes current env onto d-stack.
 *
 * ( -- env )
 *
 * @param ctx
 * @param env
 */
export const pushenv = (ctx: StackContext) =>
    (ctx[0].push(ctx[2]), ctx);

/**
 * Loads value for `key` from current env and pushes it on d-stack.
 * Throws error if var doesn't exist.
 *
 * ( key -- env[key] )
 *
 * @param ctx
 * @param env
 */
export const load = (ctx: StackContext) => {
    const stack = ctx[0];
    $(stack, 1);
    const id = stack.pop();
    !ctx[2].hasOwnProperty(id) && illegalArgs(`unknown var: ${id}`);
    stack.push(ctx[2][id]);
    return ctx;
};

/**
 * Stores `val` under `key` in env.
 *
 * ( val key -- )
 *
 * @param ctx
 * @param env
 */
export const store = (ctx: StackContext) =>
    ($(ctx[0], 2), ctx[2][ctx[0].pop()] = ctx[0].pop(), ctx);

/**
 * Higher order word. Similar to `load`, but always uses given
 * preconfigured `key` instead of reading it from d-stack at runtime
 * (also slightly faster). Throws error if var doesn't exist.
 *
 * ( -- env[key] )
 * @param ctx
 * @param env
 */
export const loadkey = (key: PropertyKey) =>
    (ctx: StackContext) => {
        !ctx[2].hasOwnProperty(key) && illegalArgs(`unknown var: ${key.toString()}`);
        ctx[0].push(ctx[2][key]);
        return ctx;
    };

/**
 * Higher order word. Similar to `store`, but always uses given
 * preconfigure `key` instead of reading it from d-stack at runtime
 * (also slightly faster).
 *
 * ( val -- )
 *
 * @param ctx
 * @param env
 */
export const storekey = (key: PropertyKey) =>
    (ctx: StackContext) =>
        ($(ctx[0], 1), ctx[2][key] = ctx[0].pop(), ctx);


//////////////////// I/O  ////////////////////

/**
 * Prints TOS to console
 *
 * ( x -- )
 *
 * @param ctx
 */
export const print = (ctx: StackContext) =>
    ($(ctx[0], 1), console.log(ctx[0].pop()), ctx);

export const printds = (ctx: StackContext) =>
    (console.log(ctx[0]), ctx);

export const printrs = (ctx: StackContext) =>
    (console.log(ctx[1]), ctx);

export * from "./api";
export * from "./comp";
