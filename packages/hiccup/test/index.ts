import * as assert from "assert";

import * as h from "../src/index";

describe("serialize", () => {
    it("single", () => {
        assert.equal(h.serialize(
            ["div", "foo"]),
            `<div>foo</div>`);
        assert.equal(h.serialize(
            ["div#foo", "foo"]),
            `<div id="foo">foo</div>`);
        assert.equal(h.serialize(
            ["div#foo.bar.baz", "foo"]),
            `<div id="foo" class="bar baz">foo</div>`);
        assert.equal(h.serialize(
            ["div#foo.bar.baz", { extra: 23 }, "foo"]),
            `<div id="foo" class="bar baz" extra="23">foo</div>`);
    });
    it("self-closing", () => {
        assert.equal(h.serialize(["br"]), `<br/>`);
        assert.throws(() => h.serialize(["br", "x"]), "no body");
        assert.equal(h.serialize(["link", { href: "#" }]), `<link href="#"/>`);
        assert.equal(h.serialize(["div"]), `<div></div>`);
    });
    it("attribs", () => {
        assert.equal(h.serialize(
            ["div", { bool: true }]),
            `<div bool></div>`
        );
        assert.equal(h.serialize(
            ["div", { bool: false }]),
            `<div></div>`
        );
        assert.equal(h.serialize(
            ["div", { foo: "" }]),
            `<div></div>`
        );
        assert.equal(h.serialize(
            ["div", { foo: 0 }]),
            `<div foo="0"></div>`
        );
        assert.equal(h.serialize(
            ["div", { foo: {} }]),
            `<div foo="[object Object]"></div>`
        );
        assert.equal(h.serialize(
            ["div", { foo: () => 23 }]),
            `<div foo="23"></div>`
        );
        assert.equal(h.serialize(
            ["div", { foo: () => null }]),
            `<div></div>`
        );
        assert.equal(h.serialize(
            ["div", { foo: { toString: () => "23" } }]),
            `<div foo="23"></div>`
        );
    });
    it("style", () => {
        assert.equal(h.serialize(
            ["div", { style: { a: "red" } }, "foo"]),
            `<div style="a:red;">foo</div>`);
        assert.equal(h.serialize(
            ["div", { style: { a: "red", b: "blue" } }, "foo"]),
            `<div style="a:red;b:blue;">foo</div>`);
        assert.equal(h.serialize(
            ["div", { style: "a:red;" }, "foo"]),
            `<div style="a:red;">foo</div>`);
        assert.equal(h.serialize(
            ["div", { style: {} }, "foo"]),
            `<div>foo</div>`);
    });
    it("simple nested", () => {
        assert.equal(h.serialize(
            ["div", ["h1.title", "foo"], ["p", ["span.small", "hello"], ["br"], "bye"]]),
            `<div><h1 class="title">foo</h1><p><span class="small">hello</span><br/>bye</p></div>`);
    });
    it("components", () => {
        assert.equal(h.serialize(
            [() => ["div#foo", "bar"]]),
            `<div id="foo">bar</div>`);
        assert.equal(h.serialize(
            [(id, body) => ["div#" + id, body], "foo", "bar"]),
            `<div id="foo">bar</div>`);
        assert.equal(h.serialize(
            ["div", () => ["div#foo", "bar"]]),
            `<div><div id="foo">bar</div></div>`);
        assert.equal(h.serialize(
            ["div", [(id, body) => ["div#" + id, body], "foo", "bar"], "bar2"]),
            `<div><div id="foo">bar</div>bar2</div>`);
        assert.equal(h.serialize(
            ["div", [([id, body]) => ["div#" + id, body], ["foo", "bar"]], "bar2"]),
            `<div><div id="foo">bar</div>bar2</div>`);
        assert.equal(h.serialize(
            ["div", "foo", () => ["div#foo2", "bar2"], "bar"]),
            `<div>foo<div id="foo2">bar2</div>bar</div>`);
    });
    it("components nested", () => {
        const dlItem = ([def, desc]) => [["dt", def], ["dd", desc]];
        const ulItem = (i) => ["li", i];
        const list = (f, items) => items.map(f);
        const dlList = (attribs, items) => ["dl", attribs, [list, dlItem, items]];
        const ulList = (attribs, items) => ["ul", attribs, [list, ulItem, items]];

        const items = [["a", "foo"], ["b", "bar"]];

        const widget1 = [dlList, { id: "foo" }, items];
        const widget2 = [ulList, { id: "foo" }, items.map((i) => i[1])];

        assert.equal(h.serialize(widget1),
            `<dl id="foo"><dt>a</dt><dd>foo</dd><dt>b</dt><dd>bar</dd></dl>`);
        assert.equal(h.serialize(widget2),
            `<ul id="foo"><li>foo</li><li>bar</li></ul>`);
    });
    it("iterators", () => {
        assert.equal(h.serialize(
            ["ul", [(items) => items.map((i) => ["li", i]), ["a", "b"]]]),
            `<ul><li>a</li><li>b</li></ul>`);
    });
});
