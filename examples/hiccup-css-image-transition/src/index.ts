import { diagonal2d } from "@thi.ng/grid-iterators";
import {
	PRETTY,
	animation,
	css,
	injectStyleSheet,
	ms,
	setPrecision,
	url,
	vmin,
} from "@thi.ng/hiccup-css";
import { $compile } from "@thi.ng/rdom";
import { mapIndexed, repeat } from "@thi.ng/transducers";
// assumes ViteJS to obtain image URLs
import IMG1 from "./img1.jpg";
import IMG2 from "./img2.jpg";

// image transition config
const SIZE = 100; // units: vmin (aka shortest edge of viewport)
const RES = 9;
const BLOCK_SIZE = SIZE / RES;
const DURATION = 10000; // milliseconds
const DELAY = DURATION / (RES * RES) / 4;

// set number of fractional digits for various CSS unit formatters (default: 4)
setPrecision(4);

// generate CSS animation & keyframe specs in hiccup-css format
// we will include these later in the main stylesheet
// https://docs.thi.ng/umbrella/hiccup-css/functions/animation.html
const reveal = animation(
	"reveal",
	{
		duration: ms(DURATION),
		"iteration-count": "infinite",
		"timing-function": "ease",
	},
	// transform an array of raw `[time, rotx, roty, opacity]` values
	// into an object of keyframes with a structure like:
	// { 10: { transform: "rotateY(0deg) rotateX(0deg)", opacity: 1 }, ... }
	// (timings in percent)
	[
		[0, 90, 90, 0],
		[10, 0, 0, 1],
		[50, 0, 0, 1],
		[60, 90, -90, 0],
	].reduce((acc, [time, rx, ry, opacity]) => {
		acc[time] = {
			transform: `rotateY(${ry}deg) rotateX(${rx}deg)`,
			opacity,
		};
		return acc;
	}, <any>{})
);

// function returning some common CSS size properties
// (`vmin(X)` is syntax sugar for `${x}vmin`)
const dimensions = (size: number) => ({
	width: vmin(size),
	height: vmin(size),
	"background-size": vmin(SIZE),
});

// function defining the CSS properties for a single transition cell/block
// receives a cell index and XY grid coordinates, returns a CSS rule in hiccup format
// (i.e. a simple JS array of `[selector, { properties }]`)
// the index is used to derive the animation delay for this cell
const cell = (id: number, [x, y]: number[]) => [
	`:nth-of-type(${id})`,
	{
		left: vmin(x * BLOCK_SIZE),
		top: vmin(y * BLOCK_SIZE),
		// array values will be concatenated:
		// top level values joined with `,`, inner arrays joined with ` `
		"background-position": [[vmin(-x * BLOCK_SIZE), vmin(-y * BLOCK_SIZE)]],
		"animation-delay": ms(id * DELAY),
	},
];

// define CSS style sheet in hiccup format
// (see thi.ng/hiccup-css readme for extensive set of features/options)
const style = [
	// each CSS rule is an array of selector and its properties
	["body", { margin: 0 }],
	// now the rules for the image transition container element
	[
		".dualimage",
		{
			// splice in CSS props from function
			...dimensions(SIZE),
			"background-image": url(IMG1),
			position: "relative",
			overflow: "hidden",
		},
		// ...and nested rules are used for nested selectors
		// e.g. here the resulting selector will be: `.dualimage > span`
		[
			"> span",
			{
				...dimensions(BLOCK_SIZE),
				"background-image": url(IMG2),
				position: "absolute",
				opacity: 0,
				"transform-origin": "0 50%",
				// animation: `reveal ${DURATION}s ease infinite`,
			},
			// splice in CSS rules for all transition blocks:
			// we use the `diagonal2d()` grid iterator to define the order
			// of elements and hence their timing and transition direction
			// each of these blocks will have a resulting CSS selector of:
			// `.dualimage > span:nth-of-type(x)`
			// see the thi.ng/grid-iterators readme for more iteration options
			...mapIndexed(cell, diagonal2d({ cols: RES, rows: RES })),
		],
	],
	// include animation & keyframes (defined above) in stylesheet
	...reveal,
];

// serialize styles to actual CSS source code with custom formatter
// (by default a more compact format is used, see readme for other options)
// https://docs.thi.ng/umbrella/hiccup-css/interfaces/CSSOpts.html
console.log(css(style, { format: PRETTY }));

// inject stylesheet into DOM (<head> section)
injectStyleSheet(css(style));

// generate & mount DOM elements for the image transition:
// for the given configuration it generates 9*9=81 inner <span> elements
$compile(["div.dualimage", {}, repeat(["span.reveal"], RES * RES)]).mount(
	document.getElementById("app")!
);

// alternatively, the entire HTML doc generation can also be handled offline via
// thi.ng/hiccup. also see thi.ng/hiccup-html for various HTML element functions
import { DOCTYPE_HTML, serialize } from "@thi.ng/hiccup";

console.log(
	serialize([
		DOCTYPE_HTML,
		[
			"html",
			{ lang: "en" },
			["head", ["style", css(style)]],
			["body", ["div.dualimage", {}, repeat(["span"], RES * RES)]],
		],
	])
);
