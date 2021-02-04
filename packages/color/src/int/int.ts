import type { ArrayLikeIterable, Fn, NumericArray } from "@thi.ng/api";
import {
    implementsFunction,
    isArrayLike,
    isNumber,
    isString,
} from "@thi.ng/checks";
import { illegalArgs } from "@thi.ng/errors";
import { clamp01 } from "@thi.ng/math";
import { IRandom, SYSTEM } from "@thi.ng/random";
import { declareIndex, eqDelta4, mapStridedBuffer } from "@thi.ng/vectors";
import type {
    ColorFactory,
    ColorMode,
    IColor,
    MaybeColor,
    ReadonlyColor,
    TypedColor,
} from "../api";
import { parseCss } from "../css/parse-css";
import { srgb } from "../srgb/srgb";
import { srgbIntAbgr32, srgbIntArgb32 } from "../srgb/srgb-int";
import { intAbgr32Srgb, intArgb32Srgb } from "./int-srgb";

export abstract class Int32 {
    buf: NumericArray;
    value!: number;
    [id: number]: number;

    constructor(buf?: NumericArray, public offset = 0, public stride = 1) {
        this.buf = buf || [0];
    }

    get length() {
        return 1;
    }

    get range(): [ReadonlyColor, ReadonlyColor] {
        return [[0], [0xffffffff]];
    }

    get alpha() {
        return (this[0] >>> 24) / 255;
    }

    set alpha(a: number) {
        this[0] = (this[0] & 0xffffff) | ((clamp01(a) * 0xff + 0.5) << 24);
    }

    *[Symbol.iterator]() {
        yield this[0];
    }

    deref() {
        return [this[0]];
    }

    randomize(rnd: IRandom = SYSTEM): this {
        const x = this[0];
        this[0] = (x & 0xff000000) | (rnd.int() & 0xffffff);
        return this;
    }

    clamp() {
        return this;
    }

    set(src: ArrayLikeIterable<number>) {
        this[0] = src[0];
        return this;
    }

    toJSON(): number[] {
        return [this[0]];
    }
}

export class ARGB extends Int32 implements TypedColor<ARGB> {
    argb!: number;
    [id: number]: number;

    get mode(): ColorMode {
        return "argb32";
    }

    copy(): ARGB {
        return new ARGB([this[0]]);
    }

    copyView(): ARGB {
        return new ARGB(this.buf, this.offset, this.stride);
    }

    empty(): ARGB {
        return new ARGB();
    }

    eqDelta(o: ARGB, eps = 0): boolean {
        return eqDelta4(
            intArgb32Srgb([], this[0]),
            intArgb32Srgb([], o[0]),
            eps
        );
    }
}

declareIndex(ARGB.prototype, "value", 0);

export class ABGR extends Int32 implements TypedColor<ARGB> {
    argb!: number;
    [id: number]: number;

    get mode(): ColorMode {
        return "abgr32";
    }

    copy(): ABGR {
        return new ABGR([this[0]]);
    }

    copyView(): ABGR {
        return new ABGR(this.buf, this.offset, this.stride);
    }

    empty(): ABGR {
        return new ABGR();
    }

    eqDelta(o: ABGR, eps = 0): boolean {
        return eqDelta4(
            intAbgr32Srgb([], this[0]),
            intAbgr32Srgb([], o[0]),
            eps
        );
    }
}

declareIndex(ABGR.prototype, "value", 0);

interface Int32Constructor<T> {
    new (buf?: NumericArray, offset?: number, stride?: number): T;
}

const defInt = <T extends Int32>(
    ctor: Int32Constructor<T>,
    fromSrgb: Fn<ReadonlyColor, number>
): ColorFactory<ARGB> => {
    const factory = (src?: MaybeColor, ...xs: any[]): any =>
        src == null
            ? new ARGB()
            : isNumber(src)
            ? xs.length && xs.every(isNumber)
                ? new ctor([srgbIntArgb32([src, ...xs])])
                : new ctor([src], ...xs)
            : isString(src)
            ? factory(parseCss(src))
            : isArrayLike(src)
            ? isString((<IColor>src).mode)
                ? new ctor([fromSrgb(srgb(src))], ...xs)
                : new ctor(<NumericArray>src, ...xs)
            : implementsFunction(src, "deref")
            ? new ctor([fromSrgb(srgb(src))], ...xs)
            : illegalArgs(`can't create a ARGB32 color from: ${src}`);

    factory.range = <[ReadonlyColor, ReadonlyColor]>[[0], [0xffffffff]];

    factory.random = (
        rnd: IRandom = SYSTEM,
        buf?: NumericArray,
        idx?: number,
        stride?: number
    ) =>
        <any>(
            new ctor(buf, idx, stride).set([
                (rnd.int() & 0xffffff) | 0xff000000,
            ])
        );

    factory.mapBuffer = (
        buf: NumericArray,
        num = buf.length,
        start = 0,
        cstride = 1,
        estride = 1
    ) => mapStridedBuffer(ARGB, buf, num, start, cstride, estride);

    return factory;
};

export const argb32 = defInt(ARGB, srgbIntArgb32);

export const abgr32 = defInt(ABGR, srgbIntAbgr32);
