import { swapLane13 } from "@thi.ng/binary/swizzle";
import { Lane } from "../api.js";
import { defPackedFormat } from "./packed-format.js";

export const ARGB8888 = defPackedFormat({
    type: "u32",
    size: 32,
    alpha: 8,
    channels: [
        { size: 8, lane: Lane.ALPHA },
        { size: 8, lane: Lane.RED },
        { size: 8, lane: Lane.GREEN },
        { size: 8, lane: Lane.BLUE },
    ],
    fromABGR: swapLane13,
    toABGR: swapLane13,
});
