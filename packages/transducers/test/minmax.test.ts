import { expect, test } from "bun:test";
import { maxCompare, minCompare } from "../src/index.js";

test("minCompare", () => {
	expect(
		minCompare(
			() => ({ id: Infinity }),
			(a, b) => a.id - b.id,
			[{ id: 5 }, { id: -3 }, { id: 42 }, { id: -55 }, { id: 10 }]
		)
	).toEqual({ id: -55 });
});

test("maxCompare", () => {
	expect(
		maxCompare(
			() => ({ id: -Infinity }),
			(a, b) => a.id - b.id,
			[{ id: 5 }, { id: -3 }, { id: 42 }, { id: -55 }, { id: 10 }]
		)
	).toEqual({ id: 42 });
});
