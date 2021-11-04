import { Lane } from "../api.js";
import { __luminanceABGR } from "../internal/utils.js";
import { defIntFormat } from "./int-format.js";

export const GRAY_ALPHA8 = defIntFormat({
    type: "u16",
    size: 16,
    alpha: 8,
    channels: [
        { size: 8, lane: Lane.ALPHA },
        { size: 8, lane: Lane.RED },
    ],
    fromABGR: (x) => __luminanceABGR(x) | ((x >>> 16) & 0xff00),
    toABGR: (x) => (((x & 0xff00) << 16) | ((x & 0xff) * 0x010101)) >>> 0,
});
