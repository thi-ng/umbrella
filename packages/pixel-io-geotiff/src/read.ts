import { typedArrayType, type TypedArray } from "@thi.ng/api";
import { FLOAT_GRAY_RANGE, FloatBuffer, floatBuffer } from "@thi.ng/pixel";
import { Pool, fromArrayBuffer } from "geotiff";

export interface GeoTiffOpts {
	/**
	 * Raster channel to extract from image.
	 *
	 * @defaultValue 0
	 */
	channel: number;
	/**
	 * Min/max elevation range to configure image pixel format. If omitted, the
	 * range will be auto-computed.
	 */
	range: [number, number];
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
	src: ArrayBufferView,
	opts: Partial<GeoTiffOpts> = {}
) => {
	const tiff = await fromArrayBuffer(src.buffer);
	const tiffImg = await tiff.getImage();
	const width = tiffImg.getWidth();
	const height = tiffImg.getHeight();
	const pool =
		opts.pool instanceof Pool
			? opts.pool
			: opts.pool
			? new Pool()
			: undefined;
	const data = <TypedArray>(
		(await tiffImg.readRasters({ pool, samples: [opts.channel || 0] }))![0]
	);
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
