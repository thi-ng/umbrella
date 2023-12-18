import { expect, test } from "bun:test";
import {
	PRETTY,
	animation,
	at_import,
	at_keyframes,
	at_media,
	css,
	rem,
	setPrecision,
} from "../src/index.js";

const rules = {
	a: { color: "red" },
	b: { border: 0 },
	c: { font: [["14px", "Inconsolata"], "monospace"] },
	f: { foo: (rules: any) => rules.bar, bar: 1 },
};

test("rules only", () => {
	expect(() => css("a")).toThrow();
	expect(css({})).toBe("");
	expect(css(rules.a)).toBe("color:red;");
	expect(css(rules.b)).toBe("border:0;");
	expect(css(rules.c)).toBe("font:14px Inconsolata,monospace;");
	expect(css(rules.f)).toBe("foo:1;bar:1;");
});

test("simple", () => {
	expect(css(["a"])).toBe("");
	expect(css(["a", rules.a])).toBe("a{color:red;}");
	expect(
		css([
			["a", rules.a],
			["b", rules.b],
		])
	).toBe("a{color:red;}b{border:0;}");
	expect(css(["a", "b", rules.a, rules.b])).toBe("a,b{color:red;border:0;}");
});

test("nested", () => {
	expect(css(["a", [":link", rules.a], [":visited", rules.b]])).toBe(
		"a:link{color:red;}a:visited{border:0;}"
	);
	expect(css(["p", ["a", [":link", rules.a], [":visited", rules.b]]])).toBe(
		"p a:link{color:red;}p a:visited{border:0;}"
	);
	expect(
		css([
			"#id",
			["h1", {}, {}],
			["h2", "h3", ["div", {}], ["[attr]", ["span", rules.a]]],
		])
	).toBe(
		"#id h1{}#id h2 div,#id h3 div{}#id h2[attr] span,#id h3[attr] span{color:red;}"
	);
});

test("pretty", () => {
	expect(
		css(
			[
				"#id",
				["h1", rules.a, rules.b],
				["h2", "h3", ["div", rules.b], ["[attr]", ["span", rules.a]]],
			],
			{ format: PRETTY }
		)
	).toBe(
		"#id h1 {\n    color: red;\n    border: 0;\n}\n\n#id h2 div, #id h3 div {\n    border: 0;\n}\n\n#id h2[attr] span, #id h3[attr] span {\n    color: red;\n}\n"
	);
});

test("@import", () => {
	expect(css(at_import("foo.css"))).toBe("@import url(foo.css);");
	expect(css([at_import("foo.css"), ["div", {}]])).toBe(
		"@import url(foo.css);div{}"
	);
	expect(css([[at_import("foo.css")], ["div", {}]])).toBe(
		"@import url(foo.css);div{}"
	);
	expect(css(at_import("foo.css", "screen", "print"))).toBe(
		"@import url(foo.css) screen,print;"
	);
});

test("@keyframes", () => {
	expect(
		css(
			at_keyframes("fadein", {
				0: { opacity: 0 },
				100: { opacity: 1 },
			})
		)
	).toBe("@keyframes fadein{0%{opacity:0;}100%{opacity:1;}}");
	expect(css(at_keyframes("fadein", { opacity: 0 }, { opacity: 1 }))).toBe(
		"@keyframes fadein{0%{opacity:0;}100%{opacity:1;}}"
	);
});

test("@media", () => {
	expect(css(at_media({ screen: true }, []))).toBe("@media screen{}");
	expect(css(at_media({ screen: false }, []))).toBe("@media not screen{}");
	expect(css(at_media({ screen: false, print: true }, []))).toBe(
		"@media not screen and print{}"
	);
	expect(css(at_media({ screen: "only" }, []))).toBe("@media only screen{}");
	expect(
		css(at_media({ "min-width": "10rem" }, ["div", [".foo", rules.a]]))
	).toBe("@media (min-width:10rem){div .foo{color:red;}}");
	expect(
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
		)
	).toBe(
		"@media screen and print{div .foo{color:red;}@media print and (max-width:20rem){div{border:0;}}}"
	);
	expect(css(at_media({ "prefers-reduced-motion": true }, []))).toBe(
		`@media (prefers-reduced-motion){}`
	);
	expect(css(at_media({ "prefers-reduced-motion": false }, []))).toBe(
		`@media not (prefers-reduced-motion){}`
	);
});

test("animation", () => {
	expect(
		css(
			animation(
				"delayed-fade-in",
				{ delay: "0.5s" },
				{ opacity: 0 },
				{ opacity: 1 }
			)
		)
	).toBe(
		"@keyframes delayed-fade-in{0%{opacity:0;}100%{opacity:1;}}.delayed-fade-in{animation-duration:250ms;animation-name:delayed-fade-in;animation-delay:0.5s;}"
	);
});

test("float format", () => {
	setPrecision(4);
	expect(
		css([
			"a",
			{ a: rem(0.1), b: rem(0), c: rem(0.0), d: rem(-0), e: rem(0.0001) },
		])
	).toBe("a{a:.1rem;b:0rem;c:0rem;d:0rem;e:.0001rem;}");
});
