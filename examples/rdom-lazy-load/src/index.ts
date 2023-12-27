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

const lazyLoad = (i: number) =>
	$lazy(
		"div.lazy-item",
		{},
		async () => [
			`div.fadein.bg-${colors[i % colors.length]}`,
			{},
			["h1", {}, `Lazy load #${i + 1}`],
		],
		{ threshold: 0.05 }
	);

$compile([
	"div",
	{},
	[
		"div#intro",
		{},
		["h1", {}, "↓ Scroll down (slowly) ↓"],
		[
			"p",
			{},
			"Each of the items below are lazily initiated (only once each comes into view)",
		],
	],
	...map(lazyLoad, range(10)),
]).mount(document.getElementById("app")!);
