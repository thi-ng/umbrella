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
                    prob: 0.9,
                },
            ],
            chromoSize: 10,
            probMutate: 0.8,
            rnd: new XsAdd(0x12345678),
        });
    });

    it("generate", () => {
        assert.deepStrictEqual(ast.randomChromosome(), [
            { type: 0, value: 5 },
            { type: 0, value: 5 },
            { type: 1, op: "*", args: [1, 1] },
            { type: 1, op: "-", args: [1, 2] },
            { type: 1, op: "-", args: [0, 0] },
            { type: 1, op: "-", args: [3, 4] },
            { type: 1, op: "*", args: [4, 0] },
            { type: 1, op: "-", args: [2, 3] },
            { type: 1, op: "/", args: [1, 4] },
            { type: 1, op: "-", args: [5, 0] },
        ]);
    });

    it("decode", () => {
        assert.deepStrictEqual(ast.decodeChromosome(ast.randomChromosome()), [
            { type: 0, value: 5 },
            { type: 0, value: 5 },
            {
                type: 1,
                op: "*",
                args: [
                    { type: 0, value: 5 },
                    { type: 0, value: 5 },
                ],
            },
            {
                type: 1,
                op: "-",
                args: [
                    { type: 0, value: 5 },
                    {
                        type: 1,
                        op: "*",
                        args: [
                            { type: 0, value: 5 },
                            { type: 0, value: 5 },
                        ],
                    },
                ],
            },
            {
                type: 1,
                op: "-",
                args: [
                    { type: 0, value: 5 },
                    { type: 0, value: 5 },
                ],
            },
            {
                type: 1,
                op: "-",
                args: [
                    {
                        type: 1,
                        op: "-",
                        args: [
                            { type: 0, value: 5 },
                            {
                                type: 1,
                                op: "*",
                                args: [
                                    { type: 0, value: 5 },
                                    { type: 0, value: 5 },
                                ],
                            },
                        ],
                    },
                    {
                        type: 1,
                        op: "-",
                        args: [
                            { type: 0, value: 5 },
                            { type: 0, value: 5 },
                        ],
                    },
                ],
            },
            {
                type: 1,
                op: "*",
                args: [
                    {
                        type: 1,
                        op: "-",
                        args: [
                            { type: 0, value: 5 },
                            { type: 0, value: 5 },
                        ],
                    },
                    { type: 0, value: 5 },
                ],
            },
            {
                type: 1,
                op: "-",
                args: [
                    {
                        type: 1,
                        op: "*",
                        args: [
                            { type: 0, value: 5 },
                            { type: 0, value: 5 },
                        ],
                    },
                    {
                        type: 1,
                        op: "-",
                        args: [
                            { type: 0, value: 5 },
                            {
                                type: 1,
                                op: "*",
                                args: [
                                    { type: 0, value: 5 },
                                    { type: 0, value: 5 },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                type: 1,
                op: "/",
                args: [
                    { type: 0, value: 5 },
                    {
                        type: 1,
                        op: "-",
                        args: [
                            { type: 0, value: 5 },
                            { type: 0, value: 5 },
                        ],
                    },
                ],
            },
            {
                type: 1,
                op: "-",
                args: [
                    {
                        type: 1,
                        op: "-",
                        args: [
                            {
                                type: 1,
                                op: "-",
                                args: [
                                    { type: 0, value: 5 },
                                    {
                                        type: 1,
                                        op: "*",
                                        args: [
                                            { type: 0, value: 5 },
                                            { type: 0, value: 5 },
                                        ],
                                    },
                                ],
                            },
                            {
                                type: 1,
                                op: "-",
                                args: [
                                    { type: 0, value: 5 },
                                    { type: 0, value: 5 },
                                ],
                            },
                        ],
                    },
                    { type: 0, value: 5 },
                ],
            },
        ]);
    });

    it("decode (filtered)", () => {
        assert.deepStrictEqual(
            ast.decodeChromosome(ast.randomChromosome(), 3),
            [
                {
                    type: 1,
                    op: "-",
                    args: [
                        { type: 0, value: 5 },
                        {
                            type: 1,
                            op: "*",
                            args: [
                                { type: 0, value: 5 },
                                { type: 0, value: 5 },
                            ],
                        },
                    ],
                },
                {
                    type: 1,
                    op: "-",
                    args: [
                        {
                            type: 1,
                            op: "-",
                            args: [
                                { type: 0, value: 5 },
                                {
                                    type: 1,
                                    op: "*",
                                    args: [
                                        { type: 0, value: 5 },
                                        { type: 0, value: 5 },
                                    ],
                                },
                            ],
                        },
                        {
                            type: 1,
                            op: "-",
                            args: [
                                { type: 0, value: 5 },
                                { type: 0, value: 5 },
                            ],
                        },
                    ],
                },
                {
                    type: 1,
                    op: "*",
                    args: [
                        {
                            type: 1,
                            op: "-",
                            args: [
                                { type: 0, value: 5 },
                                { type: 0, value: 5 },
                            ],
                        },
                        { type: 0, value: 5 },
                    ],
                },
                {
                    type: 1,
                    op: "-",
                    args: [
                        {
                            type: 1,
                            op: "*",
                            args: [
                                { type: 0, value: 5 },
                                { type: 0, value: 5 },
                            ],
                        },
                        {
                            type: 1,
                            op: "-",
                            args: [
                                { type: 0, value: 5 },
                                {
                                    type: 1,
                                    op: "*",
                                    args: [
                                        { type: 0, value: 5 },
                                        { type: 0, value: 5 },
                                    ],
                                },
                            ],
                        },
                    ],
                },
                {
                    type: 1,
                    op: "/",
                    args: [
                        { type: 0, value: 5 },
                        {
                            type: 1,
                            op: "-",
                            args: [
                                { type: 0, value: 5 },
                                { type: 0, value: 5 },
                            ],
                        },
                    ],
                },
                {
                    type: 1,
                    op: "-",
                    args: [
                        {
                            type: 1,
                            op: "-",
                            args: [
                                {
                                    type: 1,
                                    op: "-",
                                    args: [
                                        { type: 0, value: 5 },
                                        {
                                            type: 1,
                                            op: "*",
                                            args: [
                                                { type: 0, value: 5 },
                                                { type: 0, value: 5 },
                                            ],
                                        },
                                    ],
                                },
                                {
                                    type: 1,
                                    op: "-",
                                    args: [
                                        { type: 0, value: 5 },
                                        { type: 0, value: 5 },
                                    ],
                                },
                            ],
                        },
                        { type: 0, value: 5 },
                    ],
                },
            ]
        );
    });

    it("mutate", () => {
        assert.deepStrictEqual(ast.mutate(ast.randomChromosome()), [
            { type: 0, value: 0 },
            { type: 0, value: 5 },
            { type: 1, op: "*", args: [1, 0] },
            { type: 1, op: "+", args: [2, 1] },
            { type: 1, op: "-", args: [0, 0] },
            { type: 1, op: "+", args: [4, 2] },
            { type: 1, op: "/", args: [3, 1] },
            { type: 1, op: "/", args: [4, 3] },
            { type: 0, value: 5 },
            { type: 1, op: "/", args: [6, 4] },
        ]);
    });

    it("crossover (single)", () => {
        const a = ast.randomChromosome();
        const b = ast.randomChromosome();
        assert.deepStrictEqual(b, [
            { type: 0, value: 5 },
            { type: 1, op: "*", args: [0, 0] },
            { type: 0, value: 5 },
            { type: 1, op: "-", args: [0, 0] },
            { type: 1, op: "/", args: [1, 0] },
            { type: 1, op: "*", args: [2, 1] },
            { type: 1, op: "-", args: [3, 2] },
            { type: 1, op: "-", args: [2, 1] },
            { type: 0, value: 1 },
            { type: 0, value: 6 },
        ]);
        assert.deepStrictEqual(ast.crossoverSingle(a, b, 5), [
            [
                { type: 0, value: 5 },
                { type: 0, value: 5 },
                { type: 1, op: "*", args: [1, 1] },
                { type: 1, op: "-", args: [1, 2] },
                { type: 1, op: "-", args: [0, 0] },
                // cut
                { type: 1, op: "*", args: [2, 1] },
                { type: 1, op: "-", args: [3, 2] },
                { type: 1, op: "-", args: [2, 1] },
                { type: 0, value: 1 },
                { type: 0, value: 6 },
            ],
            [
                { type: 0, value: 5 },
                { type: 1, op: "*", args: [0, 0] },
                { type: 0, value: 5 },
                { type: 1, op: "-", args: [0, 0] },
                { type: 1, op: "/", args: [1, 0] },
                // cut
                { type: 1, op: "-", args: [3, 4] },
                { type: 1, op: "*", args: [4, 0] },
                { type: 1, op: "-", args: [2, 3] },
                { type: 1, op: "/", args: [1, 4] },
                { type: 1, op: "-", args: [5, 0] },
            ],
        ]);
    });

    it("crossover (uniform)", () => {
        const a = ast.randomChromosome();
        const b = ast.randomChromosome();
        assert.deepStrictEqual(ast.crossoverUniform(a, b), [
            { type: 0, value: 5 },
            { type: 1, op: "*", args: [0, 0] },
            { type: 0, value: 5 },
            { type: 1, op: "-", args: [1, 2] },
            { type: 1, op: "-", args: [0, 0] },
            { type: 1, op: "-", args: [3, 4] },
            { type: 1, op: "-", args: [3, 2] },
            { type: 1, op: "-", args: [2, 1] },
            { type: 0, value: 1 },
            { type: 1, op: "-", args: [5, 0] },
        ]);
    });
});
