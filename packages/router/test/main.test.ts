import { expect, test } from "bun:test";
import { BasicRouter } from "../src/index.js";

test("router", () => {
	const router = new BasicRouter({
		routes: [
			{ id: "a", match: ["a"] },
			{ id: "a-id", match: ["a", "?id"] },
			{ id: "a-id-c", match: ["a", "?id", "c"] },
			{ id: "missing", match: [] },
		],
		defaultRouteID: "missing",
	});

	expect(router.route("/b")).toEqual({
		id: "missing",
		params: {},
		title: undefined,
	});
	expect(router.route("/a")).toEqual({
		id: "a",
		params: {},
		title: undefined,
	});
	expect(router.route("/a/123")).toEqual({
		id: "a-id",
		params: { id: "123" },
		title: undefined,
	});
	expect(router.route("/a/456/c")).toEqual({
		id: "a-id-c",
		params: { id: "456" },
		title: undefined,
	});

	router.addRoutes([{ id: "b", match: ["b"] }]);
	expect(router.route("/b")).toEqual({
		id: "b",
		params: {},
		title: undefined,
	});

	expect(() => router.addRoutes([{ id: "b", match: ["b"] }])).toThrow();
});
