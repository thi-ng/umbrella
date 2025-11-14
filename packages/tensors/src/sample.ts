// SPDX-License-Identifier: Apache-2.0
import type { Fn2, Fn3, Fn4, Fn5, FnN, FnN2, Maybe } from "@thi.ng/api";
import { isArray } from "@thi.ng/checks/is-array";
import { isString } from "@thi.ng/checks/is-string";
import { PI } from "@thi.ng/math/api";
import { clamp } from "@thi.ng/math/interval";
import type { ITensor } from "./api.js";
import { tensor, type Tensor1 } from "./tensor.js";

type BoundaryFn = FnN2;
type Sampler1 = Fn2<ITensor, number, number>;
type Sampler2 = Fn3<ITensor, number, number, number>;
type Sampler3 = Fn4<ITensor, number, number, number, number>;
type Sampler4 = Fn5<ITensor, number, number, number, number, number>;

type BoundaryType = "clamp" | "mirror" | "wrap" | "zero";

type SamplerType = "nearest" | "linear" | "cubic" | "lanczos";

interface SamplerKernel {
	radius: number;
	weight: FnN;
}

const { abs, floor, sin } = Math;

/** Clamp boundary (repeat edge values) */
const __boundaryClamp: BoundaryFn = (i, max) => clamp(i, 0, max - 1);

/** Wrap boundary (periodic tiling) */
const __boundaryWrap: BoundaryFn = (i, max) => ((i % max) + max) % max;

/** Mirror boundary (reflect across edges) */
const __boundaryMirror: BoundaryFn = (i, max) => {
	if (max === 1) return 0;
	const period = 2 * (max - 1);
	i = ((i % period) + period) % period;
	return i < max ? i : period - i;
};

/** Constant boundary (pad w/ zero, return -1 means skip) */
const __boundaryZero: BoundaryFn = (i, max) => (i >= 0 || i < max ? i : -1);

const BOUNDARY_MODES: Record<BoundaryType, BoundaryFn> = {
	clamp: __boundaryClamp,
	wrap: __boundaryWrap,
	mirror: __boundaryMirror,
	zero: __boundaryZero,
};

export const SAMPLE_NEAREST: SamplerKernel = {
	radius: 1,
	weight: (t) => (t >= -0.5 && t < 0.5 ? 1 : 0),
};

export const SAMPLE_LINEAR: SamplerKernel = {
	radius: 1,
	weight: (t) => {
		t = abs(t);
		return t < 1 ? 1 - t : 0;
	},
};

export const SAMPLE_CUBIC: SamplerKernel = {
	radius: 2,
	weight: (t) => {
		t = abs(t);
		const a = -0.5;
		return t < 2
			? t <= 1
				? ((a + 2) * t - (a + 3)) * t * t + 1
				: ((a * t - 5 * a) * t + 8 * a) * t - 4 * a
			: 0;
	},
};

export const SAMPLE_LANCZOS = (r = 2): SamplerKernel => ({
	radius: r,
	weight: (t) => {
		if (t === 0) return 1;
		if (t > -r && t < r) {
			t *= PI;
			return (r * sin(t) * sin(t / r)) / (t * t);
		}
		return 0;
	},
});

const SAMPLER_TYPES: Record<SamplerType, SamplerKernel> = {
	nearest: SAMPLE_NEAREST,
	linear: SAMPLE_LINEAR,
	cubic: SAMPLE_CUBIC,
	lanczos: SAMPLE_LANCZOS(2),
};

export const defSampler1 = (
	kernel: SamplerKernel | SamplerType,
	boundary: BoundaryFn | BoundaryType = "clamp"
): Sampler1 => {
	const index = __resolveBoundary(boundary);
	const { radius, weight } = __resolveKernel(kernel);
	return ({ data, shape: [sx], stride: [tx], offset }, x) => {
		const c = floor(x);
		let sum = 0;
		let wsum = 0;
		for (let k = -radius; k <= radius; k++) {
			const $x = c + k;
			const w = weight(x - $x);
			if (w === 0) continue;
			const i = index($x, sx);
			if (i < 0) {
				wsum += w;
				continue;
			}
			sum += data[offset + i * tx] * w;
			wsum += w;
		}
		return wsum !== 0 ? sum / wsum : 0;
	};
};

