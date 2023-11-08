import { XsAdd } from "@thi.ng/random";
import { beforeEach, expect, test } from "bun:test";
import { MEP } from "../src/index.js";

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

test("generate", () => {
	expect(ast.randomChromosome()).toEqual([
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
});

test("decode", () => {
	expect(ast.decodeChromosome(ast.randomChromosome())).toEqual([
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
	]);
});

test("decode (filtered)", () => {
	expect(ast.decodeChromosome(ast.randomChromosome(), 3)).toEqual([
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
	]);
});

test("mutate", () => {
	expect(ast.mutate(ast.randomChromosome())).toEqual([
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
});

test("crossover (single)", () => {
	const a = ast.randomChromosome();
	const b = ast.randomChromosome();
	expect(b).toEqual([
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
	expect(ast.crossoverSingle(a, b, 5)).toEqual([
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
});

test("crossover (uniform)", () => {
	const a = ast.randomChromosome();
	const b = ast.randomChromosome();
	expect(ast.crossoverUniform(a, b)).toEqual([
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
});
