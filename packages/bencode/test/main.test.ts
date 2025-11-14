// SPDX-License-Identifier: Apache-2.0
import { equiv } from "@thi.ng/equiv";
import { expect, test } from "bun:test";
import { decode, encode } from "../src/index.js";

const src = { foo: [1, "a", { bar: "baz" }, [42.123]] };
const src2 = { foo: new Uint8Array([0, 1, 2, 3, 255, 254, 253]) };

test("roundtrip (utf8)", () => {
	let bytes;
	expect((bytes = encode(src))).toEqual(
		new Uint8Array([
			0x64, 0x33, 0x3a, 0x66, 0x6f, 0x6f, 0x6c, 0x69, 0x31, 0x65, 0x31,
			0x3a, 0x61, 0x64, 0x33, 0x3a, 0x62, 0x61, 0x72, 0x33, 0x3a, 0x62,
			0x61, 0x7a, 0x65, 0x6c, 0x66, 0x34, 0x32, 0x2e, 0x31, 0x32, 0x33,
			0x65, 0x65, 0x65, 0x65,
		])
	);
	expect(decode(bytes)).toEqual(src);
});

test("roundtrip (raw)", () => {
	let bytes;
	expect(
		equiv(
			(bytes = encode(src2)),
			[
				0x64, 0x33, 0x3a, 0x66, 0x6f, 0x6f, 0x37, 0x3a, 0x00, 0x01,
				0x02, 0x03, 0xff, 0xfe, 0xfd, 0x65,
			]
		)
	).toBeTrue();
	expect(equiv(decode(bytes, false), src2)).toBeTrue();
});

test("signed int", () => {
	expect(decode(encode(42), false)).toBe(42);
	expect(decode(encode(-42), false)).toBe(-42);
	expect(() =>
		decode(new Uint8Array([0x69, 0x2d, 0x2d, 0x31, 0x65]))
	).toThrow(); // i--1e
	expect(() =>
		decode(new Uint8Array([0x69, 0x2d, 0x31, 0x2e, 0x32, 0x65]))
	).toThrow(); // i-1.2e
});

test("arraylike object", () => {
	expect(decode(encode({ length: 123 }))).toEqual({ length: 123 });
	expect(decode(encode([1, 2, 3]))).toEqual([1, 2, 3]);
});
