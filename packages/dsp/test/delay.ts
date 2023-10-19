import { group } from "@thi.ng/testament";
import * as assert from "assert";
import { delay, feedbackDelay } from "../src/index.js";

group("delays", {
	delay: () => {
		const line = delay(3);
		assert.strictEqual(line.next(1), 0);
		assert.strictEqual(line.next(2), 0);
		assert.strictEqual(line.next(3), 1);
		assert.strictEqual(line.next(4), 2);
		assert.strictEqual(line.next(5), 3);
		assert.strictEqual(line.next(6), 4);
	},

	feedbackDelay: () => {
		const line = feedbackDelay(3, 0.33);
		assert.strictEqual(line.next(1), 0);
		assert.strictEqual(line.next(2), 0);
		assert.strictEqual(line.next(3), 1);
		assert.strictEqual(line.next(4), 2);
		assert.strictEqual(line.next(5), 3);
		assert.strictEqual(line.next(6), 4.33);
		assert.strictEqual(line.next(7), 5.66);
	},
});
