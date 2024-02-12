import type { Fn } from "@thi.ng/api";
import { ch, px } from "@thi.ng/hiccup-css";
import { group, linear, wrap } from "@thi.ng/ramp";
import { $compile } from "@thi.ng/rdom";
import { fromObject } from "@thi.ng/rstream";

// object of named animation timelines, each with its own independent
// set of keyframes (defined by tuples of `[time, value]`)
// the `time` value here is abstract and we will actually use the
// window's vertical scroll offset...
const channels = {
	// `linear()` creates timeline with linear interpolation
	hello: linear([
		[0, window.innerWidth],
		[500, -400],
	]),
	world: linear([
		[100, window.innerWidth],
		[400, -400],
	]),
	// this next timeline loops by wrapping the time domain into the
	// time interval defined by the first & last keyframes
	header: linear(
		[
			[0, -2],
			[100, 0],
		],
		{ domain: wrap }
	),
	// same as above header timeline (only in opposite direction)
	footer: linear(
		[
			[0, 0],
			[100, -2],
		],
		{ domain: wrap }
	),
	alpha: linear([
		[0, 0],
		[200, 1],
	]),
};

// create grouped timeline so we can interpolate all channels at once
const timeline = group(channels);

// create reactive subscriptions matching the timeline's object structure
// i.e. for each key/channel this will create a reactive stream and
// seed it with the values from the first frame (at t=0)
const anim = fromObject(timeline.at(0));

// attach scroll event handler and use scrollY position to recompute all
// timeline channels and feed result into the reactive stream topology
window.addEventListener("scroll", (e) =>
	anim.next(timeline.at(window.scrollY))
);

// helper function for defining an horizontally animating <div> element
const animEl = (
	id: keyof typeof channels,
	unit: Fn<number, string>,
	style: any,
	body: string
) => [
	`div#${id}`,
	// here we make the `left` position reactive by assigning the
	// corresponding timeline channel stream directly as value.
	// once that stream updates, the CSS property will update too...
	{ style: { ...style, left: anim.streams[id].map(unit) } },
	body,
];

// create & mount reactive UI/DOM
$compile([
	"div",
	{},
	animEl("header", ch, { opacity: anim.streams.alpha }, ">".repeat(200)),
	animEl("footer", ch, { opacity: anim.streams.alpha }, "<".repeat(200)),
	animEl("hello", px, { top: "35%" }, "hello"),
	animEl("world", px, { top: "50%" }, "world"),
]).mount(document.getElementById("app")!);
