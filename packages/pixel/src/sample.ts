import type { Fn, IObjectOf, NumericArray } from "@thi.ng/api";
import { assert } from "@thi.ng/errors/assert";
import { clamp } from "@thi.ng/math/interval";
import { mixBicubic, mixBilinear } from "@thi.ng/math/mix";
import { fract, mod } from "@thi.ng/math/prec";
import type {
    Filter,
    FloatSampler,
    IntSampler,
    IPixelBuffer,
    Wrap,
} from "./api";
import type { FloatBuffer } from "./float";
import type { PackedBuffer } from "./packed";

export function defSampler(
    src: PackedBuffer,
    filter?: Filter,
    wrap?: Wrap
): IntSampler;
export function defSampler(
    src: FloatBuffer,
    filter?: Filter,
    wrap?: Wrap
): FloatSampler;
export function defSampler(
    src: IPixelBuffer,
    filter: Filter = "linear",
    wrap: Wrap = "clamp"
) {
    const isFloat = !!(<any>src.format).__float;
    const suffix = (<any>src.format).channels.length === 1 ? "1" : "";
    const id = `${filter[0]}${wrap[0]}${suffix}`;
    const impl = (
        isFloat
            ? <IObjectOf<Fn<FloatBuffer, FloatSampler>>>{
                  nc1: sampleFNC,
                  nw1: sampleFNW,
                  nr1: sampleFNR,
                  nc: sampleFNC,
                  nw: sampleFNW,
                  nr: sampleFNR,
                  lc1: (src) => bilinearGrayF(sampleINC(src)),
                  lw1: (src) => bilinearGrayF(sampleINW(src)),
                  lr1: (src) => bilinearGrayF(sampleINR(src)),
                  lc: (src) => bilinearFloat(src, sampleFNC(src)),
                  lw: (src) => bilinearFloat(src, sampleFNW(src)),
                  lr: (src) => bilinearFloat(src, sampleFNR(src)),
                  cc1: (src) => bicubicGrayF(sampleINC(src)),
                  cw1: (src) => bicubicGrayF(sampleINW(src)),
                  cr1: (src) => bicubicGrayF(sampleINR(src)),
                  cc: (src) => bicubicFloat(src, sampleFNC(src)),
                  cw: (src) => bicubicFloat(src, sampleFNW(src)),
                  cr: (src) => bicubicFloat(src, sampleFNR(src)),
              }
            : <IObjectOf<Fn<PackedBuffer, IntSampler>>>{
                  nc1: sampleINC,
                  nw1: sampleINW,
                  nr1: sampleINR,
                  nc: sampleINC,
                  nw: sampleINW,
                  nr: sampleINR,
                  lc1: (src) => bilinearGray(sampleINC(src)),
                  lw1: (src) => bilinearGray(sampleINW(src)),
                  lr1: (src) => bilinearGray(sampleINR(src)),
                  lc: (src) => bilinearABGR(src, sampleINC(src)),
                  lw: (src) => bilinearABGR(src, sampleINW(src)),
                  lr: (src) => bilinearABGR(src, sampleINR(src)),
                  cc1: (src) => bicubicGrayI(src, sampleINC(src)),
                  cw1: (src) => bicubicGrayI(src, sampleINW(src)),
                  cr1: (src) => bicubicGrayI(src, sampleINR(src)),
                  cc: (src) => bicubicABGR(src, sampleINC(src)),
                  cw: (src) => bicubicABGR(src, sampleINW(src)),
                  cr: (src) => bicubicABGR(src, sampleINR(src)),
              }
    )[id];
    assert(!!impl, `missing impl for ${id}`);
    return impl(<any>src);
}

const sampleINC =
    ({ pixels, width, height }: IPixelBuffer): IntSampler =>
    (x, y) =>
        x >= 0 && x < width && y >= 0 && y < height
            ? pixels[(y | 0) * width + (x | 0)]
            : 0;

const sampleINW =
    ({ pixels, width, height }: IPixelBuffer): IntSampler =>
    (x, y) =>
        pixels[mod(y | 0, height) * width + mod(x | 0, width)];

const sampleINR = ({ pixels, width, height }: IPixelBuffer): IntSampler => {
    const w1 = width - 1;
    const h1 = height - 1;
    return (x, y) => pixels[clamp(y | 0, 0, h1) * width + clamp(x | 0, 0, w1)];
};

