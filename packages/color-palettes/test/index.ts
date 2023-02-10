import { group } from "@thi.ng/testament";
import * as assert from "assert";
import { chroma, compFilter, cssThemes, luma } from "../src/index.js";

group("palettes", {
	compFilter: () => {
		const f1 = chroma(0, 0.25);
		const f2 = luma(0.5, 1, 3);
		const expected = [...cssThemes(54, 112)];
		assert.deepStrictEqual([...cssThemes(f1, f2)], expected);
		assert.deepStrictEqual([...cssThemes(compFilter(f1, f2))], expected);
	},
});
