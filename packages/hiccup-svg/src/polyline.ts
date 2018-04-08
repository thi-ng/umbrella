import { points } from "./format";

export const polyline = (pts: ArrayLike<number>[], attr?) =>
    [
        "polyline",
        Object.assign({ points: points(pts) }, attr)
    ];
