import type { Fn2 } from "@thi.ng/api";
import { defmulti } from "@thi.ng/defmulti";
import { group } from "@thi.ng/testament";
import * as assert from "assert";
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
	assert.ok(!!f, "missing impl");
	return f.apply(
		null,
		args.map((a) => rt(a, env))
	);
});

group("sexpr", {
	basic: () => {
		assert.deepStrictEqual(parse(tokenize(`(+ 1 (len "234"))`)), {
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
	},

	"custom syntax": () => {
		const syntax: Partial<SyntaxOpts> = {
			scopes: [
				["<", ">"],
				["{", "}"],
			],
			string: "'",
		};
		assert.deepStrictEqual(parse(`<nest { a '2' b 3 }>`, syntax), {
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
	},

	unmatched: () => {
		assert.throws(() => parse(`(`));
		assert.throws(() => parse(`((`));
		assert.throws(() => parse(`(()`));
	},

	math: () => {
		assert.strictEqual(
			$eval(
				`(/
                    (-
                        (* (count "abc") (+ 100 (* 3 4 5)))
                        foo)
                    100)`,
				{ foo: -20 }
			),
			(3 * (100 + 3 * 4 * 5) - -20) / 100
		);
	},

	"fn in env": () => {
		assert.strictEqual(
			$eval(`(join (+ 1 2) (+ 3 4))`, {
				join: (...xs: any[]) => xs.join(","),
			}),
			"3,7"
		);
	},

	"missing fn in env": () => {
		assert.throws(() => $eval("(foo)"));
	},
});
