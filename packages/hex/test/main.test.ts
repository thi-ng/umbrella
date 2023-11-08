import { expect, test } from "bun:test";
import {
	U16,
	U16BE,
	U16LE,
	U24,
	U24BE,
	U24LE,
	U32,
	U32BE,
	U32LE,
	U48,
	U48BE,
	U48HL,
	U48LE,
	U64,
	U64BE,
	U64HL,
	U64LE,
} from "../src/index.js";

const BUF = [1, 2, 3, 4, 0x10, 0x20, 0x30, 0x40];

test("U16", () => {
	expect(U16(0xaa55)).toBe("aa55");
	expect(U16BE(BUF, 0)).toBe("0102");
	expect(U16BE(BUF, 4)).toBe("1020");
	expect(U16LE(BUF, 0)).toBe("0201");
	expect(U16LE(BUF, 4)).toBe("2010");
});

test("U24", () => {
	expect(U24(0xffaa55)).toBe("ffaa55");
	expect(U24BE(BUF, 0)).toBe("010203");
	expect(U24BE(BUF, 4)).toBe("102030");
	expect(U24LE(BUF, 0)).toBe("030201");
	expect(U24LE(BUF, 4)).toBe("302010");
});

test("U32", () => {
	expect(U32(0xdecafbad)).toBe("decafbad");
	expect(U32BE(BUF, 0)).toBe("01020304");
	expect(U32BE(BUF, 4)).toBe("10203040");
	expect(U32LE(BUF, 0)).toBe("04030201");
	expect(U32LE(BUF, 4)).toBe("40302010");
});

test("U48", () => {
	expect(U48(0xffeeddccbbaa)).toBe("ffeeddccbbaa");
	expect(U48HL(0xffee, 0xddccbbaa)).toBe("ffeeddccbbaa");
	expect(U48BE(BUF, 0)).toBe("010203041020");
	expect(U48LE(BUF, 0)).toBe("201004030201");
});

test("U64", () => {
	expect(U64(2 ** 53 - 1)).toBe("001fffffffffffff");
	expect(U64HL(0xffeeddcc, 0x88776655)).toBe("ffeeddcc88776655");
	expect(U64BE(BUF, 0)).toBe("0102030410203040");
	expect(U64LE(BUF, 0)).toBe("4030201004030201");
});
