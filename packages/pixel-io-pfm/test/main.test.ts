import { FloatBuffer, RGB888, intBuffer } from "@thi.ng/pixel";
import { expect, test } from "bun:test";
import { asPFM, readPFM } from "../src/index.js";

const serialized = new Uint8Array([
	80, 70, 10, 50, 32, 50, 10, 45, 49, 46, 48, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 128, 63, 0, 0, 128, 63, 0, 0, 128, 63, 0, 0, 0, 0, 0, 0, 128, 63, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128, 63, 0, 0, 0, 0,
]);

test("write", () => {
	const img = intBuffer(2, 2, RGB888);
	img.data.set([0xff0000, 0x00ff00, 0x0000ff, 0xffff00]);
	expect(asPFM(img)).toEqual(serialized);
});

test("read", () => {
	const img = readPFM(serialized);
	expect(img instanceof FloatBuffer).toBeTrue();
	expect(img.size).toEqual([2, 2]);
	expect(img.data).toEqual(
		new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0])
	);
});
