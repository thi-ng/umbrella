import { expect, test } from "bun:test";
import { BitOutputStream } from "../src/index.js";

test("write", () => {
	let o = new BitOutputStream(8);
	expect([...o.write(0xff, 1).buffer]).toEqual([0x80, 0, 0, 0, 0, 0, 0, 0]);
	expect([...o.write(0xff, 2).buffer]).toEqual([0xe0, 0, 0, 0, 0, 0, 0, 0]);
	expect([...o.write(0xff, 4).buffer]).toEqual([0xfe, 0, 0, 0, 0, 0, 0, 0]);
	expect([...o.write(0xff, 8).buffer]).toEqual([
		0xff, 0xfe, 0, 0, 0, 0, 0, 0,
	]);
	expect([...o.write(0, 1).buffer]).toEqual([0xff, 0xfe, 0, 0, 0, 0, 0, 0]);
	expect([...o.write(0xdecafbad, 16).buffer]).toEqual([
		0xff, 0xfe, 0xfb, 0xad, 0, 0, 0, 0,
	]);
	expect([...o.write(0xdecafbad, 32).buffer.slice(0, 8)]).toEqual([
		0xff, 0xfe, 0xfb, 0xad, 0xde, 0xca, 0xfb, 0xad,
	]);
	o = new BitOutputStream(8, 4);
	expect([...o.write(0xf00baaf00b, 40).buffer]).toEqual([
		0x0f, 0x0, 0xba, 0xaf, 0x00, 0xb0, 0, 0,
	]);
});

test("writeBit", () => {
	let o = new BitOutputStream(1);
	expect([...o.writeBit(1).buffer]).toEqual([0x80]);
	expect([...o.writeBit(1).buffer]).toEqual([0xc0]);
	expect([...o.writeBit(1).buffer]).toEqual([0xe0]);
	expect([...o.writeBit(0).buffer]).toEqual([0xe0]);
	expect([...o.writeBit(1).buffer]).toEqual([0xe8]);
	expect([...o.writeBit(1).buffer]).toEqual([0xec]);
	expect([...o.writeBit(1).buffer]).toEqual([0xee]);
	expect([...o.writeBit(1).buffer]).toEqual([0xef, 0x00]);
	expect(o.buffer.length).toBe(2);
	expect([...o.writeBit(1).buffer]).toEqual([0xef, 0x80]);
	expect([...o.seek(0).writeBit(0).buffer]).toEqual([0x6f, 0x80]);
	expect([...o.seek(0).writeBit(1).buffer]).toEqual([0xef, 0x80]);
	expect([...o.write(0, 4).buffer]).toEqual([0x87, 0x80]);
});

test("bytes", () => {
	expect([...new BitOutputStream().bytes()]).toEqual([]);
	expect([...new BitOutputStream(1, 7).bytes()]).toEqual([0]);
	expect([...new BitOutputStream(2, 8).bytes()]).toEqual([0]);
	expect([...new BitOutputStream(2, 9).bytes()]).toEqual([0, 0]);
});
