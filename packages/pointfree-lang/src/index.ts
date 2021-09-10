import type { Fn, Fn2, FnU, ILogger, IObjectOf } from "@thi.ng/api";
import { NULL_LOGGER } from "@thi.ng/api/logger";
import { illegalArgs } from "@thi.ng/errors/illegal-arguments";
import { illegalState } from "@thi.ng/errors/illegal-state";
import * as pf from "@thi.ng/pointfree";
import { ALIASES, ASTNode, VisitorState } from "./api";
import { parse, SyntaxError } from "./parser";

export let LOGGER = NULL_LOGGER;

export const setLogger = (logger: ILogger) => (LOGGER = logger);

const nodeLoc = (node: ASTNode) =>
    node.loc ? `line ${node.loc.join(":")} -` : "";

/**
 * Looks up given symbol (word name) in this order of priority:
 * - current `env.__words`
 * - {@link ALIASES}
 * - @thi.ng/pointfree built-ins
 *
 * Throws error if symbol can't be resolved.
 *
 * @param node -
 * @param ctx -
 */
const resolveSym = (node: ASTNode, ctx: pf.StackContext) => {
    const id = node.id!;
    let w = ctx[2].__words[id] || ALIASES[id] || (<any>pf)[id];
    if (!w) {
        illegalArgs(`${nodeLoc(node)} unknown symbol: ${id}`);
    }
    return w;
};

/**
 * Looks up given variable in current `env.__vars` object and returns
 * its value. Throws error if var can't be resolved, either because it's
 * undefined or there's scoping error. Each var uses its own (reverse)
 * stack of scopes (prepared in `ensureEnv`), and the current scope's
 * value is always at the TOS element (`scopes[0]`).
 *
 * @param id -
 * @param ctx -
 */
const resolveVar = (node: ASTNode, ctx: pf.StackContext) => {
    const id = node.id!;
    const v = ctx[2].__vars[id];
    if (!v) {
        illegalArgs(`${nodeLoc(node)} unknown var: ${id}`);
    }
    if (!v.length) {
        illegalState(`${nodeLoc(node)} missing bindings for var: ${id}`);
    }
    return v[0];
};

/**
 * Resolves given node's value. Used by {@link resolveArray} & {@link resolveObject}
 * to process internal values (and in the latter case also their keys).
 *
 * @param node -
 * @param ctx -
 */
const resolveNode = (node: ASTNode, ctx: pf.StackContext): any => {
    switch (node.type) {
        case "sym":
            return resolveSym(node, ctx);
        case "var_deref":
            return resolveVar(node, ctx);
        case "var_store":
            return storevar(node.id!);
        case "array":
            return resolveArray(node, ctx);
        case "obj":
            return resolveObject(node, ctx);
        default:
            return node.body;
    }
};

/**
 * Constructs an array literal (quotation) from given AST node.
 *
 * @param node -
 * @param ctx -
 */
const resolveArray = (node: ASTNode, ctx: pf.StackContext) => {
    const res = [];
    for (let n of node.body) {
        res.push(resolveNode(n, ctx));
    }
    return res;
};

/**
 * Constructs object literal from given AST node.
 *
 * @param node -
 * @param ctx -
 */
const resolveObject = (node: ASTNode, ctx: pf.StackContext) => {
    const res: any = {};
    for (let [k, v] of node.body) {
        res[k.type === "sym" ? k.id : resolveNode(k, ctx)] = resolveNode(
            v,
            ctx
        );
    }
    return res;
};

/**
 * HOF word function. Calls {@link resolveVar} and pushes result on stack.
 *
 * @param node -
 */
const loadvar = (node: ASTNode) => (ctx: pf.StackContext) => {
    ctx[0].push(resolveVar(node, ctx));
    return ctx;
};

/**
 * HOF word function. Pops TOS and stores value in current scope of
 * var's stack of bindings, i.e. `scopes[0] = val`. Creates new scope
 * stack for hitherto unknown vars.
 *
 * @param id -
 */