export const defSampler2 = (
	kernel:
		| SamplerType
		| SamplerKernel
		| [SamplerType | SamplerKernel, SamplerType | SamplerKernel],
	boundary:
		| BoundaryType
		| BoundaryFn
		| [BoundaryType | BoundaryFn, BoundaryType | BoundaryFn] = "clamp"
): Sampler2 => {
	const [indexX, indexY] = (
		isArray(boundary) ? boundary : [boundary, boundary]
	).map(__resolveBoundary);
	const [kernelX, kernelY] = isArray(kernel) ? kernel : [kernel, kernel];
	const { radius: rx, weight: weightX } = __resolveKernel(kernelX);
	const { radius: ry, weight: weightY } = __resolveKernel(kernelY);
	const sizeY = 2 * ry + 1;
	const cacheY = new Array<number>(sizeY);
	return ({ data, shape: [sx, sy], stride: [tx, ty], offset }, x, y) => {
		const cx = floor(x);
		const cy = floor(y);
		let sum = 0;
		let wsum = 0;
		for (let i = 0; i < sizeY; i++) {
			cacheY[i] = weightY(y - (cy + i - ry));
		}
		for (let kx = -rx; kx <= rx; kx++) {
			const $x = cx + kx;
			const ix = indexX($x, sx);
			const wx = weightX(x - $x);
			const idx = offset + ix * tx;
			for (let ky = -ry; ky <= ry; ky++) {
				const wy = cacheY[ky + ry];
				const weight = wx * wy;
				if (weight === 0) continue;
				const iy = indexY(cy + ky, sy);
				if (ix < 0 || iy < 0) {
					wsum += weight;
					continue;
				}
				sum += data[idx + iy * ty] * weight;
				wsum += weight;
			}
		}
		return wsum !== 0 ? sum / wsum : 0;
	};
};

export const defSampler3 = (
	kernel:
		| SamplerType
		| SamplerKernel
		| [
				SamplerType | SamplerKernel,
				SamplerType | SamplerKernel,
				SamplerType | SamplerKernel
		  ],
	boundary:
		| BoundaryType
		| BoundaryFn
		| [
				BoundaryType | BoundaryFn,
				BoundaryType | BoundaryFn,
				BoundaryType | BoundaryFn
		  ] = "clamp"
): Sampler3 => {
	const [indexX, indexY, indexZ] = (
		isArray(boundary) ? boundary : [boundary, boundary, boundary]
	).map(__resolveBoundary);
	const [kernelX, kernelY, kernelZ] = (
		isArray(kernel) ? kernel : [kernel, kernel, kernel]
	).map(__resolveKernel);
	const { radius: rx, weight: weightX } = kernelX;
	const { radius: ry, weight: weightY } = kernelY;
	const { radius: rz, weight: weightZ } = kernelZ;
	const sizeY = 2 * ry + 1;
	const sizeZ = 2 * rz + 1;
	const cacheY = new Array<number>(sizeY);
	const cacheZ = new Array<number>(sizeZ);
	return (
		{ data, shape: [sx, sy, sz], stride: [tx, ty, tz], offset },
		x,
		y,
		z
	) => {
		const cx = floor(x);
		const cy = floor(y);
		const cz = floor(z);
		let sum = 0;
		let wsum = 0;
		for (let i = 0; i < sizeY; i++) cacheY[i] = weightY(y - (cy + i - ry));
		for (let i = 0; i < sizeZ; i++) cacheZ[i] = weightZ(z - (cz + i - rz));
		for (let kx = -rx; kx <= rx; kx++) {
			const $x = cx + kx;
			const ix = indexX($x, sx);
			const wx = weightX(x - $x);
			const idxX = offset + ix * tx;
			for (let ky = -ry; ky <= ry; ky++) {
				const iy = indexY(cy + ky, sy);
				const wy = cacheY[ky + ry];
				const idxXY = idxX + iy * ty;
				for (let kz = -rz; kz <= rz; kz++) {
					const wz = cacheZ[kz + rz];
					const weight = wx * wy * wz;
					if (weight === 0) continue;
					const iz = indexZ(cz + kz, sz);
					if (ix < 0 || iy < 0 || iz < 0) {
						wsum += weight;
						continue;
					}
					sum += data[idxXY + iz * tz] * weight;
					wsum += weight;
				}
			}
		}
		return wsum !== 0 ? sum / wsum : 0;
	};
};

