import { asSvg, circle, svgDoc } from "@thi.ng/geom";
import { KdTreeSet } from "@thi.ng/geom-accel";
import { fit01 } from "@thi.ng/math";
import { samplePoisson } from "@thi.ng/poisson";
import { dist, randMinMax2 } from "@thi.ng/vectors";

const index = new KdTreeSet(2);

const pts = samplePoisson({
	index,
	points: () => randMinMax2(null, [0, 0], [500, 500]),
	density: (p) => fit01(Math.pow(dist(p, [250, 250]) / 250, 2), 2, 10),
	iter: 5,
	max: 8000,
	quality: 500,
});

// use thi.ng/geom to visualize results
// each circle's radius is set to distance to its nearest neighbor
const circles = pts.map((p) =>
	circle(p, dist(p, index.queryKeys(p, 40, 2)[1]) / 2)
);

document.body.innerHTML = asSvg(svgDoc({ stroke: "blue" }, ...circles));
