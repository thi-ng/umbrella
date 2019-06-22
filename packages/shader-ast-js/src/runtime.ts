import { Fn } from "@thi.ng/api";
import { clamp01 } from "@thi.ng/math";

export interface RuntimeOpts {
    canvas: HTMLCanvasElement;
}
export const initRuntime = (opts: RuntimeOpts) => {
    const W = opts.canvas.width;
    const H = opts.canvas.height - 1;
    const ctx = opts.canvas.getContext("2d")!;
    const img = ctx.getImageData(0, 0, W, H);
    const u32 = new Uint32Array(img.data.buffer);
    return {
        update(fn: Fn<number[], number[]>) {
            const frag = [];
            for (let y = 0, i = 0; y <= H; y++) {
                frag[1] = H - y;
                for (let x = 0; x < W; x++) {
                    frag[0] = x;
                    u32[i++] = rgba2bgra(fn(frag));
                }
            }
            ctx.putImageData(img, 0, 0);
        }
    };
};

const rgba2bgra = (rgba: number[]) =>
    ((clamp01(rgba[0]) * 0xff) << 0) |
    ((clamp01(rgba[1]) * 0xff) << 8) |
    ((clamp01(rgba[2]) * 0xff) << 16) |
    ((clamp01(rgba[3]) * 0xff) << 24);
