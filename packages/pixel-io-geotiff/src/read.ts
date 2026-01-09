// SPDX-License-Identifier: Apache-2.0
import { typedArrayType, type TypedArray } from "@thi.ng/api";
import { clamp } from "@thi.ng/math/interval";
import { FLOAT_GRAY_RANGE, floatBuffer, type FloatBuffer } from "@thi.ng/pixel";
import { Pool, fromArrayBuffer, type GeoTIFFImage } from "geotiff";

export interface GeoTiffOpts {
	/**
	 * Raster channel to extract from image.
	 *
	 * @defaultValue 0
	 */
	channel: number;
	/**
	 * `[min,max]` elevation range to configure image pixel format. If omitted,
	 * the range will be auto-computed. Also see {@link GeoTiffOpts.clamp}.
	 */
	range: [number, number];
	/**
	 * If given, elevations will be pre-clamped to given `[min,max]` range, and
	 * {@link GeoTiffOpts.range} will be auto-computed (if enabled) using these
	 * clamped values.
	 */
	clamp: [number, number];
	/**
	 * Optionally enable geotiff.js worker pool to speed up processing. Disabled
	 * by default.
	 *
	 * @remarks
	 * TODO Submit issue to geotiff.js project re: file URL errors in NodeJS
	 *
	 * If given as number, a worker pool with `n` workers will be created. If
	 * `true`, the default number of workers will be used.
	 */
	pool: boolean | number | Pool;
}

export const readGeoTiff = async (
	src: ArrayBufferView<ArrayBuffer>,
	opts: Partial<GeoTiffOpts> = {}
): Promise<{ img: FloatBuffer; tiff: GeoTIFFImage }> => {
	const tiff = await fromArrayBuffer(src.buffer);
	const tiffImg = await tiff.getImage();
	const width = tiffImg.getWidth();
	const height = tiffImg.getHeight();
	const pool =
		opts.pool instanceof Pool
			? opts.pool
			: opts.pool
			? new Pool(typeof opts.pool === "number" ? opts.pool : undefined)
			: undefined;
	const data = <TypedArray>(
		(await tiffImg.readRasters({ pool, samples: [opts.channel || 0] }))![0]
	);
	if (opts.clamp) {
		const [min, max] = opts.clamp;
		for (let i = 0, n = data.length; i < n; i++)
			data[i] = clamp(data[i], min, max);
	}
	const type = typedArrayType(data);
	const [min, max] = opts.range
		? opts.range
		: (<Float32Array>data).reduce(
				(acc: number[], x) => {
					acc[0] = Math.min(acc[0], x);
					acc[1] = Math.max(acc[1], x);
					return acc;
				},
				[Infinity, -Infinity]
		  );
	const fmt = FLOAT_GRAY_RANGE(min, max);
	let img: FloatBuffer;
	switch (type) {
		case "i8":
		case "u8":
		case "i16":
		case "u16":
		case "i32":
		case "u32":
			img = floatBuffer(width, height, fmt, new Float32Array(data));
			break;
		case "f32":
			img = floatBuffer(width, height, fmt, <Float32Array>data);
			break;
		case "f64":
			img = floatBuffer(width, height, fmt, new Float32Array(data));
			break;
	}
	return { img: img!, tiff: tiffImg };
};
