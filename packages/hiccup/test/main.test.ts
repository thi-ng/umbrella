import { Atom } from "@thi.ng/atom";
import { foaf } from "@thi.ng/prefixes";
import { escapeEntities } from "@thi.ng/strings";
import { expect, test } from "bun:test";
import { DOCTYPE_HTML, XML_PROC, serialize } from "../src/index.js";

const _check = (a: any, b: any) => expect(serialize(a)).toBe(b);

const check = (id: string, a: any, b: any) => test(id, () => _check(a, b));

check("null", null, "");

check("empty tree", [], "");

check("simple div", ["div", "foo"], `<div>foo</div>`);

check("div w/ id", ["div#foo", "foo"], `<div id="foo">foo</div>`);

check(
	"div w/ id + classes",
	["div#foo.bar.baz", "foo"],
	`<div id="foo" class="bar baz">foo</div>`
);

check(
	"div w/ id, class & attrib",
	["div#foo.bar.baz", { extra: 23 }, "foo"],
	`<div extra="23" id="foo" class="bar baz">foo</div>`
);

check(
	"div w/ class attrib (string)",
	["div", { class: "bar baz" }, "foo"],
	`<div class="bar baz">foo</div>`
);

check(
	"div w/ class attrib (array)",
	["div", { class: ["bar", "baz"] }, "foo"],
	`<div class="bar baz">foo</div>`
);

check(
	"div w/ class attrib (obj)",
	["div", { class: { bar: true, baz: false } }, "foo"],
	`<div class="bar">foo</div>`
);

check(
	"div w/ class merging (string)",
	["div.foo", { class: "bar baz" }, "foo"],
	`<div class="foo bar baz">foo</div>`
);

check(
	"div w/ class merging (array)",
	["div.foo", { class: ["bar", "baz"] }, "foo"],
	`<div class="foo bar baz">foo</div>`
);

check(
	"div w/ class merging (obj)",
	["div.foo", { class: { foo: false, bar: true } }],
	`<div class="bar"></div>`
);

check(
	"div w/ class merging (deref)",
	[
		"div.foo",
		{
			class: {
				deref() {
					return "bar baz";
				},
			},
		},
		"foo",
	],
	`<div class="foo bar baz">foo</div>`
);

check(
	"deref attribs",
	[
		"div",
		{
			id: {
				deref() {
					return "foo";
				},
			},
			style: {
				deref() {
					return { color: "red" };
				},
			},
		},
	],
	`<div id="foo" style="color:red;"></div>`
);

check("voidtag (br)", ["br"], `<br/>`);

check("voidtag (link)", ["link", { href: "#" }], `<link href="#"/>`);

check("empty div", ["div"], `<div></div>`);

test("<br> w/ body", () => {
	expect(() => serialize(["br", "x"])).toThrow();
});

check("div w/ bool attr (true)", ["div", { bool: true }], `<div bool></div>`);

check("div w/ bool attr (false)", ["div", { bool: false }], `<div></div>`);

check("empty attr", ["div", { foo: "" }], `<div></div>`);

check("zero attr", ["div", { foo: 0 }], `<div foo="0"></div>`);

check(
	"attr toString",
	["div", { foo: {} }],
	`<div foo="[object Object]"></div>`
);

check(
	"array attr join (default)",
	["a", { ping: ["google.com", "fb.com"] }],
	`<a ping="google.com fb.com"></a>`
);

check(
	"array attr join (delim)",
	["img", { srcset: ["a.jpg", "b.jpg"] }],
	`<img srcset="a.jpg,b.jpg"/>`
);

check("attr fn", ["div", { foo: () => 23 }], `<div foo="23"></div>`);

check(
	"attr fn (derived)",
	["div", { foo: (attribs: any) => `${attribs.x}px`, x: 42 }],
	`<div foo="42px" x="42"></div>`
);

check("attr fn (null)", ["div", { foo: () => {} }], `<div></div>`);

check("event attr fn", ["div", { onclick: () => 1 }], `<div></div>`);

check(
	"event attr (string)",
	["div", { onclick: "1" }],
	`<div onclick="1"></div>`
);

check(
	"attr obj w/ toString()",
	["div", { foo: { toString: () => "23" } }],
	`<div foo="23"></div>`
);

check(
	"style obj",
	["div", { style: { a: "red" } }, "foo"],
	`<div style="a:red;">foo</div>`
);

check(
	"style obj 2",
	["div", { style: { a: "red", b: "blue" } }, "foo"],
	`<div style="a:red;b:blue;">foo</div>`
);

check(
	"style css",
	["div", { style: "a:red;" }, "foo"],
	`<div style="a:red;">foo</div>`
);

check("style empty", ["div", { style: {} }, "foo"], `<div>foo</div>`);

check(
	"style fn attribs",
	["div", { style: { a: (x: any) => x.b, b: 2 } }],
	`<div style="a:2;b:2;"></div>`
);

