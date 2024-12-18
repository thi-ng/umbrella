import type { Fn, Fn2, IObjectOf } from "@thi.ng/api";
import { isFunction } from "@thi.ng/checks/is-function";
import { partial } from "@thi.ng/compose/partial";
import { threadLast } from "@thi.ng/compose/thread-last";
import { illegalState } from "@thi.ng/errors/illegal-state";
import { cossin } from "@thi.ng/math/angle";
import { HALF_PI } from "@thi.ng/math/api";
import type { IRandom } from "@thi.ng/random";
import { SYSTEM } from "@thi.ng/random/system";
import { iterate } from "@thi.ng/transducers/iterate";
import { last } from "@thi.ng/transducers/last";
import { mapcat } from "@thi.ng/transducers/mapcat";
import { take } from "@thi.ng/transducers/take";
import type { Vec } from "@thi.ng/vectors";
import { add } from "@thi.ng/vectors/add";

export type LSysSymbol = string | number;
export type ProductionResult = ArrayLike<LSysSymbol> & Iterable<LSysSymbol>;
export type ProductionRules = IObjectOf<
	ProductionResult | Fn<LSysSymbol, ProductionResult>
>;
export type RuleImplementations<T> = IObjectOf<Fn2<T, LSysSymbol, void>>;

export interface Turtle2D {
	/**
	 * Current position. Default: [0,0]
	 */
	pos: Vec;
	/**
	 * Current direction (in radians)
	 */
	theta: number;
	/**
	 * Rotation angle for "+" / "-" symbols
	 */
	delta: number;
	/**
	 * Max. random direction change when processing "/" symbol.
	 * Normalized percentage of `delta`. Default: 0.25 (25%)
	 */
	jitter: number;
	/**
	 * Step distance. Default: 1
	 */
	step: number;
	/**
	 * Probability to keep current branch alive when processing "k"
	 * symbol. Default: 0.99
	 */
	aliveProb: number;
	/**
	 * Decay factor for `delta`. Should be in (0,1) interval.
	 * Default: 0.9
	 */
	decayDelta: number;
	/**
	 * Decay factor for `step`. Should be in (0,1) interval.
	 * Default: 0.9
	 */
	decayStep: number;
	/**
	 * Decay factor for `aliveProp`.
	 * Default: 0.95
	 */
	decayAlive: number;
	/**
	 * PRNG to use for probability checks. Default: SYSTEM
	 */
	rnd: IRandom;
	/**
	 * Alive flag. Default: true
	 */
	alive: boolean;
	/**
	 * Current recorded path
	 */
	curr: Vec[];
	/**
	 * Accumulator of all recorded paths
	 */
	paths: Vec[][];
	/**
	 * Branch stack
	 */
	stack: Turtle2D[];
}

