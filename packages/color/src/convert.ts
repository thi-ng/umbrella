import { assert } from "@thi.ng/api";
import { isArray } from "@thi.ng/checks";
import { unsupported } from "@thi.ng/errors";
import type {
    Color,
    ColorMode,
    ColorOp,
    ColorSpec,
    ReadonlyColor,
} from "./api";

export const CONVERSIONS: Partial<
    Record<
        ColorMode,
        Partial<Record<ColorMode, ColorOp>> & {
            rgb: ColorOp | [ColorOp, ColorOp];
        }
    >
> = {};

/**
 * Registers conversions for given {@link ColorSpec}. Called by
 * {@link defColor}.
 *
 * @param spec
 *
 * @internal
 */
export const defConversions = <M extends ColorMode, K extends string>(
    spec: ColorSpec<M, K>
) => {
    for (let id in spec.from) {
        const val = spec.from[<ColorMode>id];
        if (isArray(val)) {
            const [a, b] = val;
            spec.from[<ColorMode>id] = (out, src) => b(out, a(out, src));
        }
    }
    CONVERSIONS[spec.mode] = spec.from;
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
