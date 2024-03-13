import { isUUID } from "@thi.ng/checks";
import { expect, test } from "bun:test";
import { Router } from "../src/index.js";

test("router", () => {
	const router = new Router({
		routes: [
			{ id: "a", match: ["a"] },
			{ id: "a-id", match: ["a", "?id"] },
			{ id: "a-id-c", match: ["a", "?id", "c"] },
			{ id: "missing", match: [] },
		],
		default: "missing",
	});

	expect(router.route("/b")).toEqual({ id: "missing", redirect: true });
	expect(router.route("/a")).toEqual({ id: "a" });
	expect(router.route("/a/123")).toEqual({
		id: "a-id",
		params: { id: "123" },
	});
	expect(router.route("/a/456/c")).toEqual({
		id: "a-id-c",
		params: { id: "456" },
	});

	router.addRoutes([{ id: "b", match: ["b"] }]);
	expect(router.route("/b")).toEqual({ id: "b" });

	// ensure route reverse index has been updated too
	expect(router.format("b")).toBe("/b");

	expect(() => router.addRoutes([{ id: "b", match: ["b"] }])).toThrow();
});

test("auth", () => {
	type Ctx = { user: string };
	const router = new Router<Ctx>({
		authenticator: (match, _, ctx) =>
			ctx?.user == "admin" ? match : { id: "login", redirect: true },
		routes: [
			{ id: "admin", match: ["admin", "?module"], auth: true },
			{ id: "login", match: ["login"] },
			{ id: "missing", match: [] },
		],
		default: "missing",
	});

	expect(router.route("/admin/dashboard")).toEqual({
		id: "login",
		redirect: true,
	});
	expect(router.route("/admin/dashboard", { user: "admin" })).toEqual({
		id: "admin",
		params: { module: "dashboard" },
	});
	expect(router.route("/foo", { user: "admin" })).toEqual({
		id: "missing",
		redirect: true,
	});
});

test("string defs", () => {
	const $ = (match: string) =>
		new Router({
			routes: [
				{ id: "a", match },
				{ id: "b", match: [] },
			],
			default: "b",
		}).routeForID("a")?.match;

	expect(() => $("/")).toThrow();
	expect($("/a/")).toEqual(["a"]);
	expect($("/a/?id/b")).toEqual(["a", "?id", "b"]);
	expect($("/a/?id/+")).toEqual(["a", "?id", "+"]);
});

test("rest args", () => {
	const router = new Router({
		routes: [
			{ id: "a", match: ["a", "?x", "+"] },
			{ id: "home", match: [] },
		],
		prefix: "/prefix/",
		default: "home",
	});
	expect(router.route("/prefix/a/1/2/3")).toEqual({
		id: "a",
		params: { x: "1" },
		rest: ["2", "3"],
	});

	expect(router.format("a", { x: 10 }, ["x", "y"])).toBe("/prefix/a/10/x/y");
});

test("readme", () => {
	const router = new Router({
		default: "home",
		routes: [
			{ id: "home", match: "/home" },
			{
				id: "user-profile",
				match: "/users/?id",
				validate: {
					id: {
						coerce: (x) => parseInt(x),
						check: (x) => x > 0 && x < 100,
					},
				},
			},
			{
				id: "image",
				match: "/images/?id/?size",
				validate: {
					id: {
						check: (x) => isUUID(x),
					},
					size: {
						check: (x) => /^(s|m|l|xl)$/.test(x),
					},
				},
			},
			{
				id: "group-list",
				// matches only: "/users" or "/images"
				match: "/?type",
				validate: {
					type: {
						check: (x) => /^(users|images)$/.test(x),
					},
				},
			},
		],
	});
	expect(router.route("/users/42")).toEqual({
		id: "user-profile",
		params: { id: 42 },
	});
	// fails because user ID > 100
	expect(router.route("/users/101")).toEqual({ id: "home", redirect: true });
	expect(
		router.route("/images/2d98c864-9c7e-491c-9758-3fa345e49a56/xl")
	).toEqual({
		id: "image",
		params: { id: "2d98c864-9c7e-491c-9758-3fa345e49a56", size: "xl" },
	});
	// fail because no UUID
	expect(router.route("/images/101/xl")).toEqual({
		id: "home",
		redirect: true,
	});
	expect(router.route("/images")).toEqual({
		id: "group-list",
		params: {
			type: "images",
		},
	});
	expect(router.route("/home")).toEqual({ id: "home" });
	expect(router.route("/missing")).toEqual({ id: "home", redirect: true });
});