const sampleFNC =
    ({ pixels, width, height, rowStride, stride }: FloatBuffer): FloatSampler =>
    (x, y) => {
        let i: number;
        return x >= 0 && x < width && y >= 0 && y < height
            ? ((i = (y | 0) * rowStride + (x | 0) * stride),
              pixels.slice(i, i + stride))
            : [0];
    };

const sampleFNW =
    ({ pixels, width, height, rowStride, stride }: FloatBuffer): FloatSampler =>
    (x, y) => {
        let i = mod(y | 0, height) * rowStride + mod(x | 0, width) * stride;
        return pixels.slice(i, i + stride);
    };

const sampleFNR = ({
    pixels,
    width,
    height,
    rowStride,
    stride,
}: FloatBuffer): FloatSampler => {
    const w1 = width - 1;
    const h1 = height - 1;
    return (x, y) => {
        let i = clamp(y | 0, 0, h1) * rowStride + clamp(x | 0, 0, w1) * stride;
        return pixels.slice(i, i + stride);
    };
};

const mixBilinearChan = (
    buf: NumericArray,
    u: number,
    v: number,
    i: number,
    s = 4
) => mixBilinear(buf[i], buf[i + s], buf[i + 2 * s], buf[i + 3 * s], u, v);

const bilinearGray =
    (sample: IntSampler): IntSampler =>
    (x, y) => {
        x -= 0.5;
        y -= 0.5;
        return mixBilinear(
            sample(x, y),
            sample(x + 1, y),
            sample(x, y + 1),
            sample(x + 1, y + 1),
            fract(x),
            fract(y)
        );
    };

const bilinearGrayF = (sample: IntSampler): FloatSampler => {
    sample = bilinearGray(sample);
    return (x, y) => [sample(x, y)];
};

const bilinearABGR = (src: PackedBuffer, sample1: IntSampler): IntSampler => {
    const { fromABGR, toABGR } = src.format;
    const u32 = new Uint32Array(4);
    const u8 = new Uint8Array(u32.buffer);
    return (x, y) => {
        x -= 0.5;
        y -= 0.5;
        u32[0] = toABGR(sample1(x, y));
        u32[1] = toABGR(sample1(x + 1, y));
        u32[2] = toABGR(sample1(x, y + 1));
        u32[3] = toABGR(sample1(x + 1, y + 1));
        const u = fract(x);
        const v = fract(y);
        return (
            fromABGR(
                mixBilinearChan(u8, u, v, 0) |
                    (mixBilinearChan(u8, u, v, 1) << 8) |
                    (mixBilinearChan(u8, u, v, 2) << 16) |
                    (mixBilinearChan(u8, u, v, 3) << 24)
            ) >>> 0
        );
    };
};

const bilinearFloat = (
    { stride }: FloatBuffer,
    sample1: FloatSampler
): FloatSampler => {
    const f32 = new Float32Array(stride * 4);
    return (x, y) => {
        x -= 0.5;
        y -= 0.5;
        f32.set(sample1(x, y), 0);
        f32.set(sample1(x + 1, y), stride);
        f32.set(sample1(x, y + 1), stride * 2);
        f32.set(sample1(x + 1, y + 1), stride * 3);
        const u = fract(x);
        const v = fract(y);
        let res = [];
        for (let i = 0; i < stride; i++) {
            res.push(mixBilinearChan(f32, u, v, i, stride));
        }
        return res;
    };
};

const bicubicGray =
    (sample: IntSampler): IntSampler =>
    (x, y) => {
        x -= 0.5;
        y -= 0.5;
        const x1 = x - 1;
        const x2 = x + 1;
        const x3 = x + 2;
        const y1 = y - 1;
        const y2 = y + 1;
        const y3 = y + 2;
        return mixBicubic(
            sample(x1, y1),
            sample(x, y1),
            sample(x2, y1),
            sample(x3, y1),
            sample(x1, y),
            sample(x, y),
            sample(x2, y),
            sample(x3, y),
            sample(x1, y2),
            sample(x, y2),
            sample(x2, y2),
            sample(x3, y2),
            sample(x1, y3),
            sample(x, y3),
            sample(x2, y3),
            sample(x3, y3),
            fract(x),
            fract(y)
        );
    };

const bicubicGrayI = (src: PackedBuffer, sample: IntSampler): IntSampler => {
    const max = src.format.channels[0].mask0;
    sample = bicubicGray(sample);
    return (x, y) => clamp(sample(x, y), 0, max);
};

