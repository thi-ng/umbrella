import { assert, Fn, FnN, NumericArray } from "@thi.ng/api";
import { isFunction, isNumber } from "@thi.ng/checks";
import type { ConvolveOpts, KernelSpec } from "./api";
import { FloatBuffer } from "./float";
import { FLOAT_GRAY } from "./format/float-gray";
import { ensureChannel } from "./utils";

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
        scale: 1,
        pad: true,
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
    const $kernel = (isFunction(kernel.spec)
        ? kernel.spec
        : defKernel(kernel.spec, kw, kh))(src);
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

/**
 * HOF convolution kernel factory. Takes kernel coefficients and width/height,
 * returns optimized kernel function for use with {@link convolve}.
 *
 * @param coeffs
 * @param w
 * @param h
 */
export const defKernel = (coeffs: NumericArray, w: number, h: number) => {
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
            const idx =
                (yy !== 0 ? `i${y}` : `i`) + (xx !== 0 ? ` + x${x}` : "");
            coeffs[i] !== 0 && row.push(`${kv} * pix[${idx}]`);
            y === 0 && xx !== 0 && prefix.push(`const x${x} = ${xx} * stride;`);
        }
        row.length && body.push(row.join(" + "));
        if (yy !== 0) {
            prefix.push(`const y${y} = ${yy} * rowStride;`);
            prefixI.push(`const i${y} = i + y${y};`);
        }
    }
    const fnBody = `const { pixels: pix, stride, rowStride } = src;
const [${kvars.join(", ")}] = [${coeffs.join(", ")}];
${prefix.join("\n")}
return (i) => {
${prefixI.join("\n")}
return ${body.join(" + ")};
};`;
    // console.log(fnBody);
    return <Fn<FloatBuffer, FnN>>new Function("src", fnBody);
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

export const HIGHPASS: KernelSpec = {
    spec: [-1, -1, -1, -1, 9, -1, -1, -1, -1],
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
