import { group } from "@thi.ng/testament";
import * as assert from "assert";
import { asPFM, readPFM } from "../src/index.js";
import { FloatBuffer, RGB888, intBuffer } from "@thi.ng/pixel";

const serialized = new Uint8Array([
	80, 70, 10, 50, 32, 50, 10, 45, 49, 46, 48, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 128, 63, 0, 0, 128, 63, 0, 0, 128, 63, 0, 0, 0, 0, 0, 0, 128, 63, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128, 63, 0, 0, 0, 0,
]);

group("pixel-io-pfm", {
	write: () => {
		const img = intBuffer(2, 2, RGB888);
		img.data.set([0xff0000, 0x00ff00, 0x0000ff, 0xffff00]);
		assert.deepStrictEqual(asPFM(img), serialized);
	},

	read: () => {
		const img = readPFM(serialized);
		assert.ok(img instanceof FloatBuffer);
		assert.deepStrictEqual(img.size, [2, 2]);
		assert.deepStrictEqual(
			img.data,
			new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0])
		);
	},
});
