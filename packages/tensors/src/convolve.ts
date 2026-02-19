// SPDX-License-Identifier: Apache-2.0
import type { ITensor, ITensor1, ITensor2, ITensor3 } from "./api.js";
import { top } from "./top.js";

const convolve1 = (out: ITensor1 | null, a: ITensor1, k: ITensor1) => {
	!out && (out = a.empty());
	const {
		data: odata,
		offset: oo,
		stride: [txo],
	} = out;
	const {
		data: adata,
		offset: oa,
		shape: [sxa],
		stride: [txa],
	} = a;
	const {
		data: kdata,
		offset: ok,
		shape: [sxk],
		stride: [txk],
	} = k;
	const sxk2 = sxk >> 1;
	const mx = sxa - 1;
	let x: number, xx: number, i: number, sum: number;
	for (x = 0; x < sxa; x++) {
		for (sum = 0, i = 0; i < sxk; i++) {
			xx = x + i - sxk2;
			if (xx < 0) xx = 0;
			else if (xx > mx) xx = mx;
			sum += adata[oa + xx * txa] * kdata[ok + i * txk];
		}
		odata[oo + x * txo] = sum;
	}
	return out;
};

const convolve2 = (out: ITensor2 | null, a: ITensor2, k: ITensor2) => {
	!out && (out = a.empty());
	const {
		data: odata,
		offset: oo,
		stride: [txo, tyo],
	} = out;
	const {
		data: adata,
		offset: oa,
		shape: [sxa, sya],
		stride: [txa, tya],
	} = a;
	const {
		data: kdata,
		offset: ok,
		shape: [sxk, syk],
		stride: [txk, tyk],
	} = k;
	const sxk2 = sxk >> 1;
	const syk2 = syk >> 1;
	const mx = sxa - 1;
	const my = sya - 1;
	let x: number,
		xx: number,
		y: number,
		yy: number,
		oox: number,
		oax: number,
		okx: number,
		i: number,
		j: number,
		sum: number;
	for (x = 0; x < sxa; x++) {
		oox = oo + x * txo;
		for (y = 0; y < sya; y++) {
			for (sum = 0, i = 0; i < sxk; i++) {
				xx = x + i - sxk2;
				if (xx < 0) xx = 0;
				else if (xx > mx) xx = mx;
				oax = oa + xx * txa;
				okx = ok + i * txk;
				for (j = 0; j < syk; j++) {
					yy = y + j - syk2;
					if (yy < 0) yy = 0;
					else if (yy > my) yy = my;
					sum += adata[oax + yy * tya] * kdata[okx + j * tyk];
				}
			}
			odata[oox + y * tyo] = sum;
		}
	}
	return out;
};

const convolve3 = (out: ITensor3 | null, a: ITensor3, k: ITensor3) => {
	!out && (out = a.empty());
	const {
		data: odata,
		offset: oo,
		stride: [txo, tyo, tzo],
	} = out;
	const {
		data: adata,
		offset: oa,
		shape: [sxa, sya, sza],
		stride: [txa, tya, tza],
	} = a;
	const {
		data: kdata,
		offset: ok,
		shape: [sxk, syk, szk],
		stride: [txk, tyk, tzk],
	} = k;
	const sxk2 = sxk >> 1;
	const syk2 = syk >> 1;
	const szk2 = szk >> 1;
	const mx = sxa - 1;
	const my = sya - 1;
	const mz = sza - 1;
	let x: number,
		xx: number,
		y: number,
		yy: number,
		z: number,
		zz: number,
		oox: number,
		oax: number,
		okx: number,
		ooy: number,
		oay: number,
		oky: number,
		i: number,
		j: number,
		l: number,
		sum: number;
	for (x = 0; x < sxa; x++) {
		oox = oo + x * txo;
		for (y = 0; y < sya; y++) {
			ooy = oox + y * tyo;
			for (z = 0; z < sza; z++) {
				for (sum = 0, i = 0; i < sxk; i++) {
					xx = x + i - sxk2;
					if (xx < 0) xx = 0;
					else if (xx > mx) xx = mx;
					oax = oa + xx * txa;
					okx = ok + i * txk;
					for (j = 0; j < syk; j++) {
						yy = y + j - syk2;
						if (yy < 0) yy = 0;
						else if (yy > my) yy = my;
						oay = oax + yy * tya;
						oky = okx + j * tyk;
						for (l = 0; l < szk; l++) {
							zz = z + l - szk2;
							if (zz < 0) zz = 0;
							else if (zz > mz) zz = mz;
							sum += adata[oay + zz * tza] * kdata[oky + l * tzk];
						}
					}
				}
				odata[ooy + z * tzo] = sum;
			}
		}
	}
	return out;
};

/**
 * Tensor convolution (without broadcasting support).
 *
 * @remarks
 * The output tensor has the same shape as domain `a`. Edge values in `a` will
 * be repeated. If `out` is null, a new tensor will be created using `a`'s
 * storage backend.
 *
 * References:
 *
 * - https://en.wikipedia.org/wiki/Convolution
 * - https://en.wikipedia.org/wiki/Kernel_(image_processing)#Convolution
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param k - kernel tensor
 */
export const convolve = top<
	<T extends ITensor>(out: T | null, a: T, k: T) => T
>(1, undefined, <any>convolve1, <any>convolve2, <any>convolve3);
