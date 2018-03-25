import { IObjectOf } from "@thi.ng/api/api";
import { illegalState } from "@thi.ng/api/error";
import { equiv as _equiv } from "@thi.ng/api/equiv";
import { isArray } from "@thi.ng/checks/is-array";
import { isFunction } from "@thi.ng/checks/is-function";

const SAFE = true;

export type Stack = any[];
export type StackEnv = any;
export type StackFn = (stack: Stack, env?: StackEnv) => Stack;
export type StackProgram = any[];
export type StackProc = StackFn | StackProgram;
export type Trap = (e: Error, stack: Stack, program: StackProgram, i: number) => boolean;
export type RunResult = [boolean, Stack, StackEnv];

/**
 * Executes program with given initial stack and optional environment.
 *
 * @param stack
 * @param prog
 * @param env
 * @param onerror
 */
export const run = (stack: Stack, prog: StackProc, env: StackEnv = {}, onerror?: Trap): RunResult => {
    stack = stack || [];
    const program = isArray(prog) ? prog : [prog];
    for (let i = 0, n = program.length; i < n; i++) {
        try {
            const p = program[i];
            if (isFunction(p)) {
                p(stack, env);
            } else {
                stack.push(p);
            }
        } catch (e) {
            if (!onerror || !onerror(e, stack, program, i)) {
                console.error(`${e.message} @ word #${i}`);
                return [false, stack, env];
            }
        }
    }
    return [true, stack, env];
};

/**
 * Like `run()`, but returns unwrapped result. See `unwrap()`.
 *
 * @param stack
 * @param prog
 * @param n
 * @param env
 * @param onerror
 */
export const runU = (stack: Stack, prog: StackProc, n = 1, env: StackEnv = {}, onerror?: Trap) =>
    unwrap(run(stack, prog, env, onerror), n);

const $n = SAFE ?
    (m: number, n: number) => (m < n) && illegalState(`stack underflow`) :
    () => { };

const $ = SAFE ?
    (stack: Stack, n: number) => $n(stack.length, n) :
    () => { };

const $stackFn = (f: StackProc) =>
    isArray(f) ? word(f) : f;

const tos = (stack: Stack) => stack[stack.length - 1];

/**
 * Takes a result tuple returned by `run()` and unwraps one or more
 * items from result stack. If no `n` is given, defaults to single value
 * (TOS) and returns it as is. Returns an array for all other `n`.
 *
 * @param param0
 * @param n
 */
export const unwrap = ([_, stack]: RunResult, n = 1) =>
    n === 1 ?
        tos(stack) :
        stack.slice(Math.max(0, stack.length - n));

/**
* Higher order word. Replaces TOS with result of given op.
*
* ( x -- y )
*
* @param op
*/
const op1 = (op: (x) => any) => {
    return (stack: Stack) => {
        const n = stack.length - 1;
        $n(n, 0);
        stack[n] = op(stack[n]);
        return stack;
    }
};

/**
 * Higher order word. Takes 2 values from stack and writes back result
 * from given op. The arg order is (TOS, TOS-1)
 *
 * ( a b -- c )
 *
 * @param op
 */
const op2 = (op: (b, a) => any) =>
    (stack: Stack) => {
        const n = stack.length - 2;
        $n(n, 0);
        stack[n] = op(stack.pop(), stack[n]);
        return stack;
    };

/**
 * Pushes current stack size on stack.
 *
 * ( -- n )
 * @param stack
 */
export const depth = (stack: Stack) =>
    (stack.push(stack.length), stack);

/**
 * Utility word w/ no stack nor side effect.
 */
export const nop = (stack: Stack) => stack;

/**
 * Uses TOS as index to look up a deeper stack value, then places it as
 * new TOS.
 *
 * ( ... x -- ... stack[x] )
 *
 * @param stack
 */
export const pick = (stack: Stack) => {
    let n = stack.length - 1;
    $n(n, 0);
    $n(n -= stack.pop() + 1, 0);
    stack.push(stack[n]);
    return stack;
};

/**
 * Removes TOS from stack.
 *
 * ( x -- )
 *
 * @param stack
 */
