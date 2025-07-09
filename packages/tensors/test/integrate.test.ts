// SPDX-License-Identifier: Apache-2.0
import { expect, test } from "bun:test";
import { integrate, product, tensor } from "../src/index.js";

test("integrate", () => {
	const a = tensor([
		[1, 2],
		[10, 20],
		[100, 200],
	]);
	expect([...integrate(null, a)]).toEqual([111, 222]);
	expect([...integrate(null, a, product)]).toEqual([1000, 8000]);
});
