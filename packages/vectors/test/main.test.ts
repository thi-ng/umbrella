import { eqDelta as $eq } from "@thi.ng/math/eqdelta";
import { group } from "@thi.ng/testament";
import * as assert from "assert";
import {
	center,
	eqDelta,
	sd,
	standardize,
	variance,
	vmean,
	vmedian,
} from "../src/index.js";

const SAMPLES = [7, 4, 9, 4, 5, 4, 5, 2];

group("vectors", {
	vmean: () => {
		assert.strictEqual(vmean(SAMPLES), 5);
	},
	vmedian: () => {
		assert.strictEqual(vmedian(SAMPLES), 5);
	},
	center: () => {
		assert.deepStrictEqual(
			center([], SAMPLES),
			[2, -1, 4, -1, 0, -1, 0, -3]
		);
	},
	variance: () => {
		assert.strictEqual(variance(SAMPLES), 4);
	},
	sd: () => {
		assert.ok($eq(sd(SAMPLES), 2.138, 0.001));
	},
	standardize: () => {
		assert.ok(
			eqDelta(
				standardize([], SAMPLES),
				[0.9354, -0.4677, 1.8708, -0.4677, 0, -0.4677, 0, -1.4031],
				0.001
			)
		);
	},
});
