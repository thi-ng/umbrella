import { Lane } from "../api.js";
import { defPackedFormat } from "./packed-format.js";

export const RGB888 = defPackedFormat({
    type: "u32",
    size: 24,
    channels: [
        { size: 8, lane: Lane.RED },
        { size: 8, lane: Lane.GREEN },
        { size: 8, lane: Lane.BLUE },
    ],
});
