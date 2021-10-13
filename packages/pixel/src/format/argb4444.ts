import { Lane } from "../api.js";
import { defPackedFormat } from "./packed-format.js";

export const ARGB4444 = defPackedFormat({
    type: "u16",
    size: 16,
    alpha: 4,
    channels: [
        { size: 4, lane: Lane.ALPHA },
        { size: 4, lane: Lane.RED },
        { size: 4, lane: Lane.GREEN },
        { size: 4, lane: Lane.BLUE },
    ],
});
