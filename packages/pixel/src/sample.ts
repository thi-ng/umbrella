import {
    assert,
    FloatArray,
    Fn,
    FnU2,
    IObjectOf,
    NumericArray,
} from "@thi.ng/api";
import { clamp, fmod, fract, mixBilinear, mixBicubic } from "@thi.ng/math";
import type { Filter, IPixelBuffer, Wrap } from "./api";
import type { FloatBuffer } from "./float";
import type { PackedBuffer } from "./packed";

type IntSampler = FnU2<number>;
type FloatSampler = FnU2<number, FloatArray>;

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
    const impl = (isFloat
        ? <IObjectOf<Fn<FloatBuffer, FloatSampler>>>{
              // TODO
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
              cc1: (src) => bicubicGray(src, sampleINC(src)),
              cw1: (src) => bicubicGray(src, sampleINW(src)),
              cr1: (src) => bicubicGray(src, sampleINR(src)),
              lc: (src) => bilinearABGR(src, sampleINC(src)),
              lw: (src) => bilinearABGR(src, sampleINW(src)),
              lr: (src) => bilinearABGR(src, sampleINR(src)),
              cc: (src) => bicubicABGR(src, sampleINC(src)),
              cw: (src) => bicubicABGR(src, sampleINW(src)),
              cr: (src) => bicubicABGR(src, sampleINR(src)),
          })[id];
    assert(!!impl, `missing impl for ${id}`);
    return impl(<any>src);
}

const sampleINC = ({ pixels, width, height }: PackedBuffer): IntSampler => (
    x,
    y
) =>
    x >= 0 && x < width && y >= 0 && y < height
        ? pixels[(y | 0) * width + (x | 0)]
        : 0;

const sampleINW = ({ pixels, width, height }: PackedBuffer): IntSampler => (
    x,
    y
) => pixels[fmod(y | 0, height) * width + fmod(x | 0, width)];

const sampleINR = ({ pixels, width, height }: PackedBuffer): IntSampler => {
    const w1 = width - 1;
    const h1 = height - 1;
    return (x, y) => pixels[clamp(y | 0, 0, h1) * width + clamp(x | 0, 0, w1)];
};

const bilinearGray = (sample: IntSampler): IntSampler => (x, y) => {
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

const bilinearABGR = (src: PackedBuffer, sample1: IntSampler): IntSampler => {
    const { fromABGR, toABGR } = src.format;
    return (x, y) => {
        x -= 0.5;
        y -= 0.5;
        const p1 = toABGR(sample1(x, y));
        const p2 = toABGR(sample1(x + 1, y));
        const p3 = toABGR(sample1(x, y + 1));
        const p4 = toABGR(sample1(x + 1, y + 1));
        const u = fract(x);
        const v = fract(y);
        return (
            fromABGR(
                (mixBilinear(
                    p1 >>> 24,
                    p2 >>> 24,
                    p3 >>> 24,
                    p4 >>> 24,
                    u,
                    v
                ) <<
                    24) |
                    (mixBilinear(
                        (p1 >> 16) & 0xff,
                        (p2 >> 16) & 0xff,
                        (p3 >> 16) & 0xff,
                        (p4 >> 16) & 0xff,
                        u,
                        v
                    ) <<
                        16) |
                    (mixBilinear(
                        (p1 >> 8) & 0xff,
                        (p2 >> 8) & 0xff,
                        (p3 >> 8) & 0xff,
                        (p4 >> 8) & 0xff,
                        u,
                        v
                    ) <<
                        8) |
                    mixBilinear(
                        p1 & 0xff,
                        p2 & 0xff,
                        p3 & 0xff,
                        p4 & 0xff,
                        u,
                        v
                    )
            ) >>> 0
        );
    };
};

const bicubicGray = (src: PackedBuffer, sample: IntSampler): IntSampler => {
    const max = src.format.channels[0].mask0;
    return (x, y) => {
        x -= 0.5;
        y -= 0.5;
        const x1 = x - 1;
        const x2 = x + 1;
        const x3 = x + 2;
        const y1 = y - 1;
        const y2 = y + 1;
        const y3 = y + 2;
        return clamp(
            mixBicubic(
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
            ),
            0,
            max
        );
    };
};

const mixBicubicChan = (
    buf: NumericArray,
    u: number,
    v: number,
    i: number,
    s = 4
) =>
    clamp(
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
        ),
        0,
        255
    );

const bicubicABGR = (src: PackedBuffer, sample: IntSampler): IntSampler => {
    const { fromABGR, toABGR } = src.format;
    const buf32 = new Uint32Array(16);
    const buf8 = new Uint8Array(buf32.buffer);
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
        buf32[0] = toABGR(sample(x1, y1));
        buf32[1] = toABGR(sample(x, y1));
        buf32[2] = toABGR(sample(x2, y1));
        buf32[3] = toABGR(sample(x3, y1));
        buf32[4] = toABGR(sample(x1, y));
        buf32[5] = toABGR(sample(x, y));
        buf32[6] = toABGR(sample(x2, y));
        buf32[7] = toABGR(sample(x3, y));
        buf32[8] = toABGR(sample(x1, y2));
        buf32[9] = toABGR(sample(x, y2));
        buf32[10] = toABGR(sample(x2, y2));
        buf32[11] = toABGR(sample(x3, y2));
        buf32[12] = toABGR(sample(x1, y3));
        buf32[13] = toABGR(sample(x, y3));
        buf32[14] = toABGR(sample(x2, y3));
        buf32[15] = toABGR(sample(x3, y3));
        return (
            fromABGR(
                (mixBicubicChan(buf8, u, v, 3) << 24) |
                    (mixBicubicChan(buf8, u, v, 2) << 16) |
                    (mixBicubicChan(buf8, u, v, 1) << 8) |
                    mixBicubicChan(buf8, u, v, 0)
            ) >>> 0
        );
    };
};
