import * as assert from "assert";

import { Atom } from "@thi.ng/atom/atom";
import { map } from "@thi.ng/iterators/map";
import { range } from "@thi.ng/iterators/range";
import { normalizeTree } from "../src/normalize";

function _check(a, b, ctx = null) {
    assert.deepEqual(normalizeTree(a, ctx, [], false, false), b);
}

function check(id, a, b) {
    it(id, () => _check(a, b));
}

describe("hdom", () => {

    check(
        "undefined",
        undefined,
        undefined
    );

    check(
        "null",
        null,
        undefined
    );

    check(
        "empty tree",
        [],
        undefined
    );

    check(
        "simple div",
        ["div", "foo"],
        ["div", {}, "foo"]
    );

    check(
        "emmet id",
        ["div#foo", "hi"],
        ["div", { id: "foo" }, "hi"]
    );

    check(
        "emmet id + id attr",
        ["div#foo", { id: "bar" }],
        ["div", { id: "foo" }]
    );

    check(
        "emmet id + class",
        ["div#id.foo.bar", "hi"],
        ["div", { id: "id", class: "foo bar" }, "hi"]
    );
    check(
        "emmet class + class attr",
        ["div.foo.bar", { class: "baz" }],
        ["div", { class: "baz foo bar" }]
    );

    check(
        "emmet id + class + attrib",
        ["div#id.foo.bar", { extra: 23 }, "hi"],
        ["div", { id: "id", class: "foo bar", extra: 23 }, "hi"]
    );

    check(
        "root fn",
        () => ["div"],
        ["div", {}]
    );

    check(
        "tag fn w/ args",
        [(_, id, body) => ["div#" + id, body], "foo", "bar"],
        ["div", { id: "foo" }, "bar"]
    );

    check(
        "child fn",
        ["div", (x) => ["span", x]],
        ["div", {}, ["span", {}]]
    );

    check(
        "child arrays",
        ["section", [["div", "foo"], "bar"]],
        ["section", {}, ["div", {}, "foo"], "bar"]
    );

    check(
        "iterator",
        ["div", map((x) => [`div#id${x}`, x], range(3))],
        ["div", {}, ["div", { id: "id0" }, 0], ["div", { id: "id1" }, 1], ["div", { id: "id2" }, 2]]
    );

    check(
        "deref toplevel",
        new Atom(["a"]),
        ["a", {}]
    );

    check(
        "deref child",
        ["a", new Atom(["b"])],
        ["a", {}, ["b", {}]]
    );

    it("life cycle", () => {
        let res: any = ["div", {}];
        res.__init = res.__release = undefined;
        res.__args = [null];
        assert.deepEqual(
            normalizeTree([{ render: () => ["div"] }], null, [], false, false),
            res
        );
        res = ["div", { key: "0" }];
        res.__init = res.__release = undefined;
        res.__args = [null];
        assert.deepEqual(
            normalizeTree([{ render: () => ["div"] }], null, [0], true, false),
            res
        );
    });
});
