import { IObjectOf } from "@thi.ng/api/api";
import { illegalArgs, illegalState } from "@thi.ng/api/error";
import * as pf from "@thi.ng/pointfree";

import { ASTNode, NodeType, ALIASES, VisitorState } from "./api";
import { parse, SyntaxError } from "./parser";

let DEBUG = true;

export const setDebug = (state: boolean) => DEBUG = state;

const nodeLoc = (node: ASTNode) =>
    node.loc ?
        `line ${node.loc.join(":")} -` :
        "";

/**
 * Looks up given symbol (word name) in this order of priority:
 * - current `env.__words`
 * - `ALIASES`
 * - @thi.ng/pointfree built-ins
 *
 * Throws error if symbol can't be resolved.
 *
 * @param node
 * @param ctx
 */
const resolveSym = (node: ASTNode, ctx: pf.StackContext) => {
    const id = node.id;
    let w = (ctx[2].__words[id] || ALIASES[id] || pf[id]);
    if (!w) {
        illegalArgs(`${nodeLoc(node)} unknown symbol: ${id}`);
    }
    return w;
};

/**
 * Looks up given variable in current env and returns its value. Throws
 * error if var can't be resolved.
 *
 * @param id
 * @param ctx
 */
const resolveVar = (node: ASTNode, ctx: pf.StackContext) => {
    const id = node.id;
    if (!ctx[2].hasOwnProperty(id)) {
        illegalArgs(`${nodeLoc(node)} unknown var: ${id}`);
    }
    return ctx[2][id];
};

const resolveNode = (node: ASTNode, ctx: pf.StackContext) => {
    switch (node.type) {
        case NodeType.SYM:
            return resolveSym(node, ctx);
        case NodeType.VAR_DEREF:
            return resolveVar(node, ctx);
        case NodeType.VAR_STORE:
            return pf.storekey(node.id);
        case NodeType.ARRAY:
            return resolveArray(node, ctx);
        case NodeType.MAP:
            return resolveMap(node, ctx);
        default:
            return node.body;
    }
};

const resolveArray = (node: ASTNode, ctx: pf.StackContext) => {
    const res = [];
    for (let n of node.body) {
        res.push(resolveNode(n, ctx));
    }
    return res;
};

const resolveMap = (node: ASTNode, ctx: pf.StackContext) => {
    const res = {};
    for (let [k, v] of node.body) {
        res[k.type === NodeType.SYM ? k.id : resolveNode(k, ctx)] = resolveNode(v, ctx);
    }
    return res;
};

const visit = (node: ASTNode, ctx: pf.StackContext, state: VisitorState) => {
    DEBUG && console.log("visit", NodeType[node.type], node, ctx[0].toString());
    switch (node.type) {
        case NodeType.SYM:
            return visitSym(node, ctx, state);
        case NodeType.NUMBER:
        case NodeType.BOOLEAN:
        case NodeType.STRING:
        case NodeType.NIL:
            ctx[0].push(node.body);
            return ctx;
        case NodeType.ARRAY:
            return visitArray(node, ctx, state);
        case NodeType.MAP:
            return visitMap(node, ctx, state);
        case NodeType.VAR_DEREF:
            return visitDeref(node, ctx, state);
        case NodeType.VAR_STORE:
            return visitStore(node, ctx, state);
        case NodeType.WORD:
            return visitWord(node, ctx, state);
        default:
            DEBUG && console.log("skipping node...");
    }
    return ctx;
};

const visitSym = (node: ASTNode, ctx: pf.StackContext, state: VisitorState) => {
    const w = resolveSym(node, ctx);
    if (state.word) {
        ctx[0].push(w);
        return ctx;
    } else {
        return w(ctx);
    }
};

const visitDeref = (node: ASTNode, ctx: pf.StackContext, state: VisitorState) => {
    if (state.word && node.type === NodeType.VAR_DEREF) {
        ctx[0].push(pf.loadkey(node.id));
    } else {
        ctx[0].push(resolveVar(node, ctx));
    }
    return ctx;
};

const visitStore = (node: ASTNode, ctx: pf.StackContext, state: VisitorState) => {
    const id = node.id;
    if (state.word) {
        ctx[0].push(pf.storekey(id));
        return ctx;
    } else {
        ctx[0].push(id);
        return pf.store(ctx);
    }
};

/**
 * @param node
 * @param ctx
 * @param state
 */
const visitWord = (node: ASTNode, ctx: pf.StackContext, state: VisitorState) => {
    const id = node.id;
    if (state.word) {
        illegalState(`${nodeLoc(node)}: can't define words inside quotations (${id})`);
    }
    let wctx = pf.ctx([], ctx[2]);
    state.word = true;
    for (let n of node.body) {
        wctx = visit(n, wctx, state);
    }
    const w = pf.word(wctx[0], ctx[2]);
    ctx[2].__words[id] = w;
    state.word = false;
    return ctx;
}

const visitArray = (node: ASTNode, ctx: pf.StackContext, state: VisitorState) => {
    if (state.word) {
        ctx[0].push((_ctx) => (_ctx[0].push(resolveArray(node, _ctx)), _ctx));
    } else {
        ctx[0].push(resolveArray(node, ctx));
    }
    return ctx;
};

const visitMap = (node: ASTNode, ctx: pf.StackContext, state: VisitorState) => {
    if (state.word) {
        ctx[0].push((_ctx) => (_ctx[0].push(resolveMap(node, _ctx)), _ctx));
    } else {
        ctx[0].push(resolveMap(node, ctx));
    }
    return ctx;
};

export const ensureEnv = (env?: pf.StackEnv) => {
    env = env || {};
    if (!env.__words) {
        env.__words = {};
    }
    return env;
};

export const run = (src: string, env?: pf.StackEnv, stack: pf.Stack = []) => {
    let ctx = pf.ctx(stack, ensureEnv(env));
    const state = { word: false };
    try {
        for (let node of parse(src)) {
            ctx = visit(node, ctx, state);
        }
        return ctx;
    } catch (e) {
        if (e instanceof SyntaxError) {
            throw new Error(`line ${e.location.start.line}:${e.location.start.column}: ${e.message}`);
        } else {
            throw e;
        }
    }
};

export const runU = (src: string, env?: pf.StackEnv, stack?: pf.Stack, n = 1) =>
    pf.unwrap(run(src, env, stack), n);

export const runE = (src: string, env?: pf.StackEnv, stack?: pf.Stack) =>
    run(src, env, stack)[2];

export const runWord = (id: string, env?: pf.StackEnv, stack: pf.Stack = []) =>
    env.__words[id](pf.ctx(stack, ensureEnv(env)));

export const runWordU = (id: string, env?: pf.StackEnv, stack: pf.Stack = [], n = 1) =>
    pf.unwrap(env.__words[id](pf.ctx(stack, ensureEnv(env))), n);

export const runWordE = (id: string, env?: pf.StackEnv, stack: pf.Stack = []) =>
    env.__words[id](pf.ctx(stack, ensureEnv(env)))[2];

export const ffi = (env: any, words: IObjectOf<pf.StackFn>) => {
    env = ensureEnv(env);
    env.__words = { ...env.__words, ...words };
    return env;
};

export {
    ensureStack,
    ensureStackN,
    unwrap,
} from "@thi.ng/pointfree";
