import type { Fn2, ICopy, IEmpty, NumericArray } from "@thi.ng/api";
import { nomixin } from "@thi.ng/api/decorators/nomixin";
import { IGrid2DMixin } from "@thi.ng/api/mixins/igrid";
import { isNumber } from "@thi.ng/checks/is-number";
import { isString } from "@thi.ng/checks/is-string";
import { assert } from "@thi.ng/errors/assert";
import { clamp } from "@thi.ng/math/interval";
import {
	isPremultiplied,
	postmultiply,
	premultiply,
} from "@thi.ng/porter-duff/premultiply";
import type {
	BlendFnFloat,
	BlitCanvasOpts,
	BlitOpts,
	Filter,
	FloatFormat,
	FloatFormatSpec,
	FloatSampler,
	IBlend,
	IBlit,
	IInvert,
	IntFormat,
	IPixelBuffer,
	IResizable,
	IToImageData,
} from "./api.js";
import { ensureChannel, ensureImageData, ensureSize } from "./checks.js";
import { defFloatFormat } from "./format/float-format.js";
import { FLOAT_GRAY } from "./format/float-gray.js";
import { FLOAT_RGBA } from "./index.js";
import { IntBuffer, intBufferFromCanvas, intBufferFromImage } from "./int.js";
import { __clampRegion, __prepRegions } from "./internal/utils.js";
import { defSampler } from "./sample.js";

/**
 * Syntax sugar for {@link FloatBuffer} ctor.
 *
 * @param w -
 * @param h -
 * @param fmt -
 * @param data -
 */
export function floatBuffer(
	w: number,
	h: number,
	fmt?: FloatFormat | FloatFormatSpec,
	data?: Float32Array
): FloatBuffer;
export function floatBuffer(
	src: IntBuffer,
	fmt?: FloatFormat | FloatFormatSpec
): FloatBuffer;
export function floatBuffer(...args: any[]) {
	return args[0] instanceof IntBuffer
		? // @ts-ignore
		  floatBufferFromInt(...args)
		: // @ts-ignore
		  new FloatBuffer(...args);
}

/**
 * Creates a new `FloatBuffer` from given {@link IntBuffer} and using
 * provided {@link FloatFormat}.
 *
 * @remarks
 * See {@link FloatBuffer.as} for reverse operation.
 *
 * @param src -
 * @param fmt -
 */
export const floatBufferFromInt = (
	src: IntBuffer,
	fmt?: FloatFormat | FloatFormatSpec
) => {
	const dest = new FloatBuffer(src.width, src.height, fmt);
	const {
		data: dbuf,
		format: dfmt,
		stride: [stride],
	} = dest;
	const { data: sbuf, format: sfmt } = src;
	for (let i = sbuf.length; i-- > 0; ) {
		dbuf.set(dfmt.fromABGR(sfmt.toABGR(sbuf[i])), i * stride);
	}
	return dest;
};

export const floatBufferFromImage = (
	img: HTMLImageElement,
	fmt?: FloatFormat | FloatFormatSpec,
	width?: number,
	height = width
) => floatBufferFromInt(intBufferFromImage(img, undefined, width, height), fmt);

export const floatBufferFromCanvas = (
	canvas: HTMLCanvasElement,
	fmt?: FloatFormat
) => floatBufferFromInt(intBufferFromCanvas(canvas), fmt);

