import type { PackedBuffer } from "@thi.ng/pixel";
import { range } from "@thi.ng/pixel/range";
import type { DitherKernelFactory, DitherOpts } from "./api";

export const ditherWithKernel = (
    img: PackedBuffer,
    kernel: DitherKernelFactory,
    opts?: Partial<DitherOpts>
) => {
    const { channels, bleed, threshold } = {
        bleed: 1,
        threshold: 0.5,
        ...opts,
    };
    const { format, width, height } = img;
    for (let cid of channels || range(format.channels.length)) {
        const cimg = img.getChannel(cid);
        const chan = format.channels[cid];
        const $thresh = chan.num * threshold;
        const $max = chan.mask0;
        const pixels = new Int32Array(cimg.pixels);
        const { x1, x2, y1, y2, ox, oy, weights, shift } = {
            x1: 0,
            x2: width,
            y1: 0,
            y2: height,
            ...kernel(cimg),
        };
        let p: number, err: number;
        for (let y = y1; y < y2; y++) {
            for (let x = x1, i = x + y * width; x < width; x++, i++) {
                p = pixels[i] < $thresh ? 0 : $max;
                err = (pixels[i] - p) * bleed;
                pixels[i] = p;
                if (!err) continue;
                for (let j = ox.length; j-- > 0; ) {
                    const xx = x + ox[j];
                    const yy = y + oy[j];
                    if (yy >= 0 && yy < y2 && xx >= 0 && xx < x2) {
                        pixels[yy * width + xx] += (err * weights[j]) >> shift;
                    }
                }
            }
        }
        cimg.pixels.set(pixels);
        img.setChannel(cid, cimg);
    }
    return img;
};
