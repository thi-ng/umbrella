import type { FnO } from "@thi.ng/api";
import { expect, test } from "bun:test";
import { binarySearch, bsEQ, bsGE, bsGT, bsLE, bsLT } from "../src/index.js";

const src = [10, 20, 30, 40];
const tests = [5, 10, 15, 20, 25, 45];

const checkPred = (pred: FnO<number, number>, res: number[]) => {
	for (let i = tests.length; --i >= 0; ) {
		expect(pred(binarySearch(src, tests[i]), src.length)).toEqual(res[i]);
	}
};

test("binarySearch lt", () => {
	checkPred(bsLT, [-1, -1, 0, 0, 1, 3]);
});
test("binarySearch le", () => {
	checkPred(bsLE, [-1, 0, 0, 1, 1, 3]);
});
test("binarySearch gt", () => {
	checkPred(bsGT, [0, 1, 1, 2, 2, -1]);
});
test("binarySearch ge", () => {
	checkPred(bsGE, [0, 0, 1, 1, 2, -1]);
});
test("binarySearch eq", () => {
	checkPred(bsEQ, [-1, 0, -1, 1, -1, -1]);
});
