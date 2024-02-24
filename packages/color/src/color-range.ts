import type { Range, Without } from "@thi.ng/api";
import { peek } from "@thi.ng/arrays/peek";
import { isArray } from "@thi.ng/checks/is-array";
import { isNumber } from "@thi.ng/checks/is-number";
import { isString } from "@thi.ng/checks/is-string";
import { illegalArgs } from "@thi.ng/errors/illegal-arguments";
import { fract } from "@thi.ng/math/prec";
import type { IRandom } from "@thi.ng/random";
import { coin } from "@thi.ng/random/coin";
import { SYSTEM } from "@thi.ng/random/system";
import { weightedRandom } from "@thi.ng/random/weighted-random";
import { analog } from "./analog.js";
import type {
	ColorRange,
	ColorRangeOpts,
	ColorRangePreset,
	ColorThemePart,
	ColorThemePartTuple,
} from "./api/ranges.js";
import { parseCss } from "./css/parse-css.js";
import { __ensureAlpha } from "./internal/ensure.js";
import { isBlack } from "./is-black.js";
import { isGray } from "./is-gray.js";
import { isWhite } from "./is-white.js";
import { lch, type LCH } from "./lch/lch.js";

/**
 * Preset {@link ColorRange}s for use with {@link colorsFromRange},
 * {@link colorsFromTheme} etc.
 */
export const COLOR_RANGES: Record<ColorRangePreset, ColorRange> = {
	light: {
		c: [[0.3, 0.7]],
		l: [[0.9, 1]],
		b: [[0.35, 0.5]],
		w: [[0.6, 1]],
	},
	dark: {
		c: [[0.7, 1]],
		l: [[0.15, 0.4]],
		b: [[0, 0.4]],
		w: [[0.4, 0.6]],
	},
	bright: {
		c: [[0.75, 0.95]],
		l: [[0.8, 1]],
	},
	weak: {
		c: [[0.15, 0.3]],
		l: [[0.7, 1]],
		b: [[0.4, 0.6]],
		w: [[0.8, 1]],
	},
	neutral: {
		c: [[0.25, 0.35]],
		l: [[0.3, 0.7]],
		b: [[0.25, 0.4]],
		w: [[0.9, 1]],
	},
	fresh: {
		c: [[0.4, 0.8]],
		l: [[0.8, 1]],
		b: [[0.05, 0.3]],
		w: [[0.8, 1]],
	},
	soft: {
		c: [[0.2, 0.3]],
		l: [[0.6, 0.9]],
		b: [[0.05, 0.15]],
		w: [[0.6, 0.9]],
	},
	hard: {
		c: [[0.85, 0.95]],
		l: [[0.4, 1]],
	},
	warm: {
		c: [[0.6, 0.9]],
		l: [[0.4, 0.9]],
		b: [[0.2, 0.3]],
		w: [[0.8, 1]],
	},
	cool: {
		c: [[0.05, 0.2]],
		l: [[0.9, 1]],
		b: [[0, 0.95]],
		w: [[0.95, 1]],
	},
	intense: {
		c: [[0.9, 1]],
		l: [
			[0.2, 0.35],
			[0.8, 1],
		],
	},
};

const FULL: Range[] = [[0, 1]];

const DEFAULT_RANGE: ColorRange = {
	h: FULL,
	c: FULL,
	l: FULL,
	b: FULL,
	w: FULL,
	a: [[1, 1]],
};

const DEFAULT_OPTS: ColorRangeOpts = {
	num: Infinity,
	variance: 0.025,
	eps: 1e-3,
	rnd: SYSTEM,
};

const $rnd = (ranges: Range[], rnd: IRandom) =>
	rnd.minmax(...ranges[rnd.int() % ranges.length]);

/**
 * Takes a {@link ColorRange} and options to produce a single new result color.
 * This color is randomized within the channel limits of the given `range`
 * descriptor. If a `base` color is provided (via {@link ColorRangeOpts}), its
 * hue is used as bias and the `variance` option defines the max. -/+ normalized
 * hue shift of the result color.
 *
 * @remarks
 * If the base color is a shade of gray (incl. black & white), the result will
 * be another gray and is based on the range's black and white point sub-ranges.
 *
 * The alpha channel of the result color will only be randomized (based on
 * `range.a` settings) iff no `base` color was provided. If `base` is given, the
 * result will used the same alpha.
 *
 * A custom PRNG can be defined via the `rnd` option (default: `Math.random`).
 *
 * @param range -
 * @param opts -
 */
