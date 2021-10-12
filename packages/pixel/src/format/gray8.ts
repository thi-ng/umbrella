import { Lane } from "../api";
import { __luminanceABGR } from "../internal/utils";
import { defPackedFormat } from "./packed-format";

export const GRAY8 = defPackedFormat({
    type: "u8",
    size: 8,
    channels: [{ size: 8, lane: Lane.RED }],
    fromABGR: (x) => __luminanceABGR(x),
    toABGR: (x) => (0xff000000 | ((x & 0xff) * 0x010101)) >>> 0,
});
