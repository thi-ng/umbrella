import { defPackedFormat } from "./packed-format";

export const ALPHA8 = defPackedFormat({
    type: "u8",
    size: 8,
    alpha: 8,
    channels: [{ size: 8, lane: 0 }],
});
