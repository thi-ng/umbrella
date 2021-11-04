import { Lane } from "../api.js";
import { defIntFormat } from "./int-format.js";

export const RGB565 = defIntFormat({
    type: "u16",
    size: 16,
    channels: [
        { size: 5, lane: Lane.RED },
        { size: 6, lane: Lane.GREEN },
        { size: 5, lane: Lane.BLUE },
    ],
});
