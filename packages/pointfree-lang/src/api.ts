import { IObjectOf } from "@thi.ng/api/api";
import * as pf from "@thi.ng/pointfree";

export interface ASTNode {
    type: NodeType;
    body: any;
    loc: [number, number];
    id?: string;
    locals: string[];
}

export interface VisitorState {
    word: boolean;
}

export enum NodeType {
    SYM = 1,
    WORD,

    VAR_DEREF,
    VAR_STORE,

    NIL,
    NUMBER,
    BOOLEAN,
    STRING,
    ARRAY,
    OBJ,

    COMMENT,
    STACK_COMMENT,
};

export const ALIASES: IObjectOf<pf.StackFn> = {
    "?drop": pf.dropif,
    "?dup": pf.dupif,
    "-rot": pf.invrot,
    ">r": pf.movdr,
    ">r2": pf.movdr2,
    "r>": pf.movrd,
    "r2>": pf.movrd2,
    "if": pf.condq,
    "switch": pf.casesq,
    "while": pf.loopq,
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
    "pi": pf.push(Math.PI),
    "tau": pf.push(2 * Math.PI),
    ".": pf.print,
    ".s": pf.printds,
    ".r": pf.printrs,
};
