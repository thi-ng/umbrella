import { assert } from "@thi.ng/api";
import { add, choices, range } from "@thi.ng/transducers";
import { GeneType, GPOpts, OpGene, TerminalGene } from "./api";

export const terminalNode = <T>(value: T): TerminalGene<T> => ({
    type: GeneType.TERMINAL,
    value,
});

export const opNode = <OP, A>(op: OP, args: A[]): OpGene<OP, A> => ({
    type: GeneType.OP,
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
