import { assert, Fn, FnN, NumericArray } from "@thi.ng/api";
import { isFunction } from "@thi.ng/checks";
import type {
    ConvolutionKernelSpec,
    ConvolveOpts,
    KernelFnSpec,
    KernelSpec,
    PoolKernelSpec,
    PoolTemplate,
} from "./api";
import { FloatBuffer } from "./float";
import { FLOAT_GRAY } from "./format/float-gray";
import { asIntVec, ensureChannel, range } from "./utils";

/**
 * Convolves a single channel from given `src` float buffer with provided
 * convolution or pooling kernel with support for strided sampling (resulting in
 * smaller dimensions). Returns result as single channel buffer (in
 * {@link FLOAT_GRAY} format).
 *
 * @remarks
 * Use {@link convolveImage} to process multiple or all channels in a buffer.
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
    $kernel,
    kh2,
    kw2,
    pad,
    rowStride,
    scale,
    src,
    srcStride,
    strideX,
    strideY,
}: ReturnType<typeof initConvolve>) => {
    ensureChannel(src.format, channel);
    const maxY = src.height - kh2;
    const maxX = src.width - kw2;
    const padX = pad && strideX === 1;
    const padY = pad && strideY === 1;
    const dpix = dest.pixels;
    for (let sy = kh2, dy = padY ? kh2 : 0; sy < maxY; sy += strideY, dy++) {
        for (
            let x = kw2,
                i = sy * rowStride + x * srcStride + channel,
                j = dy * dwidth + (padX ? x : 0);
            x < maxX;
            x += strideX, i += strideX * srcStride, j++
        ) {
            dpix[j] = $kernel(i) * scale;
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
    const { kernel, channel, stride: sampleStride, pad, scale } = {
        channel: 0,
        pad: true,
        scale: 1,
        stride: 1,
        ...opts,
    };
    const size = kernel.size;
    const [kw, kh] = asIntVec(size);
    const [strideX, strideY] = asIntVec(sampleStride);
    assert(strideX >= 1 && strideY >= 1, `illegal stride: ${sampleStride}`);
    const { width, height, stride: srcStride, rowStride } = src;
    assert(
        kw >= 0 && kw <= width && kh >= 0 && kh <= height,
        `invalid kernel size: ${size}`
    );
    const kh2 = kh >> 1;
    const kw2 = kw >> 1;
    const $kernel = initKernel(src, kernel, kw, kh);
    const dwidth = destSize(width, strideX, kw, pad);
    const dheight = destSize(height, strideY, kh, pad);
    const dest = new FloatBuffer(dwidth, dheight, FLOAT_GRAY);
    return {
        channel,
        dest,
        dheight,
        dwidth,
        $kernel,
        kh2,
        kw2,
        pad,
        rowStride,
        scale,
        src,
        srcStride,
        strideX,
        strideY,
    };
};

/** @internal */
const destSize = (orig: number, res: number, k: number, pad: boolean) =>
    pad ? Math.floor(orig / res) : Math.ceil((orig - k + 1) / res);

/**
 * HOF convolution or pooling kernel code generator. Takes either a
 * {@link PoolTemplate} function or array of kernel coefficients and kernel
 * width/height. Returns optimized kernel function for use with
 * {@link convolve}.
 *
 * @remarks
 * The result function will always use unrolled loops to access pixels and hence
 * kernel sizes shouldn't be larger than ~9x9 to avoid excessive function
 * bodies. For convolution kernels, only non-zero weighted pixels will be
 * included in the result function to avoid extraneous lookups. Row & column
 * offsets are pre-calculated too.
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
    const isPool = isFunction(tpl);
    const prefix: string[] = [];
    const prefixI: string[] = [];
    const body: string[] = [];
    const kvars: string[] = [];
    const h2 = h >> 1;
    const w2 = w >> 1;
    for (let y = 0, i = 0; y < h; y++) {
        const yy = y - h2;
        const row: string[] = [];
        for (let x = 0; x < w; x++, i++) {
            const kv = `k${y}${x}`;
            kvars.push(kv);
            const xx = x - w2;
            const idx = (yy !== 0 ? `i${y}` : `i`) + (xx !== 0 ? `+x${x}` : "");
            isPool
                ? row.push(`pix[${idx}]`)
                : (<NumericArray>tpl)[i] !== 0 && row.push(`${kv}*pix[${idx}]`);
            y === 0 && xx !== 0 && prefix.push(`const x${x} = ${xx} * stride;`);
        }
        row.length && body.push(...row);
        if (yy !== 0) {
            prefix.push(`const y${y} = ${yy} * rowStride;`);
            prefixI.push(`const i${y} = i + y${y};`);
        }
    }
    const decls = isPool
        ? ""
        : `const [${kvars.join(", ")}] = [${(<NumericArray>tpl).join(", ")}];`;
    const inner = isPool ? (<PoolTemplate>tpl)(body, w, h) : body.join(" + ");
    const fnBody = [
        decls,
        "const { pixels: pix, stride, rowStride } = src;",
        ...prefix,
        "return (i) => {",
        ...prefixI,
        `return ${inner};`,
        "}",
    ].join("\n");
    return <Fn<FloatBuffer, FnN>>new Function("src", fnBody);
};

export const POOL_NEAREST: PoolTemplate = (body, w, h) =>
    body[(h >> 1) + (w >> 1)];

export const POOL_MEAN: PoolTemplate = (body, w, h) =>
    `(${body.join("+")})*${1 / (w * h)}`;

export const POOL_MIN: PoolTemplate = (body) => `Math.min(${body.join(",")})`;

export const POOL_MAX: PoolTemplate = (body) => `Math.max(${body.join(",")})`;

export const SOBEL_X: KernelSpec = {
    spec: [-1, -2, -1, 0, 0, 0, 1, 2, 1],
    size: 3,
};

export const SOBEL_Y: KernelSpec = {
    spec: [-1, 0, 1, -2, 0, 2, -1, 0, 1],
    size: 3,
};

export const SHARPEN: KernelSpec = {
    spec: [0, -1, 0, -1, 5, -1, 0, -1, 0],
    size: 3,
};

export const HIGHPASS: KernelSpec = {
    spec: [-1, -1, -1, -1, 9, -1, -1, -1, -1],
    size: 3,
};

export const BOX_BLUR3: KernelSpec = {
    pool: POOL_MEAN,
    size: 3,
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
