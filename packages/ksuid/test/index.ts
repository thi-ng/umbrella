import { XsAdd } from "@thi.ng/random";
import { group } from "@thi.ng/testament";
import * as assert from "assert";
import { defKSUID32, defKSUID64, defULID, IKSUID } from "../src/index.js";

const check = (
	id: IKSUID,
	eps: number,
	buf: Uint8Array,
	epochBuf: Uint8Array
) => {
	const t = Date.now();
	const a = id.timeOnly(t);
	assert.strictEqual(a.length, id.encodedSize);
	let res = id.parse(a);
	assert.ok(Math.abs(res.epoch - t) < eps);
	assert.deepStrictEqual(res.id, new Uint8Array(id.size - id.epochSize));
	const b = id.nextBinary();
	assert.deepStrictEqual(b.slice(id.epochSize), buf);
	res = id.parse(id.format(b));
	assert.ok(Math.abs(res.epoch - t) < eps);
	assert.deepStrictEqual(res.id, buf);
	assert.deepStrictEqual(id.fromEpochBinary(1673827200000), epochBuf);
};

group("ksuid", {
	ksuid32: () => {
		check(
			defKSUID32({ rnd: new XsAdd(0xdecafbad) }),
			1000 * 2,
			new Uint8Array([
				170, 213, 122, 63, 189, 122, 161, 143, 91, 187, 80, 231, 61, 17,
				112, 238,
			]),
			new Uint8Array([
				4, 102, 131, 128, 226, 90, 28, 179, 222, 71, 112, 20, 59, 2, 22,
				112, 98, 25, 104, 28,
			])
		);
	},

	ksuid64: () => {
		check(
			defKSUID64({ rnd: new XsAdd(0xdecafbad) }),
			1 * 2,
			new Uint8Array([
				189, 122, 161, 143, 91, 187, 80, 231, 61, 17, 112, 238,
			]),
			new Uint8Array([
				0, 0, 0, 17, 48, 113, 172, 0, 59, 2, 22, 112, 98, 25, 104, 28,
				170, 213, 122, 63,
			])
		);
	},

	ulid: () => {
		check(
			defULID({ rnd: new XsAdd(0xdecafbad) }),
			1 * 2,
			new Uint8Array([161, 143, 91, 187, 80, 231, 61, 17, 112, 238]),
			new Uint8Array([
				1, 133, 183, 224, 44, 0, 98, 25, 104, 28, 170, 213, 122, 63,
				189, 122,
			])
		);
	},
});
