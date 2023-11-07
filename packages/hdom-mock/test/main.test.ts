import { expect, test } from "bun:test";
import { HDOMNode, MockHDOM } from "../src/index.js";

test("node", () => {
	const a = new HDOMNode("div");
	const impl = new MockHDOM(a);
	impl.createTextElement(a, "foo");
	a.appendChild(new HDOMNode("span"));
	impl.createTextElement(a, "bar");
	expect(a.toHiccup()).toEqual(["div", {}, "foo", ["span", {}], "bar"]);
	expect(impl.getChild(a, 0).toHiccup()).toEqual(["span", {}]);
	a.textContent = "foobar";
	expect(impl.getChild(a, 0)).toBeUndefined();
	expect(a.toHiccup()).toEqual(["div", {}, "foobar"]);
});

test("basic diff", () => {
	const opts = { ctx: { button: { class: "bt" } } };
	const impl = new MockHDOM(new HDOMNode("root"));

	const step = (prev: any[], curr: any[], expected: any[]) => {
		impl.diffTree(opts, impl.root, prev, curr);
		expect(impl.root.toHiccup()).toEqual(expected);
	};

	const a = impl.normalizeTree(opts, (ctx: any) => [
		"div#foo.bar",
		["button", { ...ctx.button }, "hi"],
	]);
	const b = impl.normalizeTree(opts, [
		"div#foo2.bar.baz",
		[
			(ctx: any, label: any) => ["button", { ...ctx.button }, label],
			"hello",
		],
		["div", "extra"],
	]);
	const c = impl.normalizeTree(opts, ["div#foo3.baz.bux", ["div", "extra"]]);

	step([], a, [
		"root",
		{},
		[
			"div",
			{ id: "foo", class: "bar", key: "0" },
			["button", { class: "bt", key: "0-0" }, "hi"],
		],
	]);

	step(a, b, [
		"root",
		{},
		[
			"div",
			{ id: "foo2", class: "bar baz", key: "0" },
			["button", { class: "bt", key: "0-0" }, "hello"],
			["div", { key: "0-1" }, ["span", { key: "0-1-0" }, "extra"]],
		],
	]);

	step(b, c, [
		"root",
		{},
		[
			"div",
			{ id: "foo3", class: "baz bux", key: "0" },
			["div", { key: "0-0" }, ["span", { key: "0-0-0" }, "extra"]],
		],
	]);
});
