import { Type } from "@thi.ng/api";
import { defPackedFormat } from "./packed-format";

export const ALPHA8 = defPackedFormat({
    type: Type.U8,
    size: 8,
    alpha: 8,
    channels: [{ size: 8, lane: 0 }],
});
