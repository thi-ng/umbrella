import { expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { stemWord } from "../src/index.js";

test("stem", () => {
	const words = JSON.parse(
		// test fixtures from:
		// https://github.com/maxpatiiuk/porter-stemming/blob/main/src/__tests__/fixtures.json
		readFileSync(import.meta.dir + "/fixtures/stems.json", {
			encoding: "utf-8",
		})
	);
	for (let [word, result] of words) {
		expect(stemWord(word)).toBe(result);
	}
});
