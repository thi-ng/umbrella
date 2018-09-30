import { IMinMax } from "@thi.ng/vectors/api";

export const bounds = <T extends IMinMax<T>>(pts: ReadonlyArray<T>, vmin: T, vmax: T) => {
    for (let i = pts.length; --i >= 0;) {
        const p = pts[i];
        vmin.min(p);
        vmax.max(p);
    }
    return [vmin, vmax];
};
