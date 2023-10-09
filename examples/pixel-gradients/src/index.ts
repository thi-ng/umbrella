import { typedArrayOfVec } from "@thi.ng/api";
import { shuffle } from "@thi.ng/arrays";
import {
	analog,
	colorsFromRange,
	colorsFromTheme,
	convert,
} from "@thi.ng/color";
import { asLCH } from "@thi.ng/color-palettes";
import { downloadCanvas } from "@thi.ng/dl-asset";
import { button, canvas, div, option, select } from "@thi.ng/hiccup-html";
import { FLOAT_RGBA, floatBuffer } from "@thi.ng/pixel";
import { SYSTEM, XsAdd, pickRandom, randomID } from "@thi.ng/random";
import { $compile, $input, $inputTrigger } from "@thi.ng/rdom";
import { stream } from "@thi.ng/rstream";

// default PRNG (aka Math.random wrapper)
const RND = SYSTEM;
// alternatively, use a seedable PRNG:
// const RND = new XsAdd(0xdecafbad);

// selection of color theme IDs from https://thi.ng/color-palettes
// (will be used by `palette` strategy below...)
const THEMES = [46, 54, 100, 126, 139, 145, 184, 187, 191, 218];

// config options for obtaining color themes (see below)
const OPTS = { num: 4, variance: 0.05, rnd: RND };

// various implementations to choose base colors for the gradient
// all of the strategies return colors in LCH format
const STRATEGIES = {
	// pick randomized colors from predefined color range descriptors
	// see https://thi.ng/color readme for list of available options (and results)
	range1: () => [...colorsFromRange("weak", OPTS)],
	range2: () => [...colorsFromRange("cool", OPTS)],
	range3: () => [...colorsFromRange("light", OPTS)],

	// pick randomized colors based on given weighted set of theme part specs.
	// each part can specify a base CSS color and optionally a color range to
	// modify/tint that color, as well as a weight to control how often colors
	// from this theme part will be picked. weights are always relative to each
	// other and do not need to sum to 1.0
	declarative: () => [
		// this theme will statistically contain 2x more aliceblue and mintcream
		// than orange. shades of hotpink are 5x less likely to be picked...
		// https://docs.thi.ng/umbrella/color/functions/colorsFromTheme.html
		...colorsFromTheme(
			[
				["cool", "aliceblue", 0.5],
				["soft", "mintcream", 0.5],
				["bright", "orange", 0.25],
				["hotpink", 0.1],
			],
			OPTS
		),
	],

	// choose a random color theme, shuffle it and create slight variations of
	// each color...
	palette: () =>
		shuffle(asLCH(pickRandom(THEMES, RND)), 6, RND)
			.slice(0, 4)
			.map((x) => analog([], x, 0.1, RND)),
};

type Strategy = keyof typeof STRATEGIES;

// reactive state vars (initially empty/valueless)
const strategy = stream<Strategy>();
const download = stream<boolean>();

// add gradient image generation as subscription. each time a new value is
// pushed into the `strategy` stream, this subscription will run and generate a
// new image...
strategy.subscribe({
	next(id) {
		const canvas = <HTMLCanvasElement>document.getElementById("main");
		// prettier-ignore
		// pick new colors via chosen strategy, convert LCH -> sRGB
		// (still all colors in floating point format)
		const theme = STRATEGIES[id]().map((x) => convert([], x, "srgb", "lch"));
		// prettier-ignore
		// create a 2x2 float RGBA image, all (4) pixels pre-initialized w/ theme colors
		// then resize image to canvas size using bicubic interpolation
		// then copy pixels to canvas (incl. format conversion)
		floatBuffer(2, 2, FLOAT_RGBA, typedArrayOfVec("f32", theme))
			.resize(canvas.width, canvas.height, "cubic")
			.blitCanvas(canvas);
	},
});

// subscription for download trigger stream to, well... download the canvas
download.subscribe({
	next() {
		downloadCanvas(
			<HTMLCanvasElement>document.getElementById("main"),
			`gradient-${randomID(4)}`
		);
	},
});

// compile & mount UI/DOM
$compile(
	div(
		{},
		div(
			".mb3",
			{},
			// dropdown menu for theme strategies
			select(
				{ onchange: $input(strategy), value: strategy },
				...Object.keys(STRATEGIES).map((x) => option({ value: x }, x))
			),
			// prettier-ignore
			// when clicked, simply retrigger with current strategy
			// (deref() obtains the stream's current value)
			button(".ml3", { onclick: () => strategy.next(strategy.deref()!) }, "Generate"),
			// prettier-ignore
			// $inputTrigger is a event handler to emit `true` on given stream
			button(".ml3",{ onclick: $inputTrigger(download) }, "Download")
		),
		canvas("#main", { width: 960, height: 540 })
	)
).mount(document.getElementById("app")!);

// trigger generation of first gradient image
strategy.next("range1");
