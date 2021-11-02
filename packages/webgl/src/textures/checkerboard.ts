import { canvasPixels } from "@thi.ng/pixel/canvas";
import { ARGB8888 } from "@thi.ng/pixel/format/argb8888";

export interface CheckerboardOpts {
    size: number;
    col1: number;
    col2: number;
    corners: boolean;
    cornerCols: number[];
}

export const checkerboard = (opts: Partial<CheckerboardOpts>) => {
    opts = {
        size: 16,
        col1: 0xffffffff,
        col2: 0xff000000,
        cornerCols: [0xffff0000, 0xff00ff00, 0xff0000ff, 0xffffff00],
        ...opts,
    };
    const size = opts.size!;
    const col1 = ARGB8888.toABGR(opts.col1!);
    const col2 = ARGB8888.toABGR(opts.col2!);
    const { canvas, ctx, img, data } = canvasPixels(size);
    for (let y = 0, i = 0; y < size; y++) {
        for (let x = 0; x < size; x++, i++) {
            data[i] = (y & 1) ^ (x & 1) ? col1 : col2;
        }
    }
    if (opts.corners) {
        const corners = opts.cornerCols!.map(ARGB8888.toABGR);
        data[0] = corners[0];
        data[size - 1] = corners[1];
        data[data.length - size] = corners[2];
        data[data.length - 1] = corners[3];
    }
    ctx.putImageData(img, 0, 0);
    return canvas;
};
