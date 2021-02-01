import { Type } from "@thi.ng/api";
import { Lane } from "../api";
import { defPackedFormat } from "./packed-format";

export const ABGR8888 = defPackedFormat({
    type: Type.U32,
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
