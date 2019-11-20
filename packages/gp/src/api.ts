import { Fn, Fn2 } from "@thi.ng/api";
import { IRandom } from "@thi.ng/random";

export const enum GeneType {
    TERMINAL,
    OP
}

/**
 * Type alias for S-expression based AST
 *
 * TODO update OpGen generics (recursive ASTNode<OP,T>)
 */
export type ASTNode<OP, T> = TerminalGene<T> | OpGene<OP, any>;

export type MEPGene<OP, T> = TerminalGene<T> | OpGene<OP, number>;

export type MEPChromosome<OP, T> = MEPGene<OP, T>[];

export interface GPOpts<OP, T, ARGS> {
    /**
     * Terminal node generator. If probabilistic, the given PRNG MUST be
     * used for repeatable results.
     */
    terminal: Fn<IRandom, T>;
    /**
     * Op ID selector for unary functions. If probabilistic, the given
     * PRNG MUST be used for repeatable results.
     */
    ops: OpGenSpec<ARGS, OP>[];
    /**
     * Possibly seeded PRNG instance to be used for AST generation /
     * editing.
     */
    rnd?: IRandom;
    probMutate: number;
}

export interface ASTOpts<OP, T> extends GPOpts<OP, T, ASTNode<OP, T>> {
    maxDepth: number;
}

export interface MEPOpts<OP, T> extends GPOpts<OP, T, number> {
    chromoSize: number;
}

export interface TerminalGene<T> {
    type: GeneType.TERMINAL;
    value: T;
}

export interface OpGene<OP, A> {
    type: GeneType.OP;
    op: OP;
    args: A[];
}

export interface OpGenSpec<NODE, OP> {
    fn: Fn2<IRandom, NODE[], OP>;
    arity: number;
    prob: number;
}
