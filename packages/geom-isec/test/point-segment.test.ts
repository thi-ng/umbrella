import { group } from "@thi.ng/testament";
import * as assert from "assert";
import { pointInSegment } from "../src/index.js";

group("pointInSegment", {
	"2d": () => {
		assert.ok(pointInSegment([0, 0], [-10, -10], [10, 10]), "1");
		assert.ok(pointInSegment([-5, -5], [-10, -10], [10, 10]), "2");
		assert.ok(pointInSegment([5, 5], [-10, -10], [10, 10]), "3");
		assert.ok(!pointInSegment([5, 5.01], [-10, -10], [10, 10]), "4");
		assert.ok(pointInSegment([5, 5.01], [-10, -10], [10, 10], 0.01), "4.1");
		assert.ok(pointInSegment([5, 4.99], [-10, -10], [10, 10], 0.01), "4.2");
		assert.ok(
			!pointInSegment([5, 5.02], [-10, -10], [10, 10], 0.01),
			"4.3"
		);
		assert.ok(
			!pointInSegment([5, 4.98], [-10, -10], [10, 10], 0.01),
			"4.4"
		);
	},

	"2d axis aligned": () => {
		assert.ok(pointInSegment([9, 10], [5, 10], [10, 10]), "1");
		assert.ok(pointInSegment([9, 10], [10, 10], [5, 10]), "1.1");
		assert.ok(pointInSegment([10, 9], [10, 5], [10, 10]), "2");
		assert.ok(pointInSegment([10, 9], [10, 10], [10, 5]), "2.1");
		assert.ok(pointInSegment([4.9, 10], [5, 10], [10, 10], 0.1), "3");
		assert.ok(!pointInSegment([4.89, 10], [5, 10], [10, 10], 0.1), "3.1");
		assert.ok(pointInSegment([10.1, 10], [5, 10], [10, 10], 0.1), "3.2");
		assert.ok(!pointInSegment([10.11, 10], [5, 10], [10, 10], 0.1), "3.3");
		assert.ok(pointInSegment([9, 10.1], [5, 10], [10, 10], 0.1), "4");
		assert.ok(!pointInSegment([9, 10.11], [5, 10], [10, 10], 0.1), "4.1");
		assert.ok(pointInSegment([9, 9.9], [5, 10], [10, 10], 0.1), "4.2");
		assert.ok(!pointInSegment([9, 9.89], [5, 10], [10, 10], 0.1), "4.3");
	},
});
