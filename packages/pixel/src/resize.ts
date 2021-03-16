import type { Filter } from "./api";
import { packedBuffer, PackedBuffer } from "./packed";
import { defSampler } from "./sample";

export const resize = (
    src: PackedBuffer,
    w: number,
    h: number,
    filter: Filter = "linear"
) => {
    const dest = packedBuffer(w, h, src.format);
    const s = defSampler(src, filter, "clamp");
    const scaleX = (src.width - 1) / (w - 1);
    const scaleY = (src.height - 1) / (h - 1);
    for (let y = 0, i = 0; y < h; y++) {
        for (let x = 0; x < w; x++, i++) {
            dest.pixels[i] = s(x * scaleX, y * scaleY);
        }
    }
    return dest;
};
