import { floatBufferFromInt, type FloatBuffer } from "@thi.ng/pixel/float";
import { ABGR8888 } from "@thi.ng/pixel/format/abgr8888";
import { FLOAT_RGB } from "@thi.ng/pixel/format/float-rgb";
import { IntBuffer } from "@thi.ng/pixel/int";

/**
 * Serializes given image to Portable FloatMap format and returns it as byte
 * array.
 *
 * @remarks
 * If `littleEndian` is true (default), the pixel values are written in LE
 * order.
 *
 * If `linearRGB` is true (default), the original pixel values are interpreted
 * as sRGB and will be converted to linear RGB. If false, no conversion occurs.
 *
 * If needed, the given image will be automatically converted to
 * [`FLOAT_RGB`](https://docs.thi.ng/umbrella/pixel/variables/FLOAT_RGB.html)
 * format.
 *
 * Format reference: https://pauldebevec.com/Research/HDR/PFM/
 *
 * @param img
 * @param littleEndian
 * @param linearRGB
 */
export const asPFM = (
	img: IntBuffer | FloatBuffer,
	littleEndian = true,
	linearRGB = true
) => {
	if (img.format !== FLOAT_RGB) {
		img = floatBufferFromInt(
			img instanceof IntBuffer ? img : img.as(ABGR8888),
			FLOAT_RGB
		);
	}
	const {
		width,
		height,
		data,
		stride: [_, strideY],
	} = img;
	const header = new TextEncoder().encode(
		`PF\n${width} ${height}\n${littleEndian ? -1 : 1}.0\n`
	);
	const buf = new Uint8Array(header.length + width * height * 3 * 4);
	const view = new DataView(buf.buffer);
	const process = linearRGB ? __srgbLinear : (x: number) => x;
	buf.set(header);
	// populate in reverse Y-order
	for (
		let src = (height - 1) * strideY, dest = header.length;
		src >= 0;
		src -= strideY
	) {
		for (let x = 0; x < strideY; x++, dest += 4) {
			view.setFloat32(dest, process(data[src + x]), littleEndian);
		}
	}
	return buf;
};

/**
 * Maps a single linear sRGB channel value to linear RGB.
 *
 * @remarks
 * Taken from thi.ng/color.
 *
 * Reference: https://en.wikipedia.org/wiki/SRGB
 *
 * @param x - channel value
 *
 * @internal
 */
const __srgbLinear = (x: number) =>
	x <= 0.04045 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
