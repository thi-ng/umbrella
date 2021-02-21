import { Lane } from "../api";
import { defPackedFormat } from "./packed-format";

export const RGB888 = defPackedFormat({
    type: "u32",
    size: 24,
    channels: [
        { size: 8, lane: Lane.RED },
        { size: 8, lane: Lane.GREEN },
        { size: 8, lane: Lane.BLUE },
    ],
});
