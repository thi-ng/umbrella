// SPDX-License-Identifier: Apache-2.0
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
} from "./api.js";
import type { FloatBuffer } from "./float.js";
import type { IntBuffer } from "./int.js";

export function defSampler(
	src: FloatBuffer,
	filter?: Filter,
	wrap?: Wrap
): FloatSampler;
export function defSampler(
	src: IntBuffer,
	filter?: Filter,
	wrap?: Wrap
): IntSampler;
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
					nc1: __sampleFNC,
					nw1: __sampleFNW,
					nr1: __sampleFNR,
					nc: __sampleFNC,
					nw: __sampleFNW,
					nr: __sampleFNR,
					lc1: (src) => __bilinearGrayF(__sampleINC(src)),
					lw1: (src) => __bilinearGrayF(__sampleINW(src)),
					lr1: (src) => __bilinearGrayF(__sampleINR(src)),
					lc: (src) => __bilinearFloat(src, __sampleFNC(src)),
					lw: (src) => __bilinearFloat(src, __sampleFNW(src)),
					lr: (src) => __bilinearFloat(src, __sampleFNR(src)),
					cc1: (src) => __bicubicGrayF(__sampleINC(src)),
					cw1: (src) => __bicubicGrayF(__sampleINW(src)),
					cr1: (src) => __bicubicGrayF(__sampleINR(src)),
					cc: (src) => __bicubicFloat(src, __sampleFNC(src)),
					cw: (src) => __bicubicFloat(src, __sampleFNW(src)),
					cr: (src) => __bicubicFloat(src, __sampleFNR(src)),
			  }
			: <IObjectOf<Fn<IntBuffer, IntSampler>>>{
					nc1: __sampleINC,
					nw1: __sampleINW,
					nr1: __sampleINR,
					nc: __sampleINC,
					nw: __sampleINW,
					nr: __sampleINR,
					lc1: (src) => __bilinearGray(__sampleINC(src)),
					lw1: (src) => __bilinearGray(__sampleINW(src)),
					lr1: (src) => __bilinearGray(__sampleINR(src)),
					lc: (src) => __bilinearABGR(src, __sampleINC(src)),
					lw: (src) => __bilinearABGR(src, __sampleINW(src)),
					lr: (src) => __bilinearABGR(src, __sampleINR(src)),
					cc1: (src) => __bicubicGrayI(src, __sampleINC(src)),
					cw1: (src) => __bicubicGrayI(src, __sampleINW(src)),
					cr1: (src) => __bicubicGrayI(src, __sampleINR(src)),
					cc: (src) => __bicubicABGR(src, __sampleINC(src)),
					cw: (src) => __bicubicABGR(src, __sampleINW(src)),
					cr: (src) => __bicubicABGR(src, __sampleINR(src)),
			  }
	)[id];
	assert(!!impl, `missing impl for ${id}`);
	return impl(<any>src);
}

/** @internal */
const __sampleINC =
	({ data, width, height }: IPixelBuffer): IntSampler =>
	(x, y) =>
		x >= 0 && x < width && y >= 0 && y < height
			? data[(y | 0) * width + (x | 0)]
			: 0;

/** @internal */
const __sampleINW =
	({ data, width, height }: IPixelBuffer): IntSampler =>
	(x, y) =>
		data[mod(y | 0, height) * width + mod(x | 0, width)];

/** @internal */
const __sampleINR = ({ data, width, height }: IPixelBuffer): IntSampler => {
	const w1 = width - 1;
	const h1 = height - 1;
	return (x, y) => data[clamp(y | 0, 0, h1) * width + clamp(x | 0, 0, w1)];
};

/** @internal */
const __sampleFNC =
	({
		data,
		width,
		height,
		stride: [stride, rowStride],
	}: FloatBuffer): FloatSampler =>
	(x, y) => {
		let i: number;
		return x >= 0 && x < width && y >= 0 && y < height
			? ((i = (y | 0) * rowStride + (x | 0) * stride),
			  data.slice(i, i + stride))
			: [0];
	};

/** @internal */
const __sampleFNW =
	({
		data,
		width,
		height,
		stride: [stride, rowStride],
	}: FloatBuffer): FloatSampler =>
	(x, y) => {
		let i = mod(y | 0, height) * rowStride + mod(x | 0, width) * stride;
		return data.slice(i, i + stride);
	};

/** @internal */
const __sampleFNR = ({
	data,
	width,
	height,
	stride: [stride, rowStride],
}: FloatBuffer): FloatSampler => {
	const w1 = width - 1;
	const h1 = height - 1;
	return (x, y) => {
		let i = clamp(y | 0, 0, h1) * rowStride + clamp(x | 0, 0, w1) * stride;
		return data.slice(i, i + stride);
	};
};

/** @internal */
const __mixBilinearChan = (
	buf: NumericArray,
	u: number,
	v: number,
	i: number,
	s = 4
) => mixBilinear(buf[i], buf[i + s], buf[i + 2 * s], buf[i + 3 * s], u, v);

/** @internal */
const __bilinearGray =
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

/** @internal */
const __bilinearGrayF = (sample: IntSampler): FloatSampler => {
	sample = __bilinearGray(sample);
	return (x, y) => [sample(x, y)];
};

/** @internal */
const __bilinearABGR = (src: IntBuffer, sample1: IntSampler): IntSampler => {
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
				__mixBilinearChan(u8, u, v, 0) |
					(__mixBilinearChan(u8, u, v, 1) << 8) |
					(__mixBilinearChan(u8, u, v, 2) << 16) |
					(__mixBilinearChan(u8, u, v, 3) << 24)
			) >>> 0
		);
	};
};

/** @internal */
const __bilinearFloat = (
	{ stride: [stride] }: FloatBuffer,
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
			res.push(__mixBilinearChan(f32, u, v, i, stride));
		}
		return res;
	};
};

/** @internal */
const __bicubicGray =
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

/** @internal */
const __bicubicGrayI = (src: IntBuffer, sample: IntSampler): IntSampler => {
	const max = src.format.channels[0].mask0;
	sample = __bicubicGray(sample);
	return (x, y) => clamp(sample(x, y), 0, max);
};

/** @internal */
const __bicubicGrayF = (sample: IntSampler): FloatSampler => {
	sample = __bicubicGray(sample);
	return (x, y) => [sample(x, y)];
};

/** @internal */
const __mixBicubicChan = (
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

/** @internal */
const __mixBicubicChanClamped = (
	buf: NumericArray,
	u: number,
	v: number,
	i: number,
	s = 4
) => clamp(__mixBicubicChan(buf, u, v, i, s), 0, 255);

/** @internal */
const __bicubicABGR = (src: IntBuffer, sample: IntSampler): IntSampler => {
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
				__mixBicubicChanClamped(u8, u, v, 0) |
					(__mixBicubicChanClamped(u8, u, v, 1) << 8) |
					(__mixBicubicChanClamped(u8, u, v, 2) << 16) |
					(__mixBicubicChanClamped(u8, u, v, 3) << 24)
			) >>> 0
		);
	};
};

/** @internal */
const __bicubicFloat = (
	{ stride: [stride] }: FloatBuffer,
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
			res.push(__mixBicubicChan(f32, u, v, i, stride));
		}
		return res;
	};
};
