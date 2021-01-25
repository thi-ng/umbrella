import { peek } from "@thi.ng/arrays";
import { isArray, isNumber, isString } from "@thi.ng/checks";
import { illegalArgs } from "@thi.ng/errors";
import { IRandom, SYSTEM, weightedRandom } from "@thi.ng/random";
import { analogHsv } from "./analog";
import type {
    ColorRange,
    ColorRangeOpts,
    ColorRangePreset,
    ColorThemePart,
    ColorThemePartTuple,
    Range,
    ReadonlyColor,
} from "./api";
import { isBlackHsv, isGrayHsv, isWhiteHsv } from "./checks";
import { asHsv } from "./convert";
import { HSV, hsv } from "./hsv";
import { ensureAlpha } from "./internal/ensure-alpha";
import { ensureHue } from "./internal/ensure-hue";
import { parseCss } from "./parse-css";

/**
 * Preset {@link ColorRange}s for use with {@link colorsFromRange},
 * {@link colorsFromTheme} etc.
 */
export const COLOR_RANGES: Record<ColorRangePreset, ColorRange> = {
    light: {
        s: [[0.3, 0.7]],
        v: [[0.9, 1]],
        b: [[0.15, 0.3]],
        w: [[0.3, 1]],
    },
    dark: {
        s: [[0.7, 1]],
        v: [[0.15, 0.4]],
        b: [[0, 0.5]],
        w: [[0.5, 0.75]],
    },
    bright: {
        s: [[0.8, 1]],
        v: [[0.8, 1]],
    },
    weak: {
        s: [[0.15, 0.3]],
        v: [[0.7, 1]],
        b: [[0.2, 0.2]],
        w: [[0.2, 1]],
    },
    neutral: {
        s: [[0.25, 0.35]],
        v: [[0.3, 0.7]],
        b: [[0.15, 0.15]],
        w: [[0.9, 1]],
    },
    fresh: {
        s: [[0.4, 0.8]],
        v: [[0.8, 1]],
        b: [[0.05, 0.3]],
        w: [[0.8, 1]],
    },
    soft: {
        s: [[0.2, 0.3]],
        v: [[0.6, 0.9]],
        b: [[0.05, 0.15]],
        w: [[0.6, 0.9]],
    },
    hard: {
        s: [[0.9, 1]],
        v: [[0.4, 1]],
    },
    warm: {
        s: [[0.6, 0.9]],
        v: [[0.4, 0.9]],
        b: [[0.2, 0.2]],
        w: [[0.8, 1]],
    },
    cool: {
        s: [[0.05, 0.2]],
        v: [[0.9, 1]],
        b: [[0, 0.95]],
        w: [[0.95, 1]],
    },
    intense: {
        s: [[0.9, 1]],
        v: [
            [0.2, 0.35],
            [0.8, 1],
        ],
    },
};

const FULL: Range[] = [[0, 1]];

const DEFAULT_RANGE: ColorRange = {
    h: FULL,
    s: FULL,
    v: FULL,
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
 * Takes a {@link ColorRange}, optional base color (HSV(A)) and options to produce
 * a single new result color. This color is randomized within the channel limits
 * of the given `range`. If a `base` color is provided, its hue is used as bias
 * and the `variance` option defines the max. -/+ normalized hue shift of the
 * result color.
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
 * @param range
 * @param base
 * @param opts
 */
export const colorFromRange = (
    range: ColorRange,
    base?: ReadonlyColor,
    opts?: Partial<Pick<ColorRangeOpts, "variance" | "eps" | "rnd">>
): HSV => {
    range = { ...DEFAULT_RANGE, ...range };
    const { variance, rnd, eps } = { ...DEFAULT_OPTS, ...opts };
    let h: number, a: number;
    if (base) {
        h = base[0];
        a = ensureAlpha(base[3]);
        if (isBlackHsv(base, eps)) return hsv([h, 0, $rnd(range.b!, rnd), a]);
        if (isWhiteHsv(base, eps)) return hsv([h, 0, $rnd(range.w!, rnd), a]);
        if (isGrayHsv(base, eps))
            return hsv([
                h,
                0,
                $rnd(rnd.float() < 0.5 ? range.b! : range.w!, rnd),
                a,
            ]);
        h = ensureHue(h + rnd.norm(variance));
    } else {
        h = $rnd(range.h!, rnd);
        a = $rnd(range.a!, rnd);
    }
    return hsv([h, $rnd(range.s!, rnd), $rnd(range.v!, rnd), a]);
};

/**
 * Generator version of {@link colorFromRange}, by default yielding an infinite
 * sequence of random colors based on given range, base color (optional) and
 * other opts. Use `num` option to limit number of results.
 *
 * @param range
 * @param base
 * @param opts
 */
export function* colorsFromRange(
    range: ColorRange,
    base?: ReadonlyColor,
    opts: Partial<ColorRangeOpts> = {}
) {
    let num = opts.num != undefined ? opts.num : Infinity;
    while (--num >= 0) yield colorFromRange(range, base, opts);
}

/** @internal */
const asThemePart = (p: ColorThemePart | ColorThemePartTuple) => {
    let spec: ColorThemePart;
    let weight: number;
    if (isArray(p)) {
        const [a, ...xs] = p;
        if (isNumber(peek(xs))) {
            weight = <number>peek(xs);
            xs.pop();
        } else {
            weight = 1;
        }
        spec = <ColorThemePart>(
            (xs.length === 1
                ? { range: a, base: xs[0], weight }
                : xs.length === 0
                ? COLOR_RANGES[<ColorRangePreset>a]
                    ? { range: a, weight }
                    : { base: a, weight }
                : illegalArgs(`invalid theme part: "${p}"`))
        );
    } else if (isString(p)) {
        spec = <ColorThemePart>(
            (COLOR_RANGES[<ColorRangePreset>p]
                ? { range: p, weight: 1 }
                : { base: p, weight: 1 })
        );
    } else {
        spec = p;
        spec.weight == null && (spec.weight = 1);
    }
    isString(spec.range) && (spec.range = COLOR_RANGES[spec.range]);
    isString(spec.base) && (spec.base = asHsv(parseCss(spec.base)));
    return spec;
};

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
 * {@link COLOR_RANGES} preset. Likewise, `color` can be an HSV color tuple or a
 * CSS color name. The `weight` of each part defines the relative
 * importance/probability of this theme part, compared to others. Default weight
 * is 1.0.
 *
 * @example
 * ```ts
 * [...colorsFromTheme(
 *   [["cool", "aliceblue"], ["bright", "orange", 0.25], ["hotpink", 0.1]],
 *   { num: 10 }
 * )]
 * ```
 *
 * @param parts
 * @param opts
 */
export function* colorsFromTheme(
    parts: (ColorThemePart | ColorThemePartTuple)[],
    opts: Partial<ColorRangeOpts> = {}
) {
    let { num, variance } = { ...DEFAULT_OPTS, ...opts };
    const theme = parts.map(asThemePart);
    const choice = weightedRandom(
        theme,
        theme.map((x) => x.weight!)
    );
    while (--num! >= 0) {
        const spec = choice();
        if (spec.range) {
            yield colorFromRange(
                <ColorRange>spec.range,
                <ReadonlyColor>spec.base,
                opts
            );
        } else if (spec.base) {
            yield hsv(analogHsv([], <ReadonlyColor>spec.base, variance!));
        }
    }
}
