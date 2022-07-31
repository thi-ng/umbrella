import * as assert from "assert";
import { group } from "@thi.ng/testament";
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

group("hex", {
	U16: () => {
		assert.strictEqual(U16(0xaa55), "aa55");
		assert.strictEqual(U16BE(BUF, 0), "0102");
		assert.strictEqual(U16BE(BUF, 4), "1020");
		assert.strictEqual(U16LE(BUF, 0), "0201");
		assert.strictEqual(U16LE(BUF, 4), "2010");
	},

	U24: () => {
		assert.strictEqual(U24(0xffaa55), "ffaa55");
		assert.strictEqual(U24BE(BUF, 0), "010203");
		assert.strictEqual(U24BE(BUF, 4), "102030");
		assert.strictEqual(U24LE(BUF, 0), "030201");
		assert.strictEqual(U24LE(BUF, 4), "302010");
	},

	U32: () => {
		assert.strictEqual(U32(0xdecafbad), "decafbad");
		assert.strictEqual(U32BE(BUF, 0), "01020304");
		assert.strictEqual(U32BE(BUF, 4), "10203040");
		assert.strictEqual(U32LE(BUF, 0), "04030201");
		assert.strictEqual(U32LE(BUF, 4), "40302010");
	},

	U48: () => {
		assert.strictEqual(U48(0xffeeddccbbaa), "ffeeddccbbaa");
		assert.strictEqual(U48HL(0xffee, 0xddccbbaa), "ffeeddccbbaa");
		assert.strictEqual(U48BE(BUF, 0), "010203041020");
		assert.strictEqual(U48LE(BUF, 0), "201004030201");
	},

	U64: () => {
		assert.strictEqual(U64(2 ** 53 - 1), "001fffffffffffff");
		assert.strictEqual(U64HL(0xffeeddcc, 0x88776655), "ffeeddcc88776655");
		assert.strictEqual(U64BE(BUF, 0), "0102030410203040");
		assert.strictEqual(U64LE(BUF, 0), "4030201004030201");
	},
});
