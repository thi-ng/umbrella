import { Type } from "@thi.ng/api";
import { Lane } from "../api";
import { luminanceABGR } from "../utils";
import { defPackedFormat } from "./packed-format";

export const GRAY_ALPHA16 = defPackedFormat({
    type: Type.U32,
    size: 32,
    channels: [
        { size: 8, lane: Lane.ALPHA },
        { size: 16, lane: Lane.RED },
    ],
    fromABGR: (x) =>
        (((luminanceABGR(x) + 0.5) | 0) * 0x0101) |
        (((x >>> 8) & 0xff0000) * 0x0101),
    toABGR: (x) => ((x & 0xff000000) | (((x >>> 8) & 0xff) * 0x010101)) >>> 0,
});