const storevar = (id: string) => (ctx: pf.StackContext) => {
    pf.ensureStack(ctx[0], 1);
    const v = ctx[2].__vars[id];
    if (v === undefined) {
        ctx[2].__vars[id] = [ctx[0].pop()];
    } else {
        v[0] = ctx[0].pop();
    }
    return ctx;
};

/**
 * HOF word function used by {@link visitWord} to create local variables. Pops
 * TOS and adds it as value for a new scope in stack of bindings for
 * given var.
 *
 * @param id -
 */
const beginvar =
    (id: string): FnU<pf.StackContext> =>
    (ctx) => {
        pf.ensureStack(ctx[0], 1);
        const v = ctx[2].__vars[id];
        if (v === undefined) {
            ctx[2].__vars[id] = [ctx[0].pop()];
        } else {
            v.unshift(ctx[0].pop());
        }
        return ctx;
    };

/**
 * HOF word function used by {@link visitWord} to end local variables. Removes
 * scope from given var's stack of bindings. Throws error if for some
 * reason the scope stack has become corrupted (i.e. no more scopes left
 * to remove).
 *
 * @param id -
 */
const endvar =
    (id: string): FnU<pf.StackContext> =>
    (ctx) => {
        const v = ctx[2].__vars[id];
        if (v === undefined || v.length === 0) {
            illegalState(`can't end scope for var: ${id}`);
        }
        v.shift();
        if (!v.length) {
            delete ctx[2].__vars[id];
        }
        return ctx;
    };

/**
 * Main AST node visitor dispatcher.
 *
 * @param node -
 * @param ctx -
 * @param state -
 */
const visit = (node: ASTNode, ctx: pf.StackContext, state: VisitorState) => {
    LOGGER.fine("visit", node.type, node, ctx[0].toString());
    switch (node.type) {
        case "sym":
            return visitSym(node, ctx, state);
        case "number":
        case "boolean":
        case "string":
        case "nil":
            ctx[0].push(node.body);
            return ctx;
        case "array":
            return visitArray(node, ctx, state);
        case "obj":
            return visitObject(node, ctx, state);
        case "var_deref":
            return visitDeref(node, ctx, state);
        case "var_store":
            return visitStore(node, ctx, state);
        case "word":
            return visitWord(node, ctx, state);
        case "stack_comment":
            visitStackComment(node, state);
        default:
            LOGGER.fine("skipping node...");
    }
    return ctx;
};

/**
 * SYM visitor. Looks up symbol (word name) and if `state.word` is true,
 * pushes word on (temp) stack (created by {@link visitWord}), else executes
 * word. Throws error if unknown word.
 *
 * @param node -
 * @param ctx -
 * @param state -
 */
const visitSym = (node: ASTNode, ctx: pf.StackContext, state: VisitorState) => {
    const w = resolveSym(node, ctx);
    if (state.word) {
        ctx[0].push(w);
        return ctx;
    } else {
        return w(ctx);
    }
};

/**
 * VAR_DEREF visitor. If `state.word` is true, pushes `loadvar(id)` on
 * (temp) stack (created by {@link visitWord}), else attempts to resolve var
 * and pushes its value on stack. Throws error if unknown var.
 *
 * @param node -
 * @param ctx -
 * @param state -
 */
const visitDeref = (
    node: ASTNode,
    ctx: pf.StackContext,
    state: VisitorState
) => (ctx[0].push(state.word ? loadvar(node) : resolveVar(node, ctx)), ctx);

/**
 * VAR_STORE visitor. If `state.word` is true, pushes `storevar(id)` on
 * (temp) stack (created by {@link visitWord}), else executes {@link storevar}
 * directly to save value in env.
 *
 * @param node -
 * @param ctx -
 * @param state -
 */
const visitStore = (
    node: ASTNode,
    ctx: pf.StackContext,
    state: VisitorState
) => {
    const store = storevar(node.id!);
    return state.word ? (ctx[0].push(store), ctx) : store(ctx);
};

const pushLocals = (
    fn: Fn<string, any>,
    wctx: pf.StackContext,
    locals: string[]
) => {
    if (locals) {
        for (let stack = wctx[0], i = locals.length; --i >= 0; ) {
            stack.push(fn(locals[i]));
        }
    }
};

