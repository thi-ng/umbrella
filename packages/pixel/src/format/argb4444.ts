import { Type } from "@thi.ng/api";
import { Lane } from "../api";
import { defPackedFormat } from "./packed-format";

export const ARGB4444 = defPackedFormat({
    type: Type.U16,
    size: 16,
    alpha: 4,
    channels: [
        { size: 4, lane: Lane.ALPHA },
        { size: 4, lane: Lane.RED },
        { size: 4, lane: Lane.GREEN },
        { size: 4, lane: Lane.BLUE },
    ],
});
