// SPDX-License-Identifier: Apache-2.0
import { eqDelta, HALF_PI, rad } from "@thi.ng/math";
import { expect, test } from "bun:test";
import { circularMean } from "../src/index.js";

test("circularMean", () => {
	expect(eqDelta(circularMean([340, 350, 10, 20].map(rad)), 0)).toBeTrue();
	expect(
		eqDelta(circularMean([340, 350, 10, 20, 180].map(rad)), 0)
	).toBeTrue();
	expect(
		eqDelta(circularMean([0, 10, 180, 170].map(rad)), HALF_PI)
	).toBeTrue();
});