check(
	"style deref attribs",
	[
		"div",
		{
			style: {
				a: {
					deref() {
						return 1;
					},
				},
			},
		},
	],
	`<div style="a:1;"></div>`
);

check(
	"data attribs",
	[
		"div",
		{
			"data-xyz": "xyz",
			data: {
				foo: 1,
				bar: (a: any) => a.foo + 1,
				baz: {
					deref() {
						return 3;
					},
				},
			},
		},
	],
	`<div data-xyz="xyz" data-foo="1" data-bar="2" data-baz="3"></div>`
);

check(
	"nested",
	["div", ["h1.title", "foo"], ["p", ["span.small", "hello"], ["br"], "bye"]],
	`<div><h1 class="title">foo</h1><p><span class="small">hello</span><br/>bye</p></div>`
);

check(
	"simple component",
	[() => ["div#foo", "bar"]],
	`<div id="foo">bar</div>`
);

check(
	"comp fn args",
	[(_: any, id: string, body: any) => ["div#" + id, body], "foo", "bar"],
	`<div id="foo">bar</div>`
);

check(
	"comp fn in body",
	["div", () => ["div#foo", "bar"]],
	`<div><div id="foo">bar</div></div>`
);

check(
	"comp fn in body w/ args",
	[
		"div",
		[(_: any, id: string, body: any) => ["div#" + id, body], "foo", "bar"],
		"bar2",
	],
	`<div><div id="foo">bar</div>bar2</div>`
);

check(
	"comp fn in body apply",
	[
		"div",
		[(_: any, [id, body]: any) => ["div#" + id, body], ["foo", "bar"]],
		"bar2",
	],
	`<div><div id="foo">bar</div>bar2</div>`
);

check(
	"comp fn body 2",
	["div", "foo", () => ["div#foo2", "bar2"], "bar"],
	`<div>foo<div id="foo2">bar2</div>bar</div>`
);

test("components nested", () => {
	const dlItem = ([def, desc]: any) => [
		["dt", def],
		["dd", desc],
	];
	const ulItem = (i: any) => ["li", i];
	const list = (_: any, f: any, items: any[]) => items.map(f);
	const dlList = (_: any, attribs: any, items: any[]) => [
		"dl",
		attribs,
		[list, dlItem, items],
	];
	const ulList = (_: any, attribs: any, items: any[]) => [
		"ul",
		attribs,
		[list, ulItem, items],
	];

	const items = [
		["a", "foo"],
		["b", "bar"],
	];

	const widget1 = [dlList, { id: "foo" }, items];
	const widget2 = [ulList, { id: "foo" }, items.map((i) => i[1])];

	_check(
		widget1,
		`<dl id="foo"><dt>a</dt><dd>foo</dd><dt>b</dt><dd>bar</dd></dl>`
	);
	_check(widget2, `<ul id="foo"><li>foo</li><li>bar</li></ul>`);
});

test("comp object", () => {
	const foo = (ctx: any, body: any) => ["div", ctx.foo, body];
	const bar = { render: (_: any, id: any) => [foo, id] };
	expect(
		serialize(["section", [bar, "a"], [bar, "b"]], {
			ctx: { foo: { class: "foo" } },
		})
	).toBe(
		`<section><div class="foo">a</div><div class="foo">b</div></section>`
	);
});

check(
	"iterators",
	["ul", [(_: any, items: any[]) => items.map((i) => ["li", i]), ["a", "b"]]],
	`<ul><li>a</li><li>b</li></ul>`
);

check("deref toplevel", new Atom(["a"]), `<a></a>`);

check("deref child", ["a", new Atom(["b"])], `<a><b></b></a>`);

check("deref fn result", ["a", () => new Atom(["b"])], `<a><b></b></a>`);

check(
	"__skip",
	["a", ["b", { __skip: true }, "bb"], ["b", "bbb"]],
	`<a><b>bbb</b></a>`
);

check("doctype_html", DOCTYPE_HTML, "<!DOCTYPE html>\n");

check("xml_proc", XML_PROC, `<?xml version="1.0" encoding="UTF-8"?>\n`);
check(
	"?xml",
	["?xml", { version: "1.0", standalone: "yes" }],
	`<?xml version="1.0" standalone="yes"?>\n`
);

check(
	"prefix",
	["foo:div#bar", { prefix: { thi: "http://thi.ng/#", foaf } }, "body"],
	`<foo:div prefix="thi: http://thi.ng/# foaf: http://xmlns.com/foaf/0.1/" id="bar">body</foo:div>`
);

test("escape entities", () =>
	expect(serialize(["div", "Äöü <&> '\" —"], { escape: true })).toBe(
		"<div>&#xc4;&#xf6;&#xfc; &lt;&amp;&gt; &apos;&quot; &#x2014;</div>"
	));

test("escape entities (custom)", () =>
	expect(
		serialize(["div", "Äöü <&> '\" —"], {
			escape: true,
			escapeFn: escapeEntities,
		})
	).toBe("<div>&Auml;&ouml;&uuml; &lt;&amp;&gt; &apos;&quot; &mdash;</div>"));
