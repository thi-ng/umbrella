import { partial, threadLast } from "@thi.ng/compose";
import { illegalState } from "@thi.ng/errors";
import { cossin, HALF_PI } from "@thi.ng/math";
import { IRandom, SYSTEM } from "@thi.ng/random";
import { iterate, last, mapcat, take } from "@thi.ng/transducers";
import { add, Vec } from "@thi.ng/vectors";
import type { Fn2, IObjectOf } from "@thi.ng/api";

export type LSysSymbol = string | number;
export type ProductionRules = IObjectOf<
    ArrayLike<LSysSymbol> & Iterable<LSysSymbol>
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
    k: (ctx) => ctx.alive && (ctx.alive = ctx.rnd.float() < ctx.aliveProb),
    // decay alive probability
    p: (ctx) => ctx.alive && (ctx.aliveProb *= ctx.decayAlive),
    // grow alive probability
    P: (ctx) => ctx.alive && (ctx.aliveProb /= ctx.decayAlive),
    // start branch / store context on stack
    "[": (ctx) => {
        ctx.alive && ctx.curr.length > 1 && ctx.paths.push(ctx.curr);
        ctx.curr = [ctx.pos];
        const copy = { ...ctx };
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

export const rewrite = (rules: ProductionRules, syms: Iterable<LSysSymbol>) =>
    mapcat((x) => rules[x] || [x], syms);

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

export const interpret = <T>(
    ctx: T,
    impls: RuleImplementations<T>,
    syms: Iterable<LSysSymbol>
) => {
    for (let s of syms) {
        const op = impls[s];
        op && op(ctx, s);
    }
    return ctx;
};
