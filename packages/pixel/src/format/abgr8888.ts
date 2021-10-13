import { Lane } from "../api.js";
import { defPackedFormat } from "./packed-format.js";

export const ABGR8888 = defPackedFormat({
    type: "u32",
    size: 32,
    alpha: 8,
    channels: [
        { size: 8, lane: Lane.ALPHA },
        { size: 8, lane: Lane.BLUE },
        { size: 8, lane: Lane.GREEN },
        { size: 8, lane: Lane.RED },
    ],
    fromABGR: (x) => x,
    toABGR: (x) => x,
});
