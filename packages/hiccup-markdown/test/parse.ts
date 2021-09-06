import { group } from "@thi.ng/testament";
import { iterator } from "@thi.ng/transducers";
import * as assert from "assert";
import { parse } from "../src";

const check = (src: string, expected: any[]) =>
    assert.deepStrictEqual([...iterator(parse(), src)], expected);

group("parse", {
    CRLF: () => {
        check(`# hello\r\n\r\nworld\r\n\r\n`, [
            ["h1", {}, " hello "],
            ["p", {}, "world "],
        ]);
    },

    blockquote: () => {
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
    },

    code: () => {
        check("inline `const example = 'indeed!'` code\n\n", [
            [
                "p",
                {},
                "inline ",
                ["code", {}, "const example = 'indeed!'"],
                " code ",
            ],
        ]);
    },

    code_block: () => {
        check("```js\nconst code = () => 'indeed!'\n```\n", [
            ["pre", { lang: "js" }, "const code = () => 'indeed!'"],
        ]);
    },

    em: () => {
        check(`some _emphasized_ text\n\n`, [
            ["p", {}, "some ", ["em", {}, "emphasized"], " text "],
        ]);
    },

    h1: () => {
        check(`# Heading One\n\nbody\n\n`, [
            ["h1", {}, " Heading One "],
            ["p", {}, "body "],
        ]);
    },

    h2: () => {
        check(`## Heading Two\n\nbody\n\n`, [
            ["h2", {}, " Heading Two "],
            ["p", {}, "body "],
        ]);
    },

    h3: () => {
        check(`### Heading Three\n\nbody\n\n`, [
            ["h3", {}, " Heading Three "],
            ["p", {}, "body "],
        ]);
    },

    h4: () => {
        check(`#### Heading Four\n\nbody\n\n`, [
            ["h4", {}, " Heading Four "],
            ["p", {}, "body "],
        ]);
    },

    h5: () => {
        check(`##### Heading Five\n\nbody\n\n`, [
            ["h5", {}, " Heading Five "],
            ["p", {}, "body "],
        ]);
    },

    h6: () => {
        check(`###### Heading Six\n\nbody\n\n`, [
            ["h6", {}, " Heading Six "],
            ["p", {}, "body "],
        ]);
    },

    h7: () => {
        check(`####### Heading Seven\n\nbody\n\n`, [
            ["p", {}, " Heading Seven "],
            ["p", {}, "body "],
        ]);
    },

    hr: () => {
        check(`---\n`, [["hr", {}]]);
    },

    img: () => {
        check(
            `![thi.ng](https://media.giphy.com/media/f6qMGmXuOdkwU/giphy.gif)\n\n`,
            [
                [
                    "p",
                    {},
                    [
                        "img",
                        {
                            src: "https://media.giphy.com/media/f6qMGmXuOdkwU/giphy.gif",
                            alt: "thi.ng",
                        },
                    ],
                    " ",
                ],
            ]
        );
    },

    li: () => {
        check(`- an item\n- another\n\n`, [
            ["ul", {}, ["li", {}, "an item "], ["li", {}, "another "]],
        ]);
    },

    link: () => {
        check(`come [to](http://thi.ng/umbrella) the light\n\n`, [
            [
                "p",
                {},
                "come ",
                ["a", { href: "http://thi.ng/umbrella" }, "to"],
                " the light ",
            ],
        ]);
    },

    strike: () => {
        check(`I ~~am amazing~~ messed up\n\n`, [
            ["p", {}, "I ", ["del", {}, "am amazing"], " messed up "],
        ]);
    },

    strong: () => {
        check(`I **really** meant that\n\n`, [
            ["p", {}, "I ", ["strong", {}, "really"], " meant that "],
        ]);
    },

    table: () => {
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
    },
});
