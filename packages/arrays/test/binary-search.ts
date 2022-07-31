import type { FnO } from "@thi.ng/api";
import { group } from "@thi.ng/testament";
import * as assert from "assert";
import { binarySearch, bsEQ, bsGE, bsGT, bsLE, bsLT } from "../src/index.js";

const src = [10, 20, 30, 40];
const tests = [5, 10, 15, 20, 25, 45];

const checkPred = (pred: FnO<number, number>, res: number[]) => {
	for (let i = tests.length; --i >= 0; ) {
		assert.strictEqual(
			pred(binarySearch(src, tests[i]), src.length),
			res[i]
		);
	}
};

group("binarySearch", {
	lt: () => {
		checkPred(bsLT, [-1, -1, 0, 0, 1, 3]);
	},
	le: () => {
		checkPred(bsLE, [-1, 0, 0, 1, 1, 3]);
	},
	gt: () => {
		checkPred(bsGT, [0, 1, 1, 2, 2, -1]);
	},
	ge: () => {
		checkPred(bsGE, [0, 0, 1, 1, 2, -1]);
	},
	eq: () => {
		checkPred(bsEQ, [-1, 0, -1, 1, -1, -1]);
	},
});
