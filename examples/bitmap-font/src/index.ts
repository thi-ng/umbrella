import type { IObjectOf } from "@thi.ng/api";
import { div, inputText, pre } from "@thi.ng/hiccup-html";
import { $compile, $input } from "@thi.ng/rdom";
import { staticDropdownAlt } from "@thi.ng/rdom-components";
import { Stream, reactive, sync } from "@thi.ng/rstream";
import {
	comp,
	map,
	multiplex,
	partition,
	pluck,
	range,
	str,
	transduce,
	zip,
} from "@thi.ng/transducers";
import { bits } from "@thi.ng/transducers-binary";
import { FONT } from "./font";

// retrieve font bytes for given char (only printable ASCII range supported)
const lookupChar = (c: string) => {
	const idx = c.charCodeAt(0) - 32;
	return idx >= 0 && idx < FONT.length ? FONT[idx] : FONT[0];
};

// re-usable transducer to join a given array of characters into a single string
const xfJoin = map((x: string[]) => x.join(""));

// higher order transducer to transform single char from string
const xfChar = (i: number, on: string, off: string) =>
	comp(
		// use byte `i` lane from current row
		pluck<number[], number>(i),
		// split into bits
		bits(8),
		// transform each bit
		map((x) => (x ? on : off)),
		// re-group
		partition(8),
		// build string
		xfJoin
	);

// transform entire string
const banner = ({ text, on, off }: IObjectOf<string>) =>
	transduce(
		comp(
			// dynamically create `xfChar` transducers for each char of the
			// input string and run them in parallel via `multiplex()`
			// @ts-ignore
			multiplex(...map((i) => xfChar(i, on, off), range(text.length))),
			// then join the results for each line
			xfJoin
		),
		// use `str()` reducer to build string result of lines
		str("\n"),
		// convert input string into stream of row-major bitmap font tuples
		// @ts-ignore
		zip(...map(lookupChar, text || " "))
	);

// dropdown menu for on/off bits
const charSelector = (stream: Stream<string>) =>
	staticDropdownAlt(
		[
			["#", "#"],
			["@", "@"],
			["*", "*"],
			["X", "X"],
			["/", "/"],
			["|", "|"],
			["=", "="],
			["-", "-"],
			["_", "_"],
			["^", "^"],
			[".", "."],
			[" ", "space"],
		],
		stream,
		{
			attribs: {
				class: "ml3",
				onchange: $input(stream),
			},
			label: (x) => x[1],
			value: (x) => x[0],
		}
	);

// reactive stream setup
const text = reactive("8BIT POWER!");
const on = reactive("/");
const off = reactive(" ");

// transforming stream combinator: combines user input and char choices, then
// transforms all to build the bigfont result string
const result = sync({ src: { text, on, off } }).transform(map(banner));

$compile(
	div(
		{},
		div(
			{},
			inputText({ oninput: $input(text), value: text }),
			charSelector(on),
			charSelector(off)
		),
		pre(".code.w-100.pa2.overflow-x-auto.bg-washed-yellow", {}, result)
	)
).mount(document.getElementById("app")!);

// input.next(transduce(map((x: number) => String.fromCharCode(x)), str(), range(32, 127)));
