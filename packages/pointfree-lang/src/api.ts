import type { IObjectOf } from "@thi.ng/api";
import * as pf from "@thi.ng/pointfree";

export interface ASTNode {
    type: NodeType;
    body: any;
    loc: [number, number];
    id?: string;
    locals: string[];
}

export interface VisitorState {
    word?: WordMeta;
}

export interface WordMeta {
    name: string;
    loc: [number, number];
    doc?: string;
    stack?: string;
    arities?: number;
}

export type NodeType =
    | "sym"
    | "word"
    | "var_deref"
    | "var_store"
    | "nil"
    | "number"
    | "boolean"
    | "string"
    | "array"
    | "obj"
    | "comment"
    | "stack_comment";

export const ALIASES: IObjectOf<pf.StackFn> = {
    "?drop": pf.dropif,
    "?dup": pf.dupif,
    "-rot": pf.invrot,
    ">r": pf.movdr,
    ">r2": pf.movdr2,
    "r>": pf.movrd,
    "r2>": pf.movrd2,
    if: pf.condq,
    when: pf.whenq,
    switch: pf.casesq,
    while: pf.loopq,
    try: pf.$try,
    "+": pf.add,
    "-": pf.sub,
    "*": pf.mul,
    "/": pf.div,
    "v+": pf.vadd,
    "v-": pf.vsub,
    "v*": pf.vmul,
    "v/": pf.vdiv,
    "=": pf.eq,
    "not=": pf.neq,
    "<=": pf.lteq,
    ">=": pf.gteq,
    "<": pf.lt,
    ">": pf.gt,
    "pos?": pf.ispos,
    "neg?": pf.isneg,
    "nil?": pf.isnull,
    "zero?": pf.iszero,
    "match?": pf.ismatch,
    ">json": pf.tojson,
    "json>": pf.fromjson,
    ">word": (ctx) => {
        const ds = ctx[0];
        pf.ensureStack(ds, 2);
        const name = ds.pop();
        ctx[2].__words[name] = pf.defWord(ds.pop());
        return ctx;
    },
    pi: pf.defPush(Math.PI),
    tau: pf.defPush(2 * Math.PI),
    ".": pf.print,
    ".s": pf.printds,
    ".r": pf.printrs,
    ".e": (ctx) => (console.log(ctx[2]), ctx),
};
