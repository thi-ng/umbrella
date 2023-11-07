import { repeat, repeatedly } from "@thi.ng/transducers";
import { expect, test } from "bun:test";
import { decodeBytes, encodeBytes } from "../src/index.js";

test("fixed", () => {
	const src = new Uint8Array([10, 20, 30, 10, 10, 10]);
	const dest = encodeBytes(src);
	expect([...dest]).toEqual([10, 10, 224, 160, 49, 91, 88]);
	expect([...src]).toEqual([...decodeBytes(dest)]);
});

test("fuzz", () => {
	for (let i = 0; i < 10; i++) {
		const src = randomArray(640, 1024);
		const dest = encodeBytes(src);
		console.log(`${((dest.length / src.length) * 100).toFixed(2)}%`);
		expect([...src]).toEqual([...decodeBytes(dest)]);
	}
});

const randomArray = (n: number, len: number) =>
	new Uint8Array([
		...repeatedly(() => ~~(Math.random() * 256), n),
		...repeat(0, len - n),
	]);