export const TURTLE_IMPL_2D: RuleImplementations<Turtle2D> = {
	// move forward
	f: (ctx) => {
		if (ctx.alive) {
			ctx.pos = add([], ctx.pos, cossin(ctx.theta, ctx.step));
			ctx.curr.push(ctx.pos);
		}
	},
	g: (ctx) => {
		if (ctx.alive) {
			ctx.curr.length > 1 && ctx.paths.push(ctx.curr);
			ctx.pos = add([], ctx.pos, cossin(ctx.theta, ctx.step));
			ctx.curr = [ctx.pos];
		}
	},
	// rotate ccw
	"+": (ctx) => ctx.alive && (ctx.theta += ctx.delta),
	// rotate cw
	"-": (ctx) => ctx.alive && (ctx.theta -= ctx.delta),
	// shrink rotation angle
	">": (ctx) => ctx.alive && (ctx.delta *= ctx.decayDelta),
	// grow rotation angle
	"<": (ctx) => ctx.alive && (ctx.delta /= ctx.decayDelta),
	// decay step distance
	"!": (ctx) => ctx.alive && (ctx.step *= ctx.decayStep),
	// grow step distance
	"^": (ctx) => ctx.alive && (ctx.step /= ctx.decayStep),
	"/": (ctx) =>
		ctx.alive && (ctx.theta += ctx.rnd.norm(ctx.delta * ctx.jitter)),
	// kill branch (stochastic)
	k: (ctx) => ctx.alive && (ctx.alive = ctx.rnd.probability(ctx.aliveProb)),
	// decay alive probability
	p: (ctx) => ctx.alive && (ctx.aliveProb *= ctx.decayAlive),
	// grow alive probability
	P: (ctx) => ctx.alive && (ctx.aliveProb /= ctx.decayAlive),
	// start branch / store context on stack
	"[": (ctx) => {
		ctx.alive && ctx.curr.length > 1 && ctx.paths.push(ctx.curr);
		ctx.curr = [ctx.pos];
		const copy = <any>{ ...ctx };
		delete copy.paths;
		delete copy.stack;
		ctx.stack.push(copy);
		ctx.curr = [ctx.pos];
	},
	// end branch / pop context from stack
	"]": (ctx) => {
		ctx.alive && ctx.curr.length > 1 && ctx.paths.push(ctx.curr);
		const prev = ctx.stack.pop();
		!prev && illegalState("stack empty");
		Object.assign(ctx, prev);
	},
};

export const turtle2d = (state?: Partial<Turtle2D>): Turtle2D => ({
	pos: [0, 0],
	theta: 0,
	delta: HALF_PI,
	step: 1,
	jitter: 0.25,
	decayDelta: 0.9,
	decayStep: 0.9,
	decayAlive: 0.95,
	aliveProb: 0.99,
	rnd: SYSTEM,
	alive: true,
	curr: [[0, 0]],
	paths: [],
	stack: [],
	...state,
});

/**
 * Lazily transforms `src` iterable of symbols by rewriting each using provided
 * rewrite `rules`.
 *
 * @remarks
 * Any symbol without a matching rewrite rule will remain as is. A rewrite rule
 * can replace a source symbol with any number of new symbols. If the rule is
 * given as function, the function will be called with the original symbol and
 * the return values used as replacements.
 *
 * Used by {@link expand} to process/rewrite a single iteration.
 *
 * @example
 * ```ts tangle:../export/rewrite.ts
 * import { rewrite } from "@thi.ng/lsys";
 *
 * const RULES = {
 *   a: ["b"],
 *   b: ["a", "c"],
 *   c: () => [Math.random() < 0.8 ? "a" : "x"]
 * };
 *
 * console.log([...rewrite(RULES, "a/b/c")]);
 * // [ "b", "/", "a", "c", "/", "x" ]
 * ```
 *
 * @param rules
 * @param syms
 */
export const rewrite = (rules: ProductionRules, syms: Iterable<LSysSymbol>) =>
	mapcat((x) => (isFunction(rules[x]) ? rules[x](x) : rules[x] || [x]), syms);

/**
 * Expands `src` iterable of symbols by iteratively rewriting each symbol using
 * provided rewrite `rules` over `limit` iterations.
 *
 * @param rules
 * @param initial
 * @param limit
 */
export const expand = (
	rules: ProductionRules,
	initial: LSysSymbol,
	limit = 1
) =>
	threadLast(
		[initial],
		[iterate, partial(rewrite, rules)],
		[take, limit + 1],
		last
	);

/**
 * Sequentially processes iterable of symbols using provided rule
 * implementations and suitable execution context object.
 *
 * @remarks
 * See {@link turtle2d} and {@link TURTLE_IMPL_2D}.
 *
 * @param ctx
 * @param impls
 * @param syms
 */
export const interpret = <T>(
	ctx: T,
	impls: RuleImplementations<T>,
	syms: Iterable<LSysSymbol>
) => {
	for (let s of syms) {
		impls[s]?.(ctx, s);
	}
	return ctx;
};
