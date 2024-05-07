import {
	Path,
	asSvg,
	bounds,
	complexPolygon,
	fitIntoBounds2,
	path,
	pathFromSvg,
	rectWithCentroid,
	svgDoc,
} from "@thi.ng/geom";
import { asPolygons, asSDF, diff, sample2d } from "@thi.ng/geom-sdf";
import { add2, mag, rotate } from "@thi.ng/vectors";

const src = <Path>fitIntoBounds2(
	pathFromSvg(
		// https://www.svgrepo.com/svg/451605/face-smile-big
		"M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zM6 5c.558 0 1.031.473 1.031 1.031V7c0 .558-.473 1-1.031 1-.558 0-1-.442-1-1v-.969C5 5.473 5.442 5 6 5zm4 0c.558 0 1 .473 1 1.031V7c0 .558-.442 1-1 1s-1-.442-1-1v-.969C9 5.473 9.442 5 10 5zM3 9.031c2 1.304 7.987 1.304 10.031 0l-.03.531c-.037.43-1 3.376-5 3.407-4 .031-5-2.78-5-3.313z"
	),
	rectWithCentroid([0, 0], 400)
);

const contourBounds = bounds(src, 20)!;

const sdf = diff([asSDF(src), ...src.subPaths.map((s) => asSDF(path(s)))]);

const res = [100, 100];

const update = (t: number) => {
	t *= 0.001;
	const image = sample2d(sdf, contourBounds, res, (p) =>
		rotate([], p, mag(p) * Math.sin(t) * 0.04)
	);

	const contours = (d: number, fill: string) => {
		const polys = asPolygons(image, contourBounds, res, [d], 0.1);
		return complexPolygon(polys[0], polys.slice(1), { fill });
	};

	document.getElementById("app")!.innerHTML = asSvg(
		svgDoc(
			{ stroke: "none" },
			contours(10, "#000"),
			contours(0, "#f60"),
			contours(-10, "#fc0")
		)
	);
	requestAnimationFrame(update);
};

requestAnimationFrame(update);
