import type { IDeref, NumericArray } from "@thi.ng/api";
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
    clamp4,
    declareIndices,
    eqDelta4,
    mapStridedBuffer,
    randMinMax,
    set4,
    stridedValues,
} from "@thi.ng/vectors";
import type {
    ChannelSpec,
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
import { intArgb32Rgb } from "./int/int-rgb";
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
    const minR = set4([], min);
    const maxR = set4([], max);
    minR[numChannels - 1] = 1;

    const $Color = class implements TypedColor<$DefColor<any, any>> {
        buf: NumericArray;
        [id: number]: number;

        constructor(buf?: NumericArray, public offset = 0, public stride = 1) {
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
            return <any>new $Color(this.deref());
        }

        copyView(): $DefColor<any, any> {
            return <any>new $Color(this.buf, this.offset, this.stride);
        }

        empty(): $DefColor<any, any> {
            return <any>new $Color();
        }

        deref() {
            return [this[0], this[1], this[2], this[3]];
        }

        set(src: ReadonlyColor) {
            return <this>set4(this, src);
        }

        clamp() {
            return <this>clamp4(null, this, min, max);
        }

        eqDelta(o: $DefColor<any, any>, eps = EPS): boolean {
            return eqDelta4(this, <any>o, eps);
        }

        toJSON() {
            return this.deref();
        }

        randomize(rnd?: IRandom): this {
            return <any>randMinMax(this, minR, maxR, rnd);
        }
    };

    declareIndices($Color.prototype, <any[]>order);
    defConversions(spec.mode, spec.from);

    const fromColor = (src: ReadonlyColor, mode: ColorMode, xs: any[]): any => {
        const res = new $Color(...xs);
        return mode !== spec.mode
            ? convert(res, src, spec.mode, mode)
            : res.set(src);
    };

    const factory = (src?: MaybeColor, ...xs: any[]): $DefColor<any, any> =>
        src == null
            ? <any>new $Color()
            : isString(src)
            ? factory(parseCss(src), ...xs)
            : isArrayLike(src)
            ? isString((<IColor>src).mode)
                ? fromColor(src, (<IColor>src).mode, xs)
                : <any>new $Color(<NumericArray>src, ...xs)
            : implementsFunction(src, "deref")
            ? fromColor((<IDeref<any>>src).deref(), (<IColor>src).mode, xs)
            : isNumber(src)
            ? xs.length && xs.every(isNumber)
                ? <any>new $Color(...ensureArgs([src, ...xs]))
                : fromColor(intArgb32Rgb([], src), "rgb", xs)
            : illegalArgs(`can't create a ${spec.mode} color from: ${src}`);

    factory.random = (
        rnd?: IRandom,
        buf?: NumericArray,
        idx?: number,
        stride?: number
    ) => <any>new $Color(buf, idx, stride).randomize(rnd);

    factory.mapBuffer = (
        buf: NumericArray,
        num = (buf.length / numChannels) | 0,
        start = 0,
        cstride = 1,
        estride = numChannels
    ) => <any[]>mapStridedBuffer($Color, buf, num, start, cstride, estride);

    return <ColorFactory<$DefColor<M, K>>>factory;
};
