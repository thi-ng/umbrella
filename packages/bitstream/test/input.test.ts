import { expect, test } from "bun:test";
import { BitInputStream } from "../src/index.js";

let src = new Uint8Array([
	0xbe, 0xef, 0xde, 0xca, 0xfb, 0xad, 0xf0, 0x0b, 0xaa,
]);

test("iterator", () => {
	expect([...new BitInputStream(src)].join("")).toBe(
		"101111101110111111011110110010101111101110101101111100000000101110101010"
	);
	expect([...new BitInputStream(src, 0, 18)].join("")).toBe(
		"101111101110111111"
	);
	expect([...new BitInputStream(src, 49)].join("")).toBe(
		"11100000000101110101010"
	);
	expect([...new BitInputStream(src, 49, 49 + 12)].join("")).toBe(
		"111000000001"
	);
	expect(() => new BitInputStream(new Uint8Array(0))).toThrow();
});

test("read", () => {
	let i = new BitInputStream(src);
	expect(i.read(4)).toBe(0xb);
	expect(i.read(8)).toBe(0xee);
	expect(i.read(1)).toBe(0x1);
	expect(i.read(3)).toBe(0x7);
	expect(i.read(44)).toBe(15310211702528);
	expect(i.read(5)).toBe(0x17);
	expect(i.read(7)).toBe(0x2a);
	expect(() => i.read(1)).toThrow();
});

test("readBit", () => {
	let i = new BitInputStream(new Uint8Array([0xaa, 0xf0]), 4, 12);
	expect(i.readBit()).toBe(1);
	expect(i.readBit()).toBe(0);
	expect(i.readBit()).toBe(1);
	expect(i.readBit()).toBe(0);
	expect(i.readBit()).toBe(1);
	expect(i.readBit()).toBe(1);
	expect(i.readBit()).toBe(1);
	expect(i.readBit()).toBe(1);
	expect(() => i.readBit()).toThrow();
});

test("mapBitfields", () => {
	expect(
		new BitInputStream(src)
			.readFields([4, 8, 1, 3, 44, 5, 7])
			.map((x) => x.toString(16))
	).toEqual(["b", "ee", "1", "7", "decafbadf00", "17", "2a"]);
});

test("position", () => {
	let src = new Uint8Array(2);
	let i = new BitInputStream(src);
	expect((i.read(15), i.position)).toBe(15);
	expect(() => i.read(1)).not.toThrow();
	expect(i.position).toBe(16);
	expect(() => i.read(1)).toThrow();
	expect(i.position).toBe(16);
	expect(() => new BitInputStream(src, 16)).toThrow();
	expect(() => i.read(1)).toThrow();
});
