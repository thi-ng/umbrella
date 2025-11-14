// SPDX-License-Identifier: Apache-2.0
import { expect, test } from "bun:test";
import { repeatedly } from "@thi.ng/transducers";
import { linear, type Frame } from "../src/index.js";

test("at", () => {
	const makeRamp = (n: number) => {
		const r = linear([...repeatedly((i) => <Frame<number>>[i, i], n)]);
		expect(r.at(-1)).toBe(0);
		expect(r.at(n)).toBe(n - 1);
		return r;
	};
	const a = makeRamp(100);
	expect(a.at(55.5)).toBe(55.5);
	// testing binary search for nearest index
	const b = makeRamp(300);
	expect(b.at(55.5)).toBe(55.5);
	expect(b.at(255.5)).toBe(255.5);
	expect(b.at(260)).toBe(260);
	expect(b.at(260.5)).toBe(260.5);
});
