import { XsAdd } from "@thi.ng/random";
import { group } from "@thi.ng/testament";
import * as assert from "assert";
import { MEP } from "../src/index.js"

let ast: MEP<string, number>;

group(
    "gp (mep)",
    {
        generate: () => {
            assert.deepStrictEqual(ast.randomChromosome(), [
                { type: "term", value: 5 },
                { type: "term", value: 5 },
                { type: "op", op: "*", args: [1, 1] },
                { type: "op", op: "-", args: [1, 2] },
                { type: "op", op: "-", args: [0, 0] },
                { type: "op", op: "-", args: [3, 4] },
                { type: "op", op: "*", args: [4, 0] },
                { type: "op", op: "-", args: [2, 3] },
                { type: "op", op: "/", args: [1, 4] },
                { type: "op", op: "-", args: [5, 0] },
            ]);
        },

        decode: () => {
            assert.deepStrictEqual(
                ast.decodeChromosome(ast.randomChromosome()),
                [
                    { type: "term", value: 5 },
                    { type: "term", value: 5 },
                    {
                        type: "op",
                        op: "*",
                        args: [
                            { type: "term", value: 5 },
                            { type: "term", value: 5 },
                        ],
                    },
                    {
                        type: "op",
                        op: "-",
                        args: [
                            { type: "term", value: 5 },
                            {
                                type: "op",
                                op: "*",
                                args: [
                                    { type: "term", value: 5 },
                                    { type: "term", value: 5 },
                                ],
                            },
                        ],
                    },
                    {
                        type: "op",
                        op: "-",
                        args: [
                            { type: "term", value: 5 },
                            { type: "term", value: 5 },
                        ],
                    },
                    {
                        type: "op",
                        op: "-",
                        args: [
                            {
                                type: "op",
                                op: "-",
                                args: [
                                    { type: "term", value: 5 },
                                    {
                                        type: "op",
                                        op: "*",
                                        args: [
                                            { type: "term", value: 5 },
                                            { type: "term", value: 5 },
                                        ],
                                    },
                                ],
                            },
                            {
                                type: "op",
                                op: "-",
                                args: [
                                    { type: "term", value: 5 },
                                    { type: "term", value: 5 },
                                ],
                            },
                        ],
                    },
                    {
                        type: "op",
                        op: "*",
                        args: [
                            {
                                type: "op",
                                op: "-",
                                args: [
                                    { type: "term", value: 5 },
                                    { type: "term", value: 5 },
                                ],
                            },
                            { type: "term", value: 5 },
                        ],
                    },
                    {
                        type: "op",
                        op: "-",
                        args: [
                            {
                                type: "op",
                                op: "*",
                                args: [
                                    { type: "term", value: 5 },
                                    { type: "term", value: 5 },
                                ],
                            },
                            {
                                type: "op",
                                op: "-",
                                args: [
                                    { type: "term", value: 5 },
                                    {
                                        type: "op",
                                        op: "*",
                                        args: [
                                            { type: "term", value: 5 },
                                            { type: "term", value: 5 },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        type: "op",
                        op: "/",
                        args: [
                            { type: "term", value: 5 },
                            {
                                type: "op",
                                op: "-",
                                args: [
                                    { type: "term", value: 5 },
                                    { type: "term", value: 5 },
                                ],
                            },
                        ],
                    },
                    {
                        type: "op",
                        op: "-",
                        args: [
                            {
                                type: "op",
                                op: "-",
                                args: [
                                    {
                                        type: "op",
                                        op: "-",
                                        args: [
                                            { type: "term", value: 5 },
                                            {
                                                type: "op",
                                                op: "*",
                                                args: [
                                                    { type: "term", value: 5 },
                                                    { type: "term", value: 5 },
                                                ],
                                            },
                                        ],
                                    },
                                    {
                                        type: "op",
                                        op: "-",
                                        args: [
                                            { type: "term", value: 5 },
                                            { type: "term", value: 5 },
                                        ],
                                    },
                                ],
                            },
                            { type: "term", value: 5 },
                        ],
                    },
                ]
            );
        },

        "decode (filtered)": () => {
            assert.deepStrictEqual(
                ast.decodeChromosome(ast.randomChromosome(), 3),
                [
                    {
                        type: "op",
                        op: "-",
                        args: [
                            { type: "term", value: 5 },
                            {
                                type: "op",
                                op: "*",
                                args: [
                                    { type: "term", value: 5 },
                                    { type: "term", value: 5 },
                                ],
                            },
                        ],
                    },
                    {
                        type: "op",
                        op: "-",
                        args: [
                            {
                                type: "op",
                                op: "-",
                                args: [
                                    { type: "term", value: 5 },
                                    {
                                        type: "op",
                                        op: "*",
                                        args: [
                                            { type: "term", value: 5 },
                                            { type: "term", value: 5 },
                                        ],
                                    },
                                ],
                            },
                            {
                                type: "op",
                                op: "-",
                                args: [
                                    { type: "term", value: 5 },
                                    { type: "term", value: 5 },
                                ],
                            },
                        ],
                    },
                    {
                        type: "op",
                        op: "*",
                        args: [
                            {
                                type: "op",
                                op: "-",
                                args: [
                                    { type: "term", value: 5 },
                                    { type: "term", value: 5 },
                                ],
                            },
                            { type: "term", value: 5 },
                        ],
                    },
                    {
                        type: "op",
                        op: "-",
                        args: [
                            {
                                type: "op",
                                op: "*",
                                args: [
                                    { type: "term", value: 5 },
                                    { type: "term", value: 5 },
                                ],
                            },
                            {
                                type: "op",
                                op: "-",
                                args: [
                                    { type: "term", value: 5 },
                                    {
                                        type: "op",
                                        op: "*",
                                        args: [
                                            { type: "term", value: 5 },
                                            { type: "term", value: 5 },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        type: "op",
                        op: "/",
                        args: [
                            { type: "term", value: 5 },
                            {
                                type: "op",
                                op: "-",
                                args: [
                                    { type: "term", value: 5 },
                                    { type: "term", value: 5 },
                                ],
                            },
                        ],
                    },
                    {
                        type: "op",
                        op: "-",
                        args: [
                            {
                                type: "op",
                                op: "-",
                                args: [
                                    {
                                        type: "op",
                                        op: "-",
                                        args: [
                                            { type: "term", value: 5 },
                                            {
                                                type: "op",
                                                op: "*",
                                                args: [
                                                    { type: "term", value: 5 },
                                                    { type: "term", value: 5 },
                                                ],
                                            },
                                        ],
                                    },
                                    {
                                        type: "op",
                                        op: "-",
                                        args: [
                                            { type: "term", value: 5 },
                                            { type: "term", value: 5 },
                                        ],
                                    },
                                ],
                            },
                            { type: "term", value: 5 },
                        ],
                    },
                ]
            );
        },

        mutate: () => {
            assert.deepStrictEqual(ast.mutate(ast.randomChromosome()), [
                { type: "term", value: 0 },
                { type: "term", value: 5 },
                { type: "op", op: "*", args: [1, 0] },
                { type: "op", op: "+", args: [2, 1] },
                { type: "op", op: "-", args: [0, 0] },
                { type: "op", op: "+", args: [4, 2] },
                { type: "op", op: "/", args: [3, 1] },
                { type: "op", op: "/", args: [4, 3] },
                { type: "term", value: 5 },
                { type: "op", op: "/", args: [6, 4] },
            ]);
        },

        "crossover (single)": () => {
            const a = ast.randomChromosome();
            const b = ast.randomChromosome();
            assert.deepStrictEqual(b, [
                { type: "term", value: 5 },
                { type: "op", op: "*", args: [0, 0] },
                { type: "term", value: 5 },
                { type: "op", op: "-", args: [0, 0] },
                { type: "op", op: "/", args: [1, 0] },
                { type: "op", op: "*", args: [2, 1] },
                { type: "op", op: "-", args: [3, 2] },
                { type: "op", op: "-", args: [2, 1] },
                { type: "term", value: 1 },
                { type: "term", value: 6 },
            ]);
            assert.deepStrictEqual(ast.crossoverSingle(a, b, 5), [
                [
                    { type: "term", value: 5 },
                    { type: "term", value: 5 },
                    { type: "op", op: "*", args: [1, 1] },
                    { type: "op", op: "-", args: [1, 2] },
                    { type: "op", op: "-", args: [0, 0] },
                    // cut
                    { type: "op", op: "*", args: [2, 1] },
                    { type: "op", op: "-", args: [3, 2] },
                    { type: "op", op: "-", args: [2, 1] },
                    { type: "term", value: 1 },
                    { type: "term", value: 6 },
                ],
                [
                    { type: "term", value: 5 },
                    { type: "op", op: "*", args: [0, 0] },
                    { type: "term", value: 5 },
                    { type: "op", op: "-", args: [0, 0] },
                    { type: "op", op: "/", args: [1, 0] },
                    // cut
                    { type: "op", op: "-", args: [3, 4] },
                    { type: "op", op: "*", args: [4, 0] },
                    { type: "op", op: "-", args: [2, 3] },
                    { type: "op", op: "/", args: [1, 4] },
                    { type: "op", op: "-", args: [5, 0] },
                ],
            ]);
        },

        "crossover (uniform)": () => {
            const a = ast.randomChromosome();
            const b = ast.randomChromosome();
            assert.deepStrictEqual(ast.crossoverUniform(a, b), [
                { type: "term", value: 5 },
                { type: "op", op: "*", args: [0, 0] },
                { type: "term", value: 5 },
                { type: "op", op: "-", args: [1, 2] },
                { type: "op", op: "-", args: [0, 0] },
                { type: "op", op: "-", args: [3, 4] },
                { type: "op", op: "-", args: [3, 2] },
                { type: "op", op: "-", args: [2, 1] },
                { type: "term", value: 1 },
                { type: "op", op: "-", args: [5, 0] },
            ]);
        },
    },
    {
        beforeEach: () => {
            ast = new MEP({
                terminal: (rnd) => rnd.int() % 10,
                ops: [
                    {
                        fn: (rnd) => ["+", "-", "*", "/"][rnd.int() % 4],
                        arity: 2,
                        prob: 0.9,
                    },
                ],
                chromoSize: 10,
                probMutate: 0.8,
                rnd: new XsAdd(0x12345678),
            });
        },
    }
);
