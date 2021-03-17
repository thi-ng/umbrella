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
    const sample = defSampler(src, filter, "repeat");
    const scaleX = w > 0 ? src.width / w : 0;
    const scaleY = h > 0 ? src.height / h : 0;
    for (let y = 0, i = 0; y < h; y++) {
        const yy = y * scaleY;
        for (let x = 0; x < w; x++, i++) {
            dest.pixels[i] = sample(x * scaleX, yy);
        }
    }
    return dest;
};
