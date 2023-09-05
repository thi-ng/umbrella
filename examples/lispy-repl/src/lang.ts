import type { Fn, Fn2 } from "@thi.ng/api";
import { DEFAULT, defmulti, type MultiFn2 } from "@thi.ng/defmulti";
import { assert } from "@thi.ng/errors";
import {
	parse,
	runtime,
	type ASTNode,
	type Expression,
	type Implementations,
	type Sym,
} from "@thi.ng/sexpr";

// this implementation is an extended version of the code example from the
// @thi.ng/sexpr readme:
// https://github.com/thi-ng/umbrella/blob/develop/packages/sexpr/README.md#interpreter

// evaluator: parses given source string into an abstract syntax tree (AST) and
// then recursively executes all resulting AST nodes using the
// `interpret()` function defined below. Returns the result of the last node.
export const $eval = (src: string, env: any = {}) =>
	parse(src).children.reduce((_, x) => interpret(x, env), <any>undefined);

// helper function which interprets all given AST nodes and returns an array of
// their result values
export const evalArgs = (nodes: ASTNode[], env: any) =>
	nodes.map((a) => interpret(a, env));

// build runtime (interpreter) w/ impls for all AST node types. the generics are
// the types of the custom environment and the result type(s) of expressions.
// this is a multiple-dispatch function (see thi.ng/defmulti) which chooses
// implementations based on the AST node type
const interpret = runtime<Implementations<any, any>, any, any>({
	// for expression nodes (aka function calls) delegate to builtins
	// (implementations are defined further below)
	expr: (x, env) => builtins(x.children, env),

	// lookup symbol's value (via its name) in environment
	sym: (x, env) => {
		assert(x.value in env, `unknown symbol: ${x.value}`);
		return env[x.value];
	},

	// strings and numbers evaluate verbatim
	str: (x) => x.value,
	num: (x) => x.value,
});

// another multiple-dispatch function for DSL builtins. we will call this
// function for each S-expression node and it will delegate to the actual impl
// based on the expression's first item (i.e. a symbol/fn name)
const builtins: MultiFn2<ASTNode[], any, any> = defmulti((x) => x[0].value);

// helper function for basic math ops variable arity.
// with 2+ args: (+ 1 2 3 4) => 10
// and special cases for 1 arg only, i.e.
// `(+ 2)` => 0 + 2 => 2
// `(- 2)` => 0 - 2 => -2
// `(* 2)` => 1 * 2 => 2
// `(/ 2)` => 1 / 2 => 0.5
const mathOp =
	(fn: Fn2<number, number, number>, fn1: Fn<number, number>) =>
	([_, ...args]: ASTNode[], env: any) => {
		const first = interpret(args[0], env);
		return args.length > 1
			? // use a reduction for 2+ args
			  evalArgs(args.slice(1), env).reduce((acc, x) => fn(acc, x), first)
			: // apply special case unary function
			  fn1(first);
	};

// implementations of built-in core functions
builtins.addAll({
	"+": mathOp(
		(acc, x) => acc + x,
		(x) => x
	),
	"*": mathOp(
		(acc, x) => acc * x,
		(x) => x
	),
	"-": mathOp(
		(acc, x) => acc - x,
		(x) => -x
	),
	"/": mathOp(
		(acc, x) => acc / x,
		(x) => 1 / x
	),

	// count returns the length of first argument (presumably a string)
	// (e.g. `(count "abc")` => 3)
	count: ([_, arg], env) => interpret(arg, env).length,

	// concatenates all args into a space-separated string and prints it
	// returns undefined
	// print: ([_, ...args], env) => console.log(evalArgs(args, env).join(" ")),

	// defines as new symbol with given value, stores it in the environment and
	// then returns the value, e.g. `(def magic 42)`
	def: ([_, name, value], env) =>
		(env[(<Sym>name).value] = interpret(value, env)),

	// defines a new function with given name, args and body, stores it in the
	// environment and returns it, e.g. `(defn madd (a b c) (+ (* a b) c))`
	defn: ([_, name, args, ...body], env) => {
		// create new vararg function in env
		return (env[(<Sym>name).value] = (...xs: any[]) => {
			const $args = (<Expression>args).children;
			assert(
				$args.length === xs.length,
				`illegal arity, expected ${$args.length} arguments`
			);
			// create new local env with arguments bound to named function args
			// (i.e. simple lexical scoping)
			const $env = $args.reduce(
				(acc, a, i) => ((acc[(<Sym>a).value] = xs[i]), acc),
				{ ...env }
			);
			// execute function body with local env, return result of last expr
			return body.reduce((_, x) => interpret(x, $env), <any>undefined);
		});
	},

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

	// add default/fallback implementation to allow calling functions defined in
	// the environment (either externally or via `defn`)
	[DEFAULT]: ([x, ...args]: ASTNode[], env: any) => {
		const name = (<Sym>x).value;
		const f = env[name];
		assert(!!f, `missing impl for: ${name}`);
		return f.apply(null, evalArgs(args, env));
	},
});
