import { assert, Fn, Fn2, FnN, IObjectOf, NumericArray } from "@thi.ng/api";
import { isFunction, isNumber } from "@thi.ng/checks";
import { FloatBuffer } from "./float";
import { FLOAT_GRAY } from "./format/float-gray";
import { ensureChannel } from "./utils";

export interface KernelSpec {
    /**
     * Kernel coefficients or factory function.
     */
    spec: NumericArray | Fn<FloatBuffer, FnN>;
    /**
     * Kernel size. If given as number, expands to `[size, size]`.
     */
    size: number | [number, number];
}

export interface ConvolveOpts {
    /**
     * Convolution kernel details/implementation.
     */
    kernel: KernelSpec;
    /**
     * Channel ID to convolve.
     *
     * @defaultValue 0
     */
    channel?: number;
    /**
     * If true, the result image will be same size as source image with empty
     * (padded) border pixels.
     *
     * @defaultValue true
     */
    pad?: boolean;
    /**
     * Result scale factor
     *
     * @defaultValue 1
     */
    scale?: number;
}

/**
 * Convolves a single channel from given `src` float buffer with provided
 * kernel. Returns result as single channel buffer (in {@link FLOAT_GRAY}
 * format).
 *
 * @param src
 * @param opts
 */
export const convolve = (src: FloatBuffer, opts: ConvolveOpts) => {
    const { kernel, channel, pad, scale } = {
        channel: 0,
        pad: true,
        scale: 1,
        ...opts,
    };
    ensureChannel(src.format, channel);
    const size = kernel.size;
    const [kw, kh] = isNumber(size) ? [size, size] : size;
    const { width, height, stride, rowStride } = src;
    assert(
        kw >= 0 && kw <= width && kh >= 0 && kh <= height,
        `invalid kernel size: ${size}`
    );
    const dwidth = pad ? width : width - kw + 1;
    const dheight = pad ? height : height - kh + 1;
    const dest = new FloatBuffer(dwidth, dheight, FLOAT_GRAY);
    const dpix = dest.pixels;
    let $kernel: FnN;
    if (isFunction(kernel.spec)) {
        $kernel = kernel.spec(src);
    } else {
        const k = FLOAT_KERNELS[`${kw}-${kh}`];
        assert(!!k, `missing impl for given kernel size: ${size}`);
        $kernel = k(src, kernel.spec);
    }
    const kh2 = kh >> 1;
    const kw2 = kw >> 1;
    const maxY = height - kh2;
    const maxX = width - kw2;
    for (let y = kh2; y < maxY; y++) {
        for (
            let x = kw2,
                i = y * rowStride + x * stride + channel,
                j = pad ? y * dwidth + x : (y - kh2) * dwidth;
            x < maxX;
            x++, i += stride, j++
        ) {
            dpix[j] = $kernel(i) * scale;
        }
    }
    return dest;
};

const FLOAT_KERNELS: IObjectOf<Fn2<FloatBuffer, NumericArray, FnN>> = {
    "3-3": (src, [a, b, c, d, e, f, g, h, i]) => {
        const { pixels: pix, stride, rowStride } = src;
        const y1 = rowStride + stride;
        const y2 = rowStride - stride;
        return (idx) =>
            a * pix[idx - y1] +
            b * pix[idx - rowStride] +
            c * pix[idx - y2] +
            d * pix[idx - stride] +
            e * pix[idx] +
            f * pix[idx + stride] +
            g * pix[idx + y2] +
            h * pix[idx + rowStride] +
            i * pix[idx + y1];
    },
};

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

export const BOX_BLUR3: KernelSpec = {
    spec: [1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9],
    size: 3,
};

export const GAUSSIAN_BLUR3: KernelSpec = {
    spec: [1 / 16, 1 / 8, 1 / 16, 1 / 8, 1 / 4, 1 / 8, 1 / 16, 1 / 8, 1 / 16],
    size: 3,
};
