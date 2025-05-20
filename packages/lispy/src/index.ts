import type { Fn, Fn2 } from "@thi.ng/api";
import { isFunction } from "@thi.ng/checks/is-function";
import { OPERATORS } from "@thi.ng/compare/ops";
import { DEFAULT, defmulti } from "@thi.ng/defmulti";
import { assert } from "@thi.ng/errors/assert";
import { illegalArgs } from "@thi.ng/errors/illegal-arguments";
import { illegalArity } from "@thi.ng/errors/illegal-arity";
import { deg, rad } from "@thi.ng/math/angle";
import { HALF_PI, TAU } from "@thi.ng/math/api";
import { fit } from "@thi.ng/math/fit";
import { clamp } from "@thi.ng/math/interval";
import { mix } from "@thi.ng/math/mix";
import { smoothStep, step } from "@thi.ng/math/step";
import { selectKeysObj } from "@thi.ng/object-utils/select-keys";
import type { ASTNode, Expression, Implementations, Sym } from "@thi.ng/sexpr";
import { parse } from "@thi.ng/sexpr/parse";
import { runtime } from "@thi.ng/sexpr/runtime";
import { capitalize, lower, upper } from "@thi.ng/strings/case";
import { KERNEL } from "./kernel.js";

export type Env = Record<string, any>;

/** @internal */
const __mathOp =
	(fn: Fn2<number, number, number>, fn1: Fn<number, number>) =>
	(first: any, ...args: any[]) => {
		return args.length > 0
			? // use a reduction for 2+ args
			  args.reduce((acc, x) => fn(acc, x), first)
			: // apply special case unary function
			  fn1(first);
	};

/** @internal */
const __fnImpl =
	(args: ASTNode, body: ASTNode[], env: Env) =>
	(...xs: any[]) => {
		const $args = (<Expression>args).children;
		if ($args.length !== xs.length) illegalArity($args.length);
		// create new local env with arguments bound to named function args
		// (i.e. simple lexical scoping)
		const $env = $args.reduce(
			(acc, a, i) => ((acc[(<Sym>a).value] = xs[i]), acc),
			{ ...env }
		);
		// execute function body with local env, return result of last expr
		return body.reduce((_, x) => interpret(x, $env), <any>undefined);
	};

/**
 * DSL built-ins as multi-method which directly operates on AST nodes. For
 * userland extensions of the core language, it's likely more straightforward to
 * define new constants/functions in {@link ENV}.
 */
export const BUILTINS = defmulti<ASTNode[], Env, any>(
	(x) => (<Expression>x[0]).value,
	{},
	{
		// defines as new symbol with given value, stores it in the environment and
		// then returns the value, e.g. `(def magic 42)`
		def: ([_, name, value], env) =>
			(env[(<Sym>name).value] = interpret(value, env)),

		// defines a new function with given name, args and body, stores it in the
		// environment and returns it, e.g. `(defn madd (a b c) (+ (* a b) c))`
		defn: ([_, name, args, ...body], env) => {
			// create new vararg function in env
			return (env[(<Sym>name).value] = __fnImpl(args, body, env));
		},

		// anonymous function definition
		fn: ([_, args, ...body], env) => __fnImpl(args, body, env),

		// if/then conditional with optional else
		if: ([_, test, truthy, falsy], env) =>
			interpret(test, env)
				? interpret(truthy, env)
				: falsy
				? interpret(falsy, env)
				: undefined,

		// create local symbol/variable bindings, e.g.
		// `(let (a 1 b 2 c (+ a b)) (print a b c))`
		let: ([_, args, ...body], env) => {
			const pairs = (<Expression>args).children;
			// ensure we've got pairwise bindings
			assert(
				args.type === "expr" && !(pairs.length % 2),
				`require pairs of key-val bindings`
			);
			// inject bindings into local environment
			let $env = { ...env };
			for (let i = 0, n = pairs.length; i < n; i += 2) {
				assert(
					pairs[i].type === "sym",
					`expected symbol, got: ${pairs[i].type}`
				);
				$env[(<Sym>pairs[i]).value] = interpret(pairs[i + 1], $env);
			}
			// execute function body with local env, return result of last expr
			return body.reduce((_, x) => interpret(x, $env), <any>undefined);
		},

		list: ([_, ...body], env) => evalArgs(body, env),

		// add default/fallback implementation to allow calling functions defined in
		// the environment (either externally or via `defn`)
		[DEFAULT]: ([x, ...args]: ASTNode[], env: any) => {
			const name = (<Sym>x).value;
			const f = env[name];
			if (f == null) illegalArgs(`${name} is not defined`);
			if (!isFunction(f)) illegalArgs(`${name} is not a function`);
			return f.apply(null, evalArgs(args, env));
		},
	}
);