const bicubicGrayF = (sample: IntSampler): FloatSampler => {
    sample = bicubicGray(sample);
    return (x, y) => [sample(x, y)];
};

const mixBicubicChan = (
    buf: NumericArray,
    u: number,
    v: number,
    i: number,
    s = 4
) =>
    mixBicubic(
        buf[i],
        buf[i + s],
        buf[i + 2 * s],
        buf[i + 3 * s],
        buf[i + 4 * s],
        buf[i + 5 * s],
        buf[i + 6 * s],
        buf[i + 7 * s],
        buf[i + 8 * s],
        buf[i + 9 * s],
        buf[i + 10 * s],
        buf[i + 11 * s],
        buf[i + 12 * s],
        buf[i + 13 * s],
        buf[i + 14 * s],
        buf[i + 15 * s],
        u,
        v
    );

const mixBicubicChanClamped = (
    buf: NumericArray,
    u: number,
    v: number,
    i: number,
    s = 4
) => clamp(mixBicubicChan(buf, u, v, i, s), 0, 255);

const bicubicABGR = (src: PackedBuffer, sample: IntSampler): IntSampler => {
    const { fromABGR, toABGR } = src.format;
    const u32 = new Uint32Array(16);
    const u8 = new Uint8Array(u32.buffer);
    return (x, y) => {
        x -= 0.5;
        y -= 0.5;
        const x1 = x - 1;
        const x2 = x + 1;
        const x3 = x + 2;
        const y1 = y - 1;
        const y2 = y + 1;
        const y3 = y + 2;
        const u = fract(x);
        const v = fract(y);
        u32[0] = toABGR(sample(x1, y1));
        u32[1] = toABGR(sample(x, y1));
        u32[2] = toABGR(sample(x2, y1));
        u32[3] = toABGR(sample(x3, y1));
        u32[4] = toABGR(sample(x1, y));
        u32[5] = toABGR(sample(x, y));
        u32[6] = toABGR(sample(x2, y));
        u32[7] = toABGR(sample(x3, y));
        u32[8] = toABGR(sample(x1, y2));
        u32[9] = toABGR(sample(x, y2));
        u32[10] = toABGR(sample(x2, y2));
        u32[11] = toABGR(sample(x3, y2));
        u32[12] = toABGR(sample(x1, y3));
        u32[13] = toABGR(sample(x, y3));
        u32[14] = toABGR(sample(x2, y3));
        u32[15] = toABGR(sample(x3, y3));
        return (
            fromABGR(
                mixBicubicChanClamped(u8, u, v, 0) |
                    (mixBicubicChanClamped(u8, u, v, 1) << 8) |
                    (mixBicubicChanClamped(u8, u, v, 2) << 16) |
                    (mixBicubicChanClamped(u8, u, v, 3) << 24)
            ) >>> 0
        );
    };
};

const bicubicFloat = (
    { stride }: FloatBuffer,
    sample: FloatSampler
): FloatSampler => {
    const f32 = new Float32Array(stride * 16);
    return (x, y) => {
        x -= 0.5;
        y -= 0.5;
        const x1 = x - 1;
        const x2 = x + 1;
        const x3 = x + 2;
        const y1 = y - 1;
        const y2 = y + 1;
        const y3 = y + 2;
        const u = fract(x);
        const v = fract(y);
        f32.set(sample(x1, y1), 0);
        f32.set(sample(x, y1), stride);
        f32.set(sample(x2, y1), 2 * stride);
        f32.set(sample(x3, y1), 3 * stride);
        f32.set(sample(x1, y), 4 * stride);
        f32.set(sample(x, y), 5 * stride);
        f32.set(sample(x2, y), 6 * stride);
        f32.set(sample(x3, y), 7 * stride);
        f32.set(sample(x1, y2), 8 * stride);
        f32.set(sample(x, y2), 9 * stride);
        f32.set(sample(x2, y2), 10 * stride);
        f32.set(sample(x3, y2), 11 * stride);
        f32.set(sample(x1, y3), 12 * stride);
        f32.set(sample(x, y3), 13 * stride);
        f32.set(sample(x2, y3), 14 * stride);
        f32.set(sample(x3, y3), 15 * stride);
        let res = [];
        for (let i = 0; i < stride; i++) {
            res.push(mixBicubicChan(f32, u, v, i, stride));
        }
        return res;
    };
};
