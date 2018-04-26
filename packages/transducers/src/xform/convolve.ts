import { illegalArity } from "@thi.ng/api/error";

import { ConvolutionKernel2D, Transducer } from "../api";
import { range2d } from "../iter/range2d";
import { tuples } from "../iter/tuples";
import { add } from "../rfn/add";
import { transduce } from "../transduce";
import { map } from "./map";

export function buildKernel2d(weights: Iterable<number>, w: number, h: number): ConvolutionKernel2D {
    const w2 = w >> 1;
    const h2 = h >> 1;
    return [...tuples(weights, range2d(-w2, w2 + 1, -h2, h2 + 1))];
}

function kernelLookup2d(src, x, y, width, height, wrap) {
    return wrap ?
        ([w, [ox, oy]]) => {
            const xx = x < -ox ? width + ox : x >= width - ox ? ox - 1 : x + ox;
            const yy = y < -oy ? height + oy : y >= height - oy ? oy - 1 : y + oy;
            return w * src[yy * width + xx];
        } :
        ([w, [ox, oy]]) => {
            return (x < -ox || y < -oy || x >= width - ox || y >= height - oy) ? 0 : w * src[(y + oy) * width + x + ox];
        }
}

export function convolve2d(src: number[], width: number, height: number, kernel: ConvolutionKernel2D, wrap?: boolean): Transducer<number[], number>;
export function convolve2d(src: number[], width: number, height: number, weights: number[], kwidth: number, kheight: number, wrap?: boolean): Transducer<number[], number>;
export function convolve2d(src: number[], width: number, height: number, ...args: any[]): Transducer<number[], number> {
    let kernel;
    let wrap = false;
    switch (args.length) {
        case 1:
        case 2:
            [kernel, wrap] = args;
            break;
        case 4:
            wrap = args[3];
        case 3:
            kernel = buildKernel2d.apply(null, args);
            break;
        default:
            illegalArity(args.length + 3);
    }
    return map(
        ([x, y]) =>
            transduce(
                map(kernelLookup2d(src, x, y, width, height, wrap)),
                add(),
                kernel
            )
    );
}
