import * as assert from "assert";

import { css, PRETTY } from "../src";

const rules = {
    a: { color: "red" },
    b: { border: 0 },
    f: { foo: (rules) => rules.bar, bar: 1 }
};

describe("hiccup-css", () => {

    it("rules only", () => {
        assert.equal(css("a"), undefined);
        assert.equal(css({}), "");
        assert.equal(css(rules.a), "color:red;");
        assert.equal(css(rules.f), "foo:1;bar:1;");
    });

    it("simple", () => {
        assert.equal(css(["a"]), "");
        assert.equal(css(["a", rules.a]), "a{color:red;}");
        assert.equal(
            css([["a", rules.a], ["b", rules.b]]),
            "a{color:red;}b{border:0;}"
        );
        assert.equal(
            css(["a", "b", rules.a, rules.b]),
            "a,b{color:red;border:0;}"
        );
    });

    it("nested", () => {
        assert.equal(
            css(["a", [":link", rules.a], [":visited", rules.b]]),
            "a:link{color:red;}a:visited{border:0;}"
        );
        assert.equal(
            css(["p", ["a", [":link", rules.a], [":visited", rules.b]]]),
            "p a:link{color:red;}p a:visited{border:0;}"
        );
        assert.equal(
            css(
                ["#id",
                    ["h1", {}, {}],
                    ["h2", "h3",
                        ["div", {}],
                        ["[attr]",
                            ["span", rules.a]]]]
            ),
            "#id h1{}#id h2 div,#id h3 div{}#id h2[attr] span,#id h3[attr] span{color:red;}"
        );
    });

    it("pretty", () => {
        assert.equal(
            css(
                ["#id",
                    ["h1", rules.a, rules.b],
                    ["h2", "h3",
                        ["div", rules.b],
                        ["[attr]",
                            ["span", rules.a]]]],
                { format: PRETTY }),
            "#id h1 {\n    color: red;\n    border: 0;\n}\n\n#id h2 div, #id h3 div {\n    border: 0;\n}\n\n#id h2[attr] span, #id h3[attr] span {\n    color: red;\n}\n"
        );
    });
});
