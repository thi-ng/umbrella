import type { Fn, FnN3, NumericArray } from "@thi.ng/api";
import { isFunction } from "@thi.ng/checks/is-function";
import { assert } from "@thi.ng/errors/assert";
import { clamp } from "@thi.ng/math/interval";
import { lanczos } from "@thi.ng/math/mix";
import type {
    ConvolutionKernelSpec,
    ConvolveOpts,
    KernelFnSpec,
    KernelSpec,
    PoolKernelSpec,
    PoolTemplate,
} from "./api";
import { ensureChannel } from "./checks";
import { FloatBuffer } from "./float";
import { FLOAT_GRAY } from "./format/float-gray";
import { asIntVec } from "./internal/utils";
import { range } from "./range";

/**
 * Convolves a single channel from given `src` float buffer with provided
 * convolution or pooling kernel with support for strided sampling (resulting in
 * smaller dimensions). Returns result as single channel buffer (in
 * {@link FLOAT_GRAY} format).
 *
 * @remarks
 * Use {@link convolveImage} to process multiple or all channels in a buffer.
 *
 * References:
 * - https://en.wikipedia.org/wiki/Kernel_(image_processing)
 *
 * @param src
 * @param opts
 */
export const convolveChannel = (src: FloatBuffer, opts: ConvolveOpts) =>
    convolve(initConvolve(src, opts));

/**
 * Similar to {@link convolveChannel}, but processes multiple or all channels
 * (default) in a buffer and returns a new buffer in same format as original.
 *
 * @remarks
 * This function re-uses as much as internal state & memory as possible, so will
 * be faster than individual applications of {@link convolveChannel}.
 *
 * @param src
 * @param opts
 */
export const convolveImage = (
    src: FloatBuffer,
    opts: Exclude<ConvolveOpts, "channel"> & { channels?: number[] }
) => {
    const state = initConvolve(src, opts);
    const dest = new FloatBuffer(state.dwidth, state.dheight, src.format);
    for (let channel of opts.channels || range(src.format.channels.length)) {
        dest.setChannel(channel, convolve({ ...state, channel }));
    }
    return dest;
};

/** @internal */
const convolve = ({
    channel,
    dest,
    dwidth,
    dheight,
    kernel,
    offsetX,
    offsetY,
    rowStride,
    scale,
    src,
    srcStride,
    strideX,
    strideY,
}: ReturnType<typeof initConvolve>) => {
    ensureChannel(src.format, channel);
    const dpix = dest.pixels;
    const stepX = strideX * srcStride;
    const stepY = strideY * rowStride;
    for (
        let sy = offsetY * rowStride, dy = 0, i = 0;
        dy < dheight;
        sy += stepY, dy++
    ) {
        for (
            let sx = offsetX * srcStride + channel, dx = 0;
            dx < dwidth;
            sx += stepX, dx++, i++
        ) {
            dpix[i] = kernel(sx, sy, channel) * scale;
        }
    }
    return dest;
};

/** @internal */
const initKernel = (
    src: FloatBuffer,
    kernel: KernelSpec,
    kw: number,
    kh: number
) =>
    (isFunction((<KernelFnSpec>kernel).fn)
        ? (<KernelFnSpec>kernel).fn
        : defKernel(
              (<ConvolutionKernelSpec>kernel).spec ||
                  (<PoolKernelSpec>kernel).pool,
              kw,
              kh
          ))(src);

/** @internal */
const initConvolve = (src: FloatBuffer, opts: ConvolveOpts) => {
    const {
        kernel,
        channel,
        stride: sampleStride,
        scale,
        offset,
    } = {
        channel: 0,
        offset: 0,
        scale: 1,
        stride: 1,
        ...opts,
    };
    const size = kernel.size;
    const [kw, kh] = asIntVec(size);
    const [strideX, strideY] = asIntVec(sampleStride);
    const [offsetX, offsetY] = asIntVec(offset);
    assert(strideX >= 1 && strideY >= 1, `illegal stride: ${sampleStride}`);
    const { width, height, stride: srcStride, rowStride } = src;
    const dwidth = Math.floor(width / strideX);
    const dheight = Math.floor(height / strideY);
    assert(dwidth > 0 && dheight > 0, `too large stride(s) for given image`);
    const dest = new FloatBuffer(dwidth, dheight, FLOAT_GRAY);
    return {
        channel,
        dest,
        dheight,
        dwidth,
        kernel: initKernel(src, kernel, kw, kh),
        offsetX,
        offsetY,
        rowStride,
        scale,
        src,
        srcStride,
        strideX,
        strideY,
    };
};

const declOffset = (
    idx: number,
    i: number,
    pre: string,
    stride: string,
    min: string,
    max: string
) =>
    idx < 0
        ? `const ${pre}${i} = max(${pre}${
              idx < -1 ? idx + "*" : "-"
          }${stride},${min});`
        : `const ${pre}${i} = min(${pre}+${
              idx > 1 ? idx + "*" : ""
          }${stride},${max});`;

