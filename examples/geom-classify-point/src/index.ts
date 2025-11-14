// SPDX-License-Identifier: Apache-2.0
import { adaptiveCanvas2d } from "@thi.ng/canvas";
import { circle, classifyPoint, group, smoothPolygon } from "@thi.ng/geom";
import { draw } from "@thi.ng/hiccup-canvas";
import { repeatedly } from "@thi.ng/transducers";
import { randMinMax2 } from "@thi.ng/vectors";

const poly = smoothPolygon(
	[...repeatedly(() => randMinMax2([], [0, 0], [500, 500]), 8)],
	{
		fill: "#ccc",
		fillRule: "evenodd",
		stroke: "#000",
		weight: 3,
	},
	{ mode: "break" }
);

const geo = group({ stroke: "none", scale: window.devicePixelRatio }, [
	poly,
	...repeatedly(() => {
		const p = randMinMax2([], [0, 0], [500, 500]);
		return circle(p, 3, {
			fill: ["#f00", "#9f0", "#00f"][classifyPoint(poly, p, 5) + 1],
		});
	}, 1000),
]);

draw(adaptiveCanvas2d(500, 500, document.body).ctx, geo);
