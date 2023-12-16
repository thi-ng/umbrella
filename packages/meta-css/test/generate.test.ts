import { expect, test } from "bun:test";
import { generateAll } from "../src/generate.js";

test("index items", () => {
	expect(
		generateAll({
			tables: {
				test: { foo: "f", bar: "b" },
			},
			specs: [
				{
					prefix: "pre-",
					index: "v",
					prop: "p",
					items: "test",
					unit: "test",
				},
			],
		})
	).toEqual({
		"pre-foo": { p: "f" },
		"pre-bar": { p: "b" },
	});
});

test("inline items", () => {
	expect(
		generateAll({
			specs: [
				{
					prefix: "pre-",
					index: "v",
					prop: "p",
					items: { foo: "f", bar: "b" },
					unit: null,
				},
			],
		})
	).toEqual({
		"pre-foo": { p: "f" },
		"pre-bar": { p: "b" },
	});
});
