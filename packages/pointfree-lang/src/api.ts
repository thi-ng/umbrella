import { IObjectOf } from "@thi.ng/api/api";
import * as pf from "@thi.ng/pointfree";

export interface ASTNode {
    type: NodeType;
    body: any;
    id?: string;
}

export enum NodeType {
    SYM = 1,
    WORD,
    QUOT,

    VAR_DEREF,
    VAR_STORE,

    NIL,
    NUMBER,
    BOOLEAN,
    STRING,
    MAP,
    SET,

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
    "1+": pf.inc,
    "1-": pf.dec,
    "v+": pf.vadd,
    "v-": pf.vsub,
    "v*": pf.vmul,
    "v/": pf.vdiv,
    ".": pf.print,
    ".s": pf.printds,
    ".r": pf.printrs,
};
