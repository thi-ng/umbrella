import * as assert from "assert";
import { Atom } from "@thi.ng/atom";

import { serialize } from "../src/index";

function _check(a, b) {
    assert.equal(serialize(a), b);
}

function check(id, a, b) {
    it(id, () => _check(a, b));
}

describe("serialize", () => {

    check(
        "null",
        null,
        ""
    );

    check(
        "empty tree",
        [],
        ""
    );

    check(
        "simple div",
        ["div", "foo"],
        `<div>foo</div>`
    );

    check(
        "div w/ id",
        ["div#foo", "foo"],
        `<div id="foo">foo</div>`
    );

    check(
        "div w/ id + classes",
        ["div#foo.bar.baz", "foo"],
        `<div id="foo" class="bar baz">foo</div>`
    );

    check(
        "div w/ id, class & attrib",
        ["div#foo.bar.baz", { extra: 23 }, "foo"],
        `<div id="foo" class="bar baz" extra="23">foo</div>`
    );

    check(
        "voidtag (br)",
        ["br"],
        `<br/>`
    );

    check(
        "voidtag (link)",
        ["link", { href: "#" }],
        `<link href="#"/>`
    );

    check(
        "empty div",
        ["div"],
        `<div></div>`
    );

    it("<br> w/ body", () => {
        assert.throws(() => serialize(["br", "x"]), "no body");
    });

    check(
        "div w/ bool attr (true)",
        ["div", { bool: true }],
        `<div bool></div>`
    );

    check(
        "div w/ bool attr (false)",
        ["div", { bool: false }],
        `<div></div>`
    );

    check(
        "empty attr",
        ["div", { foo: "" }],
        `<div></div>`
    );

    check(
        "zero attr",
        ["div", { foo: 0 }],
        `<div foo="0"></div>`
    );

    check(
        "attr toString",
        ["div", { foo: {} }],
        `<div foo="[object Object]"></div>`
    );

    check(
        "attr fn",
        ["div", { foo: () => 23 }],
        `<div foo="23"></div>`
    );

    check(
        "attr fn (null)",
        ["div", { foo: () => null }],
        `<div></div>`
    );

    check(
        "event attr fn",
        ["div", { onclick: () => 1 }],
        `<div></div>`
    );

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

    check(
        "style empty",
        ["div", { style: {} }, "foo"],
        `<div>foo</div>`
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
        [(id, body) => ["div#" + id, body], "foo", "bar"],
        `<div id="foo">bar</div>`
    );

    check(
        "comp fn in body",
        ["div", () => ["div#foo", "bar"]],
        `<div><div id="foo">bar</div></div>`
    );

    check(
        "comp fn in body w/ args",
        ["div", [(id, body) => ["div#" + id, body], "foo", "bar"], "bar2"],
        `<div><div id="foo">bar</div>bar2</div>`
    );

    check(
        "comp fn in body apply",
        ["div", [([id, body]) => ["div#" + id, body], ["foo", "bar"]], "bar2"],
        `<div><div id="foo">bar</div>bar2</div>`
    );

    check(
        "comp fn body 2",
        ["div", "foo", () => ["div#foo2", "bar2"], "bar"],
        `<div>foo<div id="foo2">bar2</div>bar</div>`
    );

    it("components nested", () => {
        const dlItem = ([def, desc]) => [["dt", def], ["dd", desc]];
        const ulItem = (i) => ["li", i];
        const list = (f, items) => items.map(f);
        const dlList = (attribs, items) => ["dl", attribs, [list, dlItem, items]];
        const ulList = (attribs, items) => ["ul", attribs, [list, ulItem, items]];

        const items = [["a", "foo"], ["b", "bar"]];

        const widget1 = [dlList, { id: "foo" }, items];
        const widget2 = [ulList, { id: "foo" }, items.map((i) => i[1])];

        _check(widget1, `<dl id="foo"><dt>a</dt><dd>foo</dd><dt>b</dt><dd>bar</dd></dl>`);
        _check(widget2, `<ul id="foo"><li>foo</li><li>bar</li></ul>`);
    });

    check(
        "iterators",
        ["ul", [(items) => items.map((i) => ["li", i]), ["a", "b"]]],
        `<ul><li>a</li><li>b</li></ul>`
    );

    check(
        "deref toplevel",
        new Atom(["a"]),
        `<a></a>`
    );

    check(
        "deref child",
        ["a", new Atom(["b"])],
        `<a><b></b></a>`
    );

    check(
        "deref fn result",
        ["a", () => new Atom(["b"])],
        `<a><b></b></a>`
    );

    check(
        "style fn attribs",
        ["div", { style: { a: (x) => x.b, b: 2 } }],
        `<div style="a:2;b:2;"></div>`
    );
});
