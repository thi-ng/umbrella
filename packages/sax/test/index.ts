import { DEFAULT, defmulti } from "@thi.ng/defmulti";
import { group } from "@thi.ng/testament";
import {
    comp,
    filter,
    iterator,
    last,
    map,
    mapcat,
    matchFirst,
    transduce,
} from "@thi.ng/transducers";
import * as assert from "assert";
import { parse, ParseElement, Type } from "../src";

const svg = `
<?xml version="1.0"?>
<svg version="1.1" height="300" width="300" xmlns="http://www.w3.org/2000/svg">
    <g fill="yellow">
        <circle cx="50.00" cy="150.00" r="50.00" />
        <circle cx="250.00" cy="150.00" r="50.00" />
        <circle cx="150.00" cy="150.00" fill="rgba(0,255,255,0.25)" r="100.00" stroke="#ff0000" />
        <rect x="80" y="80" width="140" height="140" fill="none" stroke="black" />
    </g>
    <g fill="none" stroke="black">
        <circle cx="150.00" cy="150.00" r="50.00" />
        <circle cx="150.00" cy="150.00" r="25.00" />
    </g>
</svg>`;

group("sax", {
    "svg parse": () => {
        assert.deepStrictEqual(
            [
                ...iterator(
                    comp(
                        parse({ children: true }),
                        matchFirst(
                            (e) => e.type == Type.ELEM_END && e.tag == "g"
                        ),
                        mapcat((e) => e.children),
                        filter((e) => e.tag == "circle"),
                        map((e) => [
                            e.tag,
                            {
                                ...e.attribs,
                                cx: parseFloat(e.attribs.cx),
                                cy: parseFloat(e.attribs.cy),
                                r: parseFloat(e.attribs.r),
                            },
                        ])
                    ),
                    svg
                ),
            ],
            [
                ["circle", { cx: 50, cy: 150, r: 50 }],
                ["circle", { cx: 250, cy: 150, r: 50 }],
                [
                    "circle",
                    {
                        cx: 150,
                        cy: 150,
                        fill: "rgba(0,255,255,0.25)",
                        r: 100,
                        stroke: "#ff0000",
                    },
                ],
            ]
        );
    },

    "svg parse (defmulti)": () => {
        const numericAttribs = (e: ParseElement, ...ids: string[]) =>
            ids.reduce(
                (acc, id) => ((acc[id] = parseFloat(e.attribs[id])), acc),
                <any>{ ...e.attribs }
            );

        const parsedChildren = (e: ParseElement) =>
            iterator(
                comp(
                    map(parseElement),
                    filter((e: any) => !!e)
                ),
                e.children
            );

        // define multiple dispatch function, based on element tag name
        const parseElement = defmulti<ParseElement, any>((e) => e.tag);

        // implementations
        parseElement.add("circle", (e) => [
            e.tag,
            numericAttribs(e, "cx", "cy", "r"),
        ]);

        parseElement.add("rect", (e) => [
            e.tag,
            numericAttribs(e, "x", "y", "width", "height"),
        ]);

        parseElement.add("g", (e) => [e.tag, e.attribs, ...parsedChildren(e)]);

        parseElement.add("svg", (e) => [
            e.tag,
            numericAttribs(e, "width", "height"),
            ...parsedChildren(e),
        ]);

        // implementation for unhandled elements (just return undefined)
        parseElement.add(DEFAULT, () => undefined);

        assert.deepStrictEqual(
            parseElement(<ParseElement>transduce(parse(), last(), svg)),
            [
                "svg",
                {
                    version: "1.1",
                    height: 300,
                    width: 300,
                    xmlns: "http://www.w3.org/2000/svg",
                },
                [
                    "g",
                    { fill: "yellow" },
                    ["circle", { cx: 50, cy: 150, r: 50 }],
                    ["circle", { cx: 250, cy: 150, r: 50 }],
                    [
                        "circle",
                        {
                            cx: 150,
                            cy: 150,
                            fill: "rgba(0,255,255,0.25)",
                            r: 100,
                            stroke: "#ff0000",
                        },
                    ],
                    [
                        "rect",
                        {
                            x: 80,
                            y: 80,
                            width: 140,
                            height: 140,
                            fill: "none",
                            stroke: "black",
                        },
                    ],
                ],
                [
                    "g",
                    { fill: "none", stroke: "black" },
                    ["circle", { cx: 150, cy: 150, r: 50 }],
                    ["circle", { cx: 150, cy: 150, r: 25 }],
                ],
            ]
        );
    },

    errors: () => {
        assert.deepStrictEqual(
            [...parse("a")],
            [{ type: 7, body: "unexpected char: 'a' @ pos 1" }]
        );
        assert.deepStrictEqual(
            [...parse("<a><b></c></a>")],
            [
                { type: 4, tag: "a", attribs: {} },
                { type: 4, tag: "b", attribs: {} },
                { type: 7, body: "unmatched tag: 'c' @ pos 7" },
            ]
        );
    },

    "boolean attribs": () => {
        assert.deepStrictEqual(
            [...parse({ boolean: true }, `<foo a b="2" c></foo>`)],
            [
                { type: 4, tag: "foo", attribs: { a: true, b: "2", c: true } },
                {
                    type: 5,
                    tag: "foo",
                    attribs: { a: true, b: "2", c: true },
                    children: [],
                },
            ],
            "no slash"
        );
        assert.deepStrictEqual(
            [...parse({ boolean: true }, `<foo a b="2" c/>`)],
            [
                { type: 4, tag: "foo", attribs: { a: true, b: "2", c: true } },
                { type: 5, tag: "foo", attribs: { a: true, b: "2", c: true } },
            ],
            "with slash"
        );
    },
});
