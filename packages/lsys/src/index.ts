import { Fn2, IObjectOf } from "@thi.ng/api";
import { partial, threadLast } from "@thi.ng/compose";
import { illegalState } from "@thi.ng/errors";
import { cossin, HALF_PI } from "@thi.ng/math";
import {
    iterate,
    last,
    mapcat,
    take
} from "@thi.ng/transducers";
import { add, Vec } from "@thi.ng/vectors";

export type LSysSymbol = string | number;
export type ProductionRules = IObjectOf<ArrayLike<LSysSymbol> & Iterable<LSysSymbol>>;
export type RuleImplementations<T> = IObjectOf<Fn2<T, LSysSymbol, void>>;

export interface Turtle2D {
    /**
     * Current position
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
     * Step distance
     */
    step: number;
    /**
     * Decay factor for `delta`. Should be in (0,1) interval.
     */
    decayDelta: number;
    /**
     * Decay factor for `step`. Should be in (0,1) interval.
     */
    decayStep: number;
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
    "f": (ctx) => {
        ctx.pos = add([], ctx.pos, cossin(ctx.theta, ctx.step));
        ctx.curr.push(ctx.pos);
    },
    // rotate ccw
    "+": (ctx) => ctx.theta += ctx.delta,
    // rotate cw
    "-": (ctx) => ctx.theta -= ctx.delta,
    // shrink rotation angle
    ">": (ctx) => ctx.delta *= ctx.decayDelta,
    // grow rotation angle
    "<": (ctx) => ctx.delta /= ctx.decayDelta,
    // decay step distance
    "!": (ctx) => ctx.step *= ctx.decayStep,
    // grow step distance
    "^": (ctx) => ctx.step /= ctx.decayStep,
    // start branch / store context on stack
    "[": (ctx) => {
        ctx.curr.length > 1 && ctx.paths.push(ctx.curr);
        ctx.curr = [ctx.pos];
        const copy = { ...ctx };
        delete copy.paths;
        delete copy.stack;
        ctx.stack.push(copy);
        ctx.curr = [ctx.pos];
    },
    // end branch / pop context from stack
    "]": (ctx) => {
        const prev = ctx.stack.pop();
        !prev && illegalState("stack empty");
        ctx.curr.length > 1 && ctx.paths.push(ctx.curr);
        Object.assign(ctx, prev);
    },
};

export const turtle2d =
    (state?: Partial<Turtle2D>): Turtle2D => ({
        pos: [0, 0],
        theta: 0,
        delta: HALF_PI,
        step: 1,
        decayDelta: 0.9,
        decayStep: 0.9,
        curr: [[0, 0]],
        paths: [],
        stack: [],
        ...state
    });

export const rewrite =
    (rules: ProductionRules, syms: Iterable<LSysSymbol>) =>
        mapcat((x) => rules[x] || [x], syms);

export const expand =
    (rules: ProductionRules, initial: LSysSymbol, limit = 1) =>
        threadLast(
            [initial],
            [iterate, partial(rewrite, rules)],
            [take, limit + 1],
            last
        );

export const interpret =
    <T>(ctx: T, impls: RuleImplementations<T>, syms: Iterable<LSysSymbol>) => {
        for (let s of syms) {
            const op = impls[s];
            op && op(ctx, s);
        }
        return ctx;
    };
