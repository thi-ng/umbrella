import { defError } from "@thi.ng/errors/deferror";
import { floatBuffer } from "@thi.ng/pixel/float";
import { FLOAT_RGB } from "@thi.ng/pixel/format/float-rgb";

export const PFMError = defError(() => `illegal PFM file`);

const __error = (msg?: string) => {
	throw new PFMError(msg);
};

/**
 * Parses given byte array as PFM image and returns it as thi.ng/pixel
 * [`FloatBuffer`](https://docs.thi.ng/umbrella/pixel/classes/FloatBuffer.html).
 *
 * @remarks
 * If `linearRGB` is true (default), the original pixel values are interpreted
 * as linear RGB and will be converted to sRGB in the result image. If false, no
 * conversion occurs.
 *
 * Format reference: https://pauldebevec.com/Research/HDR/PFM/
 *
 * @param buf
 * @param linearRGB
 */
export const readPFM = (buf: Uint8Array, linearRGB = true) => {
	const view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
	if (view.getUint16(0, false) !== 0x5046) __error();
	if (view.getUint8(2) !== 0x0a) __error();
	const idx = buf.indexOf(0x0a, 3);
	if (idx < 0) __error("missing dimensions");
	const [width, height] = new TextDecoder()
		.decode(buf.subarray(3, idx))
		.split(" ")
		.map((x) => parseInt(x));
	if (isNaN(width) || isNaN(height) || width < 1 || height < 1)
		__error("invalid dimensions");
	const idx2 = buf.indexOf(0x0a, idx + 1);
	if (idx2 < 0) __error("missing byte order");
	const littleEndian =
		parseFloat(new TextDecoder().decode(buf.subarray(idx, idx2))) < 0;
	const process = linearRGB ? __linearSrgb : (x: number) => x;
	const img = floatBuffer(width, height, FLOAT_RGB);
	const strideY = img.stride[1];
	for (
		let src = idx2 + 1, dest = (height - 1) * strideY, data = img.data;
		dest >= 0;
		dest -= strideY
	) {
		for (let x = 0; x < strideY; x++, src += 4) {
			data[dest + x] = process(view.getFloat32(src, littleEndian));
		}
	}
	return img;
};

/**
 * Maps a single linear RGB channel value to sRGB.
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
const __linearSrgb = (x: number) =>
	x <= 0.003130805 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055;
