import { floatBufferFromInt, type FloatBuffer } from "@thi.ng/pixel/float";
import { ABGR8888 } from "@thi.ng/pixel/format/abgr8888";
import { FLOAT_RGB } from "@thi.ng/pixel/format/float-rgb";
import { IntBuffer } from "@thi.ng/pixel/int";

/**
 * Serializes given image to Portable FloatMap format and returns it as byte
 * array. If `littleEndian` is true (default), the pixel values are written in
 * LE order.
 *
 * @remarks
 * If needed, the given image will be automatically converted to
 * [`FLOAT_RGB`](https://docs.thi.ng/umbrella/pixel/variables/FLOAT_RGB.html)
 * format.
 *
 * Format reference: https://pauldebevec.com/Research/HDR/PFM/
 *
 * @param img
 * @param littleEndian
 */
export const asPFM = (img: IntBuffer | FloatBuffer, littleEndian = true) => {
	if (img.format !== FLOAT_RGB) {
		img = floatBufferFromInt(
			(img instanceof IntBuffer ? img : img.as(ABGR8888)).flipY(),
			FLOAT_RGB
		);
	} else {
		img = img.copy().flipY();
	}
	const { width, height, data } = img;
	const header = new TextEncoder().encode(
		`PF\n${width} ${height}\n${littleEndian ? -1 : 1}.0\n`
	);
	const buf = new Uint8Array(header.length + width * height * 3 * 4);
	buf.set(header);
	const view = new DataView(buf.buffer);
	for (let i = 0, n = data.length, offset = header.length; i < n; i++) {
		view.setFloat32(offset + (i << 2), data[i], littleEndian);
	}
	return buf;
	// return new Uint8Array(
	// 	asBytes([
	// 		str(`PF\n${img.width} ${img.height}\n${littleEndian ? -1 : 1}.0\n`),
	// 		f32array(img.data, littleEndian),
	// 	])
	// );
};
