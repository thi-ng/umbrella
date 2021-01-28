import type { IDeref } from "@thi.ng/api";
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
    IVector,
    randMinMax,
    stridedValues,
} from "@thi.ng/vectors";
import type {
    Color,
    ColorFactory,
    ColorMode,
    ColorSpec,
    IColor,
    ReadonlyColor,
} from "./api";
import { CONVERSIONS, convert } from "./convert";
import { int32Rgb } from "./int/int-rgba";
import { ensureArgs } from "./internal/ensure-args";
import { parseCss } from "./css/parse-css";

type $DefColor<M extends ColorMode, K extends string> = {
    [k in K]: number;
} & {
    readonly mode: M;
    set(src: ReadonlyColor): $DefColor<M, K>;
    toJSON(): number[];
} & IColor &
    IDeref<Color> &
    IVector<$DefColor<M, K>>;

export const defColor = <M extends ColorMode, K extends string>(
    spec: ColorSpec<M, K>
) => {
    const channels = Object.keys(spec.channels);
    const numChannels = channels.length;
    const $clazz = class
        implements IColor, IVector<$DefColor<any, any>>, IDeref<Color> {
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

        deref(): Color {
            return [this[0], this[1], this[2], this[3]];
        }

        set(src: ReadonlyColor) {
            this[0] = src[0];
            this[1] = src[1];
            this[2] = src[2];
            this[3] = src[3];
            return this;
        }

        eqDelta(o: $DefColor<any, any>, eps = EPS): boolean {
            return eqDelta(this, <any>o, eps);
        }

        /**
         * For memory mapped colors, this ensures only the elements used by this
         * color are being serialized (as array) by `JSON.stringify()`.
         */
        toJSON() {
            return this.deref();
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

    const factory = (
        src?: string | number | ReadonlyColor | IColor,
        ...xs: any[]
    ): $DefColor<any, any> => {
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
            // FIXME disallow (since wrong for anything but rgb)
            // or enforce mandatory `from` int conversion
            return factory(<any>int32Rgb([], src), ...xs);
        }
        illegalArgs(`can't create a ${spec.mode} color from: ${src}`);
    };

    const min = spec.order.map((id) =>
        id !== "alpha" ? (spec.channels[id].range || [0, 1])[0] : 1
    );
    const max = spec.order.map((id) => (spec.channels[id].range || [0, 1])[1]);

    factory.random = (rnd?: IRandom) =>
        <any>new $clazz(randMinMax([], min, max, rnd));

    return <ColorFactory<$DefColor<M, K>>>factory;
};
