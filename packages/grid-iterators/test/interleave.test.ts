// SPDX-License-Identifier: Apache-2.0
import { expect, test } from "bun:test";
import { interleaveColumns2d, interleaveRows2d } from "../src/index.js";

test("interleaveColumns2d", () => {
	expect(
		[...interleaveColumns2d({ cols: 4, rows: 6, step: 3 })].join(" | ")
	).toEqual(
		"0,0 | 0,1 | 0,2 | 0,3 | 0,4 | 0,5 | 3,0 | 3,1 | 3,2 | 3,3 | 3,4 | 3,5 | 1,0 | 1,1 | 1,2 | 1,3 | 1,4 | 1,5 | 2,0 | 2,1 | 2,2 | 2,3 | 2,4 | 2,5"
	);
});

test("interleaveRows2d", () => {
	expect(
		[...interleaveRows2d({ cols: 4, rows: 6, step: 3 })].join(" | ")
	).toEqual(
		"0,0 | 1,0 | 2,0 | 3,0 | 0,3 | 1,3 | 2,3 | 3,3 | 0,1 | 1,1 | 2,1 | 3,1 | 0,4 | 1,4 | 2,4 | 3,4 | 0,2 | 1,2 | 2,2 | 3,2 | 0,5 | 1,5 | 2,5 | 3,5"
	);
});
