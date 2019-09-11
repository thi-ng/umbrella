import { Fn2 } from "@thi.ng/api";

export interface SyntaxOpts {
    scopeOpen: string;
    scopeClose: string;
    ws: RegExp;
    string: string;
}

export type NodeType = "root" | "expr" | "sym" | "str" | "num";

export type Node = RootNode | Expression | Sym | StringNode | NumericNode;

export interface RootNode {
    type: "root";
    children: Node[];
}

export interface Expression {
    type: "expr";
    children: Node[];
    value: string;
}

export interface Sym {
    type: "sym";
    value: string;
}

export interface StringNode {
    type: "str";
    value: string;
}

export interface NumericNode {
    type: "num";
    value: number;
}

export interface Implementations<ENV, RES> {
    root: Fn2<RootNode, ENV, RES>;
    expr: Fn2<Expression, ENV, RES>;
    sym: Fn2<Sym, ENV, RES>;
    str: Fn2<StringNode, ENV, RES>;
    num: Fn2<NumericNode, ENV, RES>;
}

export const DEFAULT_SYNTAX: SyntaxOpts = {
    scopeOpen: "(",
    scopeClose: ")",
    ws: /(\s|,)/,
    string: '"'
};
