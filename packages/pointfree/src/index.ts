import { IObjectOf } from "@thi.ng/api/api";
import { illegalState } from "@thi.ng/api/error";
import { equiv as _equiv } from "@thi.ng/api/equiv";
import { isArray } from "@thi.ng/checks/is-array";

const DEBUG = true;

export type Stack = any[];
export type StackEnv = any;
export type StackFn = (stack: Stack, env?: StackEnv) => void;
export type StackProgram = StackFn[];
export type StackProc = StackFn | StackProgram;
export type Trap = (e: Error, stack: Stack, program: StackProgram, i: number) => boolean;

/**
 * Executes program with given initial stack and optional environment.
 *
 * @param stack
 * @param prog
 * @param env
 * @param onerror
 */
export const run = (stack: Stack, prog: StackProc, env: StackEnv = {}, onerror?: Trap) => {
    stack = stack || [];
    const program = isArray(prog) ? prog : [prog];
    for (let i = 0, n = program.length; i < n; i++) {
        try {
            program[i](stack, env);
        } catch (e) {
            if (!onerror) {
                console.error(`${e.message} @ word #${i}`);
                return [false, stack, env];
            } else if (!onerror(e, stack, program, i)) {
                return [false, stack, env];
            }
        }
    }
    return [true, stack, env];
};

const $ = DEBUG ?
    (stack: Stack, n: number) => {
        if (stack.length < n) {
            illegalState(`stack underflow`);
        }
    } :
    () => { };

const $n = DEBUG ?
    (m: number, n: number) => {
        if (m < n) {
            illegalState(`stack underflow`);
        }
    } :
    () => { };

const $stackFn = (f: StackProc) =>
    isArray(f) ? word(f) : f;

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
const op2 = (op: (b, a) => any) => {
    return (stack: Stack) => {
        $(stack, 2);
        stack.push(op(stack.pop(), stack.pop()));
    }
};

const tos = (stack: Stack) => stack[stack.length - 1];

/**
 * Pushes current stack size on stack.
 *
 * ( -- n )
 * @param stack
 */
export const depth = (stack: Stack) => stack.push(stack.length);

export const nop = () => { };

/**
 * ( ... x -- ... stack[x] )
 *
 * @param stack
 */
export const pick = (stack: Stack) => {
    $(stack, 1);
    const n = stack.pop();
    $(stack, n + 1);
    stack.push(stack[stack.length - 1 - n]);
};

/**
 * ( x -- )
 *
 * @param stack
 */
export const drop = (stack: Stack) => {
    $(stack, 1);
    stack.length--;
};

/**
 * ( x y -- )
 *
 * @param stack
 */
export const drop2 = (stack: Stack) => {
    $(stack, 2);
    stack.length -= 2;
};

/**
 * If TOS is truthy then drop it:
 *
 * ( x -- )
 *
 * Else, no effect:
 *
 * ( x -- x )
 */
export const dropIf = (stack: Stack) => {
    $(stack, 1);
    if (tos(stack)) {
        stack.length--;
    }
};

/**
 * Higher order word.
 *
 * ( -- ...args )
 *
 * @param args
 */
export const push = (...args: any[]) => {
    return (stack: Stack) => stack.push(...args);
};

/**
 * Pushes current env onto stack.
 *
 * ( -- env )
 *
 * @param stack
 * @param env
 */
export const pushEnv = (stack: Stack, env: StackEnv) => stack.push(env);

/**
 * ( x -- x x )
 *
 * @param stack
 */
export const dup = (stack: Stack) => {
    $(stack, 1);
    stack.push(tos(stack));
};

/**
 * ( x y -- x y x y )
 *
 * @param stack
 */
export const dup2 = (stack: Stack) => {
    $(stack, 2);
    stack.push(stack[stack.length - 2]);
    stack.push(stack[stack.length - 2]);
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
    if (x) {
        stack.push(x);
    }
};

/**
 * Swaps the two topmost stack items.
 *
 * ( x y -- y x )
 *
 * @param stack
 */
export const swap = (stack: Stack) => {
    $(stack, 2);
    const n = stack.length - 1;
    const a = stack[n - 1];
    stack[n - 1] = stack[n];
    stack[n] = a;
};

