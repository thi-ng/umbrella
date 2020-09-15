import type { Fn, Fn2, ICompare, IContains, ICopy, IEquiv } from "@thi.ng/api";
import { isString } from "@thi.ng/checks";
import { and, or } from "@thi.ng/dlogic";
import { illegalArgs } from "@thi.ng/errors";

export enum Classifier {
    DISJOINT_LEFT,
    DISJOINT_RIGHT,
    EQUIV,
    SUBSET,
    SUPERSET,
    OVERLAP_LEFT,
    OVERLAP_RIGHT,
}

const BRACES = "()[]";
const RE_INF = /^([-+])?(inf(inity)?|\u221e)$/i;

export function interval(spec: string): Interval;
export function interval(
    l: number,
    r: number,
    lopen?: boolean,
    ropen?: boolean
): Interval;
export function interval(
    l: number | string,
    r?: number,
    lopen?: boolean,
    ropen?: boolean
) {
    return isString(l) ? Interval.parse(l) : new Interval(l, r!, lopen, ropen);
}

export class Interval
    implements ICompare<Interval>, IContains<number>, ICopy<Interval>, IEquiv {
    /**
     * Parses given ISO 80000-2 interval notation into a new `Interval`
     * instance. In addition to the comma separator, `..` can be used
     * alternatively. The following symbols (with optional sign) can be
     * used for infinity (case insensitive):
     *
     * - inf
     * - infinity
     * - ∞ (\u221e)
     *
     * An empty LHS defaults to `-Infinity`. The RHS defaults to
     * `+Infinity`.
     *
     * Openness / closedness symbols:
     *
     * - LHS: open: `]` / `(`, closed: `[`
     * - RHS: open: `[` / `)`, closed: `]`
     *
     * ```
     * // semi-open interval between -∞ and +1
     * Interval.parse("[,1)")
     *
     * // closed interval between -1 and +1
     * Interval.parse("[-1 .. 1]")
     * ```
     *
     * @param src -
     */
    static parse(src: string) {
        let l, r, c1, c2;
        const n = src.length - 1;
        const comma = src.indexOf(",") > 0;
        const dot = src.indexOf("..") > 0;
        if (n < (dot ? 3 : 2)) {
            illegalArgs(src);
        }
        c1 = src.charAt(0);
        c2 = src.charAt(n);
        if (
            BRACES.indexOf(c1) < 0 ||
            BRACES.indexOf(c2) < 0 ||
            !(comma || dot)
        ) {
            illegalArgs(src);
        }
        [l, r] = src
            .substring(1, n)
            .split(dot ? ".." : ",")
            .map((x, i) => {
                x = x.trim();
                const inf = RE_INF.exec(x);
                const n =
                    (x === "" && i === 0) || (inf && inf[1] === "-")
                        ? -Infinity
                        : (x === "" && i > 0) || (inf && inf[1] !== "-")
                        ? Infinity
                        : parseFloat(x);
                isNaN(n) && illegalArgs(`expected number: '${x}'`);
                return n;
            });
        r === undefined && (r = Infinity);
        return new Interval(
            l,
            r,
            c1 === "(" || c1 === "]",
            c2 === ")" || c2 === "["
        );
    }

    static infinity() {
        return new Interval(-Infinity, Infinity);
    }

    static withMin(min: number, open = false) {
        return new Interval(min, Infinity, open, false);
    }

    static withMax(max: number, open = false) {
        return new Interval(-Infinity, max, false, open);
    }

    static openOpen(min: number, max: number) {
        return new Interval(min, max, true, true);
    }

    static openClosed(min: number, max: number) {
        return new Interval(min, max, true, false);
    }

    static closedOpen(min: number, max: number) {
        return new Interval(min, max, false, true);
    }

    static closedClosed(min: number, max: number) {
        return new Interval(min, max, false, false);
    }

    l: number;
    r: number;

    lopen: boolean;
    ropen: boolean;

    constructor(l: number, r: number, lopen = false, ropen = false) {
        (l > r || (l === r && lopen !== ropen)) &&
            illegalArgs(`invalid interval: ${toString(l, r, lopen, ropen)}`);
        this.l = l;
        this.r = r;
        this.lopen = lopen;
        this.ropen = ropen;
    }

    *values(step: number) {
        const n = this.r + (this.ropen ? 0 : step);
        let i = this.l + (this.lopen ? step : 0);
        for (; i < n; i += step) {
            yield i;
        }
    }

    copy() {
        return new Interval(this.l, this.r, this.lopen, this.ropen);
    }

    /**
     * Compares this interval with `i` and returns a comparator value
     * (-1, 0 or 1). Comparison order is: LHS, RHS, openness.
     *
     * @param i -
     */
    compare(i: Readonly<Interval>) {
        if (this === i) return 0;
        let c: number;
        return this.l < i.l
            ? -1
            : this.l > i.l
            ? 1
            : this.r < i.r
            ? -1
            : this.r > i.r
            ? 1
            : (c = ~~this.lopen - ~~i.lopen) === 0
            ? ~~i.ropen - ~~this.ropen
            : c;
    }

    equiv(i: any) {
        return (
            this === i ||
            (i instanceof Interval &&
                this.l === i.l &&
                this.r === i.r &&
                this.lopen === i.lopen &&
                this.ropen === i.ropen)
        );
    }

    size() {
        return this.isEmpty() ? 0 : this.r - this.l;
    }

    centroid() {
        return (this.l + this.r) / 2;
    }

    /**
     * Returns true, if interval has zero range, i.e. if LHS >= RHS.
     */
    isEmpty() {
        return this.l >= this.r;
    }

    /**
     * Returns true iff this interval's RHS < `x`, taking into account
     * openness. If `x` is an interval, then checks this interval's RHS
     * is less than LHS of `x` (again with openness).
     *
     * @param x -
     */
    isBefore(x: number | Readonly<Interval>) {
        return x instanceof Interval
            ? this.ropen || x.lopen
                ? this.r <= x.l
                : this.r < x.l
            : this.ropen
            ? this.r <= x
            : this.r < x;
    }

    /**
     * Returns true iff this interval's LHS > `x`, taking into account
     * openness. If `x` is an interval, then checks this interval's LHS
     * is greater than RHS of `x` (again with openness).
     *
     * @param x -
     */
    isAfter(x: number | Readonly<Interval>) {
        return x instanceof Interval
            ? this.lopen || x.ropen
                ? this.l >= x.r
                : this.l > x.r
            : this.ropen
            ? this.l >= x
            : this.l > x;
    }

    /**
     * Returns true if `x` is lies within this interval.
     *
     * @param x -
     */
    contains(x: number) {
        return (
            (this.lopen ? x > this.l : x >= this.l) &&
            (this.ropen ? x < this.r : x <= this.r)
        );
    }

    /**
     * Returns a new version of this interval such that `x` is included.
     * If `x` lies outside the current interval, the new one will be
     * extended correspondingly.
     *
     * @param x -
     */
    include(x: number) {
        return this.isAfter(x)
            ? new Interval(x, this.r, false, this.ropen)
            : this.isBefore(x)
            ? new Interval(this.l, x, this.lopen, false)
            : this.copy();
    }

    /**
     * Returns the distance between intervals, or zero if they touch or
     * overlap.
     *
     * @param i -
     */
    distance(i: Readonly<Interval>) {
        return this.overlaps(i)
            ? 0
            : this.l < i.l
            ? i.l - this.r
            : this.l - i.r;
    }

    /**
     * Returns classifier for this interval WRT given interval `i`. E.g.
     * if the result is `Classifier.SUPERSET`, then this interval fully
     * contains `i`.
     *
     * ```
     * EQUIV
     * [   this     ]
     * [     i      ]
     *
     * DISJOINT_LEFT
     * [ i ]
     *       [ this ]
     *
     * DISJOINT_RIGHT
     * [ this ]
     *          [ i ]
     *
     * SUPERSET
     * [ this       ]
     *    [ i   ]
     *
     * SUBSET
     * [ i          ]
     *    [ this ]
     *
     * OVERLAP_RIGHT
     * [ this ]
     *       [ i ]
     *
     * OVERLAP_LEFT
     * [ i ]
     *    [ this ]
     * ```
     *
     * @param i -
     */
    classify(i: Readonly<Interval>) {
        return this.equiv(i)
            ? Classifier.EQUIV
            : this.isBefore(i)
            ? Classifier.DISJOINT_LEFT
            : this.isAfter(i)
            ? Classifier.DISJOINT_RIGHT
            : this.contains(i.l)
            ? this.contains(i.r)
                ? Classifier.SUPERSET
                : Classifier.OVERLAP_RIGHT
            : this.contains(i.r)
            ? Classifier.OVERLAP_LEFT
            : Classifier.SUBSET;
    }

    /**
     * Returns true if this interval intersects `i` in any way (incl.
     * subset / superset).
     *
     * @param i -
     */
    overlaps(i: Readonly<Interval>) {
        return this.classify(i) >= Classifier.EQUIV;
    }

    union(i: Readonly<Interval>) {
        if (this.isEmpty()) return i;
        if (i.isEmpty()) return this;
        const [l, lo] = min(this.l, i.l, this.lopen, i.lopen, and);
        const [r, ro] = max(this.r, i.r, this.ropen, i.ropen, and);
        return new Interval(l, r, lo, ro);
    }

    intersection(i: Readonly<Interval>) {
        if (this.overlaps(i)) {
            const [l, lo] = max(this.l, i.l, this.lopen, i.lopen, or);
            const [r, ro] = min(this.r, i.r, this.ropen, i.ropen, or);
            return new Interval(l, r, lo, ro);
        }
    }

    prefix(i: Readonly<Interval>) {
        if (this.overlaps(i)) {
            const [l, lo] = min(this.l, i.l, this.lopen, i.lopen, or);
            const [r, ro] = min(this.r, i.l, this.ropen, i.lopen, or);
            return new Interval(l, r, lo, ro);
        }
    }

    suffix(i: Readonly<Interval>) {
        if (this.overlaps(i)) {
            const [l, lo] = max(this.l, i.r, this.lopen, i.ropen, or);
            const [r, ro] = max(this.r, i.r, this.ropen, i.ropen, or);
            return new Interval(l, r, lo, ro);
        }
    }

    map(f: Fn<number, number>) {
        return new Interval(f(this.l), f(this.r), this.lopen, this.ropen);
    }

    toString() {
        return toString(this.l, this.r, this.lopen, this.ropen);
    }

    toJSON() {
        return this.toString();
    }
}

const min = (
    a: number,
    b: number,
    ao: boolean,
    bo: boolean,
    op: Fn2<boolean, boolean, boolean>
) => minmax(a < b, a, b, ao, bo, op);

const max = (
    a: number,
    b: number,
    ao: boolean,
    bo: boolean,
    op: Fn2<boolean, boolean, boolean>
) => minmax(a > b, a, b, ao, bo, op);

const minmax = (
    test: boolean,
    a: number,
    b: number,
    ao: boolean,
    bo: boolean,
    op: Fn2<boolean, boolean, boolean>
): [number, boolean] => (test ? [a, ao] : a === b ? [a, op(ao, bo)] : [b, bo]);

const toString = (l: number, r: number, lopen: boolean, ropen: boolean) =>
    `${lopen ? "(" : "["}${l} .. ${r}${ropen ? ")" : "]"}`;
