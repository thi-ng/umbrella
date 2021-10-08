import type { IGen } from "../api";

export const __take = <T>(
    src: IGen<T>,
    num: number,
    out: T[] = [],
    idx = 0
) => {
    for (; --num >= 0; ) {
        out[idx++] = src.next();
    }
    return out;
};
