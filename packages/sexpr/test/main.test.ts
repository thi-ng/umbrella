import type { Fn2 } from "@thi.ng/api";
import { defmulti } from "@thi.ng/defmulti";
import { expect, test } from "bun:test";
import {
	parse,
	runtime,
	tokenize,
	type ASTNode,
	type Implementations,
	type Sym,
	type SyntaxOpts,
} from "../src/index.js";

const ops = defmulti<ASTNode, ASTNode[], any, any>((x) => (<Sym>x).value);

const rt = runtime<Implementations<any, any>, any, any>({
	expr: (x, env) => ops(x.children[0], x.children, env),
	sym: (x, env) => env[x.value],
	str: (x) => x.value,
	num: (x) => x.value,
});

const $eval = (src: string, env: any = {}) => rt(parse(src).children[0], env);

const op =
	(fn: Fn2<number, number, number>) =>
	(_: ASTNode, vals: ASTNode[], env: any) =>
		vals.slice(2).reduce((acc, x) => fn(acc, rt(x, env)), rt(vals[1], env));

ops.addAll({
	"+": op((acc, x) => acc + x),
	"*": op((acc, x) => acc * x),
	"-": op((acc, x) => acc - x),
	"/": op((acc, x) => acc / x),
	count: (_, [__, x]) => rt(x, {}).length,
});

ops.setDefault((x, [_, ...args], env) => {
	const f = env[(<Sym>x).value];
	expect(f).toBeFunction();
	return f.apply(
		null,
		args.map((a) => rt(a, env))
	);
});

test("basic", () => {
	expect(parse(tokenize(`(+ 1 (len "234"))`))).toEqual({
		type: "root",
		children: [
			{
				type: "expr",
				value: "(",
				children: [
					{ type: "sym", value: "+" },
					{ type: "num", value: 1 },
					{
						type: "expr",
						value: "(",
						children: [
							{ type: "sym", value: "len" },
							{ type: "str", value: "234" },
						],
					},
				],
			},
		],
	});
});

test("non-expression root", () => {
	expect(parse("x")).toEqual({
		type: "root",
		children: [{ type: "sym", value: "x" }],
	});
	expect(parse("23")).toEqual({
		type: "root",
		children: [{ type: "num", value: 23 }],
	});
});

test("custom syntax", () => {
	const syntax: Partial<SyntaxOpts> = {
		scopes: [
			["<", ">"],
			["{", "}"],
		],
		string: "'",
	};
	expect(parse(`<nest { a '2' b 3 }>`, syntax)).toEqual({
		type: "root",
		children: [
			{
				type: "expr",
				value: "<",
				children: [
					{
						type: "sym",
						value: "nest",
					},
					{
						type: "expr",
						value: "{",
						children: [
							{
								type: "sym",
								value: "a",
							},
							{
								type: "str",
								value: "2",
							},
							{
								type: "sym",
								value: "b",
							},
							{
								type: "num",
								value: 3,
							},
						],
					},
				],
			},
		],
	});
});

test("unmatched", () => {
	expect(() => parse(`(`)).toThrow();
	expect(() => parse(`((`)).toThrow();
	expect(() => parse(`(()`)).toThrow();
});

test("math", () => {
	expect(
		$eval(
			`(/
                    (-
                        (* (count "abc") (+ 100 (* 3 4 5)))
                        foo)
                    100)`,
			{ foo: -20 }
		)
	).toBe((3 * (100 + 3 * 4 * 5) - -20) / 100);
});

test("fn in env", () => {
	expect(
		$eval(`(join (+ 1 2) (+ 3 4))`, {
			join: (...xs: any[]) => xs.join(","),
		})
	).toBe("3,7");
});

test("missing fn in env", () => {
	expect(() => $eval("(foo)")).toThrow();
});

test("line comment", () => {
	expect(
		parse(`
; intro
(def x ; ignore me
; line 2
  ; line 3
23)`)
	).toEqual({
		type: "root",
		children: [
			{
				type: "expr",
				value: "(",
				children: [
					{ type: "sym", value: "def" },
					{ type: "sym", value: "x" },
					{ type: "num", value: 23 },
				],
			},
		],
	});
});
