import * as assert from "assert";
import {
    animation,
    at_import,
    at_keyframes,
    at_media,
    css,
    PRETTY,
} from "../src";

const rules = {
    a: { color: "red" },
    b: { border: 0 },
    c: { font: [["14px", "Inconsolata"], "monospace"] },
    f: { foo: (rules: any) => rules.bar, bar: 1 },
};

describe("hiccup-css", () => {
    it("rules only", () => {
        assert.strictEqual(css("a"), undefined);
        assert.strictEqual(css({}), "");
        assert.strictEqual(css(rules.a), "color:red;");
        assert.strictEqual(css(rules.b), "border:0;");
        assert.strictEqual(css(rules.c), "font:14px Inconsolata,monospace;");
        assert.strictEqual(css(rules.f), "foo:1;bar:1;");
    });

    it("simple", () => {
        assert.strictEqual(css(["a"]), "");
        assert.strictEqual(css(["a", rules.a]), "a{color:red;}");
        assert.strictEqual(
            css([
                ["a", rules.a],
                ["b", rules.b],
            ]),
            "a{color:red;}b{border:0;}"
        );
        assert.strictEqual(
            css(["a", "b", rules.a, rules.b]),
            "a,b{color:red;border:0;}"
        );
    });

    it("nested", () => {
        assert.strictEqual(
            css(["a", [":link", rules.a], [":visited", rules.b]]),
            "a:link{color:red;}a:visited{border:0;}"
        );
        assert.strictEqual(
            css(["p", ["a", [":link", rules.a], [":visited", rules.b]]]),
            "p a:link{color:red;}p a:visited{border:0;}"
        );
        assert.strictEqual(
            css([
                "#id",
                ["h1", {}, {}],
                ["h2", "h3", ["div", {}], ["[attr]", ["span", rules.a]]],
            ]),
            "#id h1{}#id h2 div,#id h3 div{}#id h2[attr] span,#id h3[attr] span{color:red;}"
        );
    });

    it("pretty", () => {
        assert.strictEqual(
            css(
                [
                    "#id",
                    ["h1", rules.a, rules.b],
                    [
                        "h2",
                        "h3",
                        ["div", rules.b],
                        ["[attr]", ["span", rules.a]],
                    ],
                ],
                { format: PRETTY }
            ),
            "#id h1 {\n    color: red;\n    border: 0;\n}\n\n#id h2 div, #id h3 div {\n    border: 0;\n}\n\n#id h2[attr] span, #id h3[attr] span {\n    color: red;\n}\n"
        );
    });

    it("@import", () => {
        assert.strictEqual(css(at_import("foo.css")), "@import url(foo.css);");
        assert.strictEqual(
            css([at_import("foo.css"), ["div", {}]]),
            "@import url(foo.css);div{}"
        );
        assert.strictEqual(
            css([[at_import("foo.css")], ["div", {}]]),
            "@import url(foo.css);div{}"
        );
        assert.strictEqual(
            css(at_import("foo.css", "screen", "print")),
            "@import url(foo.css) screen,print;"
        );
    });

    it("@keyframes", () => {
        assert.strictEqual(
            css(
                at_keyframes("fadein", {
                    0: { opacity: 0 },
                    100: { opacity: 1 },
                })
            ),
            "@keyframes fadein{0%{opacity:0;}100%{opacity:1;}}"
        );
        assert.strictEqual(
            css(at_keyframes("fadein", { opacity: 0 }, { opacity: 1 })),
            "@keyframes fadein{0%{opacity:0;}100%{opacity:1;}}"
        );
    });

    it("@media", () => {
        assert.strictEqual(
            css(at_media({ screen: true }, [])),
            "@media screen{}"
        );
        assert.strictEqual(
            css(at_media({ screen: false }, [])),
            "@media not screen{}"
        );
        assert.strictEqual(
            css(at_media({ screen: false, print: true }, [])),
            "@media not screen and print{}"
        );
        assert.strictEqual(
            css(at_media({ screen: "only" }, [])),
            "@media only screen{}"
        );
        assert.strictEqual(
            css(at_media({ "min-width": "10rem" }, ["div", [".foo", rules.a]])),
            "@media (min-width:10rem){div .foo{color:red;}}"
        );
        assert.strictEqual(
            css(
                at_media({ screen: true, print: true }, [
                    ["div", [".foo", rules.a]],
                    [
                        at_media({ print: true, "max-width": "20rem" }, [
                            "div",
                            rules.b,
                        ]),
                    ],
                ])
            ),
            "@media screen and print{div .foo{color:red;}@media print and (max-width:20rem){div{border:0;}}}"
        );
    });

    it("animation", () => {
        assert.strictEqual(
            css(
                animation(
                    "delayed-fade-in",
                    { delay: "0.5s" },
                    { opacity: 0 },
                    { opacity: 1 }
                )
            ),
            "@keyframes delayed-fade-in{0%{opacity:0;}100%{opacity:1;}}.delayed-fade-in{animation-duration:250ms;animation-name:delayed-fade-in;animation-delay:0.5s;}"
        );
    });
});
