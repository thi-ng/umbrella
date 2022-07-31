import type { Fn, Fn2, ICompare, IContains, ICopy, IEquiv } from "@thi.ng/api";
import { DEFAULT_EPS } from "@thi.ng/api/api";
import { isString } from "@thi.ng/checks/is-string";
import { and, or } from "@thi.ng/dlogic";
import { illegalArgs } from "@thi.ng/errors/illegal-arguments";

export enum Classifier {
	DISJOINT_LEFT,
	DISJOINT_RIGHT,
	EQUIV,
	SUBSET,
	SUPERSET,
	OVERLAP_LEFT,
	OVERLAP_RIGHT,
}

export class Interval
	implements ICompare<Interval>, IContains<number>, ICopy<Interval>, IEquiv
{
	l: number;
	r: number;

	lopen: boolean;
	ropen: boolean;

	constructor(l: number, r: number, lopen = false, ropen = false) {
		(l > r || (l === r && lopen !== ropen)) &&
			illegalArgs(`invalid interval: ${$toString(l, r, lopen, ropen)}`);
		this.l = l;
		this.r = r;
		this.lopen = lopen;
		this.ropen = ropen;
	}

	get size(): number {
		return isEmpty(this) ? 0 : this.r - this.l;
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
		return compare(this, i);
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

	/**
	 * Returns true if `x` is lies within this interval.
	 *
	 * @param x -
	 */
	contains(x: number) {
		return contains(this, x);
	}

	toString() {
		return $toString(this.l, this.r, this.lopen, this.ropen);
	}

	toJSON() {
		return this.toString();
	}
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
	return isString(l) ? parse(l) : new Interval(l, r!, lopen, ropen);
}

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
export const parse = (src: string) => {
	let l, r, c1, c2;
	const n = src.length - 1;
	const comma = src.indexOf(",") > 0;
	const dot = src.indexOf("..") > 0;
	if (n < (dot ? 3 : 2)) illegalArgs(src);
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
};

/**
 * Returns new infinite interval `[-∞..∞]`
 */
export const infinity = () => new Interval(-Infinity, Infinity);

/**
 * Returns new interval of `[min..∞]` or `(min..∞]` depending on if `open` is
 * true (default: false).
 *
 * @param min -
 * @param open -
 */
export const withMin = (min: number, open = false) =>
	new Interval(min, Infinity, open, false);

/**
 * Returns new interval of `[∞..max]` or `[∞..max)` depending on if `open` is
 * true (default: false).
 *
 * @param max -
 * @param open -
 */
export const withMax = (max: number, open = false) =>
	new Interval(-Infinity, max, false, open);

/**
 * Returns an open interval `(min..max)`
 *
 * @param min -
 * @param max -
 */
export const open = (min: number, max: number) =>
	new Interval(min, max, true, true);

/**
 * Returns a semi-open interval `(min..max]`, open on the LHS.
 *
 * @param min -
 * @param max -
 */
export const openClosed = (min: number, max: number) =>
	new Interval(min, max, true, false);

/**
 * Returns a semi-open interval `[min..max)`, open on the RHS.
 *
 * @param min -
 * @param max -
 */
export const closedOpen = (min: number, max: number) =>
	new Interval(min, max, false, true);

/**
 * Returns a closed interval `(min..max)`.
 *
 * @param min -
 * @param max -
 */
export const closed = (min: number, max: number) =>
	new Interval(min, max, false, false);

/**
 * Returns iterator of values in given interval at given `step` size. If the
 * interval is open on either side, the first and/or last sample will be
 * omitted.
 *
 * @param i -
 * @param step -
 */
export const values = (i: Readonly<Interval>, step: number) =>
	samples(i, Math.floor(i.size / step + 1));

/**
 * Returns an iterator yielding up to `n` uniformly spaced samples in given
 * interval. If the interval is open on either side, the first and/or last
 * sample will be omitted.
 *
 * @example
 * ```ts
 * [...samples(closed(10, 12), 5)]
 * // [10, 10.5, 11, 11.5, 12]
 *
 * [...samples(open(10, 12), 5)]
 * // [10.5, 11, 11.5]
 * ```
 *
 * @param i -
 * @param n -
 */
export function* samples(i: Readonly<Interval>, n: number) {
	const delta = n > 1 ? (i.r - i.l) / (n - 1) : 0;
	for (let x = 0; x < n; x++) {
		const y = i.l + delta * x;
		if (contains(i, y)) yield y;
	}
}

/**
 * Returns true, if interval has zero range, i.e. if LHS >= RHS.
 *
 * @param i -
 */
export const isEmpty = (i: Readonly<Interval>) => i.l >= i.r;

/**
 * Returns true iff interval `i` RHS < `x`, taking into account openness. If `x`
 * is an interval, then checks `i` RHS is less than LHS of `x` (again with
 * openness).
 *
 * @param i -
 * @param x -
 */
export const isBefore = (
	i: Readonly<Interval>,
	x: number | Readonly<Interval>
) =>
	x instanceof Interval
		? i.ropen || x.lopen
			? i.r <= x.l
			: i.r < x.l
		: i.ropen
		? i.r <= x
		: i.r < x;

/**
 * Returns true iff interval `i` LHS > `x`, taking into account openness. If `x`
 * is an interval, then checks `i` LHS is greater than RHS of `x` (again with
 * openness).
 *
 * @param i -
 * @param x -
 */
export const isAfter = (
	i: Readonly<Interval>,
	x: number | Readonly<Interval>
) =>
	x instanceof Interval
		? i.lopen || x.ropen
			? i.l >= x.r
			: i.l > x.r
		: i.ropen
		? i.l >= x
		: i.l > x;

/**
 * Compares interval `a` with `b` and returns a comparator value
 * (-1, 0 or 1). Comparison order is: LHS, RHS, openness.
 *
 * @param a -
 * @param b -
 */
export const compare = (a: Readonly<Interval>, b: Readonly<Interval>) => {
	if (a === b) return 0;
	let c: number;
	return a.l < b.l
		? -1
		: a.l > b.l
		? 1
		: a.r < b.r
		? -1
		: a.r > b.r
		? 1
		: (c = ~~a.lopen - ~~b.lopen) === 0
		? ~~b.ropen - ~~a.ropen
		: c;
};

/**
 * Returns true if `x` is lies within interval `i`.
 *
 * @param i -
 * @param x -
 */
export const contains = (i: Readonly<Interval>, x: number) =>
	(i.lopen ? x > i.l : x >= i.l) && (i.ropen ? x < i.r : x <= i.r);

export const centroid = (i: Readonly<Interval>) => (i.l + i.r) / 2;

/**
 * Returns a new version of interval `i` such that `x` is included. If `x` lies
 * outside the current interval, the new one will be extended correspondingly.
 *
 * @param i -
 * @param x -
 */
export const include = (i: Readonly<Interval>, x: number) =>
	isAfter(i, x)
		? new Interval(x, i.r, false, i.ropen)
		: isBefore(i, x)
		? new Interval(i.l, x, i.lopen, false)
		: i.copy();

/**
 * Returns the distance between intervals, or zero if they touch or
 * overlap.
 *
 * @param a -
 * @param b -
 */
export const distance = (a: Readonly<Interval>, b: Readonly<Interval>) =>
	overlaps(a, b) ? 0 : a.l < b.l ? b.l - a.r : a.l - b.r;

/**
 * Applies given `fn` to both sides of interval `i` and returns a new
 * {@link Interval} of transformed end points.
 *
 * @param i -
 * @param fn -
 */
export const transform = (i: Readonly<Interval>, fn: Fn<number, number>) =>
	new Interval(fn(i.l), fn(i.r), i.lopen, i.ropen);

/**
 * Returns classifier for interval `a` WRT given interval `b`. E.g.
 * if the result is `Classifier.SUPERSET`, then interval `a` fully
 * contains `b`.
 *
 * ```
 * EQUIV
 * [   a     ]
 * [   b     ]
 *
 * DISJOINT_LEFT
 * [ b ]
 *       [ a ]
 *
 * DISJOINT_RIGHT
 * [ a ]
 *       [ b ]
 *
 * SUPERSET
 * [ a         ]
 *    [ b   ]
 *
 * SUBSET
 * [ b         ]
 *    [ a ]
 *
 * OVERLAP_RIGHT
 * [ a     ]
 *       [ b ]
 *
 * OVERLAP_LEFT
 * [ b     ]
 *       [ a ]
 * ```
 *
 * @param a -
 * @param b -
 */
export const classify = (a: Readonly<Interval>, b: Readonly<Interval>) =>
	a.equiv(b)
		? Classifier.EQUIV
		: isBefore(a, b)
		? Classifier.DISJOINT_LEFT
		: isAfter(a, b)
		? Classifier.DISJOINT_RIGHT
		: contains(a, b.l)
		? contains(a, b.r)
			? Classifier.SUPERSET
			: Classifier.OVERLAP_RIGHT
		: contains(a, b.r)
		? Classifier.OVERLAP_LEFT
		: Classifier.SUBSET;

/**
 * Returns true if interval `a` intersects `b` in any way (incl.
 * subset / superset).
 *
 * @param a -
 * @param b -
 */
export const overlaps = (a: Readonly<Interval>, b: Readonly<Interval>) =>
	classify(a, b) >= Classifier.EQUIV;

/**
 * Returns the union of the two given intervals, taken their openness into
 * account.
 *
 * @param a -
 * @param b -
 */
export const union = (a: Readonly<Interval>, b: Readonly<Interval>) => {
	if (isEmpty(a)) return b;
	if (isEmpty(b)) return a;
	const [l, lo] = $min(a.l, b.l, a.lopen, b.lopen, and);
	const [r, ro] = $max(a.r, b.r, a.ropen, b.ropen, and);
	return new Interval(l, r, lo, ro);
};

/**
 * Returns the intersection of the two given intervals, taken their openness
 * into account. Returns undefined if `a` and `b` don't overlap.
 *
 * @param a -
 * @param b -
 */
export const intersection = (a: Readonly<Interval>, b: Readonly<Interval>) => {
	if (overlaps(a, b)) {
		const [l, lo] = $max(a.l, b.l, a.lopen, b.lopen, or);
		const [r, ro] = $min(a.r, b.r, a.ropen, b.ropen, or);
		return new Interval(l, r, lo, ro);
	}
};

export const prefix = (a: Readonly<Interval>, b: Readonly<Interval>) => {
	if (overlaps(a, b)) {
		const [l, lo] = $min(a.l, b.l, a.lopen, b.lopen, or);
		const [r, ro] = $min(a.r, b.l, a.ropen, b.lopen, or);
		return new Interval(l, r, lo, ro);
	}
};

export const suffix = (a: Readonly<Interval>, b: Readonly<Interval>) => {
	if (overlaps(a, b)) {
		const [l, lo] = $max(a.l, b.r, a.lopen, b.ropen, or);
		const [r, ro] = $max(a.r, b.r, a.ropen, b.ropen, or);
		return new Interval(l, r, lo, ro);
	}
};

/**
 * Returns the lesser value of either `x` or interval `i`'s RHS value. If
 * the interval is open on the RHS, and `x >= r`, then `r - eps` will be
 * returned.
 *
 * @param i -
 * @param x -
 * @param eps -
 */
export const min = (i: Readonly<Interval>, x: number, eps = DEFAULT_EPS) =>
	i.ropen ? (x >= i.r ? i.r - eps : x) : x > i.r ? i.r : x;

/**
 * Returns the greater value of either `x` or interval `i`'s LHS value. If
 * the interval is open on the LHS, and `x <= l`, then `l + eps` will be
 * returned.
 *
 * @param i -
 * @param x -
 * @param eps -
 */
export const max = (i: Readonly<Interval>, x: number, eps = DEFAULT_EPS) =>
	i.lopen ? (x <= i.l ? i.l + eps : x) : x < i.l ? i.l : x;

/**
 * Clamps `x` to interval `i`, using {@link Interval.min} and
 * {@link Interval.max}.
 *
 * @param i -
 * @param x -
 * @param eps -
 */
export const clamp = (i: Readonly<Interval>, x: number, eps = DEFAULT_EPS) =>
	min(i, max(i, x, eps), eps);

/**
 * Folds `x` back into interval `i`, should it lie outside. `x` MUST originally
 * lie in the `(i.l-i.size .. i.r+i.size)` interval.
 *
 * @remarks
 * Current implementation is recursive and O(N) where N =
 * ceil(max(|x-i.l|, \x-i.r|) / i.size).
 *
 * See {@link min} or {@link max} for handling of optional `eps` arg.
 *
 * @param i
 * @param x
 * @param eps
 */
export const fold = (i: Readonly<Interval>, x: number, eps = DEFAULT_EPS) => {
	do {
		if ((i.lopen && x <= i.l) || (!i.lopen && x < i.l)) {
			x = x - i.l + i.r - (i.ropen ? eps : 0);
		} else if ((i.ropen && x >= i.r) || (!i.ropen && x > i.r)) {
			x = x - i.r + i.l + (i.lopen ? eps : 0);
		}
	} while (!contains(i, x));
	return x;
};

/** @internal */
const $min = (
	a: number,
	b: number,
	ao: boolean,
	bo: boolean,
	op: Fn2<boolean, boolean, boolean>
) => $minmax(a < b, a, b, ao, bo, op);

/** @internal */
const $max = (
	a: number,
	b: number,
	ao: boolean,
	bo: boolean,
	op: Fn2<boolean, boolean, boolean>
) => $minmax(a > b, a, b, ao, bo, op);

/** @internal */
const $minmax = (
	test: boolean,
	a: number,
	b: number,
	ao: boolean,
	bo: boolean,
	op: Fn2<boolean, boolean, boolean>
): [number, boolean] => (test ? [a, ao] : a === b ? [a, op(ao, bo)] : [b, bo]);

/** @internal */
const $toString = (l: number, r: number, lopen: boolean, ropen: boolean) =>
	`${lopen ? "(" : "["}${l} .. ${r}${ropen ? ")" : "]"}`;
