import { group } from "@thi.ng/testament";
import * as assert from "assert";
import { box2, circle2 } from "../src/index.js";

group("geom-sdf", {
	circle: () => {
		const sdf = circle2([100, 200], 10);
		assert.strictEqual(sdf([80, 200]), 10);
		assert.strictEqual(sdf([120, 200]), 10);
		assert.strictEqual(sdf([100, 200]), -10);
		assert.strictEqual(sdf([110, 200]), 0);
	},

	rect: () => {
		const sdf = box2([100, 200], [10, 10]);
		assert.strictEqual(sdf([80, 200]), 10);
		assert.strictEqual(sdf([120, 200]), 10);
		assert.strictEqual(sdf([100, 200]), -10);
		assert.strictEqual(sdf([90, 190]), 0);
	},
});
