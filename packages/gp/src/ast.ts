import { assert } from "@thi.ng/api";
import { SYSTEM } from "@thi.ng/random";
import {
    add,
    choices,
    comp,
    drop,
    iterate,
    iterator,
    range,
    repeatedly,
    takeWhile
} from "@thi.ng/transducers";
import { arrayZipper, Location } from "@thi.ng/zipper";
import { ASTNode, ASTOpts } from "./api";

const generateASTNode = <OP, T>(
    opts: ASTOpts<OP, T>,
    choices: IterableIterator<number>,
    d: number,
    maxDepth: number
): ASTNode<OP, T> => {
    const rnd = opts.rnd || SYSTEM;
    const arity = choices.next().value;
    if (arity === 0 || d >= maxDepth) return opts.terminal(rnd);
    const children = [
        ...repeatedly(
            () => generateASTNode(opts, choices, d + 1, maxDepth),
            arity
        )
    ];
    return <ASTNode<OP, T>>[opts.ops[arity - 1].fn(rnd, children), ...children];
};

/**
 * Returns a random AST based on given config `opts` and max tree depth.
 *
 * @param opts
 * @param maxDepth
 */
export const generateAST = <OP, T>(opts: ASTOpts<OP, T>, maxDepth = 4) => {
    const probabilities = opts.ops.map((op) => op.chance);
    const psum = add(probabilities);
    assert(psum < 1, "total op probabilities MUST be < 1");
    return generateASTNode(
        opts,
        choices(
            [...range(probabilities.length + 1)],
            [1 - psum, ...probabilities],
            opts.rnd
        ),
        0,
        maxDepth
    );
};

/**
 * Returns linearized/flat version of given AST (excluding the root
 * node) as an array of
 * {@link @thi.ng/zipper#Location | zipper locations}.
 *
 * @param tree
 */
export const linearizedAST = <OP, T>(
    tree: ASTNode<OP, T>
): Location<ASTNode<OP, T> | OP>[] => [
    ...iterator(
        comp(
            drop(1),
            takeWhile((x) => !!x)
        ),
        iterate<any>((x) => x.next, arrayZipper<ASTNode<OP, T> | OP>(<any>tree))
    )
];

/**
 * Returns random {@link ASTNode} from given tree, using the user
 * provided PRNG (via `opts`) or {@link @thi.ng/random#SYSTEM}.
 *
 * @param opts
 * @param tree
 */
export const randomNode = <OP, T>(
    opts: ASTOpts<OP, T>,
    tree: ASTNode<OP, T>
) => {
    const rnd = opts.rnd || SYSTEM;
    const linTree = linearizedAST(tree);
    let node: Location<ASTNode<OP, T> | OP>;
    do {
        node = linTree[rnd.int() % linTree.length];
    } while (!opts.isMutatable(node.node));
    return node;
};

/**
 * Probilistically replaces a randomly chosen tree node with a new random AST.
 *
 * @remarks
 * The default `maxDepth` of the replacement AST is 1, but can adjusted.
 *
 * @param opts
 * @param tree
 * @param rate
 * @param maxDepth
 */
export const mutate = <OP, T>(
    opts: ASTOpts<OP, T>,
    tree: ASTNode<OP, T>,
    rate: number,
    maxDepth = 1
) => {
    const rnd = opts.rnd || SYSTEM;
    return rnd.float() < rate
        ? randomNode(opts, tree).replace(generateAST(opts, maxDepth)).root
        : tree;
};

/**
 * Immutably transplants a randomly chosen subtree of `parent2` into a
 * randomly chosen location in `parent1`. Returns updated tree.
 *
 * @param opts
 * @param parent1
 * @param parent2
 */
export const crossover = <OP, T>(
    opts: ASTOpts<OP, T>,
    parent1: ASTNode<OP, T>,
    parent2: ASTNode<OP, T>
) => randomNode(opts, parent1).replace(randomNode(opts, parent2).node).root;
