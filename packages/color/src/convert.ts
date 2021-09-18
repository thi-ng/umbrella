import { assert } from "@thi.ng/api/assert";
import { isArray } from "@thi.ng/checks/is-array";
import { unsupported } from "@thi.ng/errors/unsupported";
import type {
    Color,
    ColorMode,
    ColorSpec,
    Conversions,
    ReadonlyColor,
} from "./api";

export const CONVERSIONS: Partial<Record<ColorMode, Conversions>> = {};

/**
 * Registers conversions for given {@link ColorSpec}. Called by
 * {@link defColor}.
 *
 * @param spec
 *
 * @internal
 */
export const defConversions = (
    mode: ColorMode,
    spec: ColorSpec<any, any>["from"]
) => {
    for (let id in spec) {
        const val = spec[<ColorMode>id];
        if (isArray(val)) {
            const [a, b, c, d] = val;
            spec[<ColorMode>id] =
                val.length === 2
                    ? (out, src) => b(out, a(out, src))
                    : val.length === 3
                    ? (out, src) => c!(out, b(out, a(out, src)))
                    : (out, src) => d!(out, c!(out, b(out, a(out, src))));
        }
    }
    CONVERSIONS[mode] = { ...CONVERSIONS[mode], ...(<Conversions>spec) };
};

export const convert = <T extends Color>(
    res: T | null,
    src: ReadonlyColor,
    destMode: ColorMode,
    srcMode: ColorMode
): T => {
    const spec = CONVERSIONS[destMode];
    assert(!!spec, `no conversions available for ${destMode}`);
    let $convert = spec![srcMode];
    return $convert
        ? <T>$convert(res, src)
        : CONVERSIONS.rgb![srcMode]
        ? <T>spec!.rgb(res, CONVERSIONS.rgb![srcMode]!([], src))
        : unsupported(`can't convert: ${srcMode} -> ${destMode}`);
};
