// thing:no-export
import type { IGrid2D, Nullable, TypedArray } from "@thi.ng/api";
import { isPrimitive } from "@thi.ng/checks/is-primitive";

/** @internal */
export const __draw2D = <T extends any[] | TypedArray, P>(
    grid: IGrid2D<T, P>,
    val: P,
    pts: Nullable<Iterable<number[]>>
) => {
    if (!pts) return grid;
    if (isPrimitive(val)) {
        const {
            data,
            offset,
            stride: [sx, sy],
        } = grid;
        for (let p of pts) {
            data[offset + p[0] * sx + p[1] * sy] = val;
        }
    } else {
        for (let p of pts) {
            grid.setAtUnsafe(p[0], p[1], val);
        }
    }
    return grid;
};
