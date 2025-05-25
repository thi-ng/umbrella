import type { KernelSpec, ITensor } from "./api.js";
import type { Tensor1, Tensor2, Tensor3 } from "./tensor.js";
import { top } from "./top.js";

const applyKernel1 = (
	out: Tensor1 | null,
	a: Tensor1,
	{ init, reduce, complete, shape: [sxk] }: KernelSpec,
	pad: true | number = true
) => {
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
	const sxk2 = sxk >> 1;
	const maxx = sxa - 1;
	const repeat = pad === true;
	let x: number, xx: number, i: number, acc: number, maskx: boolean;
	for (x = 0; x < sxa; x++) {
		for (acc = init(), i = 0; i < sxk; i++) {
			xx = x + i - sxk2;
			if (xx < 0) {
				maskx = false;
				xx = 0;
			} else if (xx > maxx) {
				maskx = false;
				xx = maxx;
			} else maskx = true;
			acc = reduce(acc, maskx || repeat ? adata[oa + xx * txa] : pad, i);
		}
		odata[oo + x * txo] = complete(acc);
	}
	return out;
};

const applyKernel2 = (
	out: Tensor2 | null,
	a: Tensor2,
	{ init, reduce, complete, shape: [sxk, syk] }: KernelSpec,
	pad: true | number = true
) => {
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
	const sxk2 = sxk >> 1;
	const syk2 = syk! >> 1;
	const maxx = sxa - 1;
	const maxy = sya - 1;
	const repeat = pad === true;
	let x: number,
		xx: number,
		y: number,
		yy: number,
		oox: number,
		oax: number,
		i: number,
		j: number,
		acc: number,
		maskx: boolean,
		masky: boolean;
	for (x = 0; x < sxa; x++) {
		oox = oo + x * txo;
		for (y = 0; y < sya; y++) {
			for (acc = init(), i = 0; i < sxk; i++) {
				xx = x + i - sxk2;
				if (xx < 0) {
					maskx = false;
					xx = 0;
				} else if (xx > maxx) {
					maskx = false;
					xx = maxx;
				} else maskx = true;
				oax = oa + xx * txa;
				for (j = 0; j < syk!; j++) {
					yy = y + j - syk2;
					if (yy < 0) {
						masky = false;
						yy = 0;
					} else if (yy > maxy) {
						masky = false;
						yy = maxy;
					} else masky = maskx;
					acc = reduce(
						acc,
						masky || repeat ? adata[oax + yy * tya] : pad,
						i,
						j
					);
				}
			}
			odata[oox + y * tyo] = complete(acc);
		}
	}
	return out;
};

const applyKernel3 = (
	out: Tensor3 | null,
	a: Tensor3,
	{ init, reduce, complete, shape: [sxk, syk, szk] }: KernelSpec,
	pad: true | number = true
) => {
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
	const sxk2 = sxk >> 1;
	const syk2 = syk! >> 1;
	const szk2 = szk! >> 1;
	const maxx = sxa - 1;
	const maxy = sya - 1;
	const maxz = sza - 1;
	const repeat = pad === true;
	let x: number,
		xx: number,
		y: number,
		yy: number,
		z: number,
		zz: number,
		oox: number,
		oax: number,
		ooy: number,
		oay: number,
		i: number,
		j: number,
		k: number,
		acc: number,
		maskx: boolean,
		masky: boolean,
		maskz: boolean;
	for (x = 0; x < sxa; x++) {
		oox = oo + x * txo;
		for (y = 0; y < sya; y++) {
			ooy = oox + y * tyo;
			for (z = 0; z < sza; z++) {
				for (acc = init(), i = 0; i < sxk; i++) {
					xx = x + i - sxk2;
					if (xx < 0) {
						maskx = false;
						xx = 0;
					} else if (xx > maxx) {
						maskx = false;
						xx = maxx;
					} else maskx = true;
					oax = oa + xx * txa;
					for (j = 0; j < syk!; j++) {
						yy = y + j - syk2;
						if (yy < 0) {
							masky = false;
							yy = 0;
						} else if (yy > maxy) {
							masky = false;
							yy = maxy;
						} else masky = maskx;
						oay = oax + yy * tya;
						for (k = 0; k < szk!; k++) {
							zz = z + k - szk2;
							if (zz < 0) {
								maskz = false;
								zz = 0;
							} else if (zz > maxz) {
								maskz = false;
								zz = maxz;
							} else maskz = masky;
							acc = reduce(
								acc,
								maskz || repeat ? adata[oay + zz * tza] : pad,
								i,
								j,
								k
							);
						}
					}
				}
				odata[ooy + z * tzo] = complete(acc);
			}
		}
	}
	return out;
};

/**
 * Generalized convolution using a set of kenrel functions instead of static
 * kernel tensor (as with {@link convolve}). The kernel function is applied as a
 * windowed reducer. For each window (size defined by the kernel), the
 * {@link KernelSpec.init} function initializes an accumulator value. Then
 * {@link KernelSpec.reduce} is called with the current accumulator, a domain
 * value from tensor `a` and the current kernel coordinates. The final window
 * result is produced by the kernel's {@link KernelSpec.complete} function.
 *
 * @remarks
 * The output tensor has the same shape as domain `a`. If `pad = true`
 * (default), edge values in `a` will be repeated, otherwise padded with given
 * value. If `out` is null, a new tensor will be created using `a`'s storage
 * backend.
 *
 * References:
 *
 * - https://en.wikipedia.org/wiki/Convolution
 * - https://en.wikipedia.org/wiki/Kernel_(image_processing)#Convolution
 *
 * @param out - output tensor
 * @param a - input tensor
 * @param kernel - kernel spec
 * @param pad - padding
 */
export const applyKernel = top<
	<T extends ITensor>(
		out: T | null,
		a: T,
		kernel: KernelSpec,
		pad?: true | number
	) => T
>(1, undefined, <any>applyKernel1, <any>applyKernel2, <any>applyKernel3);
