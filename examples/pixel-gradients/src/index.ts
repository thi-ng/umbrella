import { typedArrayOfVec } from "@thi.ng/api";
import { shuffle } from "@thi.ng/arrays";
import {
	analog,
	colorsFromRange,
	colorsFromTheme,
	convert,
	intAbgr32Srgb,
	oklab,
	srgbIntAbgr32,
} from "@thi.ng/color";
import { NUM_THEMES, asLCH } from "@thi.ng/color-palettes";
import { downloadCanvas } from "@thi.ng/dl-asset";
import { button, canvas, div, option, select } from "@thi.ng/hiccup-html";
import { defFloatFormat, floatBuffer } from "@thi.ng/pixel";
import { SYSTEM, XsAdd, randomID } from "@thi.ng/random";
import { $compile, $input, $inputTrigger } from "@thi.ng/rdom";
import { stream } from "@thi.ng/rstream";

// default PRNG (aka Math.random wrapper)
const RND = SYSTEM;
// alternatively, use a seedable PRNG:
// const RND = new XsAdd(0xdecafbad);

// config options for obtaining color themes (see below)
const OPTS = { num: 4, variance: 0.05, rnd: RND };

// various implementations to choose base colors for the gradient. all of the
// strategies return colors in LCH space (which will later be converted to Oklab
// and finally to sRGB)
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

	// choose a random color palette (from https://thi.ng/color-palettes),
	// shuffle it and create slight variations of each color...
	palette: () =>
		shuffle(asLCH(RND.int() % NUM_THEMES), 6, RND)
			.slice(0, 4)
			.map((x) => analog([], x, 0.1, RND)),
};

type Strategy = keyof typeof STRATEGIES;

// reactive state vars (initially empty/valueless)
const strategy = stream<Strategy>();
const download = stream<boolean>();

// define a custom pixel buffer format to store pixels in the Oklab color space:
// using Oklab instead of RGB combined with the bicubic image interpolation used
// to compute the gradient image means the colors will also be interpolated in
// the Oklab space (which is perceptually better [more correct] than RGB and
// leads to more pleasing results)...
const FMT_OKLAB = defFloatFormat({
	// technically, we're not using the alpha channel here, but it makes it
	// easier to handle
	alpha: true,
	channels: [3, 2, 1, 0],
	// custom conversions to & from packed integer ABGR format (needed for HTML canvas)
	convert: {
		// convert: 32bit int -> sRGB -> Oklab
		fromABGR: (x, out) =>
			convert(out || [], intAbgr32Srgb([], x), "oklab", "srgb"),
		// convert: Oklab -> sRGB -> 32bit int
		toABGR: (x) => srgbIntAbgr32(convert([], x, "srgb", "oklab")),
	},
});

// combine reactive streams and add subscription. each time a new value is
// pushed into any of the `src` streams, this subscription will run and generate a
// new image...
strategy.subscribe({
	next(id) {
		const canvas = <HTMLCanvasElement>document.getElementById("main");
		// pick new colors via chosen strategy, convert LCH -> Oklab
		// (still all colors in floating point format)
		// prettier-ignore
		const theme = STRATEGIES[id]().map((x) => convert(oklab(), x, "oklab", "lch"));
		// create a 2x2 pixels Oklab image, all pixels pre-initialized w/ the
		// converted theme colors, then resize the image to the canvas size
		// using bicubic interpolation before copying the pixels to the canvas
		// (incl. format conversion)
		floatBuffer(2, 2, FMT_OKLAB, typedArrayOfVec("f32", theme))
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
			// $inputTrigger is a event handler to emit `true` on given stream
			button(".ml3", { onclick: $inputTrigger(download) }, "Download")
		),
		canvas("#main", { width: 960, height: 540 })
	)
).mount(document.getElementById("app")!);

// trigger generation of first gradient image
strategy.next("range1");
