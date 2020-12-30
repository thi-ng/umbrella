import type { Fn2, IObjectOf } from "@thi.ng/api";
import type { ReadonlyColor } from "./api";

export const swatches = (
    cols: ReadonlyColor[],
    fn: Fn2<ReadonlyColor, number, any[]>,
    attribs: IObjectOf<any> = {}
) => ["g", attribs, ...cols.map(fn)];

export const swatchesH = (
    cols: ReadonlyColor[],
    w = 5,
    h = 50,
    attribs?: IObjectOf<any>
) => swatches(cols, (fill, i) => ["rect", { fill }, [i * w, 0], w, h], attribs);

export const swatchesV = (
    cols: ReadonlyColor[],
    w = 50,
    h = 5,
    attribs: IObjectOf<any> = {}
) => swatches(cols, (fill, i) => ["rect", { fill }, [0, i * h], w, h], attribs);
