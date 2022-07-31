// thing:no-export
import { assert } from "@thi.ng/errors/assert";
import { add } from "@thi.ng/transducers/add";
import { choices } from "@thi.ng/transducers/choices";
import { range } from "@thi.ng/transducers/range";
import type { GPOpts, OpGene, TerminalGene } from "./api.js";

export const terminalNode = <T>(value: T): TerminalGene<T> => ({
	type: "term",
	value,
});

export const opNode = <OP, A>(op: OP, args: A[]): OpGene<OP, A> => ({
	type: "op",
	op,
	args,
});

export const probabilities = (opts: GPOpts<any, any, any>) => {
	const probabilities = opts.ops.map((op) => op.prob);
	const psum = add(probabilities);
	assert(psum < 1, "total op probabilities MUST be < 1");
	return {
		iter: choices<number>(
			[...range(probabilities.length + 1)],
			[1 - psum, ...probabilities],
			opts.rnd
		),
		probTerminal: 1 - psum,
	};
};
