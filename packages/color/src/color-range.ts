import { peek } from "@thi.ng/arrays";
import { isString } from "@thi.ng/checks";
import { illegalArgs } from "@thi.ng/errors";
import { IRandom, SYSTEM, weightedRandom } from "@thi.ng/random";
import { analogHSV } from "./analog";
import type {
    Color,
    ColorRange,
    ColorRangePreset,
    ColorThemePart,
    ColorThemePartString,
    Range,
    ReadonlyColor,
} from "./api";
import { isBlackHsv, isGrayHsv, isWhiteHsv } from "./checks";
import { ensureAlpha } from "./internal/ensure-alpha";
import { ensureHue } from "./internal/ensure-hue";
import { parseCss } from "./parse-css";
import { rgbaHsva } from "./rgba-hsva";

export interface ColorRangeOpts {
    num: number;
    variance: number;
    rnd: IRandom;
}

export const RANGES: Record<ColorRangePreset, ColorRange> = {
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
    rnd: SYSTEM,
};

const $rnd = (ranges: Range[], rnd: IRandom) =>
    rnd.minmax(...ranges[rnd.int() % ranges.length]);

export const colorFromRange = (
    range: ColorRange,
    base?: ReadonlyColor,
    opts?: Partial<ColorRangeOpts>
): Color => {
    range = { ...DEFAULT_RANGE, ...range };
    const { variance, rnd } = { ...DEFAULT_OPTS, ...opts };
    let h: number, a: number;
    if (base) {
        h = base[0];
        a = ensureAlpha(base[3]);
        if (isBlackHsv(base)) return [h, 0, $rnd(range.b!, rnd), a];
        if (isWhiteHsv(base)) return [h, 0, $rnd(range.w!, rnd), a];
        if (isGrayHsv(base))
            return [
                h,
                0,
                $rnd(rnd.float(1) < 0.5 ? range.b! : range.w!, rnd),
                a,
            ];
        h = ensureHue(h + rnd.norm(variance));
    } else {
        h = $rnd(range.h!, rnd);
        a = $rnd(range.a!, rnd);
    }
    return [h, $rnd(range.s!, rnd), $rnd(range.v!, rnd), a];
};

export function* colorsFromRange(
    range: ColorRange,
    base?: ReadonlyColor,
    opts: Partial<ColorRangeOpts> = {}
) {
    let num = opts.num || Infinity;
    while (--num >= 0) yield colorFromRange(range, base, opts);
}

const asThemePart = (p: ColorThemePart | ColorThemePartString) => {
    if (!isString(p)) return p;
    const items = p.split(" ");
    let weight = parseFloat(peek(items));
    if (isNaN(weight)) {
        weight = 1;
    } else {
        items.pop();
    }
    return <ColorThemePart>(
        (items.length === 2
            ? { range: items[0], base: items[1], weight }
            : items.length === 1
            ? RANGES[<ColorRangePreset>items[0]]
                ? { range: items[0], weight }
                : { base: items[0], weight }
            : illegalArgs(`invalid theme part: "${p}"`))
    );
};

export function* colorsFromTheme(
    parts: (ColorThemePart | ColorThemePartString)[],
    opts: Partial<ColorRangeOpts> = {}
) {
    opts = { ...DEFAULT_OPTS, ...opts };
    let { num, variance } = opts;
    const theme = parts.map(asThemePart);
    const choice = weightedRandom(
        theme,
        theme.map((x) => (x.weight != null ? x.weight : 1))
    );
    while (--num! >= 0) {
        const spec = choice();
        const base = isString(spec.base)
            ? rgbaHsva([], parseCss(spec.base))
            : spec.base;
        const range = isString(spec.range) ? RANGES[spec.range] : spec.range;
        if (range) yield colorFromRange(range, base, opts);
        else if (base) yield analogHSV([], base, variance!);
    }
}
