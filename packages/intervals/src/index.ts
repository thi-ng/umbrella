import {
    Fn,
    ICompare,
    IContains,
    ICopy,
    IEquiv
} from "@thi.ng/api";
import { illegalArgs } from "@thi.ng/errors";

export const enum Classifier {
    DISJOINT_LEFT,
    DISJOINT_RIGHT,
    SUBSET,
    SUPERSET,
    OVERLAP_LEFT,
    OVERLAP_RIGHT,
}

const BRACES = "()[]";
const RE_INF = /^([-+])?(inf(inity)?|\u221e)$/i;

export class Interval implements
    ICompare<Interval>,
    IContains<number>,
    ICopy<Interval>,
    IEquiv {

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
     * - LHS: `]` or `(` (open), `[` (closed)
     * - RHS: `[` or `)` (open), `]` (closed)
     *
     * ```
     * // semi-open interval between -∞ and +1
     * Interval.parse("[,1)")
     *
     * // closed interval between -1 and +1
     * Interval.parse("[-1 .. 1]")
     * ```
     *
     * @param src
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
        if (BRACES.indexOf(c1) < 0 || BRACES.indexOf(c2) < 0 || !(comma || dot)) {
            illegalArgs(src);
        }
        [l, r] = src
            .substring(1, n)
            .split(dot ? ".." : ",")
            .map((x, i) => {
                x = x.trim();
                const inf = RE_INF.exec(x);
                const n =
                    ((x === "" && i === 0) || inf && inf[1] === "-") ?
                        -Infinity :
                        ((x === "" && i > 0) || inf && inf[1] !== "-") ?
                            Infinity :
                            parseFloat(x);
                if (isNaN(n)) {
                    illegalArgs(`term: '${x}'`);
                }
                return n;
            });
        r === undefined && (r = Infinity);
        if (l > r) {
            illegalArgs(`invalid interval: ${src}`);
        }
        return new Interval(
            l, r,
            c1 === "(" || c1 === "]",
            c2 === ")" || c2 === "[",
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

    compare(i: Readonly<Interval>) {
        if (this === i) return 0;
        return this.l < i.l ?
            -1 :
            this.l > i.l ?
                1 :
                this.r < i.r ?
                    -1 :
                    this.r > i.r ?
                        1 : 0;
    }

    equiv(i: any) {
        return i instanceof Interval &&
            this.l === i.l &&
            this.r === i.r &&
            this.lopen === i.lopen &&
            this.ropen === i.ropen;
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
     * Returns true iff `x` < LHS of this interval, taking into account
     * openness.
     *
     * @param x
     */
    isBefore(x: number) {
        return this.lopen ? (x <= this.l) : (x < this.l);
    }

    /**
     * Returns true iff `x` > RHS of this interval, taking into account
     * openness.
     *
     * @param x
     */
    isAfter(x: number) {
        return this.ropen ? (x >= this.r) : (x > this.r);
    }

    contains(x: number) {
        return (this.lopen ? (x > this.l) : (x >= this.l)) &&
            (this.ropen ? (x < this.r) : (x <= this.r));
    }

    include(x: number) {
        return this.isBefore(x) ?
            new Interval(x, this.r, false, this.ropen) :
            this.isAfter(x) ?
                new Interval(this.l, x, this.lopen, false) :
                this;
    }

    /**
     * Returns the distance between intervals, or zero if they touch or
     * overlap.
     *
     * @param i
     */
    distance(i: Readonly<Interval>) {
        return this.overlaps(i) ?
            0 :
            this.l < i.l ?
                i.l - this.r :
                this.l - i.r;
    }

    /**
     * Returns classifier for this interval WRT given interval `i`. E.g.
     * if result is `Classifier.SUPERSET`, then this interval fully
     * contains `i`.
     *
     * @param i
     */
    classify(i: Readonly<Interval>) {
        return this.isBefore(i.r) ?
            Classifier.DISJOINT_RIGHT :
            this.isAfter(i.l) ?
                Classifier.DISJOINT_LEFT :
                this.contains(i.l) ?
                    this.contains(i.r) ?
                        Classifier.SUPERSET :
                        Classifier.OVERLAP_RIGHT :
                    this.contains(i.r) ?
                        Classifier.OVERLAP_LEFT :
                        Classifier.SUBSET;
    }

    overlaps(i: Readonly<Interval>) {
        return this.classify(i) >= Classifier.OVERLAP_LEFT;
    }

    union(i: Readonly<Interval>) {
        if (this.isEmpty()) return i;
        if (i.isEmpty()) return this;
        const [l, lo] = this.$min(this.l, i.l, this.lopen, i.lopen);
        const [r, ro] = this.$max(this.r, i.r, this.ropen, i.ropen);
        return new Interval(l, r, lo, ro);
    }

    intersection(i: Readonly<Interval>) {
        if (this.overlaps(i)) {
            const [l, lo] = this.$max(this.l, i.l, this.lopen, i.lopen);
            const [r, ro] = this.$min(this.r, i.r, this.ropen, i.ropen);
            return new Interval(l, r, lo, ro);
        }
    }

    prefix(i: Readonly<Interval>) {
        if (this.overlaps(i)) {
            const [l, lo] = this.$min(this.l, i.l, this.lopen, i.lopen);
            const [r, ro] = this.$min(this.r, i.l, this.ropen, i.lopen);
            return new Interval(l, r, lo, ro);
        }
    }

    suffix(i: Readonly<Interval>) {
        if (this.overlaps(i)) {
            const [l, lo] = this.$max(this.l, i.r, this.lopen, i.ropen);
            const [r, ro] = this.$max(this.r, i.l, this.ropen, i.ropen);
            return new Interval(l, r, lo, ro);
        }
    }

    map(f: Fn<number, number>) {
        return new Interval(f(this.l), f(this.r), this.lopen, this.ropen);
    }

    toString() {
        return `${this.lopen ? "(" : "["}${this.l} .. ${this.r}${this.ropen ? ")" : "]"}`;
    }

    toJSON() {
        return this.toString();
    }

    protected $min(a: number, b: number, ao: boolean, bo: boolean): [number, boolean] {
        return (a < b) ?
            [a, ao] :
            a === b ?
                [a, ao || bo] :
                [b, bo];
    }

    protected $max(a: number, b: number, ao: boolean, bo: boolean): [number, boolean] {
        return (a > b) ?
            [a, ao] :
            a === b ?
                [a, ao || bo] :
                [b, bo];
    }
}
