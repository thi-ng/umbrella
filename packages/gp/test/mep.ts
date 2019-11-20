import { XsAdd } from "@thi.ng/random";
import * as assert from "assert";
import { MEP } from "../src";

describe("gp (mep)", () => {
    let ast: MEP<string, number>;

    beforeEach(() => {
        ast = new MEP({
            terminal: (rnd) => rnd.int() % 10,
            ops: [
                {
                    fn: (rnd) => ["+", "-", "*", "/"][rnd.int() % 4],
                    arity: 2,
                    prob: 0.9
                }
            ],
            chromoSize: 10,
            probMutate: 0.1,
            rnd: new XsAdd(0x12345678)
        });
    });

    it("generate", () => {
        assert.deepEqual(ast.randomChromosome(), [
            { type: 0, value: 5 },
            { type: 0, value: 5 },
            { type: 1, op: "*", args: [1, 1] },
            { type: 1, op: "-", args: [1, 2] },
            { type: 1, op: "-", args: [0, 0] },
            { type: 1, op: "-", args: [3, 4] },
            { type: 1, op: "*", args: [4, 0] },
            { type: 1, op: "-", args: [2, 3] },
            { type: 1, op: "/", args: [1, 4] },
            { type: 1, op: "-", args: [5, 0] }
        ]);
    });
});