/**
 * HOF convolution or pooling kernel code generator. Takes either a
 * {@link PoolTemplate} function or array of kernel coefficients and kernel
 * width/height. Returns optimized kernel function for use with
 * {@link convolve}.
 *
 * @remarks
 * If total kernel size (width * height) is < 512, the result function will use
 * unrolled loops to access pixels and hence kernel sizes shouldn't be larger
 * than ~22x22 to avoid excessive function bodies. For dynamically generated
 * kernel functions, only non-zero weighted pixels will be included in the
 * result function to avoid extraneous lookups. Row & column offsets are
 * pre-calculated too. Larger kernel sizes are handled via
 * {@link defLargeKernel}.
 *
 * @param tpl
 * @param w
 * @param h
 */
export const defKernel = (
    tpl: NumericArray | PoolTemplate,
    w: number,
    h: number
) => {
    if (w * h > 512 && !isFunction(tpl)) return defLargeKernel(tpl, w, h);
    const isPool = isFunction(tpl);
    const prefix: string[] = [];
    const body: string[] = [];
    const kvars: string[] = [];
    const h2 = h >> 1;
    const w2 = w >> 1;
    for (let y = 0, i = 0; y < h; y++) {
        const yy = y - h2;
        const row: string[] = [];
        for (let x = 0; x < w; x++, i++) {
            const kv = `k${y}_${x}`;
            kvars.push(kv);
            const xx = x - w2;
            const idx =
                (yy !== 0 ? `y${y}` : `y`) + (xx !== 0 ? `+x${x}` : "+x");
            isPool
                ? row.push(`pix[${idx}]`)
                : (<NumericArray>tpl)[i] !== 0 && row.push(`${kv}*pix[${idx}]`);
            if (y === 0 && xx !== 0) {
                prefix.push(
                    declOffset(xx, x, "x", "stride", "channel", "maxX+channel")
                );
            }
        }
        row.length && body.push(...row);
        if (yy !== 0) {
            prefix.push(declOffset(yy, y, "y", "rowStride", "0", "maxY"));
        }
    }
    const decls = isPool
        ? ""
        : `const [${kvars.join(", ")}] = [${(<NumericArray>tpl).join(", ")}];`;
    const inner = isPool ? (<PoolTemplate>tpl)(body, w, h) : body.join(" + ");
    const fnBody = [
        decls,
        "const { min, max } = Math;",
        "const { pixels: pix, stride, rowStride } = src;",
        "const maxX = (src.width - 1) * stride;",
        "const maxY = (src.height - 1) * rowStride;",
        "return (x, y, channel) => {",
        ...prefix,
        `return ${inner};`,
        "}",
    ].join("\n");
    // console.log(fnBody);
    return <Fn<FloatBuffer, FnN3>>new Function("src", fnBody);
};

/**
 * Loop based fallback for {@link defKernel}, intended for larger kernel sizes
 * for which loop-unrolled approach is prohibitive.
 *
 * @param kernel
 * @param w
 * @param h
 */
export const defLargeKernel = (
    kernel: NumericArray,
    w: number,
    h: number
): Fn<FloatBuffer, FnN3> => {
    return (src) => {
        const { pixels, rowStride, stride } = src;
        const x0 = -(w >> 1) * stride;
        const x1 = -x0 + (w & 1 ? stride : 0);
        const y0 = -(h >> 1) * rowStride;
        const y1 = -y0 + (h & 1 ? rowStride : 0);
        const maxX = (src.width - 1) * stride;
        const maxY = (src.height - 1) * rowStride;
        return (xx, yy, channel) => {
            const $maxX = maxX + channel;
            let sum = 0,
                y: number,
                x: number,
                k: number,
                row: number;
            for (y = y0, k = 0; y < y1; y += rowStride) {
                for (
                    x = x0, row = clamp(yy + y, 0, maxY);
                    x < x1;
                    x += stride, k++
                ) {
                    sum +=
                        kernel[k] * pixels[row + clamp(xx + x, channel, $maxX)];
                }
            }
            return sum;
        };
    };
};

export const POOL_NEAREST: PoolTemplate = (body, w, h) =>
    body[(h >> 1) * w + (w >> 1)];

export const POOL_MEAN: PoolTemplate = (body, w, h) =>
    `(${body.join("+")})*${1 / (w * h)}`;

export const POOL_MIN: PoolTemplate = (body) => `Math.min(${body.join(",")})`;

export const POOL_MAX: PoolTemplate = (body) => `Math.max(${body.join(",")})`;

