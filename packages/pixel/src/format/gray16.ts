import { Type } from "@thi.ng/api";
import { Lane } from "../api";
import { luminanceABGR } from "../utils";
import { defPackedFormat } from "./packed-format";

export const GRAY16 = defPackedFormat({
    type: Type.U16,
    size: 16,
    channels: [{ size: 16, lane: Lane.RED }],
    fromABGR: (x) => ((luminanceABGR(x) + 0.5) | 0) * 0x0101,
    toABGR: (x) => (0xff000000 | ((x >>> 8) * 0x010101)) >>> 0,
});