export const drop = (stack: Stack) =>
    ($(stack, 1), stack.length-- , stack);

/**
 * Removes top 2 vals from stack.
 *
 * ( x y -- )
 *
 * @param stack
 */
export const drop2 = (stack: Stack) =>
    ($(stack, 2), stack.length -= 2, stack);

/**
 * If TOS is truthy then drop it:
 *
 * ( x -- )
 *
 * Else, no effect:
 *
 * ( x -- x )
 */
export const dropIf = (stack: Stack) =>
    ($(stack, 1), tos(stack) && stack.length-- , stack);

/**
 * Higher order word.
 *
 * ( -- ...args )
 *
 * @param args
 */
export const push = (...args: any[]) =>
    (stack: Stack) => (stack.push(...args), stack);

/**
 * Pushes current env onto stack.
 *
 * ( -- env )
 *
 * @param stack
 * @param env
 */
export const pushEnv = (stack: Stack, env: StackEnv) =>
    (stack.push(env), stack);

/**
 * Duplicates TOS on stack.
 *
 * ( x -- x x )
 *
 * @param stack
 */
export const dup = (stack: Stack) =>
    ($(stack, 1), stack.push(tos(stack)), stack);

/**
 * Duplicates top 2 vals on stack.
 *
 * ( x y -- x y x y )
 *
 * @param stack
 */
export const dup2 = (stack: Stack) => {
    let n = stack.length - 2;
    $n(n, 0);
    stack.push(stack[n], stack[n + 1]);
    return stack;
};

/**
 * If TOS is truthy then push copy of it on stack:
 *
 * ( x -- x x )
 *
 * Else, no effect:
 *
 * ( x -- x )
 *
 * @param stack
 */
export const dupIf = (stack: Stack) => {
    $(stack, 1);
    const x = tos(stack);
    x && stack.push(x);
    return stack;
};

/**
 * Swaps the two topmost stack items.
 *
 * ( x y -- y x )
 *
 * @param stack
 */
export const swap = (stack: Stack) => {
    const n = stack.length - 1;
    $n(n, 1);
    const a = stack[n - 1];
    stack[n - 1] = stack[n];
    stack[n] = a;
    return stack;
};

/**
 * Swaps the two topmost stack pairs.
 *
 * ( a b c d -- c d a b )
 *
 * @param stack
 */
export const swap2 = (stack: Stack) => {
    const n = stack.length - 1;
    $n(n, 3);
    const d = stack[n];
    const c = stack[n - 1];
    stack[n - 1] = stack[n - 3];
    stack[n] = stack[n - 2];
    stack[n - 3] = c;
    stack[n - 2] = d;
    return stack;
};

/**
 * Removes second topmost item from stack.
 *
 * ( x y -- y )
 *
 * @param stack
 */
export const nip = (stack: Stack) => {
    const n = stack.length - 2;
    $n(n, 0);
    stack[n] = stack.pop();
    return stack;
};

/**
 * Inserts copy of TOS as TOS-2.
 *
 * ( x y -- y x y )
 *
 * @param stack
 */
export const tuck = (stack: Stack) => {
    $(stack, 2);
    const a = stack.pop();
    stack.push(a, stack.pop(), a);
    return stack;
};

/**
 * Rotates three topmost items downwards/to the left.
 *
 * ( x y z -- y z x )
 *
 * @param stack
 */
export const rot = (stack: Stack) => {
    const n = stack.length - 1;
    $n(n, 2);
    const c = stack[n - 2];
    stack[n - 2] = stack[n - 1];
    stack[n - 1] = stack[n];
    stack[n] = c;
    return stack;
};

/**
 * Rotates three topmost items upwards/to the right.
 *
 * ( x y z -- z x y )
 *
 * @param stack
 */
export const invrot = (stack: Stack) => {
    const n = stack.length - 1;
    $n(n, 2);
    const c = stack[n];
    stack[n] = stack[n - 1];
    stack[n - 1] = stack[n - 2];
    stack[n - 2] = c;
    return stack;
};

