import { IObjectOf } from "@thi.ng/api/api";
import { illegalArgs, illegalState } from "@thi.ng/api/error";
import * as pf from "@thi.ng/pointfree";

import { ASTNode, NodeType, ALIASES } from "./api";
import { parse } from "./parser";

let DEBUG = false;

export const setDebug = (state: boolean) => DEBUG = state;

const resolveSym = (node: ASTNode, ctx: pf.StackContext) => {
    const id = node.id;
    let w = (ctx[2].__words[id] || ALIASES[id] || pf[id]);
    if (!w) {
        illegalArgs(`unknown symbol: ${id}`);
    }
    return w;
};

const resolveVar = (id: string, ctx: pf.StackContext) => {
    const w = ctx[2][id];
    if (w === undefined) {
        illegalArgs(`unknown var: ${id}`);
    }
    return w;
};

const visit = (node: ASTNode, ctx: pf.StackContext, isQuote = false) => {
    DEBUG && console.log("visit", NodeType[node.type], node, ctx);
    switch (node.type) {
        case NodeType.SYM:
            return visitSym(node, ctx, isQuote);
        case NodeType.NUMBER:
        case NodeType.BOOLEAN:
        case NodeType.STRING:
        case NodeType.NIL:
            ctx[0].push(node.body);
            return ctx;
        case NodeType.MAP:
            return visitMap(node, ctx, isQuote);
        case NodeType.QUOT:
            return visitQuot(node, ctx);
        case NodeType.VAR_DEREF:
            return visitDeref(node, ctx, isQuote);
        case NodeType.VAR_STORE:
            return visitStore(node, ctx, isQuote);
        case NodeType.WORD:
            return visitWord(node, ctx, isQuote);
        default:
            DEBUG && console.log("skipping node...");
    }
    return ctx;
};

const visitSym = (node: ASTNode, ctx: pf.StackContext, isQuote: boolean) => {
    const w = resolveSym(node, ctx);
    if (isQuote) {
        ctx[0].push(w);
        return ctx;
    } else {
        return w(ctx);
    }
};

const visitQuot = (node: ASTNode, ctx: pf.StackContext) => {
    let qctx = pf.ctx([], ctx[2]);
    for (let n of node.body) {
        qctx = visit(n, qctx, true);
    }
    ctx[0].push(qctx[0]);
    return ctx;
};

const visitDeref = (node: ASTNode, ctx: pf.StackContext, isQuote: boolean) => {
    const id = node.id;
    ctx[0].push(isQuote ? pf.loadkey(id) : resolveVar(id, ctx));
    return ctx;
};

const visitStore = (node: ASTNode, ctx: pf.StackContext, isQuote: boolean) => {
    const id = node.id;
    if (isQuote) {
        ctx[0].push(pf.storekey(id));
        return ctx;
    } else {
        ctx[0].push(id);
        return pf.store(ctx);
    }
};

const visitWord = (node: ASTNode, ctx: pf.StackContext, isQuote: boolean) => {
    const id = node.id;
    if (isQuote) {
        illegalState(`can't define words inside quotations (${id})`);
    }
    let wctx = pf.ctx([], { ...ctx[2] });
    for (let n of node.body) {
        wctx = visit(n, wctx, true);
    }
    const w = pf.word(wctx[0], wctx[2]);
    // TODO add stack comment as meta
    ctx[2].__words[id] = w;
    return ctx;
}

const visitMap = (node: ASTNode, ctx: pf.StackContext, isQuote: boolean) => {
    const res = {};
    let k, v;
    for (let pair of node.body) {
        [k, v] = pair;
        let deferV: ASTNode, deferK: ASTNode;
        switch (v.type) {
            case NodeType.QUOT:
                v = pf.unwrap(visitQuot(v, pf.ctx([], { ...ctx[2] })));
                break;
            case NodeType.MAP:
                v = visitMap(v, pf.ctx([], { ...ctx[2] }), isQuote)[0];
                if (isQuote) {
                    ctx[0].push(...v.slice(0, v.length - 1));
                }
                v = v[v.length - 1];
                break;
            case NodeType.SYM:
                v = resolveSym(v, ctx);
                break;
            case NodeType.VAR_DEREF:
                if (isQuote) {
                    deferV = v;
                } else {
                    v = resolveVar(v.id, ctx);
                }
                break;
            default:
                v = v.body;
        }
        switch (k.type) {
            case NodeType.VAR_DEREF:
                if (isQuote) {
                    deferK = k;
                } else {
                    res[resolveVar(k.id, ctx)] = v;
                }
                break;
            case NodeType.SYM:
                if (deferV) {
                    deferK = k.id;
                } else {
                    res[k.id] = v;
                }
                break;
            default:
                if (deferV) {
                    deferK = k.body;
                } else {
                    res[k.body] = v;
                }
        }
        if (deferK !== undefined || deferV !== undefined) {
            ctx[0].push(deferedPair(res, deferK, deferV || v));
        }
    }
    ctx[0].push(res);
    return ctx;
};

const deferedPair = (res: any, k, v) => {
    return (k.type === NodeType.VAR_DEREF) ?
        (v != null && v.type === NodeType.VAR_DEREF) ?
            (ctx: pf.StackContext) => (res[resolveVar(k.id, ctx)] = resolveVar(v.id, ctx), ctx) :
            (ctx: pf.StackContext) => (res[resolveVar(k.id, ctx)] = v, ctx) :
        (ctx: pf.StackContext) => (res[k] = resolveVar(v.id, ctx), ctx);
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
    for (let node of parse(src)) {
        ctx = visit(node, ctx);
    }
    return ctx;
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