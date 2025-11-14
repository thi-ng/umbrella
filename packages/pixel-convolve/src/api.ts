// SPDX-License-Identifier: Apache-2.0
import type { FloatArray, Fn, Fn3, FnN3, NumericArray } from "@thi.ng/api";
import type { IPixelBuffer } from "@thi.ng/pixel";

export type PoolTemplate = Fn3<string[], number, number, string>;

export interface ConvolutionKernelSpec {
	/**
	 * Kernel coefficients.
	 */
	spec: NumericArray;
	/**
	 * Kernel size. If given as number, expands to `[size, size]`.
	 */
	size: number | [number, number];
}

export interface PoolKernelSpec {
	/**
	 * Code template function for {@link defKernel}.
	 */
	pool: PoolTemplate;
	/**
	 * Kernel size. If given as number, expands to `[size, size]`.
	 */
	size: number | [number, number];
}

export interface KernelFnSpec {
	/**
	 * Kernel factory.
	 */
	fn: Fn<IPixelBuffer<FloatArray, NumericArray>, FnN3>;
	/**
	 * Kernel size. If given as number, expands to `[size, size]`.
	 */
	size: number | [number, number];
}

export type KernelSpec = ConvolutionKernelSpec | PoolKernelSpec | KernelFnSpec;

export interface ConvolveOpts {
	/**
	 * Convolution kernel details/implementation.
	 */
	kernel: KernelSpec;
	/**
	 * Channel ID to convolve.
	 *
	 * @defaultValue 0
	 */
	channel?: number;
	/**
	 * Result scale factor
	 *
	 * @defaultValue 1
	 */
	scale?: number;
	/**
	 * Step size to process only every nth pixel.
	 *
	 * @defaultValue 1
	 */
	stride?: number | [number, number];
	/**
	 * Pixel read offset, only to be used for pooling operations. Should be set
	 * to `kernelSize/2`, and for the X-axis MUST be in `[0,stride)` interval.
	 */
	offset?: number | [number, number];
}

export interface NormalMapOpts {
	/**
	 * Channel ID to use for gradient extraction in source image.
	 *
	 * @defaultValue 0
	 */
	channel: number;
	/**
	 * Step size (aka number of pixels) between left/right, top/bottom
	 * neighbors.
	 *
	 * @defaultValue 0
	 */
	step: number;
	/**
	 * Result gradient scale factor(s).
	 *
	 * @defaultValue 1
	 */
	scale: number | [number, number];
	/**
	 * Z-axis value to use in blue channel of normal map.
	 *
	 * @defaultValue 1
	 */
	z: number;
}
