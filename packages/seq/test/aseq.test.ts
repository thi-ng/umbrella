import { group } from "@thi.ng/testament";
import * as assert from "assert";
import { aseq } from "../src/index.js";

group("aseq", {
	basics: () => {
		assert.strictEqual(aseq(null), undefined);
		assert.strictEqual(aseq([]), undefined);
		assert.strictEqual(aseq([1])!.first(), 1);
		assert.strictEqual(aseq([1])!.next(), undefined);
		assert.strictEqual(aseq([1, 2])!.first(), 1);
		// prettier-ignore
		assert.strictEqual(aseq([1, 2])!.next()!.first(), 2);
		// prettier-ignore
		assert.strictEqual(aseq([1, 2])!.next()!.next(), undefined);
		// prettier-ignore
		assert.strictEqual(aseq([1, 2, 3])!.next()!.next()!.first(), 3);
	},

	range: () => {
		assert.strictEqual(aseq([0, 1, 2, 3], 2, 2), undefined);
		assert.strictEqual(aseq([0, 1, 2, 3], 3, 2), undefined);
		assert.strictEqual(aseq([0, 1, 2, 3], 2, 4)!.first(), 2);
		// prettier-ignore
		assert.strictEqual(aseq([0, 1, 2, 3], 2, 4)!.next()!.first(), 3);
		// prettier-ignore
		assert.strictEqual(aseq([0, 1, 2, 3], 2, 4)!.next()!.next(), undefined);
	},
});