/**
 * Root environment bindings. This is the default env used by
 * {@link evalExpressions} and can be used to define extensions of the core
 * language. Functions defined here can receive any number of arguments.
 */
export const ENV: Env = {
	// prettier-ignore
	"+": __mathOp((acc, x) => acc + x, (x) => x),
	// prettier-ignore
	"*": __mathOp((acc, x) => acc * x, (x) => x),
	// prettier-ignore
	"-": __mathOp((acc, x) => acc - x, (x) => -x),
	// prettier-ignore
	"/": __mathOp((acc, x) => acc / x, (x) => 1 / x),

	// comparisons
	...OPERATORS,

	// boolean logic
	and: (...args: any[]) => args.every((x) => !!x),
	or: (...args: any[]) => args.some((x) => !!x),
	not: (x: any) => !x,

	// binary
	"<<": (x: number, y: number) => x << y,
	">>": (x: number, y: number) => x >> y,
	">>>": (x: number, y: number) => x >>> y,
	"bit-and": (x: number, y: number) => x & y,
	"bit-or": (x: number, y: number) => x | y,
	"bit-xor": (x: number, y: number) => x ^ y,
	"bit-not": (x: number) => ~x,

	// JS-native Math
	...selectKeysObj(Math, [
		"E",
		"LN10",
		"LN2",
		"LOG10E",
		"LOG2E",
		"PI",
		"SQRT1_2",
		"SQRT2",
		"abs",
		"acos",
		"acosh",
		"asin",
		"asinh",
		"atan",
		"atan2",
		"atanh",
		"cbrt",
		"ceil",
		"clz32",
		"cos",
		"cosh",
		"exp",
		"expm1",
		"floor",
		"fround",
		"hypot",
		"imul",
		"log",
		"log10",
		"log1p",
		"log2",
		"max",
		"min",
		"pow",
		"random",
		"round",
		"sign",
		"sin",
		"sinh",
		"sqrt",
		"tan",
		"tanh",
		"trunc",
	]),

	HALF_PI,
	TAU,

	clamp,
	deg,
	fit,
	mix,
	rad,
	step,
	smoothstep: smoothStep,

	aget: (arr: any[], i: number) => arr[i],
	aset: (arr: any[], i: number, x: any) => (arr[i] = x),

	push: (list: any[], ...x: any[]) => list.push(...x),
	concat: (list: any[], ...x: any[]) => list.concat(...x),

	// returns length of first argument (presumably a list or string)
	// (e.g. `(count "abc")` => 3)
	count: (arg: any) => arg.length,

	// returns first item of list/string
	first: (arg: any) => arg[0],

	// returns remaining list/string (from 2nd item onward) or undefined if
	// there're no further items
	next: (arg: any) => (arg.length > 1 ? arg.slice(1) : undefined),

	// strings
	lower,
	upper,
	capitalize,
	"pad-left": (x: string, width: number, fill: string) =>
		x.padStart(width, fill),
	"pad-right": (x: string, width: number, fill: string) =>
		x.padEnd(width, fill),
	substr: (x: string, from: number, to?: number) => x.substring(from, to),
	trim: (x: string) => x.trimEnd(),
	regexp: (src: string, flags?: string) => new RegExp(src, flags),
	"re-test": (regexp: RegExp, x: string) => regexp.test(x),
	"re-match": (regexp: RegExp, x: string) => regexp.exec(x),
	replace: (x: string, regexp: RegExp, replacement: string) =>
		x.replace(regexp, replacement),

	// misc
	print: console.log,

	env: () =>
		JSON.stringify(
			ENV,
			(_, val) => (isFunction(val) ? "<function>" : val),
			2
		),
};

/**
 * Parses & evaluates given S-expression(s) and returns result of last one. If
 * no environment is provided, uses {@link ENV}.
 *
 * @param src
 * @param env
 */
export const evalSource = (src: string, env: Env = ENV) =>
	parse(src).children.reduce((_, x) => interpret(x, env), <any>undefined);

export const evalArgs = (nodes: ASTNode[], env: Env = ENV) =>
	nodes.map((a) => interpret(a, env));

export const interpret = runtime<Implementations<Env, any>, Env, any>({
	expr: (x, env) => BUILTINS(x.children, env),
	sym: (x, env) => env[x.value],
	str: (x) => x.value,
	num: (x) => x.value,
});

// evaluate built-ins and inject into root env
evalSource(KERNEL);
