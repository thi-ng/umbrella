// SPDX-License-Identifier: Apache-2.0
import { expect, test } from "bun:test";
import { sanitize } from "../src/index.js";

test("hiccup-sanitize", () => {
	const doc = [
		"div",
		{ id: "foo", class: "a", onerror: "alert(1)" },
		["span", {}, "b"],
		["p", {}, "c", ["br", {}], "d"],
	];
	expect(
		sanitize(doc, {
			removeAttribs: ["id", /^on\w+/],
			removeElements: ["span", "br"],
		})
	).toEqual(["div", { class: "a" }, ["p", {}, "c", "d"]]);
	expect(
		sanitize(doc, {
			keepAttribs: ["id", "class"],
			keepElements: ["div"],
		})
	).toEqual(["div", { id: "foo", class: "a" }]);

	expect(
		sanitize(doc, {
			keepElements: ["p"],
		})
	).toEqual(null);
	expect(
		sanitize(doc, {
			keepAttribs: ["id"],
			keepElements: ["div"],
		})
	).toEqual(["div", { id: "foo" }]);
});
