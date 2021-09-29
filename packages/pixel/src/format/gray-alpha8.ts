import { Lane } from "../api";
import { luminanceABGR } from "../internal/utils";
import { defPackedFormat } from "./packed-format";

export const GRAY_ALPHA8 = defPackedFormat({
    type: "u16",
    size: 16,
    alpha: 8,
    channels: [
        { size: 8, lane: Lane.ALPHA },
        { size: 8, lane: Lane.RED },
    ],
    fromABGR: (x) => luminanceABGR(x) | ((x >>> 16) & 0xff00),
    toABGR: (x) => (((x & 0xff00) << 16) | ((x & 0xff) * 0x010101)) >>> 0,
});
