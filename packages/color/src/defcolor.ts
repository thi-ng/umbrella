import type { NumericArray } from "@thi.ng/api";
import { implementsFunction } from "@thi.ng/checks/implements-function";
import { isArrayLike } from "@thi.ng/checks/is-arraylike";
import { isNumber } from "@thi.ng/checks/is-number";
import { isString } from "@thi.ng/checks/is-string";
import { illegalArgs } from "@thi.ng/errors/illegal-arguments";
import { EPS } from "@thi.ng/math/api";
import { fract } from "@thi.ng/math/prec";
import type { IRandom } from "@thi.ng/random";
import { vector } from "@thi.ng/strings/vector";
import { mapStridedBuffer } from "@thi.ng/vectors/buffer";
import { clamp4 } from "@thi.ng/vectors/clamp";
import { declareIndices } from "@thi.ng/vectors/compile/accessors";
import { eqDelta4 } from "@thi.ng/vectors/eqdelta";
import { stridedValues } from "@thi.ng/vectors/iterator";
import { randMinMax } from "@thi.ng/vectors/random";
import { set4 } from "@thi.ng/vectors/set";
import type {
	ChannelSpec,
	ColorFactory,
	ColorMode,
	ColorSpec,
	IColor,
	MaybeColor,
	ReadonlyColor,
	TypedColor,
} from "./api.js";
import { convert, defConversions } from "./convert.js";
import { parseCss } from "./css/parse-css.js";
import { intArgb32Rgb } from "./int/int-rgb.js";
import { __ensureArgs } from "./internal/ensure.js";

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
	const min = Object.freeze(order.map((id) => channels[id]!.range![0]));
	const max = Object.freeze(order.map((id) => channels[id]!.range![1]));
	// fix alpha channel for randomize()
	const minR = set4([], min);
	const maxR = set4([], max);
	minR[numChannels - 1] = 1;

	const hueChanID = order.findIndex((id) => !!channels[id]!.hue);

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

		get range(): [ReadonlyColor, ReadonlyColor] {
			return [min, max];
		}

		get [Symbol.toStringTag]() {
			return spec.mode;
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
			hueChanID >= 0 && (this[hueChanID] = fract(this[hueChanID]));
			clamp4(null, this, min, max);
			return this;
		}

		eqDelta(o: $DefColor<any, any>, eps = EPS): boolean {
			return eqDelta4(this, <any>o, eps);
		}

		randomize(rnd?: IRandom): this {
			return <any>randMinMax(this, minR, maxR, rnd);
		}

		toJSON() {
			return this.deref();
		}

		toString() {
			return vector(4, 4)(this);
		}
	};

	declareIndices($Color.prototype, <any[]>order);
	defConversions(spec.mode, spec.from);
	defConversions("rgb", <any>{ [spec.mode]: spec.toRgb });

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
			? fromColor(src.deref(), (<IColor>src).mode, xs)
			: isNumber(src)
			? xs.length && xs.every(isNumber)
				? <any>new $Color(...__ensureArgs([src, ...xs]))
				: fromColor(intArgb32Rgb([], src), "rgb", xs)
			: illegalArgs(`can't create a ${spec.mode} color from: ${src}`);

	factory.class = <any>$Color;

	factory.range = <[ReadonlyColor, ReadonlyColor]>[min, max];

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
