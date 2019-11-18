import {
    Fn,
    Fn2,
    Fn3,
    Fn4,
    Fn5,
    Predicate,
    Tuple
} from "@thi.ng/api";
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
    op1: Fn2<IRandom, ASTNode<OP, T>, OP>;
    /**
     * Op ID selector for binary functions. If probabilistic, the given PRNG
     * MUST be used for repeatable results.
     */
    op2: Fn3<IRandom, ASTNode<OP, T>, ASTNode<OP, T>, OP>;
    /**
     * Op ID selector for functions taking 3 args. If probabilistic, the
     * given PRNG MUST be used for repeatable results.
     */
    op3: Fn4<IRandom, ASTNode<OP, T>, ASTNode<OP, T>, ASTNode<OP, T>, OP>;
    /**
     * Op ID selector for functions taking 4 args. If probabilistic, the
     * given PRNG MUST be used for repeatable results.
     */
    op4: Fn5<
        IRandom,
        ASTNode<OP, T>,
        ASTNode<OP, T>,
        ASTNode<OP, T>,
        ASTNode<OP, T>,
        OP
    >;
    /**
     * Predicate function to check if given value is an
     * operator/function.
     */
    isOp: Predicate<ASTNode<OP, T> | OP>;
    /**
     * Probabilities for the given operator/function types to be used in
     * the generated AST. MUST sum to < 1. The remaining probability is
     * used for generating terminal values.
     *
     * @remarks
     * If certain types aren't to be used, set their probability to 0.
     */
    probs: Tuple<number, 4>;
    /**
     * Possibly seeded PRNG instance to be used for AST generation /
     * editing.
     */
    rnd: IRandom;
}