/**
 * Pushes copy of TOS-1 as new TOS.
 *
 * ( x y -- x y x )
 *
 * @param stack
 */
export const over = (stack: Stack) => {
    const n = stack.length - 2;
    $n(n, 0);
    stack.push(stack[n]);
    return stack;
}

/**
 * ( x y -- x+y )
 *
 * @param stack
 */
export const add = op2((b, a) => a + b);

/**
 * ( x y -- x*y )
 *
 * @param stack
 */
export const mul = op2((b, a) => a * b);

/**
 * ( x y -- x-y )
 *
 * @param stack
 */
export const sub = op2((b, a) => a - b);

/**
 * ( x y -- x/y )
 *
 * @param stack
 */
export const div = op2((b, a) => a / b);

/**
 * ( x y -- x%y )
 *
 * @param stack
 */
export const mod = op2((b, a) => a % b);

/**
 * ( x y -- pow(x,y) )
 *
 * @param stack
 */
export const pow = op2((b, a) => Math.pow(a, b));

/**
 * ( x -- sqrt(x) )
 *
 * @param stack
 */
export const sqrt = op1(Math.sqrt);

/**
 * ( x y -- x&y )
 *
 * @param stack
 */
export const bitAnd = op2((b, a) => a & b);

/**
 * ( x y -- x|y )
 *
 * @param stack
 */
export const bitOr = op2((b, a) => a | b);

/**
 * ( x y -- x^y )
 *
 * @param stack
 */
export const bitXor = op2((b, a) => a ^ b);

/**
 * ( x -- ~x )
 *
 * @param stack
 */
export const bitNot = op1((x) => ~x);

/**
 * ( x y -- x<<y )
 *
 * @param stack
 */
export const lsl = op2((b, a) => a << b);

/**
 * ( x y -- x>>y )
 *
 * @param stack
 */
export const lsr = op2((b, a) => a >> b);

/**
 * ( x y -- x>>>y )
 *
 * @param stack
 */
export const lsru = op2((b, a) => a >>> b);

/**
 * ( x -- x+1 )
 *
 * @param stack
 */
export const inc = (stack: Stack) =>
    ($(stack, 1), stack[stack.length - 1]++ , stack);

/**
 * ( x -- x-1 )
 *
 * @param stack
 */
export const dec = (stack: Stack) =>
    ($(stack, 1), stack[stack.length - 1]-- , stack);

/**
 * ( x -- -x )
 *
 * @param stack
 */
export const neg = op1((x) => -x);

/**
 * Higher order word. Takes a StackProgram and returns it as StackFn to
 * be used like any word. Unknown stack effect.
 *
 * If the optional `env` is given, uses a shallow copy of that
 * environment (one per invocation) instead of the current one passed by
 * `run()` at runtime. If `mergeEnv` is true, the user provided env will
 * be merged with the current env (also shallow copies). This is useful in
 * conjunction with `pushEnv()` and `store()` or `storeKey()` to save
 * results of sub procedures in the main env.
 *
 * ( ? -- ? )
 *
 * @param prog
 * @param env
 * @param mergeEnv
 */
export const word = (prog: StackProgram, env?: StackEnv, mergeEnv = false) =>
    (stack: Stack, _env: StackEnv) =>
        run(stack, prog, env ? mergeEnv ? { ..._env, ...env } : { ...env } : _env)[1];

export const wordU = (prog: StackProgram, n = 1, env?: StackEnv, mergeEnv = false) =>
    (stack: Stack, _env: StackEnv) =>
        runU(stack, prog, n, env ? mergeEnv ? { ..._env, ...env } : { ...env } : _env);

/**
 * Higher order word. Takes two stack programs: truthy and falsey
 * branches, respectively. When executed, pops TOS and runs only one of
 * the branches depending if TOS was truthy or not.
 *
 * Note: Unlike JS `if() {...} else {...}` constructs, the actual
 * conditional is NOT part of this word.
 *
 * ( x -- ? )
 *
 * @param _then
 * @param _else
 */
