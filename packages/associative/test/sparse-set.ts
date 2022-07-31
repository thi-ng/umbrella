import { isSet } from "@thi.ng/checks";
import { equiv } from "@thi.ng/equiv";
import { group } from "@thi.ng/testament";
import * as assert from "assert";
import {
	defSparseSet,
	SparseSet16,
	SparseSet32,
	SparseSet8,
} from "../src/index.js";

let set: SparseSet8;

group(
	"SparseSet",
	{
		"factory / max value": () => {
			let a = defSparseSet(0x100);
			a.into([0xff, 0x100]);
			assert.ok(a instanceof SparseSet8, "u8");
			assert.deepStrictEqual([...a], [0xff]);

			a = defSparseSet(0x10000);
			a.into([0xffff, 0x10000]);
			assert.ok(a instanceof SparseSet16, "u16");
			assert.deepStrictEqual([...a], [0xffff]);

			a = defSparseSet(0x10001);
			a.into([0x10000, 0x10001]);
			assert.ok(a instanceof SparseSet32, "u32");
			assert.deepStrictEqual([...a], [0x10000]);
		},

		"ctor(n)": () => {
			assert.ok(isSet(set));
			assert.strictEqual(set.size, 0);
			assert.strictEqual(set.capacity, 8);
		},

		"ctor(arrays)": () => {
			const d = new Uint8Array(8);
			const s = new Uint8Array(8);
			set = new SparseSet8(d, s);
			assert.strictEqual(set.size, 0);
			assert.strictEqual(set.capacity, 8);
			assert.throws(() => new SparseSet8(new Uint8Array(4), s));
		},

		add: () => {
			assert.ok(
				equiv(
					set.into([1, 4, 3, 7, 9, 2, 0, 1, 2]),
					new Set([0, 1, 2, 3, 4, 7])
				)
			);
		},

		delete: () => {
			set.into([1, 4, 3, 7, 9, 2, 0, 1, 2]);
			assert.ok(set.delete(4));
			assert.ok(equiv(set, new Set([0, 1, 2, 3, 7])));
			assert.ok(set.delete(0));
			assert.ok(equiv(set, new Set([1, 2, 3, 7])));
			assert.ok(set.delete(7));
			assert.ok(equiv(set, new Set([1, 2, 3])));
			assert.ok(!set.delete(7));
			assert.ok(!set.delete(4));
			set.add(4);
			assert.ok(equiv(set, new Set([1, 2, 3, 4])));
		},

		has: () => {
			assert.ok(!set.has(0));
			set.add(0);
			set.add(0);
			assert.ok(set.has(0));
			set.delete(0);
			assert.ok(!set.has(0));
			set.into([3, 1, 2]);
		},
	},
	{
		beforeEach: () => {
			set = new SparseSet8(8);
		},
	}
);