/**
 * WORD visitor to create new word definition. Sets `state.word` to
 * true, builds temp stack context and calls {@link visit} for all child
 * nodes. Then calls {@link word} to compile function and stores it in
 * `env.__words` object.
 *
 * root: {a: 1, b: 2}
 * word1: {a: 2, b: 2} (a is local, b from root)
 * word2: {c: 3, a: 2, b: 2} (c is local, called from w1, a from w1, b: from root)
 *
 * @param node -
 * @param ctx -
 * @param state -
 */
const visitWord = (
    node: ASTNode,
    ctx: pf.StackContext,
    state: VisitorState
) => {
    const id = node.id!;
    if (state.word) {
        illegalState(
            `${nodeLoc(node)}: can't define words inside quotations (${id})`
        );
    }
    let wctx = pf.ctx([], ctx[2]);
    state.word = { name: id, loc: node.loc };
    const locals = node.locals;
    pushLocals(beginvar, wctx, locals);
    for (let n of node.body) {
        wctx = visit(n, wctx, state);
    }
    pushLocals(endvar, wctx, locals);
    const w = pf.defWord(wctx[0]);
    (<any>w).__meta = state.word;
    ctx[2].__words[id] = w;
    state.word = undefined;
    return ctx;
};

const visitStackComment = (node: ASTNode, state: VisitorState) => {
    const word = state.word;
    if (word && !word.stack) {
        word.stack = node.body.join(" -- ");
        word.arities = node.body.map((x: string) => {
            const args = x.split(" ");
            return args[0] === "" ? 0 : x.indexOf("?") >= 0 ? -1 : args.length;
        });
    }
};

const visitWithResolver =
    (resolve: Fn2<ASTNode, pf.StackContext, any>) =>
    (node: ASTNode, ctx: pf.StackContext, state: VisitorState) => {
        ctx[0].push(
            state.word
                ? (_ctx: pf.StackContext) => (
                      _ctx[0].push(resolve(node, _ctx)), _ctx
                  )
                : resolve(node, ctx)
        );
        return ctx;
    };

/**
 * ARRAY visitor for arrays/quotations. If `state.word` is true, pushes
 * call to {@link resolveArray} on temp word stack, else calls {@link resolveArray}
 * and pushes result on stack.
 *
 * @param node -
 * @param ctx -
 * @param state -
 */
const visitArray = visitWithResolver(resolveArray);

/**
 * OBJ visitor for object literals. If `state.word` is true, pushes call
 * to {@link resolveObject} on temp word stack, else calls {@link resolveObject} and
 * pushes result on stack.
 *
 * @param node -
 * @param ctx -
 * @param state -
 */
const visitObject = visitWithResolver(resolveObject);

/**
 * Prepares a the given environment object and if needed injects/updates
 * these keys:
 *
 * - `__words`: dictionary of user defined and FFI words
 * - `__vars`: individual stacks for each defined var name
 *
 * The user pre-defines variables at the root level of the env object,
 * e.g. `{a: 1}`. For each defined var a stack is built inside the
 * `__vars` sub-object, which only exists during runtime and will be
 * removed before returning the env back to the user (handled by
 * {@link finalizeEnv}). The name stacks are used to implement dynamic scoping
 * of all variables.
 *
 * ```
 * // foo uses local var `a` with same name as global
 * // foo also writes to `b` (a new global)
 * // b=12 because foo's local `a` takes precedence over global `a`
 * // during `foo` execution the stack for var `a` is:
 * // {... __vars: {a: [2, 1]}}
 *
 * run(`: foo ^{ a } @a 10 + b!; 2 foo`, {a: 1});
 * // [ [], [], { a: 1, b: 12, __words: { foo: [Function] } } ]
 * ```
 *
 * Also see: {@link loadvar}, {@link storevar}, {@link beginvar}, {@link endvar}
 *
 * @param env -
 */
