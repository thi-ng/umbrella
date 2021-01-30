import type { FloatArray, IDeref } from "@thi.ng/api";
import {
    implementsFunction,
    isArrayLike,
    isNumber,
    isString,
} from "@thi.ng/checks";
import { illegalArgs } from "@thi.ng/errors";
import { EPS } from "@thi.ng/math";
import type { IRandom } from "@thi.ng/random";
import {
    clamp,
    declareIndices,
    eqDelta,
    mapStridedBuffer,
    randMinMax,
    set,
    stridedValues,
} from "@thi.ng/vectors";
import type {
    ChannelSpec,
    Color,
    ColorFactory,
    ColorMode,
    ColorSpec,
    IColor,
    MaybeColor,
    ReadonlyColor,
    TypedColor,
} from "./api";
import { convert, defConversions } from "./convert";
import { parseCss } from "./css/parse-css";
import { int32Rgb } from "./int/int-rgba";
import { ensureArgs } from "./internal/ensure-args";

type $DefColor<M extends ColorMode, K extends string> = {
    [k in K]: number;
} & {
    readonly mode: M;
    random(rnd?: IRandom): $DefColor<M, K>;
    set(src: ReadonlyColor): $DefColor<M, K>;
    toJSON(): number[];
} & TypedColor<$DefColor<M, K>>;

export const defColor = <M extends ColorMode, K extends string>(
    spec: ColorSpec<M, K>
) => {
    const channels: Partial<Record<K, ChannelSpec>> = spec.channels || {};
    const order = spec.order;
    const numChannels = order.length;
    order.reduce((acc, id) => {
        acc[id] = {
            range: [0, 1],
            ...channels[id],
        };
        return acc;
    }, channels);
    const min = order.map((id) => channels[id]!.range![0]);
    const max = order.map((id) => channels[id]!.range![1]);
    // fix alpha channel for randomize()
    const minR = set([], min);
    const maxR = set([], max);
    minR[numChannels - 1] = 1;

    const $clazz = class implements TypedColor<$DefColor<any, any>> {
        buf: Color;
        offset: number;
        stride: number;
        [id: number]: number;

        constructor(buf?: Color, offset = 0, stride = 1) {
            this.buf = buf || [0, 0, 0, 0];
            this.offset = offset;
            this.stride = stride;
        }

        get mode() {
            return spec.mode;
        }

        get length() {
            return numChannels;
        }

        [Symbol.iterator]() {
            return stridedValues(
                this.buf,
                this.length,
                this.offset,
                this.stride
            );
        }

        copy(): $DefColor<any, any> {
            return <any>new $clazz(this.deref());
        }

        copyView(): $DefColor<any, any> {
            return <any>new $clazz(this.buf, this.offset, this.stride);
        }

        empty(): $DefColor<any, any> {
            return <any>new $clazz();
        }

        deref() {
            return [this[0], this[1], this[2], this[3]];
        }

        set(src: ReadonlyColor) {
            return <this>set(this, src);
        }

        clamp() {
            return <this>clamp(null, this, min, max);
        }

        eqDelta(o: $DefColor<any, any>, eps = EPS): boolean {
            return eqDelta(this, <any>o, eps);
        }

        toJSON() {
            return this.deref();
        }

        randomize(rnd?: IRandom): this {
            return <any>randMinMax(this, minR, maxR, rnd);
        }
    };

    declareIndices($clazz.prototype, <any[]>order);
    defConversions(spec);

    const fromColor = (src: ReadonlyColor, mode: ColorMode, xs: any[]): any => {
        const res = new $clazz(...xs);
        return mode !== spec.mode
            ? convert(res, src, spec.mode, mode)
            : res.set(src);
    };

    const factory = (src?: MaybeColor, ...xs: any[]): $DefColor<any, any> =>
        src == null
            ? <any>new $clazz()
            : isString(src)
            ? factory(parseCss(src), ...xs)
            : isArrayLike(src)
            ? isString((<IColor>src).mode)
                ? fromColor(src, (<IColor>src).mode, xs)
                : <any>new $clazz(src, ...xs)
            : implementsFunction(src, "deref")
            ? fromColor((<IDeref<any>>src).deref(), (<IColor>src).mode, xs)
            : isNumber(src)
            ? xs.length && xs.every(isNumber)
                ? <any>new $clazz(...ensureArgs([src, ...xs]))
                : fromColor(int32Rgb([], src), "rgb", xs)
            : illegalArgs(`can't create a ${spec.mode} color from: ${src}`);

    factory.random = (
        rnd?: IRandom,
        buf?: Color,
        idx?: number,
        stride?: number
    ) => <any>new $clazz(buf, idx, stride).randomize(rnd);

    factory.mapBuffer = (
        buf: FloatArray,
        num = (buf.length / numChannels) | 0,
        start = 0,
        cstride = 1,
        estride = numChannels
    ) => <any[]>mapStridedBuffer($clazz, buf, num, start, cstride, estride);

    return <ColorFactory<$DefColor<M, K>>>factory;
};
