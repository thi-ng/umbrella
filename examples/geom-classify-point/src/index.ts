import {
	asPath,
	asPolygon,
	asSvg,
	circle,
	classifyPoint,
	polygon,
	svgDoc,
} from "@thi.ng/geom";
import { repeatedly } from "@thi.ng/transducers";
import { randMinMax2 } from "@thi.ng/vectors";

const poly = asPolygon(
	asPath(
		polygon([...repeatedly(() => randMinMax2([], [0, 0], [500, 500]), 8)], {
			fill: "#ccc",
			stroke: "#000",
			weight: 3,
			"fill-rule": "evenodd",
		}),
		{ mode: "breakpoints" }
	)
)[0];

document.body.innerHTML = asSvg(
	svgDoc(
		{ stroke: "none" },
		poly,
		...repeatedly(() => {
			const p = randMinMax2([], [0, 0], [500, 500]);
			return circle(p, 4, {
				fill: ["#f00", "#9f0", "#00f"][classifyPoint(poly, p, 5) + 1],
			});
		}, 1000)
	)
);
