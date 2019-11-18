import { Fn, Fn2, Predicate } from "@thi.ng/api";
import { IRandom } from "@thi.ng/random";

/**
 * Type alias for S-expression based AST
 */
export type ASTNode<OP, T> = T | [OP, ...T[]];

export interface ASTOpts<OP, T> {
    /**
     * Terminal node generator. If probabilistic, the given PRNG MUST be
     * used for repeatable results.
     */
    terminal: Fn<IRandom, T>;
    /**
     * Op ID selector for unary functions. If probabilistic, the given
     * PRNG MUST be used for repeatable results.
     */
    ops: { fn: Fn2<IRandom, ASTNode<OP, T>[], OP>; chance: number }[];
    /**
     * Predicate function to check if given value is an
     * operator/function.
     */
    isMutatable: Predicate<ASTNode<OP, T> | OP>;
    /**
     * Possibly seeded PRNG instance to be used for AST generation /
     * editing.
     */
    rnd: IRandom;
}
