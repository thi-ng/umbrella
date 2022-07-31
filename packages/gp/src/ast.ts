import { assert } from "@thi.ng/errors/assert";
import { SYSTEM } from "@thi.ng/random/system";
import { iterate } from "@thi.ng/transducers/iterate";
import { iterator } from "@thi.ng/transducers/iterator";
import { repeatedly } from "@thi.ng/transducers/repeatedly";
import { takeWhile } from "@thi.ng/transducers/take-while";
import type { Location } from "@thi.ng/zipper";
import { zipper } from "@thi.ng/zipper/zipper";
import type { ASTNode, ASTOpts, OpGene } from "./api.js";
import { opNode, probabilities, terminalNode } from "./utils.js";

export class AST<OP, T> {
	opts: ASTOpts<OP, T>;
	choices: IterableIterator<number>;
	probTerminal: number;

	constructor(opts: ASTOpts<OP, T>) {
		this.opts = { rnd: SYSTEM, ...opts };
		assert(this.opts.probMutate < 1, "mutation probability must be < 1.0");
		const probs = probabilities(this.opts);
		this.probTerminal = probs.probTerminal;
		this.choices = probs.iter;
	}

	/**
	 * Returns a random AST with given max tree depth. The max depth
	 * provided in {@link ASTOpts} is used by default.
	 *
	 * @param maxDepth -
	 */
	randomAST(maxDepth = this.opts.maxDepth) {
		return this.randomASTNode(0, maxDepth);
	}

	/**
	 * Immutably transplants a randomly chosen subtree of `parent2` into
	 * a randomly chosen location in `parent1` and vice versa. Returns 2
	 * new trees.
	 *
	 * @param parent1 -
	 * @param parent2 -
	 */
	crossoverSingle(parent1: ASTNode<OP, T>, parent2: ASTNode<OP, T>) {
		return [
			this.selectRandomNode(parent1).replace(
				this.selectRandomNode(parent2).node
			).root,
			this.selectRandomNode(parent2).replace(
				this.selectRandomNode(parent1).node
			).root,
		];
	}

	/**
	 * Probilistically replaces randomly chosen tree nodes with a new random AST
	 * of given `maxDepth` (default: 1). Never mutates root.
	 *
	 * @remarks
	 * The AST's pre-configured max tree depth will always be respected, so
	 * depending on the depth of the selected mutation location, the randomly
	 * inserted/replaced subtree might be more shallow than given `maxDepth`.
	 * I.e. if a tree node at max depth is selected for mutation, it will always
	 * result in a randomly chosen terminal node only.
	 *
	 * @param tree -
	 * @param maxDepth -
	 */
	mutate(tree: ASTNode<OP, T>, maxDepth = 1) {
		const { rnd, probMutate, maxDepth: limit } = this.opts;
		let loc = this.asZipper(tree).next!;
		if (!loc) return tree;
		while (true) {
			let nextLoc: Location<ASTNode<OP, T>> | undefined;
			if (rnd!.float() < probMutate) {
				loc = loc.replace(
					this.randomASTNode(0, Math.min(limit - loc.depth, maxDepth))
				);
				nextLoc = loc.right;
				if (!nextLoc) {
					nextLoc = loc.up;
					if (nextLoc) {
						nextLoc = nextLoc.right;
					}
				}
			} else {
				nextLoc = loc.next;
			}
			if (!nextLoc) return loc.root;
			loc = nextLoc;
		}
	}

	/**
	 * Returns linearized/flat version of given AST as an array of
	 * {@link @thi.ng/zipper#Location | zipper locations}.
	 *
	 * @param tree -
	 */
	linearizedAST(tree: ASTNode<OP, T>): Location<ASTNode<OP, T>>[] {
		return [
			...iterator(
				takeWhile((x) => !!x),
				iterate<any>((x) => x.next, this.asZipper(tree))
			),
		];
	}

	/**
	 * Returns random {@link ASTNode} from given tree, using the user
	 * provided PRNG (via `opts`) or {@link @thi.ng/random#SYSTEM}. The
	 * returned value is a
	 * {@link @thi.ng/zipper#Location | zipper location} of the selected
	 * node.
	 *
	 * @remarks
	 * The actual `ASTNode` can be obtained via `.node`.
	 *
	 * Only nodes in the linearized index range `[min..max)` are
	 * returned (default: entire tree range). Since the linear tree
	 * length isn't known beforehand, `max` < 0 (default) is equivalent
	 * to the linearized tree end.
	 *
	 * @param opts -
	 * @param tree -
	 * @param min -
	 * @param max -
	 */
	selectRandomNode(tree: ASTNode<OP, T>, min = 0, max = -1) {
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
			...repeatedly(() => this.randomASTNode(d + 1, maxDepth), op.arity),
		];
		return opNode(op.fn(rnd, children), children);
	}

	protected asZipper(tree: ASTNode<OP, T>) {
		return zipper<ASTNode<OP, T>>(
			{
				branch: (x) => x.type === "op",
				children: (x) => (<OpGene<OP, ASTNode<OP, T>>>x).args,
				factory: (n, args) =>
					opNode((<OpGene<OP, ASTNode<OP, T>>>n).op, args),
			},
			tree
		);
	}
}
