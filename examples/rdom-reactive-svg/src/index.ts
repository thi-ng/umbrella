// SPDX-License-Identifier: Apache-2.0
import { css, lch } from "@thi.ng/color";
import { group, svg } from "@thi.ng/hiccup-svg";
import { SYSTEM } from "@thi.ng/random";
import { $compile } from "@thi.ng/rdom";
import { fromRAF } from "@thi.ng/rstream";
import { repeatedly } from "@thi.ng/transducers";

// time in seconds
const time = fromRAF({ timestamp: true }).map((t) => t * 0.001);

// create circle element w/ randomized reactive attribs
const circle = () => {
	const fX = SYSTEM.minmax(0.5, 3);
	const fY = SYSTEM.minmax(0.5, 3);
	const fR = SYSTEM.minmax(0.5, 3);
	const fC = SYSTEM.minmax(0.1, 1);
	// use plain hiccup to define the SVG circle element
	return [
		"circle",
		{
			cx: time.map((t) => Math.cos(t * fX) * 200),
			cy: time.map((t) => Math.sin(t * fY) * 200),
			r: time.map((t) => Math.sin(t * fR) * 45 + 50),
			fill: time.map((t) => css(lch(0.8, 1, t * fC))),
		},
	];
};

$compile(
	// for the non-reactive outer elements, we can use hiccup-svg
	// for convenience & syntax sugar...
	svg(
		{ width: 600, height: 600, style: { background: "#ccc" } },
		group(
			{ translate: [300, 300] },
			// create N random circles
			...repeatedly(circle, 10)
		)
	)
).mount(document.body);
