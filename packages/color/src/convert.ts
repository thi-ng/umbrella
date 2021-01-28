import { assert } from "@thi.ng/api";
import { unsupported } from "@thi.ng/errors";
import type { Color, ColorMode, ColorSpec, ReadonlyColor } from "./api";

export const CONVERSIONS: Partial<
    Record<ColorMode, ColorSpec<any, any>["from"]>
> = {};

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
