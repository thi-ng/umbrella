import { iterator } from "@thi.ng/transducers";
import * as assert from "assert";
import { parse } from "../src";

const check = (src: string, expected: any[]) =>
    assert.deepStrictEqual([...iterator(parse(), src)], expected);

describe("parse", () => {
    it("CRLF", () => {
        check(`# hello\r\n\r\nworld\r\n\r\n`, [
            ["h1", {}, " hello "],
            ["p", {}, "world "],
        ]);
    });

    it("blockquote", () => {
        check(`>a block **quote** of\n> two _lines_.\n\n`, [
            [
                "blockquote",
                {},
                "a block ",
                ["strong", {}, "quote"],
                " of ",
                ["br", {}],
                " two ",
                ["em", {}, "lines"],
                ". ",
            ],
        ]);
    });

    it("code", () => {
        check("inline `const example = 'indeed!'` code\n\n", [
            [
                "p",
                {},
                "inline ",
                ["code", {}, "const example = 'indeed!'"],
                " code ",
            ],
        ]);
    });

    it("code_block", () => {
        check("```js\nconst code = () => 'indeed!'\n```\n", [
            ["pre", { lang: "js" }, "const code = () => 'indeed!'"],
        ]);
    });

    it("em", () => {
        check(`some _emphasized_ text\n\n`, [
            ["p", {}, "some ", ["em", {}, "emphasized"], " text "],
        ]);
    });

    it("h1", () => {
        check(`# Heading One\n\nbody\n\n`, [
            ["h1", {}, " Heading One "],
            ["p", {}, "body "],
        ]);
    });

    it("h2", () => {
        check(`## Heading Two\n\nbody\n\n`, [
            ["h2", {}, " Heading Two "],
            ["p", {}, "body "],
        ]);
    });

    it("h3", () => {
        check(`### Heading Three\n\nbody\n\n`, [
            ["h3", {}, " Heading Three "],
            ["p", {}, "body "],
        ]);
    });

    it("h4", () => {
        check(`#### Heading Four\n\nbody\n\n`, [
            ["h4", {}, " Heading Four "],
            ["p", {}, "body "],
        ]);
    });

    it("h5", () => {
        check(`##### Heading Five\n\nbody\n\n`, [
            ["h5", {}, " Heading Five "],
            ["p", {}, "body "],
        ]);
    });

    it("h6", () => {
        check(`###### Heading Six\n\nbody\n\n`, [
            ["h6", {}, " Heading Six "],
            ["p", {}, "body "],
        ]);
    });

    it("h7", () => {
        check(`####### Heading Seven\n\nbody\n\n`, [
            ["p", {}, " Heading Seven "],
            ["p", {}, "body "],
        ]);
    });

    it("hr", () => {
        check(`---\n`, [["hr", {}]]);
    });

    it("img", () => {
        check(
            `![thi.ng](https://media.giphy.com/media/f6qMGmXuOdkwU/giphy.gif)\n\n`,
            [
                [
                    "p",
                    {},
                    [
                        "img",
                        {
                            src:
                                "https://media.giphy.com/media/f6qMGmXuOdkwU/giphy.gif",
                            alt: "thi.ng",
                        },
                    ],
                    " ",
                ],
            ]
        );
    });

    it("li", () => {
        check(`- an item\n- another\n\n`, [
            ["ul", {}, ["li", {}, "an item "], ["li", {}, "another "]],
        ]);
    });

    it("link", () => {
        check(`come [to](http://thi.ng/umbrella) the light\n\n`, [
            [
                "p",
                {},
                "come ",
                ["a", { href: "http://thi.ng/umbrella" }, "to"],
                " the light ",
            ],
        ]);
    });

    it("strike", () => {
        check(`I ~~am amazing~~ messed up\n\n`, [
            ["p", {}, "I ", ["del", {}, "am amazing"], " messed up "],
        ]);
    });

    it("strong", () => {
        check(`I **really** meant that\n\n`, [
            ["p", {}, "I ", ["strong", {}, "really"], " meant that "],
        ]);
    });

    it("table", () => {
        check(`| col1 | col2 |\n| --- | --- |\n| row1 | row2 |\n\n`, [
            [
                "table",
                {},
                [
                    "tbody",
                    {},
                    ["tr", {}, ["td", {}, " col1 "], ["td", {}, " col2 "]],
                    ["tr", {}, ["td", {}, " row1 "], ["td", {}, " row2 "]],
                ],
            ],
        ]);
    });
});
