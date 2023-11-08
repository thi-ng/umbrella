import { expect, test } from "bun:test";
import { filterFuzzy } from "../src/index.js";

test("strings", () => {
	const opts = ["hello", "hallo", "hey", "heyoka"];
	expect([...filterFuzzy("hl", opts)]).toEqual(["hello", "hallo"]);
	expect([...filterFuzzy("he", opts)]).toEqual(["hello", "hey", "heyoka"]);
	expect([...filterFuzzy("ho", opts)]).toEqual(["hello", "hallo", "heyoka"]);
	expect([...filterFuzzy("hey", opts)]).toEqual(["hey", "heyoka"]);
	expect([...filterFuzzy("hk", opts)]).toEqual(["heyoka"]);
});

test("arrays", () => {
	const opts = [
		[1, 2, 3],
		[1, 3, 4],
		[4, 5, 6],
		[1, 3, 6],
	];
	expect([...filterFuzzy([1, 3], opts)]).toEqual([
		[1, 2, 3],
		[1, 3, 4],
		[1, 3, 6],
	]);
	expect([...filterFuzzy([4], opts)]).toEqual([
		[1, 3, 4],
		[4, 5, 6],
	]);
	expect([...filterFuzzy([3, 6], opts)]).toEqual([[1, 3, 6]]);
	expect([...filterFuzzy([], opts)]).toEqual(opts);
});