@IGrid2DMixin
export class FloatBuffer
	implements
		IPixelBuffer<Float32Array, NumericArray>,
		IBlend<FloatBuffer, BlendFnFloat>,
		IBlit<FloatBuffer>,
		ICopy<FloatBuffer>,
		IEmpty<FloatBuffer>,
		IInvert<FloatBuffer>,
		IResizable<FloatBuffer, FloatSampler>,
		IToImageData
{
	readonly size: [number, number];
	readonly stride: [number, number];
	readonly data: Float32Array;
	readonly format: FloatFormat;
	protected __empty: NumericArray;

	constructor(
		w: number,
		h: number,
		fmt: FloatFormat | FloatFormatSpec = FLOAT_RGBA,
		data?: Float32Array
	) {
		this.size = [w, h];
		this.format = (<any>fmt).__float
			? <FloatFormat>fmt
			: defFloatFormat(fmt);
		// TODO support custom strides (via ctor arg)
		const stride = this.format.channels.length;
		this.stride = [stride, w * stride];
		this.data = data || new Float32Array(w * h * stride);
		this.__empty = <NumericArray>(
			Object.freeze(new Array<number>(stride).fill(0))
		);
	}

	/** @deprecated use `.data` instead */
	get pixels() {
		return this.data;
	}

	get width() {
		return this.size[0];
	}

	get height() {
		return this.size[1];
	}

	// TODO support custom offsets (via ctor arg)
	get offset() {
		return 0;
	}

	get dim(): 2 {
		return 2;
	}

	as(fmt: IntFormat) {
		const {
			width,
			height,
			stride: [stride],
			data,
			format: sfmt,
		} = this;
		const dest = new IntBuffer(width, height, fmt);
		const dpixels = dest.data;
		if (sfmt.size === 1 && fmt.channels.length === 1) {
			const setFloat = fmt.channels[0].setFloat;
			for (let i = 0, j = 0, n = data.length; i < n; i += stride, j++) {
				dpixels[j] = setFloat(0, sfmt.getNormalized(data[i]));
			}
		} else {
			for (let i = 0, j = 0, n = data.length; i < n; i += stride, j++) {
				dpixels[j] = fmt.fromABGR(
					sfmt.toABGR(data.subarray(i, i + stride))
				);
			}
		}
		return dest;
	}

	copy() {
		const dest = this.empty();
		dest.data.set(this.data);
		return dest;
	}

	empty() {
		return new FloatBuffer(this.width, this.height, this.format);
	}

	// @ts-ignore mixin
	order(): number[] {}

	// @ts-ignore mixin
	includes(x: number, y: number): boolean {}

	// @ts-ignore mixin
	indexAt(x: number, y: number): number {}

	// @ts-ignore mixin
	indexAtUnsafe(x: number, y: number): number {}

	@nomixin
	getAt(x: number, y: number) {
		return this.includes(x, y) ? this.getAtUnsafe(x, y) : this.__empty;
	}

	@nomixin
	getAtUnsafe(x: number, y: number) {
		const idx = this.indexAtUnsafe(x, y);
		return this.data.subarray(idx, idx + this.stride[0]);
	}

	@nomixin
	setAt(x: number, y: number, col: NumericArray) {
		return this.includes(x, y)
			? (this.data.set(col, this.indexAtUnsafe(x, y)), true)
			: false;
	}

	@nomixin
	setAtUnsafe(x: number, y: number, col: NumericArray) {
		this.data.set(col, this.indexAtUnsafe(x, y));
		return true;
	}

	getChannelAt(x: number, y: number, id: number) {
		ensureChannel(this.format, id);
		return this.includes(x, y)
			? this.data[this.indexAtUnsafe(x, y) + id]
			: undefined;
	}

	setChannelAt(x: number, y: number, id: number, col: number) {
		ensureChannel(this.format, id);
		this.includes(x, y) && (this.data[this.indexAtUnsafe(x, y) + id] = col);
		return this;
	}

	getChannel(id: number) {
		ensureChannel(this.format, id);
		const {
			data,
			stride: [stride],
		} = this;
		const [min, max] = this.format.range;
		const dest = new Float32Array(this.width * this.height);
		for (let i = id, j = 0, n = data.length; i < n; i += stride, j++) {
			dest[j] = clamp(data[i], min, max);
		}
		return new FloatBuffer(this.width, this.height, FLOAT_GRAY, dest);
	}

	setChannel(id: number, src: FloatBuffer | number) {
		ensureChannel(this.format, id);
		const {
			data: dest,
			stride: [stride],
		} = this;
		if (isNumber(src)) {
			for (let i = id, n = dest.length; i < n; i += stride) {
				dest[i] = src;
			}
		} else {
			const {
				data: sbuf,
				stride: [sstride],
			} = src;
			ensureSize(sbuf, this.width, this.height, sstride);
			for (
				let i = id, j = 0, n = dest.length;
				i < n;
				i += stride, j += sstride
			) {
				dest[i] = sbuf[j];
			}
		}
		return this;
	}

	blend(op: BlendFnFloat, dest: FloatBuffer, opts?: Partial<BlitOpts>) {
		this.ensureFormat(dest);
		const { sx, sy, dx, dy, rw, rh } = __prepRegions(this, dest, opts);
		if (rw < 1 || rh < 1) return dest;
		const sbuf = this.data;
		const dbuf = dest.data;
		const [stride, sw] = this.stride;
		const dw = dest.stride[1];
		for (
			let si = (sx | 0) * stride + (sy | 0) * sw,
				di = (dx | 0) * stride + (dy | 0) * dw,
				yy = 0;
			yy < rh;
			yy++, si += sw, di += dw
		) {
			for (
				let xx = rw, sii = si, dii = di;
				xx-- > 0;
				sii += stride, dii += stride
			) {
				const out = dbuf.subarray(dii, dii + stride);
				op(out, sbuf.subarray(sii, sii + stride), out);
			}
		}
		return dest;
	}

	blit(dest: FloatBuffer, opts?: Partial<BlitOpts>) {
		this.ensureFormat(dest);
		const { sx, sy, dx, dy, rw, rh } = __prepRegions(this, dest, opts);
		if (rw < 1 || rh < 1) return dest;
		const sbuf = this.data;
		const dbuf = dest.data;
		const [stride, sw] = this.stride;
		const dw = dest.stride[1];
		const rww = rw * stride;
		for (
			let si = (sx | 0) * stride + (sy | 0) * sw,
				di = (dx | 0) * stride + (dy | 0) * dw,
				yy = 0;
			yy < rh;
			yy++, si += sw, di += dw
		) {
			dbuf.set(sbuf.subarray(si, si + rww), di);
		}
		return dest;
	}

	blitCanvas(
		canvas: HTMLCanvasElement | CanvasRenderingContext2D,
		opts: Partial<BlitCanvasOpts> = {}
	) {
		const ctx =
			canvas instanceof HTMLCanvasElement
				? canvas.getContext("2d")!
				: canvas;
		ctx.putImageData(this.toImageData(opts.data), opts.x || 0, opts.y || 0);
	}

	toImageData(idata?: ImageData) {
		idata = ensureImageData(idata, this.width, this.height);
		const dest = new Uint32Array(idata.data.buffer);
		const {
			stride: [stride],
			data,
			format,
		} = this;
		for (let i = 0, j = 0, n = data.length; i < n; i += stride, j++) {
			dest[j] = format.toABGR(data.subarray(i, i + stride));
		}
		return idata;
	}

	getRegion(x: number, y: number, width: number, height: number) {
		const [sx, sy, w, h] = __clampRegion(
			x,
			y,
			width,
			height,
			this.width,
			this.height
		);
		return this.blit(new FloatBuffer(w, h, this.format), {
			sx,
			sy,
			w,
			h,
		});
	}

	forEach(f: Fn2<NumericArray, number, NumericArray>) {
		const {
			data,
			stride: [stride],
		} = this;
		for (let i = 0, j = 0, n = data.length; i < n; i += stride, j++) {
			data.set(f(data.subarray(i, i + stride), j), i);
		}
		return this;
	}

	fill(x: NumericArray) {
		assert(
			x.length <= this.format.channels.length,
			`fill value has too many channels`
		);
		const {
			data,
			stride: [stride],
		} = this;
		for (let i = 0, n = data.length; i < n; i += stride) {
			data.set(x, i);
		}
	}

	premultiply() {
		this.ensureRGBA();
		const {
			data,
			stride: [stride],
		} = this;
		for (let i = 0, n = data.length; i < n; i += stride) {
			premultiply(null, data.subarray(i, i + stride));
		}
		return this;
	}

	postmultiply() {
		this.ensureRGBA();
		const {
			data,
			stride: [stride],
		} = this;
		for (let i = 0, n = data.length; i < n; i += stride) {
			postmultiply(null, data.subarray(i, i + stride));
		}
		return this;
	}

	isPremultiplied() {
		this.ensureRGBA();
		const {
			data,
			stride: [stride],
		} = this;
		for (let i = 0, n = data.length; i < n; i += stride) {
			if (!isPremultiplied(data.subarray(i, i + stride))) {
				return false;
			}
		}
		return true;
	}

	clamp() {
		const data = this.data;
		const [min, max] = this.format.range;
		for (let i = data.length; i-- > 0; ) {
			data[i] = clamp(data[i], min, max);
		}
		return this;
	}

	clampChannel(id: number) {
		ensureChannel(this.format, id);
		const {
			data,
			stride: [stride],
		} = this;
		const [min, max] = this.format.range;
		for (let i = id, n = data.length; i < n; i += stride) {
			data[i] = clamp(data[i], min, max);
		}
	}

		}
	}

	/**
	 * Flips image vertically.
	 */
	flipY() {
		const data = this.data;
		const rowStride = this.stride[1];
		const tmp = new Float32Array(rowStride);
		for (
			let i = 0, j = data.length - rowStride;
			i < j;
			i += rowStride, j -= rowStride
		) {
			tmp.set(data.subarray(i, i + rowStride));
			data.copyWithin(i, j, j + rowStride);
			data.set(tmp, j);
		}
		return this;
	}

	invert() {
		const {
			data,
			format,
			stride: [stride],
		} = this;
		for (
			let i = 0, n = data.length, m = format.alpha ? stride - 1 : stride;
			i < n;
			i += stride
		) {
			for (let j = 0; j < m; j++) data[i + j] = 1 - data[i + j];
		}
		return this;
	}

	scale(scale: number, sampler?: FloatSampler | Filter) {
		assert(scale > 0, `scale must be > 0`);
		return this.resize(this.width * scale, this.height * scale, sampler);
	}

	resize(w: number, h: number, sampler: FloatSampler | Filter = "linear") {
		w |= 0;
		h |= 0;
		assert(w > 0 && h > 0, `target width & height must be > 0`);
		const dest = floatBuffer(w, h, this.format);
		const dpix = dest.data;
		const scaleX = w > 0 ? this.width / w : 0;
		const scaleY = h > 0 ? this.height / h : 0;
		const stride = this.stride[0];
		sampler = isString(sampler)
			? defSampler(this, sampler, "repeat")
			: sampler;
		for (let y = 0, i = 0; y < h; y++) {
			const yy = y * scaleY;
			for (let x = 0; x < w; x++, i += stride) {
				dpix.set(sampler(x * scaleX, yy), i);
			}
		}
		return dest;
	}

	upsize() {
		const {
			width,
			height,
			data,
			stride: [stride, rowStride],
		} = this;
		const stride2x = stride * 2;
		const dest = floatBuffer(width * 2, height * 2, this.format);
		const dpix = dest.data;
		for (let y = 0, si = 0; y < height; y++) {
			for (
				let x = 0, di = y * rowStride * 4;
				x < width;
				x++, si += stride, di += stride2x
			) {
				dpix.set(data.subarray(si, si + stride), di);
			}
		}
		return dest;
	}

	protected ensureFormat(dest: FloatBuffer) {
		assert(
			dest.format === this.format,
			`dest buffer format must be same as src`
		);
	}

	protected ensureRGBA() {
		assert(this.format === FLOAT_RGBA, "require FLOAT_RGBA format");
	}
}