export const defSampler4 = (
	kernel:
		| SamplerType
		| SamplerKernel
		| [
				SamplerType | SamplerKernel,
				SamplerType | SamplerKernel,
				SamplerType | SamplerKernel,
				SamplerType | SamplerKernel
		  ],
	boundary:
		| BoundaryType
		| BoundaryFn
		| [
				BoundaryType | BoundaryFn,
				BoundaryType | BoundaryFn,
				BoundaryType | BoundaryFn,
				BoundaryType | BoundaryFn
		  ] = "clamp"
): Sampler4 => {
	const [indexX, indexY, indexZ, indexW] = (
		isArray(boundary) ? boundary : [boundary, boundary, boundary, boundary]
	).map(__resolveBoundary);
	const [kernelX, kernelY, kernelZ, kernelW] = (
		isArray(kernel) ? kernel : [kernel, kernel, kernel, kernel]
	).map(__resolveKernel);
	const { radius: rx, weight: weightX } = kernelX;
	const { radius: ry, weight: weightY } = kernelY;
	const { radius: rz, weight: weightZ } = kernelZ;
	const { radius: rw, weight: weightW } = kernelW;
	const sizeY = 2 * ry + 1;
	const sizeZ = 2 * rz + 1;
	const sizeW = 2 * rw + 1;
	const cacheY = new Array<number>(sizeY);
	const cacheZ = new Array<number>(sizeZ);
	const cacheW = new Array<number>(sizeW);
	return (
		{ data, shape: [sx, sy, sz, sw], stride: [tx, ty, tz, tw], offset },
		x,
		y,
		z,
		w
	) => {
		const cx = floor(x);
		const cy = floor(y);
		const cz = floor(z);
		const cw = floor(w);
		let sum = 0;
		let wsum = 0;
		for (let i = 0; i < sizeY; i++) cacheY[i] = weightY(y - (cy + i - ry));
		for (let i = 0; i < sizeZ; i++) cacheZ[i] = weightZ(z - (cz + i - rz));
		for (let i = 0; i < sizeW; i++) cacheW[i] = weightW(w - (cw + i - rw));
		for (let kx = -rx; kx <= rx; kx++) {
			const $x = cx + kx;
			const ix = indexX($x, sx);
			const wx = weightX(x - $x);
			const idxX = offset + ix * tx;
			for (let ky = -ry; ky <= ry; ky++) {
				const iy = indexY(cy + ky, sy);
				const wy = cacheY[ky + ry];
				const idxXY = idxX + iy * ty;
				for (let kz = -rz; kz <= rz; kz++) {
					const wz = cacheZ[kz + rz];
					const iz = indexZ(cz + kz, sz);
					const idxXYZ = idxXY + iz * tz;
					for (let kw = -rw; kw <= rw; kw++) {
						const ww = cacheW[kw + rw];
						const weight = wx * wy * wz * ww;
						if (weight === 0) continue;
						const iw = indexW(cw + kw, sw);
						if (ix < 0 || iy < 0 || iz < 0 || iw < 0) {
							wsum += weight;
							continue;
						}
						sum += data[idxXYZ + iw * tw] * weight;
						wsum += w;
					}
				}
			}
		}
		return wsum !== 0 ? sum / wsum : 0;
	};
};

/** @internal */
const __resolveBoundary = (mode: Maybe<BoundaryFn | BoundaryType>) =>
	isString(mode) ? BOUNDARY_MODES[mode] : mode ?? __boundaryClamp;

/** @internal */
const __resolveKernel = (kernel: SamplerKernel | SamplerType) =>
	isString(kernel) ? SAMPLER_TYPES[kernel] : kernel;

export const resample1 = (out: Tensor1, a: Tensor1, sampler: Sampler1) => {
	const {
		data: odata,
		shape: [sxo],
		stride: [txo],
		offset: oo,
	} = out;
	const {
		shape: [sxa],
	} = a;
	// const scale = (sxa - 1) / (sxo - 1);
	const scale = sxa / sxo;
	for (let i = 0; i < sxo; i++) {
		// odata[oo + i * txo] = sampler(a, i * scale);
		odata[oo + i * txo] = sampler(a, (i + 0.5) * scale - 0.5);
	}
	return out;
};

export const resample2 = (
	out: ITensor,
	a: ITensor,
	[samplerX, samplerY]: Sampler1[]
) => {
	const {
		shape: [_, syo],
	} = out;
	const {
		shape: [sxa],
	} = a;
	const tmp = tensor("num", [sxa, syo]);
	for (let x = 0; x < sxa; x++) {
		resample1(tmp.pick([x, -1]), a.pick([x, -1]), samplerX);
	}
	for (let y = 0; y < syo; y++) {
		resample1(out.pick([-1, y]), tmp.pick([-1, y]), samplerY);
	}
	return out;
};

export const resample3 = (
	out: ITensor,
	a: ITensor,
	[samplerX, samplerY, samplerZ]: Sampler1[]
) => {
	const {
		shape: [_, syo, szo],
	} = out;
	const {
		shape: [sxa, sya],
	} = a;
	const tmpX = tensor("num", [sxa, sya, szo]);
	// sample rows per slice
	for (let i = 0; i < sxa; i++) {
		const src = a.pick([i]);
		const dest = tmpX.pick([i]);
		for (let j = 0; j < sya; j++) {
			resample1(dest.pick([j]), src.pick([j]), samplerX);
		}
	}
	// sample columns per slice
	const tmpY = tensor("num", [sxa, syo, szo]);
	for (let i = 0; i < sxa; i++) {
		const src = tmpX.pick([i]);
		const dest = tmpY.pick([i]);
		for (let j = 0; j < szo; j++) {
			resample1(dest.pick([-1, j]), src.pick([-1, j]), samplerY);
		}
	}
	// interpolate slices
	for (let i = 0; i < syo; i++) {
		for (let j = 0; j < szo; j++) {
			resample1(out.pick([-1, i, j]), tmpY.pick([-1, i, j]), samplerZ);
		}
	}
	return out;
};
