import { Atom } from "@thi.ng/atom";
import * as assert from "assert";
import { serialize } from "../src/index";

function _check(a: any, b: any) {
    assert.equal(serialize(a), b);
}

function check(id: string, a: any, b: any) {
    it(id, () => _check(a, b));
}

describe("serialize", () => {
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
        "div w/ class merging",
        ["div.foo", { class: "bar baz" }, "foo"],
        `<div class="bar baz foo">foo</div>`
    );

    check("voidtag (br)", ["br"], `<br/>`);

    check("voidtag (link)", ["link", { href: "#" }], `<link href="#"/>`);

    check("empty div", ["div"], `<div></div>`);

    it("<br> w/ body", () => {
        assert.throws(() => serialize(["br", "x"]), "no body");
    });

    check(
        "div w/ bool attr (true)",
        ["div", { bool: true }],
        `<div bool></div>`
    );

    check("div w/ bool attr (false)", ["div", { bool: false }], `<div></div>`);

    check("empty attr", ["div", { foo: "" }], `<div></div>`);

    check("zero attr", ["div", { foo: 0 }], `<div foo="0"></div>`);

    check(
        "attr toString",
        ["div", { foo: {} }],
        `<div foo="[object Object]"></div>`
    );

    check(
        "array attr join (fallback)",
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
        "nested",
        [
            "div",
            ["h1.title", "foo"],
            ["p", ["span.small", "hello"], ["br"], "bye"],
        ],
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
            [
                (_: any, id: string, body: any) => ["div#" + id, body],
                "foo",
                "bar",
            ],
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

    it("components nested", () => {
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

    it("comp object", () => {
        const foo = (ctx: any, body: any) => ["div", ctx.foo, body];
        const bar = { render: (_: any, id: any) => [foo, id] };
        assert.equal(
            serialize(["section", [bar, "a"], [bar, "b"]], {
                foo: { class: "foo" },
            }),
            `<section><div class="foo">a</div><div class="foo">b</div></section>`
        );
    });

    check(
        "iterators",
        [
            "ul",
            [(_: any, items: any[]) => items.map((i) => ["li", i]), ["a", "b"]],
        ],
        `<ul><li>a</li><li>b</li></ul>`
    );

    check("deref toplevel", new Atom(["a"]), `<a></a>`);

    check("deref child", ["a", new Atom(["b"])], `<a><b></b></a>`);

    check("deref fn result", ["a", () => new Atom(["b"])], `<a><b></b></a>`);

    check(
        "style fn attribs",
        ["div", { style: { a: (x: any) => x.b, b: 2 } }],
        `<div style="a:2;b:2;"></div>`
    );

    check(
        "__skip",
        ["a", ["b", { __skip: true }, "bb"], ["b", "bbb"]],
        `<a><b>bbb</b></a>`
    );

    check("doctype", ["!DOCTYPE", "html"], "<!DOCTYPE html>\n");

    check(
        "?xml",
        ["?xml", { version: "1.0", standalone: "yes" }],
        `<?xml version="1.0" standalone="yes"?>\n`
    );
});
