import type { ArrayLikeIterable, Fn, NumericArray } from "@thi.ng/api";
import { implementsFunction } from "@thi.ng/checks/implements-function";
import { isArrayLike } from "@thi.ng/checks/is-arraylike";
import { isNumber } from "@thi.ng/checks/is-number";
import { isString } from "@thi.ng/checks/is-string";
import { illegalArgs } from "@thi.ng/errors/illegal-arguments";
import type { IRandom } from "@thi.ng/random";
import { SYSTEM } from "@thi.ng/random/system";
import { mapStridedBuffer } from "@thi.ng/vectors/buffer";
import { declareIndex } from "@thi.ng/vectors/compile/accessors";
import { eqDelta4 } from "@thi.ng/vectors/eqdelta";
import type {
    ColorFactory,
    ColorMode,
    IColor,
    MaybeColor,
    ReadonlyColor,
    TypedColor,
} from "../api";
import { parseCss } from "../css/parse-css";
import { __scale8bit } from "../internal/scale";
import { srgb } from "../srgb/srgb";
import { srgbIntAbgr32, srgbIntArgb32 } from "../srgb/srgb-int";
import { intArgb32Srgb } from "./int-srgb";

export abstract class Int32<T extends TypedColor<T>> implements TypedColor<T> {
    buf: NumericArray;
    value!: number;
    [id: number]: number;

    constructor(buf?: NumericArray, public offset = 0, public stride = 1) {
        this.buf = buf || [0];
    }

    abstract get mode(): ColorMode;

    abstract copy(): T;

    abstract copyView(): T;

    abstract empty(): T;

    eqDelta(o: T, eps?: number): boolean {
        return eqDelta4(
            // channel order irrelevant here...
            intArgb32Srgb([], this[0]),
            intArgb32Srgb([], o[0]),
            eps
        );
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

    set alpha(x: number) {
        this[0] = (this[0] & 0xffffff) | __scale8bit(x, 24);
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

export class ARGB extends Int32<ARGB> implements TypedColor<ARGB> {
    [id: number]: number;

    get mode(): ColorMode {
        return "argb32";
    }

    get r() {
        return ((this[0] >> 16) & 0xff) / 255;
    }

    set r(x: number) {
        this[0] = (this[0] & 0xff00ffff) | __scale8bit(x, 16);
    }

    get g() {
        return ((this[0] >> 8) & 0xff) / 255;
    }

    set g(x: number) {
        this[0] = (this[0] & 0xffff00ff) | __scale8bit(x, 8);
    }

    get b() {
        return (this[0] & 0xff) / 255;
    }

    set b(x: number) {
        this[0] = (this[0] & 0xffffff00) | __scale8bit(x);
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
}

declareIndex(ARGB.prototype, "value", 0);

export class ABGR extends Int32<ABGR> implements TypedColor<ABGR> {
    [id: number]: number;

    get mode(): ColorMode {
        return "abgr32";
    }

    get r() {
        return (this[0] & 0xff) / 255;
    }

    set r(x: number) {
        this[0] = (this[0] & 0xffffff00) | __scale8bit(x);
    }

    get g() {
        return ((this[0] >> 8) & 0xff) / 255;
    }

    set g(x: number) {
        this[0] = (this[0] & 0xffff00ff) | __scale8bit(x, 8);
    }

    get b() {
        return ((this[0] >> 16) & 0xff) / 255;
    }

    set b(x: number) {
        this[0] = (this[0] & 0xff00ffff) | __scale8bit(x, 16);
    }

    copy() {
        return new ABGR([this[0]]);
    }

    copyView() {
        return new ABGR(this.buf, this.offset, this.stride);
    }

    empty() {
        return new ABGR();
    }
}

declareIndex(ABGR.prototype, "value", 0);

interface Int32Constructor<T> {
    new (buf?: NumericArray, offset?: number, stride?: number): T;
}

const defInt = <T extends Int32<T>>(
    ctor: Int32Constructor<T>,
    fromSrgb: Fn<ReadonlyColor, number>
): ColorFactory<T> => {
    const factory = (src?: MaybeColor, ...xs: any[]): any =>
        src == null
            ? new ctor()
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

    factory.class = <any>ctor;

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
    ) => mapStridedBuffer(ctor, buf, num, start, cstride, estride);

    return factory;
};

export const argb32 = defInt(ARGB, srgbIntArgb32);

export const abgr32 = defInt(ABGR, srgbIntAbgr32);
