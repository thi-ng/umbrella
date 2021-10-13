import { Lane } from "../api.js";
import { defPackedFormat } from "./packed-format.js";

export const ARGB1555 = defPackedFormat({
    type: "u16",
    size: 16,
    alpha: 1,
    channels: [
        { size: 1, lane: Lane.ALPHA },
        { size: 5, lane: Lane.RED },
        { size: 5, lane: Lane.GREEN },
        { size: 5, lane: Lane.BLUE },
    ],
});
