import type { Fn, Fn0 } from "@thi.ng/api";
import { illegalArgs } from "@thi.ng/errors";
import type { Reducer, Transducer } from "../api";
import { range } from "../iter/range";
import { range2d } from "../iter/range2d";
import { zip } from "../iter/zip";
import { iterator1 } from "../iterator";
import { add } from "../rfn/add";
import { transduce } from "../transduce";
import { map } from "./map";

export type ConvolutionKernel1D = [number, number][];
export type ConvolutionKernel2D = [number, [number, number]][];
export type ConvolutionKernel3D = [number, [number, number, number]][];

export interface ConvolutionOpts<K> {
    /**
     * Current cell states
     */
    src: ArrayLike<number>;
    /**
     * Kernel weights
     */
    weights?: Iterable<number>;
    /**
     * Convolution kernel, pre-build via `buildKernel*`
     */
    kernel?: K;
    /**
     * Cell matrix width
     */
    width: number;
    /**
     * Kernel width (MUST be odd number)
     */
    kwidth?: number;
    /**
     * True, if convolution is seamless / wraps around near edges.
     * Default: true
     */
    wrap?: boolean;
    /**
     * Only used if `wrap = false`. Used as neighboring cell values when
     * processing edge cells. Default: 0
     */
    border?: number;
    /**
     * Optional custom reducer to process convoluted results. Default:
     * `add`
     */
    reduce?: Fn0<Reducer<number, number>>;
}
export interface Convolution1DOpts
    extends ConvolutionOpts<ConvolutionKernel1D> {}

export interface Convolution2DOpts
    extends ConvolutionOpts<ConvolutionKernel2D> {
    height: number;
    kheight?: number;
}

export const buildKernel1d = (
    weights: Iterable<number>,
    w: number
): ConvolutionKernel1D => {
    const w2 = w >> 1;
    return [...zip(weights, range(-w2, w2 + 1))];
};

export const buildKernel2d = (
    weights: Iterable<number>,
    w: number,
    h = w
): ConvolutionKernel2D => {
    const w2 = w >> 1;
    const h2 = h >> 1;
    return [...zip(weights, range2d(-w2, w2 + 1, -h2, h2 + 1))];
};

const kernelLookup1d = (
    src: ArrayLike<number>,
    x: number,
    width: number,
    wrap: boolean,
    border: number
): Fn<[number, number], number> =>
    wrap
        ? ({ 0: w, 1: ox }) => {
              const xx =
                  x < -ox ? width + ox : x >= width - ox ? ox - 1 : x + ox;
              return w * src[xx];
          }
        : ({ 0: w, 1: ox }) => {
              return x < -ox || x >= width - ox ? border : w * src[x + ox];
          };

const kernelLookup2d = (
    src: ArrayLike<number>,
    x: number,
    y: number,
    width: number,
    height: number,
    wrap: boolean,
    border: number
): Fn<[number, [number, number]], number> =>
    wrap
        ? ({ 0: w, 1: { 0: ox, 1: oy } }) => {
              const xx =
                  x < -ox ? width + ox : x >= width - ox ? ox - 1 : x + ox;
              const yy =
                  y < -oy ? height + oy : y >= height - oy ? oy - 1 : y + oy;
              return w * src[yy * width + xx];
          }
        : ({ 0: w, 1: { 0: ox, 1: oy } }) => {
              return x < -ox || y < -oy || x >= width - ox || y >= height - oy
                  ? border
                  : w * src[(y + oy) * width + x + ox];
          };

const kernelError = () => illegalArgs(`no kernel or kernel config`);

export function convolve1d(opts: Convolution1DOpts): Transducer<number, number>;
export function convolve1d(
    opts: Convolution1DOpts,
    indices: Iterable<number>
): IterableIterator<number>;
export function convolve1d(
    opts: Convolution1DOpts,
    indices?: Iterable<number>
): any {
    if (indices) {
        return iterator1(convolve1d(opts), indices);
    }
    const { src, width } = opts;
    const wrap = opts.wrap !== false;
    const border = opts.border || 0;
    const rfn = opts.reduce || add;
    let kernel = opts.kernel;
    if (!kernel) {
        !(opts.weights && opts.kwidth) && kernelError();
        kernel = buildKernel1d(opts.weights!, opts.kwidth!);
    }
    return map((p: number) =>
        transduce(
            map(kernelLookup1d(src, p, width, wrap, border)),
            rfn(),
            kernel!
        )
    );
}

export function convolve2d(
    opts: Convolution2DOpts
): Transducer<number[], number>;
export function convolve2d(
    opts: Convolution2DOpts,
    indices: Iterable<number[]>
): IterableIterator<number>;
export function convolve2d(
    opts: Convolution2DOpts,
    indices?: Iterable<number[]>
): any {
    if (indices) {
        return iterator1(convolve2d(opts), indices);
    }
    const { src, width, height } = opts;
    const wrap = opts.wrap !== false;
    const border = opts.border || 0;
    const rfn = opts.reduce || add;
    let kernel = opts.kernel;
    if (!kernel) {
        !(opts.weights && opts.kwidth && opts.kheight) && kernelError();
        kernel = buildKernel2d(opts.weights!, opts.kwidth!, opts.kheight!);
    }
    return map((p: number[]) =>
        transduce(
            map(kernelLookup2d(src, p[0], p[1], width, height, wrap, border)),
            rfn(),
            kernel!
        )
    );
}
