import { illegalArgs } from "@thi.ng/errors/illegal-arguments";

import { Transducer } from "../api";
import { range2d } from "../iter/range2d";
import { tuples } from "../iter/tuples";
import { iterator1 } from "../iterator";
import { add } from "../rfn/add";
import { transduce } from "../transduce";
import { map } from "./map";

export type ConvolutionKernel1D = [number, number][];
export type ConvolutionKernel2D = [number, [number, number]][];
export type ConvolutionKernel3D = [number, [number, number, number]][];

export interface Convolution2DOpts {
    src: number[];
    width: number;
    height: number;
    weights?: number[];
    kernel?: ConvolutionKernel2D;
    kwidth?: number;
    kheight?: number;
    wrap?: boolean;
    border?: number;
}

export const buildKernel2d = (weights: Iterable<number>, w: number, h: number): ConvolutionKernel2D => {
    const w2 = w >> 1;
    const h2 = h >> 1;
    return [...tuples(weights, range2d(-w2, w2 + 1, -h2, h2 + 1))];
};

const kernelLookup2d = (
    src: number[],
    x: number,
    y: number,
    width: number,
    height: number,
    wrap: boolean,
    border: number) =>
    wrap ?
        ([w, [ox, oy]]) => {
            const xx = x < -ox ? width + ox : x >= width - ox ? ox - 1 : x + ox;
            const yy = y < -oy ? height + oy : y >= height - oy ? oy - 1 : y + oy;
            return w * src[yy * width + xx];
        } :
        ([w, [ox, oy]]) => {
            return (x < -ox || y < -oy || x >= width - ox || y >= height - oy) ?
                border :
                w * src[(y + oy) * width + x + ox];
        };

export function convolve2d(opts: Convolution2DOpts): Transducer<number[], number>;
export function convolve2d(opts: Convolution2DOpts, src: Iterable<number[]>): IterableIterator<number>;
export function convolve2d(opts: Convolution2DOpts, _src?: Iterable<number[]>): any {
    if (_src) {
        return iterator1(convolve2d(opts), _src);
    }
    const { src, width, height } = opts;
    const wrap = opts.wrap !== false;
    const border = opts.border || 0;
    let kernel = opts.kernel;
    if (!kernel) {
        if (!(opts.weights && opts.kwidth && opts.kheight)) {
            illegalArgs(`no kernel or kernel config`);
        }
        kernel = buildKernel2d(opts.weights, opts.kwidth, opts.kheight);
    }
    return map(
        (p: number[]) =>
            transduce(
                map(kernelLookup2d(src, p[0], p[1], width, height, wrap, border)),
                add(),
                kernel
            )
    );
}