/**
 * Higher order adaptive threshold {@link PoolTemplate}. Computes: `step(C -
 * mean(K) + B)`, where `C` is the center pixel, `K` the entire set of pixels in
 * the kernel and `B` an arbitrary bias/offset value.
 *
 * @example
 * ```ts
 * // 3x3 adaptive threshold w/ bias = 1
 * convolveChannel(src, { kernel: { pool: POOL_THRESHOLD(1), size: 3 }});
 * ```
 *
 * @param bias
 */
export const POOL_THRESHOLD =
    (bias = 0): PoolTemplate =>
    (body, w, h) => {
        const center = POOL_NEAREST(body, w, h);
        const mean = `(${body.join("+")})/${w * h}`;
        return `(${center} - ${mean} + ${bias}) < 0 ? 0 : 1`;
    };

export const SOBEL_X: KernelSpec = {
    spec: [-1, -2, -1, 0, 0, 0, 1, 2, 1],
    size: 3,
};

export const SOBEL_Y: KernelSpec = {
    spec: [-1, 0, 1, -2, 0, 2, -1, 0, 1],
    size: 3,
};

export const SHARPEN3: KernelSpec = {
    spec: [0, -1, 0, -1, 5, -1, 0, -1, 0],
    size: 3,
};

export const HIGHPASS3: KernelSpec = {
    spec: [-1, -1, -1, -1, 9, -1, -1, -1, -1],
    size: 3,
};

export const BOX_BLUR3: KernelSpec = {
    pool: POOL_MEAN,
    size: 3,
};

export const BOX_BLUR5: KernelSpec = {
    pool: POOL_MEAN,
    size: 5,
};

export const GAUSSIAN_BLUR3: KernelSpec = {
    spec: [1 / 16, 1 / 8, 1 / 16, 1 / 8, 1 / 4, 1 / 8, 1 / 16, 1 / 8, 1 / 16],
    size: 3,
};

export const GAUSSIAN_BLUR5: KernelSpec = {
    // prettier-ignore
    spec: [
        1 / 256, 1 / 64, 3 / 128, 1 / 64, 1 / 256,
        1 / 64,  1 / 16, 3 / 32,  1 / 16, 1 / 64,
        3 / 128, 3 / 32, 9 / 64,  3 / 32, 3 / 128,
        1 / 64,  1 / 16, 3 / 32,  1 / 16, 1 / 64,
        1 / 256, 1 / 64, 3 / 128, 1 / 64, 1 / 256,
    ],
    size: 5,
};

/**
 * Higher order Gaussian blur kernel for given pixel radius `r` (integer).
 * Returns {@link ConvolutionKernelSpec} with resulting kernel size of `2r+1`.
 *
 * @param r
 */
export const GAUSSIAN = (r: number): ConvolutionKernelSpec => {
    r |= 0;
    assert(r > 0, `invalid kernel radius: ${r}`);
    const sigma = -1 / (2 * (Math.hypot(r, r) / 3) ** 2);
    const res: number[] = [];
    let sum = 0;
    for (let y = -r; y <= r; y++) {
        for (let x = -r; x <= r; x++) {
            const g = Math.exp((x * x + y * y) * sigma);
            res.push(g);
            sum += g;
        }
    }
    return { spec: res.map((x) => x / sum), size: r * 2 + 1 };
};

/**
 * Higher-order Lanczos filter kernel generator for given `a` value (recommended
 * 2 or 3) and `scale` (num pixels per `a`).
 *
 * @remarks
 * https://en.wikipedia.org/wiki/Lanczos_resampling#Lanczos_kernel
 *
 * @param a
 * @param scale
 */
export const LANCZOS = (a: number, scale = 2): ConvolutionKernelSpec => {
    assert(a > 0, `invalid coefficient: ${a}`);
    const r = Math.ceil(a * scale);
    const res: number[] = [];
    let sum = 0;
    for (let y = -r; y <= r; y++) {
        const yy = y / scale;
        const ly = lanczos(a, yy);
        for (let x = -r; x <= r; x++) {
            const m = Math.hypot(x / scale, yy);
            const l = m < a ? ly * lanczos(a, x / scale) : 0;
            res.push(l);
            sum += l;
        }
    }
    return { spec: res.map((x) => x / sum), size: r * 2 + 1 };
};

export const UNSHARP_MASK5: KernelSpec = {
    // prettier-ignore
    spec: [
        -1 / 256, -1 / 64, -3 / 128, -1 / 64, -1 / 256,
        -1 / 64,  -1 / 16, -3 / 32,  -1 / 16, -1 / 64,
        -3 / 128, -3 / 32, 119 / 64, -3 / 32, -3 / 128,
        -1 / 64,  -1 / 16, -3 / 32,  -1 / 16, -1 / 64,
        -1 / 256, -1 / 64, -3 / 128, -1 / 64, -1 / 256,
    ],
    size: 5,
};
