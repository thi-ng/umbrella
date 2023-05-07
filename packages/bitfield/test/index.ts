import { group } from "@thi.ng/testament";
import * as assert from "assert";
import { BitField } from "../src/index.js"

group("bitfield", {
	'setAt (boolean)': () => {
		const bf = new BitField(8);
		assert.ok(!bf.at(1));
		bf.setAt(1, true);
		assert.ok(!!bf.at(1));
	},
	'setAt (number)': () => {
		const bf = new BitField(8);
		assert.ok(!bf.at(1));
		bf.setAt(1, 4);
		assert.ok(!!bf.at(1));
	}
});