export const colorFromRange = (
	range: ColorRange | keyof typeof COLOR_RANGES,
	opts?: Partial<Pick<ColorRangeOpts, "base" | "variance" | "eps" | "rnd">>
): LCH => {
	range = {
		...DEFAULT_RANGE,
		...(isString(range) ? COLOR_RANGES[range] : range),
	};
	const { base, variance, rnd, eps } = { ...DEFAULT_OPTS, ...opts };
	let h: number;
	let c: number | undefined;
	let l: number | undefined;
	let a: number;
	if (base) {
		const col = lch(base);
		h = col[2];
		a = __ensureAlpha(col[3]);
		if (isBlack(col, eps)) {
			c = 0;
			l = $rnd(range.b!, rnd);
		} else if (isWhite(col, eps)) {
			c = 0;
			l = $rnd(range.w!, rnd);
		} else if (isGray(col, eps)) {
			c = 0;
			l = $rnd(coin(rnd) ? range.b! : range.w!, rnd);
		} else {
			h = fract(h + rnd.norm(variance));
		}
	} else {
		h = $rnd(range.h!, rnd);
		a = $rnd(range.a!, rnd);
	}
	return lch([
		l != undefined ? l : $rnd(range.l!, rnd),
		c !== undefined ? c : $rnd(range.c!, rnd),
		h,
		a,
	]);
};

/**
 * Generator version of {@link colorFromRange}, by default yielding an infinite
 * sequence of random colors based on given range, base color (optional) and
 * other opts. Use `num` option to limit number of results.
 *
 * @param range -
 * @param opts -
 */
export function* colorsFromRange(
	range: ColorRange | keyof typeof COLOR_RANGES,
	opts: Partial<ColorRangeOpts> = {}
) {
	let num = opts.num != undefined ? opts.num : Infinity;
	while (num-- > 0) yield colorFromRange(range, opts);
}

/** @internal */
const compileThemePart = (
	part: ColorThemePart | ColorThemePartTuple,
	opts: Partial<ColorRangeOpts>
) => {
	let spec: ColorThemePart;
	if (isArray(part)) {
		spec = themePartFromTuple(part);
	} else if (isString(part)) {
		spec = themePartFromString(part);
	} else {
		spec = { ...part };
		spec.weight == null && (spec.weight = 1);
	}
	isString(spec.range) && (spec.range = COLOR_RANGES[spec.range]);
	isString(spec.base) && (spec.base = lch(parseCss(spec.base)));
	if (spec.base !== undefined) {
		opts = { ...opts, base: spec.base };
	}
	return { spec, opts };
};

/** @internal */
const themePartFromTuple = (part: ColorThemePartTuple) => {
	let weight: number;
	const [range, ...xs] = part;
	if (isNumber(peek(xs))) {
		weight = <number>peek(xs);
		xs.pop();
	} else {
		weight = 1;
	}
	return <ColorThemePart>(
		(xs.length === 1
			? { range, base: xs[0], weight }
			: xs.length === 0
			? COLOR_RANGES[<ColorRangePreset>range]
				? { range, weight }
				: { base: range, weight }
			: illegalArgs(`invalid theme part: "${part}"`))
	);
};

/** @internal */
const themePartFromString = (part: string) =>
	<ColorThemePart>(
		(COLOR_RANGES[<ColorRangePreset>part]
			? { range: part, weight: 1 }
			: { base: part, weight: 1 })
	);

/**
 * Probabilistic color theme generator. Yield randomized colors based on given
 * weighted set of theme part specs.
 *
 * @remarks
 * Each theme part is a tuple of either:
 *
 * - `[range, color, weight?]`
 * - `[range, weight?]`
 * - `[color, weight?]`
 *
 * `range` can be either a {@link ColorRange} or the name of a
 * {@link COLOR_RANGES} preset. Likewise, `color` can be a color instance or CSS
 * color name. The `weight` of each part defines the relative
 * importance/probability of this theme part, compared to others. Default weight
 * is 1.0.
 *
 * @example
 * ```ts
 * import { colorsFromTheme } from "@thi.ng/color";
 *
 * [...colorsFromTheme(
 *   [["cool", "aliceblue"], ["bright", "orange", 0.25], ["hotpink", 0.1]],
 *   { num: 10 }
 * )]
 * ```
 *
 * @param parts -
 * @param opts -
 */
export function* colorsFromTheme(
	parts: (ColorThemePart | ColorThemePartTuple)[],
	opts: Partial<Without<ColorRangeOpts, "base">> = {}
) {
	let { num, variance, rnd } = { ...DEFAULT_OPTS, ...opts };
	const theme = parts.map((p) => compileThemePart(p, opts));
	const choice = weightedRandom(
		theme,
		theme.map((x) => x.spec.weight!),
		rnd
	);
	while (--num! >= 0) {
		const { spec, opts } = choice();
		if (spec.range) {
			yield colorFromRange(<ColorRange>spec.range, opts);
		} else if (spec.base) {
			yield <LCH>analog(lch(), lch(spec.base), variance!, rnd);
		}
	}
}
