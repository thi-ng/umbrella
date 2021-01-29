import type { FloatArray } from "@thi.ng/api";
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
    declareIndices,
    eqDelta,
    mapStridedBuffer,
    randMinMax,
    set,
    stridedValues,
} from "@thi.ng/vectors";
import type {
    Color,
    ColorFactory,
    ColorMode,
    ColorSpec,
    MaybeColor,
    ReadonlyColor,
    TypedColor,
} from "./api";
import { CONVERSIONS, convert } from "./convert";
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
    const channels = Object.keys(spec.channels);
    const numChannels = channels.length;
    const min = spec.order.map((id) =>
        id !== "alpha" ? (spec.channels[id].range || [0, 1])[0] : 1
    );
    const max = spec.order.map((id) => (spec.channels[id].range || [0, 1])[1]);

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
            set(this, src);
            return this;
        }

        eqDelta(o: $DefColor<any, any>, eps = EPS): boolean {
            return eqDelta(this, <any>o, eps);
        }

        toJSON() {
            return this.deref();
        }

        randomize(rnd?: IRandom): this {
            return <any>randMinMax(this, min, max, rnd);
        }
    };
    declareIndices($clazz.prototype, channels);
    CONVERSIONS[spec.mode] = spec.from;

    const fromColor = (src: ReadonlyColor, mode: ColorMode, xs: any[]) => {
        const res = new $clazz(...xs);
        if (mode !== spec.mode) {
            return convert(res, src, spec.mode, mode);
        }
        res.set(src);
        return res;
    };

    const factory = (src?: MaybeColor, ...xs: any[]): $DefColor<any, any> => {
        if (src == null) return <any>new $clazz();
        if (isString(src)) {
            return factory(parseCss(src), ...xs);
        } else if (isArrayLike(src)) {
            if (isString((<any>src).mode)) {
                return <any>fromColor(src, (<any>src).mode, xs);
            } else {
                return <any>new $clazz(src, ...xs);
            }
        } else if (implementsFunction(src, "deref")) {
            return <any>fromColor((<any>src).deref(), (<any>src).mode, xs);
        } else if (isNumber(src)) {
            if (
                (xs.length === numChannels - 1 ||
                    xs.length === numChannels - 2) &&
                xs.every(isNumber)
            ) {
                return <any>new $clazz(...ensureArgs([src, ...xs]));
            }
            return <any>fromColor(int32Rgb([], src), "rgb", xs);
        }
        illegalArgs(`can't create a ${spec.mode} color from: ${src}`);
    };

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
