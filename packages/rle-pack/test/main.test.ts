import { expect, test } from "bun:test";
import { decode, encode } from "../src/index.js";

const src1k = new Uint8Array(1024);
src1k.set(
	[
		1, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 4, 4, 5, 4, 4, 3, 3, 3, 2, 2, 2, 2,
		1, 1, 1, 1, 1,
	],
	512
);

test("3bit", () => {
	let packed = encode(src1k, src1k.length, 3);
	expect([...packed]).toEqual([
		0, 0, 4, 0, 17, 27, 255, 1, 255, 18, 24, 212, 78, 24, 5, 134, 68, 227,
		82, 30, 3, 196, 0,
	]);
	let dest = decode(packed);
	expect(dest).toEqual(src1k);

	packed = encode(src1k, src1k.length, 3, [1, 2, 4, 9]);
	expect([...packed]).toEqual([
		0, 0, 4, 0, 16, 9, 199, 255, 140, 134, 234, 206, 96, 89, 150, 119, 89,
		15, 241, 0,
	]);
	dest = decode(packed);
	expect(dest).toEqual(src1k);
});
