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
 * @param src
 */
export const readPFM = (src: Uint8Array) => {
	const view = new DataView(src.buffer, src.byteOffset, src.byteLength);
	if (view.getUint16(0, false) !== 0x5046) __error();
	if (view.getUint8(2) !== 0x0a) __error();
	const idx = src.indexOf(0x0a, 3);
	if (idx < 0) __error("missing dimensions");
	const [width, height] = new TextDecoder()
		.decode(src.subarray(3, idx))
		.split(" ")
		.map((x) => parseInt(x));
	const idx2 = src.indexOf(0x0a, idx + 1);
	if (idx2 < 0) __error("missing byte order");
	const isLE =
		parseFloat(new TextDecoder().decode(src.subarray(idx, idx2))) < 0;
	const img = floatBuffer(width, height, FLOAT_RGB);
	const offset = idx2 + 1;
	for (let i = 0, n = width * height * 3; i < n; i++) {
		img.data[i] = view.getFloat32(offset + (i << 2), isLE);
	}
	return img.flipY();
};
