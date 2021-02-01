import { Type } from "@thi.ng/api";
import { Lane } from "../api";
import { defPackedFormat } from "./packed-format";

export const ARGB1555 = defPackedFormat({
    type: Type.U16,
    size: 16,
    alpha: 1,
    channels: [
        { size: 1, lane: Lane.ALPHA },
        { size: 5, lane: Lane.RED },
        { size: 5, lane: Lane.GREEN },
        { size: 5, lane: Lane.BLUE },
    ],
});
