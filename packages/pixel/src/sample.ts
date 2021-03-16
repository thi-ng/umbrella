import { assert, FloatArray, Fn, FnU2, IObjectOf } from "@thi.ng/api";
import { clamp, fmod, fract, mixBilinear } from "@thi.ng/math";
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
              //   "nearest-clamp": sampleFloatNC,
              //   "linear-clamp": sampleFloatNC,
          }
        : <IObjectOf<Fn<PackedBuffer, IntSampler>>>{
              nc1: sampleIntNC1,
              nw1: sampleIntNW1,
              nr1: sampleIntNR1,
              nc: sampleIntNC1,
              nw: sampleIntNW1,
              nr: sampleIntNR1,
              lc1: (src) => bilinearGray(sampleIntNC1(src)),
              lw1: (src) => bilinearGray(sampleIntNW1(src)),
              lr1: (src) => bilinearGray(sampleIntNR1(src)),
              lc: (src) => bilinearABGR(src, sampleIntNC1(src)),
              lw: (src) => bilinearABGR(src, sampleIntNW1(src)),
              lr: (src) => bilinearABGR(src, sampleIntNR1(src)),
          })[id];
    assert(!!impl, `missing impl for ${id}`);
    return impl(<any>src);
}

const sampleIntNC1 = ({ pixels, width, height }: PackedBuffer): IntSampler => (
    x,
    y
) =>
    x >= 0 && x < width && y >= 0 && y < height
        ? pixels[(y | 0) * width + (x | 0)]
        : 0;

const sampleIntNW1 = ({ pixels, width, height }: PackedBuffer): IntSampler => (
    x,
    y
) => pixels[fmod(y | 0, height) * width + fmod(x | 0, width)];

const sampleIntNR1 = ({ pixels, width, height }: PackedBuffer): IntSampler => {
    const w1 = width - 1;
    const h1 = height - 1;
    return (x, y) => pixels[clamp(y | 0, 0, h1) * width + clamp(x | 0, 0, w1)];
};

const bilinearGray = (sample: IntSampler): IntSampler => (x, y) =>
    mixBilinear(
        sample(x, y),
        sample(x + 1, y),
        sample(x, y + 1),
        sample(x + 1, y + 1),
        fract(x),
        fract(y)
    );

const bilinearABGR = (src: PackedBuffer, sample1: IntSampler): IntSampler => {
    const { fromABGR, toABGR } = src.format;
    return (x, y) => {
        const p1 = toABGR(sample1(x, y));
        const p2 = toABGR(sample1(x + 1, y));
        const p3 = toABGR(sample1(x, y + 1));
        const p4 = toABGR(sample1(x + 1, y + 1));
        const u = fract(x);
        const v = fract(y);
        return fromABGR(
            (mixBilinear(p1 >>> 24, p2 >>> 24, p3 >>> 24, p4 >>> 24, u, v) <<
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
                mixBilinear(p1 & 0xff, p2 & 0xff, p3 & 0xff, p4 & 0xff, u, v)
        );
    };
};