export const cond = (_then: StackProc, _else: StackProc = []) => {
    return (stack: Stack, env: StackEnv) => {
        $(stack, 1);
        return $stackFn(stack.pop() ? _then : _else)(stack, env);
    };
};

/**
 * Higher order word. Takes an object of stack programs with keys in the
 * object being used to check for equality with TOS. If a match is
 * found, executes corresponding stack program. If a `default` key is
 * specified and no other cases matched, run `default` program. In all
 * other cases throws an error.
 *
 * Important: The default case has the original TOS re-added to the
 * stack before execution.
 *
 * @param cases
 */
export const condM = (cases: IObjectOf<StackProc>) =>
    (stack: Stack, env: StackEnv) => {
        $(stack, 1);
        const tos = stack.pop();
        for (let k in cases) {
            if (tos == k) {
                return $stackFn(cases[k])(stack, env);
            }
        }
        if (!cases.default) {
            illegalState(`no matching case for: ${tos}`);
        }
        stack.push(tos);
        return $stackFn(cases.default)(stack, env);
    };

/**
 * Takes a `test` and `body` stack program. Applies test to
 * copy of TOS and executes body. Repeats while test is truthy.
 *
 * ( x -- ? )
 *
 * ```
 * run([3], [loop([isPos], [dup, print, dec])])
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
    return (stack: Stack, env: StackEnv) => {
        while (true) {
            dup(stack);
            _test(stack, env);
            $(stack, 1);
            if (!stack.pop()) {
                return stack;
            }
            _body(stack, env);
        }
    }
};

/**
 * Executes TOS as stack function and places result back on stack.
 *
 * ( x -- x() )
 *
 * @param stack
 */
export const exec = (stack: Stack, env: StackEnv) =>
    ($(stack, 1), stack.pop()(stack, env));

/**
 * Pops TOS and executes it as stack program. TOS MUST be a valid
 * StackProgram (array of values/words, i.e. a quotation).
 *
 * ( x -- ? )
 *
 * @param stack
 */
export const execQ = (stack: Stack, env: StackEnv) =>
    ($(stack, 1), run(stack, stack.pop(), env)[1]);

/**
 * ( x y -- x===y )
 *
 * @param stack
 */
export const eq = op2((b, a) => a === b);

/**
 * ( x y -- equiv(x,y) )
 *
 * @param stack
 */
export const equiv = op2(_equiv);

/**
 * ( x y -- x!==y )
 *
 * @param stack
 */
export const neq = op2((b, a) => a !== b);

/**
 * ( x y -- x&&y )
 *
 * @param stack
 */
export const and = op2((b, a) => !!a && !!b);

/**
 * ( x y -- x||y )
 *
 * @param stack
 */
export const or = op2((b, a) => !!a || !!b);

/**
 * ( x -- !x )
 *
 * @param stack
 */
export const not = op1((x) => !x);

/**
 * ( x y -- x<y )
 *
 * @param stack
 */
export const lt = op2((b, a) => a < b);

/**
 * ( x y -- x>y )
 *
 * @param stack
 */
export const gt = op2((b, a) => a > b);

/**
 * ( x y -- x<=y )
 *
 * @param stack
 */
export const lteq = op2((b, a) => a <= b);

/**
 * ( x y -- x>=y )
 *
 * @param stack
 */
export const gteq = op2((b, a) => a >= b);

/**
 * ( x -- x===0 )
 *
 * @param stack
 */
export const isZero = op1((x) => x === 0);

/**
 * ( x -- x>0 )
 *
 * @param stack
 */
export const isPos = op1((x) => x > 0);

/**
 * ( x -- x<0 )
 *
 * @param stack
 */
export const isNeg = op1((x) => x < 0);

/**
 * ( x -- x==null )
 *
 * @param stack
 */
export const isNull = op1((x) => x == null);

/**
 * Pushes length of TOS on stack.
 *
 * ( x -- x.length )
 *
 * @param stack
 */
export const length = op1((x) => x.length);

/**
 * Prints TOS to console
 *
 * ( x -- )
 *
 * @param stack
 */
export const print = (stack: Stack) =>
    ($(stack, 1), console.log(stack.pop()), stack);

