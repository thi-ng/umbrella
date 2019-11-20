import { SYSTEM } from "@thi.ng/random";
import { repeatedly } from "@thi.ng/transducers";
import {
    GeneType,
    MEPChromosome,
    MEPGene,
    MEPOpts
} from "./api";
import { opNode, probabilities, terminalNode } from "./utils";

export const CONF: MEPOpts<string, number> = {
    chromoSize: 20,
    probMutate: 0.1,
    terminal: (rnd) => rnd.float(),
    ops: [
        {
            fn: (rnd) => ["+", "-", "*", "/"][rnd.int() % 4],
            arity: 2,
            prob: 0.9
        }
    ]
};

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

    randomChromosome(): MEPChromosome<OP, T> {
        const res: MEPChromosome<OP, T> = [];
        for (let i = 0, n = this.opts.chromoSize; i < n; i++) {
            res[i] = this.randomGene(i);
        }
        return res;
    }

    decodeChromosome(chromosome: MEPChromosome<OP, T>) {
        const res: any[] = [];
        for (let i = 0; i < chromosome.length; i++) {
            const gene = chromosome[i];
            res[i] =
                gene.type == GeneType.TERMINAL
                    ? gene.value
                    : [gene.op, ...gene.args.map((g) => res[g])];
        }
        return res;
    }

    crossoverSingleCut(
        chromo1: MEPChromosome<OP, T>,
        chromo2: MEPChromosome<OP, T>
    ): MEPChromosome<OP, T>[] {
        const cut =
            this.opts.rnd!.int() % Math.min(chromo1.length, chromo2.length);
        return [
            chromo1.slice(0, cut).concat(chromo2.slice(cut)),
            chromo2.slice(0, cut).concat(chromo1.slice(cut))
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
        return chromo1.length > chromo2.length
            ? res.concat(chromo1.slice(minLen))
            : chromo2.length > chromo1.length
            ? res.concat(chromo1.slice(minLen))
            : res;
    }

    mutate(chromo: MEPChromosome<OP, T>) {
        const { rnd, probMutate } = this.opts;
        const res: MEPChromosome<OP, T> = new Array(chromo.length);
        for (let i = chromo.length; --i >= 0; ) {
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
