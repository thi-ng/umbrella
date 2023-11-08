import { XsAdd } from "@thi.ng/random";
import { beforeEach, expect, test } from "bun:test";
import { AST } from "../src/index.js";

let ast: AST<string, number>;

beforeEach(() => {
	ast = new AST({
		terminal: (rnd) => rnd.int() % 10,
		ops: [
			{
				fn: (rnd) => ["+", "-", "*", "/"][rnd.int() % 4],
				arity: 2,
				prob: 0.9,
			},
		],
		maxDepth: 2,
		probMutate: 0.1,
		rnd: new XsAdd(0x12345678),
	});
});

test("generate", () => {
	expect(ast.randomAST()).toEqual({
		type: "op",
		op: "+",
		args: [
			{
				type: "op",
				op: "-",
				args: [
					{
						type: "term",
						value: 5,
					},
					{
						type: "term",
						value: 1,
					},
				],
			},
			{
				type: "op",
				op: "*",
				args: [
					{
						type: "term",
						value: 8,
					},
					{
						type: "term",
						value: 3,
					},
				],
			},
		],
	});
});