/**
 * Reads key/index from object/array.
 *
 * ( obj k -- obj[k] )
 *
 * @param stack
 */
export const at = op2((b, a) => a[b]);

/**
 * Writes `val` at key/index in object/array.
 *
 * ( val obj k -- )
 *
 * @param stack
 */
export const storeAt = (stack: Stack) => {
    const n = stack.length - 3;
    $n(n, 0);
    stack[n + 1][stack[n + 2]] = stack[n];
    stack.length = n;
    return stack;
};

/**
 * Pushes new empty array on stack.
 *
 * @param stack
 */
export const list = (stack: Stack) =>
    (stack.push([]), stack);

/**
 * Pushes `val` on the LHS of array.
 *
 * ( val arr -- arr )
 *
 * @param stack
 */
export const pushl = (stack: Stack) => {
    $(stack, 2);
    const a = stack.pop();
    a.unshift(stack.pop());
    stack.push(a);
    return stack;
};

/**
 * Pushes `val` on the RHS of array.
 *
 * ( arr val -- arr )
 *
 * @param stack
 */
export const pushr = (stack: Stack) => {
    const n = stack.length - 2;
    $n(n, 0);
    stack[n].push(stack[n + 1]);
    stack.length--;
    return stack;
};

/**
 * Removes RHS from array as new TOS.
 *
 * ( arr -- arr arr[-1] )
 *
 * @param stack
 */
export const popr = (stack: Stack) =>
    (stack.push(stack[stack.length - 1].pop()), stack);

const pullq = [popr, swap];
export const pull = word(pullq);
export const pull2 = word([...pullq, ...pullq]);
export const pull3 = word([...pullq, ...pullq, ...pullq]);

/**
 * Loads value for `key` from env and pushes it on stack.
 *
 * ( key -- env[key] )
 *
 * @param stack
 * @param env
 */
export const load = (stack: Stack, env: any) =>
    ($(stack, 1), stack.push(env[stack.pop()]), stack);

/**
 * Stores `val` under `key` in env.
 *
 * ( val key -- )
 *
 * @param stack
 * @param env
 */
export const store = (stack: Stack, env: any) =>
    ($(stack, 2), env[stack.pop()] = stack.pop(), stack);

/**
 * Higher order word. Similar to `load`, but always uses given
 * preconfigured `key` instead of reading it from stack at runtime.
 *
 * ( -- env[key] )
 * @param stack
 * @param env
 */
export const loadKey = (key: PropertyKey) =>
    (stack: Stack, env: any) => (stack.push(env[key]), stack);

/**
 * Higher order word. Similar to `store`, but always uses given
 * preconfigure `key` instead of reading it from stack at runtime.
 *
 * ( val -- )
 *
 * @param stack
 * @param env
 */
export const storeKey = (key: PropertyKey) =>
    (stack: Stack, env: any) =>
        ($(stack, 1), env[key] = stack.pop(), stack);

/**
 * Higher order word. Pops TOS and uses it as index to transform stack
 * item @ `stack[TOS]` w/ given transformation.
 *
 * ( x -- )
 *
 * @param op
 */
export const mapN = (op: (x) => any) =>
    (stack: Stack) => {
        let n = stack.length - 1;
        $n(n, 0);
        $n(n -= stack.pop() + 1, 0);
        stack[n] = op(stack[n]);
        return stack;
    };

/**
 * Pops TOS (a number) and then forms a tuple of the top `n` remaining
 * values and pushes it as new TOS. The original collected stack values
 * are removed from stack.
 *
 * ( ... n --- ... [...] )
 *
 * @param stack
 */
export const collect = (stack: Stack) => {
    let n = stack.length - 1, m;
    $n(n, 0);
    $n(n -= (m = stack.pop()), 0);
    stack.push(stack.splice(n, m));
    return stack;
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

/**
 * Higher order helper word to convert a TOS tuple/array into a string
 * using `Array.join()` with given `sep`arator.
 *
 * @param sep
 */
export const join = (sep = "") => op1((x) => x.join(sep));

export {
    op1 as map,
    op2 as map2
}