const ensureEnv = (env?: pf.StackEnv) => {
    env = env || {};
    if (!env.__words) {
        env.__words = {};
    }
    if (!env.__vars) {
        env.__vars = {};
    }
    const vars = env.__vars;
    for (let k in env) {
        if (k !== "__words" && k !== "__vars") {
            vars[k] = [env[k]];
        }
    }
    return env;
};

/**
 * Copies current scope values for all vars back into main env object
 * and removes `env.__vars`. Called from all `run*()` functions.
 *
 * @param ctx -
 */
const finalizeEnv = (ctx: pf.StackContext) => {
    const env = ctx[2];
    const vars = env.__vars;
    delete env.__vars;
    for (let k in vars) {
        const v = vars[k];
        if (v.length !== 1) {
            illegalState(`dangling or missing scopes for var: ${k}`);
        }
        env[k] = v[0];
    }
    return ctx;
};

/**
 * Main user function. Takes a string w/ DSL source code and optional
 * env and stack. Prepares env using `ensureEnv`, parses, compiles and
 * executes source, then returns resulting
 * {@link @thi.ng/pointfree#StackContext} tuple.
 *
 * @param src -
 * @param env -
 * @param stack -
 */
export const run = (src: string, env?: pf.StackEnv, stack: pf.Stack = []) => {
    let ctx = pf.ctx(stack, ensureEnv(env));
    const state = {};
    try {
        for (let node of parse(src)) {
            ctx = visit(node, ctx, state);
        }
        return finalizeEnv(ctx);
    } catch (e) {
        if (e instanceof SyntaxError) {
            throw new Error(
                `line ${e.location.start.line}:${e.location.start.column}: ${e.message}`
            );
        } else {
            throw e;
        }
    }
};

/**
 * Like {@link run}, but returns unwrapped value(s) from result data stack.
 *
 * @param src -
 * @param env -
 * @param stack -
 * @param n -
 */
export const runU = (src: string, env?: pf.StackEnv, stack?: pf.Stack, n = 1) =>
    pf.unwrap(run(src, env, stack), n);

/**
 * Like {@link run}, but returns resulting env object only.
 *
 * @param src -
 * @param env -
 * @param stack -
 */
export const runE = (src: string, env?: pf.StackEnv, stack?: pf.Stack) =>
    run(src, env, stack)[2];

/**
 * Executes word with given name, defined in supplied `env` object and
 * with given optional initial stack. Returns resulting
 * {@link @thi.ng/pointfree#StackContext} tuple.
 *
 * @param id -
 * @param env -
 * @param stack -
 */
export const runWord = (id: string, env: pf.StackEnv, stack: pf.Stack = []) =>
    finalizeEnv(env.__words[id](pf.ctx(stack, ensureEnv(env))));

/**
 * Like {@link runWord}, but returns unwrapped value(s) from result data
 * stack.
 *
 * @param id -
 * @param env -
 * @param stack -
 * @param n -
 */
export const runWordU = (
    id: string,
    env: pf.StackEnv,
    stack: pf.Stack = [],
    n = 1
) => pf.unwrap(finalizeEnv(env.__words[id](pf.ctx(stack, ensureEnv(env)))), n);

/**
 * Like {@link runWord}, but returns resulting env object only.
 *
 * @param id -
 * @param env -
 * @param stack -
 */
export const runWordE = (id: string, env: pf.StackEnv, stack: pf.Stack = []) =>
    finalizeEnv(env.__words[id](pf.ctx(stack, ensureEnv(env))))[2];

/**
 * Takes an environment object and injects given custom word
 * definitions. `words` is an object with keys representing word names
 * and their values {@link @thi.ng/pointfree#StackFn}s. See
 * {@link @thi.ng/pointfree# | @thi.ng/pointfree} package
 * for more details about stack functions.
 *
 * @param env -
 * @param words -
 */
export const ffi = (env: any, words: IObjectOf<pf.StackFn>) => {
    env = ensureEnv(env);
    env.__words = { ...env.__words, ...words };
    return env;
};

export { ensureStack, ensureStackN, unwrap } from "@thi.ng/pointfree";
