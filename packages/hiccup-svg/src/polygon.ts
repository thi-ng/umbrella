import { points } from "./format";

export const polygon = (pts: ArrayLike<number>[], attr?) =>
    [
        "polygon",
        Object.assign({ points: points(pts) }, attr)
    ];
