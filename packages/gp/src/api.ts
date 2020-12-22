import type { Fn, Fn2 } from "@thi.ng/api";
import type { IRandom } from "@thi.ng/random";

export type GeneType = "term" | "op";

/**
 * Type alias for S-expression based AST
 */
export type ASTNode<OP, T> = TerminalGene<T> | OpGene<OP, ASTNode<OP, T>>;

export type MEPGene<OP, T> = TerminalGene<T> | OpGene<OP, number>;

export type MEPChromosome<OP, T> = MEPGene<OP, T>[];

export interface GPOpts<OP, T, ARGS> {
    /**
     * Terminal node generator. If probabilistic, the given PRNG MUST be
     * used for repeatable results.
     */
    terminal: Fn<IRandom, T>;
    /**
     * Operator node generators.
     */
    ops: OpGenSpec<ARGS, OP>[];
    /**
     * Possibly seeded PRNG instance to be used for AST generation /
     * editing.
     *
     * @defaultValue {@link @thi.ng/random#SYSTEM}
     */
    rnd?: IRandom;
    /**
     * Per-gene mutation probability. MUST be < 1 for {@link ASTOpts} to
     * avoid infinite tree expansion.
     */
    probMutate: number;
}

export interface OpGenSpec<NODE, OP> {
    /**
     * Function producing/selecting an operator value. If probabilistic,
     * the given PRNG MUST be used for repeatable results. The function
     * is called with all argument genes/expressions to allow inform the
     * operator selection.
     */
    fn: Fn2<IRandom, NODE[], OP>;
    /**
     * Operator / function arity (number or args to generate).
     */
    arity: number;
    /**
     * Probability for this generator to be used.
     */
    prob: number;
}

export interface ASTOpts<OP, T> extends GPOpts<OP, T, ASTNode<OP, T>> {
    maxDepth: number;
}

export interface MEPOpts<OP, T> extends GPOpts<OP, T, number> {
    chromoSize: number;
}

export interface TerminalGene<T> {
    type: "term";
    value: T;
}

export interface OpGene<OP, A> {
    type: "op";
    op: OP;
    args: A[];
}
