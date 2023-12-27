import { $compile, $lazy } from "@thi.ng/rdom";
import { map, range } from "@thi.ng/transducers";

const colors = [
	"dark-red",
	"dark-blue",
	"purple",
	"green",
	"gold",
	"yellow",
	"light-blue",
	"dark-blue",
	"pink",
];

// dummy component to demonstrate lazy initialization via rdom's $lazy()
// wrapper. $lazy() takes an async function to produce the actual component body
// which will only be called once the wrapper element comes into view or
// (optionally) intersects a given root element.
//
// References & more info:
// https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/IntersectionObserver
// https://docs.thi.ng/umbrella/rdom/functions/_lazy.html

const lazyLoad = (i: number) => {
	const t0 = Date.now();
	return $lazy(
		"div.lazy-item",
		{},
		async () => [
			`div.fadein.bg-${colors[i % colors.length]}`,
			{},
			["h1", {}, `Lazy load #${i + 1}`],
			["p", {}, `(initialized after ${Date.now() - t0} ms)`],
		],
		// trigger event already when element is within 5% of viewport edge
		{ threshold: 0.05 }
	);
};

// full-height intro section component
// see /css/style.meta for stylesheets
const intro = [
	"div#intro",
	{},
	["h1", {}, "↓ Scroll down (slowly) ↓"],
	[
		"p",
		{},
		"Each of the items below are lazily initiated (only once each comes into view)",
	],
];

// main UI
$compile(["div", {}, intro, ...map(lazyLoad, range(20))]).mount(
	document.getElementById("app")!
);
