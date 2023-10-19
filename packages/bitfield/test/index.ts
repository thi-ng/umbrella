import { group } from "@thi.ng/testament";
import * as assert from "assert";
import { defBitField } from "../src/index.js";

group("bitfield", {
  "setAt (boolean)": () => {
		const bf = defBitField(8);
		assert.ok(!bf.at(1));
		bf.setAt(1, true);
		assert.ok(!!bf.at(1));
	},
  
	"setAt (number)": () => {
		const bf = defBitField(8);
		assert.ok(!bf.at(1));
		bf.setAt(1, 4);
		assert.ok(!!bf.at(1));
	},
  
	positions: () => {
		assert.deepStrictEqual(
			[
				// prettier-ignore
				...defBitField([
					0, 0, 1, 0, 1, 0, 1, 1,
					0, 0, 0, 0, 0, 0, 0, 0,
					0, 0, 0, 0, 0, 1, 0, 0,
					1, 1,
				]).positions(),
			],
			[2, 4, 6, 7, 21, 24, 25]
		);
	},

	similarity: () => {
		const bits = [0, 1, 1, 0, 1, 0];
		const a = defBitField(bits);
		assert.strictEqual(a.similarity(a), 1);
		assert.strictEqual(a.similarity(bits), 1);
		assert.strictEqual(
			a.similarity([0, 1, 0, 0, 1, 0]).toFixed(3),
			(2 / 3).toFixed(3)
		);
		assert.strictEqual(
			a.similarity([0, 0, 1, 0, 0, 0]).toFixed(3),
			(1 / 3).toFixed(3)
		);
		assert.strictEqual(a.similarity([0, 0, 0, 0, 0, 0]), 0);
		assert.throws(() => a.similarity([]));
	},
});
