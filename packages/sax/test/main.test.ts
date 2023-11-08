import { DEFAULT, defmulti, type MultiFn1 } from "@thi.ng/defmulti";
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
import { expect, test } from "bun:test";
import { parse, Type, type ParseElement } from "../src/index.js";

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

test("svg parse", () => {
	expect<any>([
		...iterator(
			comp(
				parse({ children: true }),
				matchFirst((e) => e.type == Type.ELEM_END && e.tag == "g"),
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
	]).toEqual([
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
	]);
});

test("svg parse (defmulti)", () => {
	const numericAttribs = (e: ParseElement, ...ids: string[]) =>
		ids.reduce((acc, id) => ((acc[id] = parseFloat(e.attribs[id])), acc), <
			any
		>{ ...e.attribs });

	const parsedChildren = (e: ParseElement) =>
		iterator(
			comp(
				map(parseElement),
				filter((e: any) => !!e)
			),
			e.children
		);

	// define multiple dispatch function, based on element tag name
	const parseElement: MultiFn1<ParseElement, any> = defmulti<
		ParseElement,
		any
	>(
		(e) => e.tag,
		{},
		{
			circle: (e) => [e.tag, numericAttribs(e, "cx", "cy", "r")],

			rect: (e) => [
				e.tag,
				numericAttribs(e, "x", "y", "width", "height"),
			],

			g: (e) => [e.tag, e.attribs, ...parsedChildren(e)],

			svg: (e) => [
				e.tag,
				numericAttribs(e, "width", "height"),
				...parsedChildren(e),
			],

			[DEFAULT]: () => undefined,
		}
	);

	expect(parseElement(<ParseElement>transduce(parse(), last(), svg))).toEqual(
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
});

test("errors", () => {
	expect([...parse("a")]).toEqual([
		{ type: 7, body: "unexpected char: 'a' @ pos 1" },
	]);
	expect([...parse("<a><b></c></a>")]).toEqual([
		{ type: 4, tag: "a", attribs: {} },
		{ type: 4, tag: "b", attribs: {} },
		{ type: 7, body: "unmatched tag: 'c' @ pos 7" },
	]);
});

test("boolean attribs", () => {
	expect<any>([...parse({ boolean: true }, `<foo a b="2" c></foo>`)]).toEqual(
		[
			{ type: 4, tag: "foo", attribs: { a: true, b: "2", c: true } },
			{
				type: 5,
				tag: "foo",
				attribs: { a: true, b: "2", c: true },
				children: [],
			},
		]
	);
	expect<any>([...parse({ boolean: true }, `<foo a b="2" c/>`)]).toEqual([
		{ type: 4, tag: "foo", attribs: { a: true, b: "2", c: true } },
		{ type: 5, tag: "foo", attribs: { a: true, b: "2", c: true } },
	]);
});
