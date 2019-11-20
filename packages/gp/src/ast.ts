import { SYSTEM } from "@thi.ng/random";
import {
    comp,
    drop,
    iterate,
    iterator,
    repeatedly,
    takeWhile
} from "@thi.ng/transducers";
import { Location, zipper } from "@thi.ng/zipper";
import {
    ASTNode,
    ASTOpts,
    GeneType,
    OpGene
} from "./api";
import { opNode, probabilities, terminalNode } from "./utils";

export class AST<OP, T> {
    opts: ASTOpts<OP, T>;
    choices: IterableIterator<number>;
    probTerminal: number;

    constructor(opts: ASTOpts<OP, T>) {
        this.opts = { rnd: SYSTEM, ...opts };
        const probs = probabilities(this.opts);
        this.probTerminal = probs.probTerminal;
        this.choices = probs.iter;
    }

    /**
     * Returns a random AST with given max tree depth.
     *
     * @param maxDepth
     */
    randomAST(maxDepth = this.opts.maxDepth) {
        return this.randomASTNode(0, maxDepth);
    }

    /**
     * Immutably transplants a randomly chosen subtree of `parent2` into
     * a randomly chosen location in `parent1` and vice versa. Returns 2
     * new trees.
     *
     * @param parent1
     * @param parent2
     */
    crossover(parent1: ASTNode<OP, T>, parent2: ASTNode<OP, T>) {
        return [
            this.selectRandomNode(parent1).replace(
                this.selectRandomNode(parent2).node
            ).root,
            this.selectRandomNode(parent2).replace(
                this.selectRandomNode(parent1).node
            ).root
        ];
    }

    /**
     * Probilistically replaces a randomly chosen tree node with a new
     * random AST.
     *
     * @remarks
     * The default `maxDepth` of the replacement AST is 1, but can adjusted.
     *
     * @param tree
     * @param num
     * @param maxDepth
     * @param min
     * @param max
     */
    mutate(tree: ASTNode<OP, T>, num = 1, maxDepth = 1, min = 1, max = -1) {
        const { rnd, probMutate } = this.opts;
        for (; num-- > 0; ) {
            tree =
                rnd!.float() < probMutate
                    ? <ASTNode<OP, T>>(
                          this.selectRandomNode(tree, min, max).replace(
                              this.randomASTNode(0, maxDepth)
                          ).root
                      )
                    : tree;
        }
        return tree;
    }

    /**
     * Returns linearized/flat version of given AST (excluding the root
     * node) as an array of
     * {@link @thi.ng/zipper#Location | zipper locations}.
     *
     * @param tree
     */
    linearizedAST(tree: ASTNode<OP, T>): Location<ASTNode<OP, T>>[] {
        return [
            ...iterator(
                comp(
                    drop(1),
                    takeWhile((x) => !!x)
                ),
                iterate<any>(
                    (x) => x.next,
                    zipper<ASTNode<OP, T>>(
                        {
                            branch: (x) => x.type === GeneType.OP,
                            children: (x) =>
                                (<OpGene<OP, ASTNode<OP, T>>>x).args,
                            factory: (n, args) =>
                                opNode((<OpGene<OP, ASTNode<OP, T>>>n).op, args)
                        },
                        tree
                    )
                )
            )
        ];
    }

    /**
     * Returns random {@link ASTNode} from given tree, using the user
     * provided PRNG (via `opts`) or {@link @thi.ng/random#SYSTEM}. The
     * returned value is a {@link @thi.ng/zipper#Location | zipper location}
     * of the selected node.
     *
     * @remarks
     * The actual `ASTNode` can be obtained via `.node`.
     *
     * Only nodes in the linearized index range `[min..max)` are returned.
     * `max` < 0 (default) is equivalent to the linearized tree end.
     *
     * @param opts
     * @param tree
     * @param min
     * @param max
     */
    selectRandomNode(tree: ASTNode<OP, T>, min = 1, max = -1) {
        const rnd = this.opts.rnd;
        const linTree = this.linearizedAST(tree);
        let node: Location<ASTNode<OP, T>>;
        max < 0 && (max = linTree.length);
        node = linTree[rnd!.minmax(min, max) | 0];
        return node;
    }

    protected randomASTNode(d: number, maxDepth: number): ASTNode<OP, T> {
        const rnd = this.opts.rnd!;
        const geneID = this.choices.next().value;
        if (geneID === 0 || d >= maxDepth)
            return terminalNode(this.opts.terminal(rnd));
        const op = this.opts.ops[geneID - 1];
        const children = [
            ...repeatedly(() => this.randomASTNode(d + 1, maxDepth), op.arity)
        ];
        return opNode(op.fn(rnd, children), children);
    }
}
