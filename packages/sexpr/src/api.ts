import type { Fn2 } from "@thi.ng/api";

export interface SyntaxOpts {
    /**
     * An array of string pairs defining possible S-expression / scope
     * delimiters [open, close]. By default only the classic ["(",")"]
     * pair is defined. Only single character delimiters are supported.
     *
     * {@link DEFAULT_SYNTAX}
     */
    scopes: string[][];
    /**
     * Regex to identify whitespace a single whitespace character.
     * Default: space, tab, newline, comma
     */
    whiteSpace: RegExp;
    /**
     * Single character string to delineate string values.
     * Default: `"`
     */
    string: string;
}

export interface Token {
    /**
     * Token value
     */
    value: string;
    /**
     * Token's start line
     */
    line: number;
    /**
     * Token's start column
     */
    col: number;
}

export type NodeType = "root" | "expr" | "sym" | "str" | "num";

export type ASTNode = Root | Expression | Sym | Str | Numeric;

/**
 * Base interface for custom AST nodes
 */
export interface INode {
    type: string;
    parent?: INode;
}

export interface Root extends INode {
    type: "root";
    children: ASTNode[];
}

/**
 * AST Node defining an S-expression.
 */
export interface Expression extends INode {
    type: "expr";
    /**
     * Child nodes
     */
    children: ASTNode[];
    /**
     * Scope type char (as per configured syntax)
     */
    value: string;
}

/**
 * AST symbol node. Merely holds symbol name.
 */
export interface Sym extends INode {
    type: "sym";
    value: string;
}

/**
 * AST string node. Merely wraps string value.
 */
export interface Str extends INode {
    type: "str";
    value: string;
}

/**
 * AST numeric node. Merely wraps parsed numeric value.
 */
export interface Numeric extends INode {
    type: "num";
    value: number;
}

/**
 * Type hinted runtime implementations.
 */
export interface Implementations<ENV, RES> {
    root: Fn2<Root, ENV, RES>;
    expr: Fn2<Expression, ENV, RES>;
    sym: Fn2<Sym, ENV, RES>;
    str: Fn2<Str, ENV, RES>;
    num: Fn2<Numeric, ENV, RES>;
}

export const DEFAULT_SYNTAX: SyntaxOpts = {
    scopes: [["(", ")"]],
    whiteSpace: /(\s|,)/,
    string: '"',
};
