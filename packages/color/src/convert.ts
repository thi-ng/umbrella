import { assert } from "@thi.ng/api";
import { isArray } from "@thi.ng/checks";
import { unsupported } from "@thi.ng/errors";
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
            const [a, b] = val;
            spec[<ColorMode>id] = (out, src) => b(out, a(out, src));
        }
    }
    CONVERSIONS[mode] = <Conversions>spec;
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
    if ($convert) {
        return <T>$convert(res, src);
    } else if (CONVERSIONS.rgb![srcMode]) {
        return <T>spec!.rgb(res, CONVERSIONS.rgb![srcMode]!([], src));
    }
    unsupported(`can't convert: ${srcMode} -> ${destMode}`);
};
