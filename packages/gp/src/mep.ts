import { inRange } from "@thi.ng/math/interval";
import { SYSTEM } from "@thi.ng/random/system";
import { repeatedly } from "@thi.ng/transducers/repeatedly";
import type { ASTNode, MEPChromosome, MEPGene, MEPOpts } from "./api.js";
import { opNode, probabilities, terminalNode } from "./utils.js";

export class MEP<OP, T> {
	opts: MEPOpts<OP, T>;
	probTerminal: number;
	choices: IterableIterator<number>;

	constructor(opts: MEPOpts<OP, T>) {
		this.opts = { rnd: SYSTEM, ...opts };
		const probs = probabilities(this.opts);
		this.probTerminal = probs.probTerminal;
		this.choices = probs.iter;
	}

	/**
	 * Returns a new random {@link MEPChromosome} with the configured
	 * probabilities of operator and terminal nodes (constants).
	 *
	 * @remarks
	 * See {@link MEP.decodeChromosome} for conversion to
	 * {@link ASTNode}s.
	 *
	 */
	randomChromosome(): MEPChromosome<OP, T> {
		const res: MEPChromosome<OP, T> = [];
		for (let i = 0, n = this.opts.chromoSize; i < n; i++) {
			res[i] = this.randomGene(i);
		}
		return res;
	}

	/**
	 * Decodes given chromosome into an array of {@link ASTNode}s and
	 * optionally applies tree depth filter (by default includes all).
	 *
	 * @remarks
	 * A {@link MEPChromosome} encodes multiple solutions (one per gene
	 * slot), therefore a chromosome of length `n` will produce the same
	 * number ASTs (less if min/max tree depth filters are applied).
	 *
	 * @param chromosome -
	 * @param minDepth -
	 * @param maxDepth -
	 */
	decodeChromosome(
		chromosome: MEPChromosome<OP, T>,
		minDepth = 0,
		maxDepth = Infinity
	) {
		const res: ASTNode<OP, T>[] = [];
		const depths: number[] = [];
		for (let i = 0; i < chromosome.length; i++) {
			const gene = chromosome[i];
			if (gene.type == "term") {
				res[i] = gene;
				depths[i] = 1;
			} else {
				res[i] = opNode(
					gene.op,
					gene.args.map((g) => res[g])
				);
				depths[i] =
					1 + gene.args.reduce((d, a) => Math.max(d, depths[a]), 0);
			}
		}
		return res.filter((_, i) => inRange(depths[i], minDepth, maxDepth));
	}

	crossoverSingle(
		chromo1: MEPChromosome<OP, T>,
		chromo2: MEPChromosome<OP, T>,
		cut?: number
	): MEPChromosome<OP, T>[] {
		cut =
			cut !== undefined
				? cut
				: this.opts.rnd!.int() %
				  Math.min(chromo1.length, chromo2.length);
		return [
			chromo1.slice(0, cut).concat(chromo2.slice(cut)),
			chromo2.slice(0, cut).concat(chromo1.slice(cut)),
		];
	}

	crossoverUniform(
		chromo1: MEPChromosome<OP, T>,
		chromo2: MEPChromosome<OP, T>
	) {
		const rnd = this.opts.rnd!;
		const res: MEPChromosome<OP, T> = [];
		const minLen = Math.min(chromo1.length, chromo2.length);
		for (let i = 0; i < minLen; i++) {
			res[i] = rnd.float() < 0.5 ? chromo1[i] : chromo2[i];
		}
		return chromo1.length > minLen
			? res.concat(chromo1.slice(minLen))
			: chromo2.length > minLen
			? res.concat(chromo2.slice(minLen))
			: res;
	}

	mutate(chromo: MEPChromosome<OP, T>) {
		const { rnd, probMutate } = this.opts;
		const res: MEPChromosome<OP, T> = new Array(chromo.length);
		for (let i = chromo.length; i-- > 0; ) {
			res[i] = rnd!.float() < probMutate ? this.randomGene(i) : chromo[i];
		}
		return res;
	}

	protected randomGene(i: number): MEPGene<OP, T> {
		const geneID = this.choices.next().value;
		const rnd = this.opts.rnd!;
		if (i === 0 || geneID === 0) {
			return terminalNode(this.opts.terminal(rnd));
		}
		const op = this.opts.ops[geneID - 1];
		const args = [...repeatedly(() => rnd.int() % i, op.arity)];
		return opNode(op.fn(rnd, args), args);
	}
}