/**
 * Swaps the two topmost stack pairs.
 *
 * ( a b c d -- c d a b )
 *
 * @param stack
 */
export const swap2 = (stack: Stack) => {
    $(stack, 4);
    const n = stack.length - 1;
    const d = stack[n];
    const c = stack[n - 1];
    stack[n - 1] = stack[n - 3];
    stack[n] = stack[n - 2];
    stack[n - 3] = c;
    stack[n - 2] = d;
};

/**
 * Removes second topmost item from stack.
 *
 * ( x y -- y )
 *
 * @param stack
 */
export const nip = (stack: Stack) => {
    $(stack, 2);
    const a = stack.pop();
    stack[stack.length - 1] = a;
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
    const b = stack.pop();
    const a = stack.pop();
    stack.push(b, a, b);
};

/**
 * Rotates three topmost items downwards/to the left.
 *
 * ( x y z -- y z x )
 *
 * @param stack
 */
export const rot = (stack: Stack) => {
    $(stack, 3);
    const n = stack.length - 1;
    const c = stack[n - 2];
    stack[n - 2] = stack[n - 1];
    stack[n - 1] = stack[n];
    stack[n] = c;
};

/**
 * Rotates three topmost items upwards/to the right.
 *
 * ( x y z -- z x y )
 *
 * @param stack
 */
export const invrot = (stack: Stack) => {
    $(stack, 3);
    const n = stack.length - 1;
    const c = stack[n];
    stack[n] = stack[n - 1];
    stack[n - 1] = stack[n - 2];
    stack[n - 2] = c;
};

/**
 * Pushes copy of TOS-1 as new TOS.
 *
 * ( x y -- x y x )
 *
 * @param stack
 */
export const over = (stack: Stack) => {
    $(stack, 2);
    stack.push(stack[stack.length - 2]);
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
 * ( x -- x+1 )
 *
 * @param stack
 */
export const inc = (stack: Stack) => {
    $(stack, 1);
    stack[stack.length - 1]++;
};

/**
 * ( x -- x-1 )
 *
 * @param stack
 */
export const dec = (stack: Stack) => {
    $(stack, 1);
    stack[stack.length - 1]--;
};

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
 * environment (one per invocation) instead of the main one passed by
 * `run()` at runtime. This is useful in conjunction with `pushEnv()`
 * and `store()` or `storeKey()` to save results of sub procedures in
 * the main env.
 *
 * ( ? -- ? )
 *
 * @param prog
 * @param env
 */
export const word = (prog: StackProgram, env?: StackEnv) =>
    (stack: Stack, _env: StackEnv) =>
        run(stack, prog, env ? { ...env } : _env);

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
        $stackFn(stack.pop() ? _then : _else)(stack, env);
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
                $stackFn(cases[k])(stack, env);
                return;
            }
        }
        if (cases.default) {
            stack.push(tos);
            $stackFn(cases.default)(stack, env);
            return;
        }
        illegalState(`no matching case for: ${tos}`);
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
                break;
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
export const exec = (stack: Stack, env: StackEnv) => {
    $(stack, 1);
    stack.pop()(stack, env);
};

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
 * ( x y -- x=>y )
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
export const print = (stack: Stack) => {
    $(stack, 1);
    console.log(stack.pop());
};

/**
 * Loads value for `key` from env and pushes it on stack.
 *
 * ( key -- env[key] )
 * @param stack
 * @param env
 */
export const load = (stack: Stack, env: any) => {
    $(stack, 1);
    stack.push(env[stack.pop()]);
};

/**
 * Stores `val` under `key` in env.
 *
 * ( val key -- )
 *
 * @param stack
 * @param env
 */
export const store = (stack: Stack, env: any) => {
    $(stack, 2);
    env[stack.pop()] = stack.pop();
};

/**
 * Higher order word. Similar to `load`, but always uses given
 * preconfigured `key` instead of reading it from stack at runtime.
 *
 * ( -- env[key] )
 * @param stack
 * @param env
 */
export const loadKey = (key: PropertyKey) =>
    (stack: Stack, env: any) => stack.push(env[key]);

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
    (stack: Stack, env: any) => {
        $(stack, 1);
        env[key] = stack.pop();
    };

export {
    op1 as map,
    op2 as map2
}