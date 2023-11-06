import { expect, test } from "bun:test";
import { chroma, compFilter, cssThemes, luma } from "../src/index.js";

test("compFilter", () => {
	const f1 = chroma(0, 0.25);
	const f2 = luma(0.5, 1, 3);
	const expected = [...cssThemes(54, 112)];
	expect([...cssThemes(f1, f2)]).toEqual(expected);
	expect([...cssThemes(compFilter(f1, f2))]).toEqual(expected);
});
