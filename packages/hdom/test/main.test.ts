import { defAtom, defView } from "@thi.ng/atom";
import { derefContext } from "@thi.ng/hiccup";
import { map, range } from "@thi.ng/iterators";
import { expect, test } from "bun:test";
import { normalizeTree } from "../src/index.js";

const _check = (a: any, b: any, ctx: any = null) =>
	expect(normalizeTree({ ctx, keys: false, span: false }, a)).toEqual(b);

const check = (id: string, a: any, b: any) => test(id, () => _check(a, b));

check("undefined", undefined, undefined);

check("null", null, undefined);

check("empty tree", [], undefined);

check("simple div", ["div", "foo"], ["div", {}, "foo"]);

check("emmet id", ["div#foo", "hi"], ["div", { id: "foo" }, "hi"]);

check("emmet id + id attr", ["div#foo", { id: "bar" }], ["div", { id: "foo" }]);

check(
	"emmet id + class",
	["div#id.foo.bar", "hi"],
	["div", { id: "id", class: "foo bar" }, "hi"]
);

check(
	"emmet class + class attr",
	["div.foo.bar", { class: "baz" }],
	["div", { class: "foo bar baz" }]
);

check(
	"emmet id + class + attrib",
	["div#id.foo.bar", { extra: 23 }, "hi"],
	["div", { id: "id", class: "foo bar", extra: 23 }, "hi"]
);

check(
	"emmet class merging (string)",
	["div.foo", { class: "bar baz" }],
	["div", { class: "foo bar baz" }]
);

check(
	"emmet class merging (obj)",
	["div.foo", { class: { foo: false, bar: true } }],
	["div", { class: "bar" }]
);

check("root fn", () => ["div"], ["div", {}]);

check(
	"tag fn w/ args",
	[(_: any, id: string, body: any) => ["div#" + id, body], "foo", "bar"],
	["div", { id: "foo" }, "bar"]
);

check("child fn", ["div", (x: any) => ["span", x]], ["div", {}, ["span", {}]]);

check(
	"child arrays",
	["section", [["div", "foo"], "bar"]],
	["section", {}, ["div", {}, "foo"], "bar"]
);

check(
	"iterator",
	["div", map((x) => [`div#id${x}`, x], range(3))],
	[
		"div",
		{},
		["div", { id: "id0" }, "0"],
		["div", { id: "id1" }, "1"],
		["div", { id: "id2" }, "2"],
	]
);

check("deref toplevel", defAtom(["a"]), ["a", {}]);

check("deref child", ["a", defAtom(["b"])], ["a", {}, ["b", {}]]);

test("life cycle", () => {
	let src: any = { render: () => ["div", "foo"] };
	let res: any = ["div", {}, ["span", {}, "foo"]];
	res.__this = src;
	res.__init = res.__release = undefined;
	res.__args = [undefined];
	expect(normalizeTree({ keys: false }, [src])).toEqual(res);
	res = ["div", { key: "0" }, ["span", { key: "0-0" }, "foo"]];
	res.__this = src;
	res.__init = res.__release = undefined;
	res.__args = [undefined];
	expect(normalizeTree({}, [src])).toEqual(res);
});

test("dyn context", () => {
	expect(
		derefContext(
			{
				a: 23,
				b: defAtom(42),
				c: defView(defAtom({ foo: { bar: 66 } }), ["foo", "bar"]),
			},
			["a", "b", "c"]
		)
	).toEqual({
		a: 23,
		b: 42,
		c: 66,
	});
});
