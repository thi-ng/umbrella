// thing:no-export
import type { IGrid2D, Nullable, TypedArray } from "@thi.ng/api";

/** @internal */
export const draw2D = <T extends any[] | TypedArray, P>(
    grid: IGrid2D<T, P>,
    val: P,
    pts: Nullable<Iterable<number[]>>
) => {
    if (pts) {
        const { data, stride, rowStride } = grid;
        for (let p of pts) data[p[0] * stride + p[1] * rowStride] = val;
    }
    return grid;
};
