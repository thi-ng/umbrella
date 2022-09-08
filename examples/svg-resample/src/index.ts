import {
	asPolygon,
	Path,
	pathFromSvg,
	points,
	svgDoc,
	vertices,
} from "@thi.ng/geom";
import { div, img } from "@thi.ng/hiccup-html";
import { convertTree } from "@thi.ng/hiccup-svg";
import { fit11 } from "@thi.ng/math";
import { $compile, $replace } from "@thi.ng/rdom";
import { fromRAF } from "@thi.ng/rstream";
import { parse, Type } from "@thi.ng/sax";
import {
	comp,
	filter,
	map,
	mapcat,
	push,
	transduce,
} from "@thi.ng/transducers";
import SVG from "./example.svg";

(async () => {
	const raw = await fetch(SVG);
	// parse SVG using @thi.ng/sax and filter out only <path> elements
	// transform each of these elements into an actual Path shape type (@thi.ng/geom)
	const paths = transduce(
		comp(
			parse(),
			filter((ev) => ev.type === Type.ELEM_END && ev.tag === "path"),
			// pathFromSvg() returns an array of subpaths
			// using mapcat() flattens that array
			mapcat((ev) => pathFromSvg(ev.attribs!.d))
		),
		push<Path>(),
		await raw.text()
	);

	// transforms paths into point clouds
	const resamplePaths = (frame: number) => {
		// remap frame to sample distance
		const dist = fit11(Math.sin(frame * 0.01), 4, 20);
		// convert each path:
		// - first into a polygon
		// - then resample poly using uniform distance and extract vertices
		// - wrap in `points` container (aka point cloud)
		return paths.map((path) => points(vertices(asPolygon(path), { dist })));
	};

	// now create reactive requestAnimationFrame() stream which:
	// - resamples all SVG paths
	// - wraps and converts into hiccup SVG format
	// - wraps resulting SVG doc in a styled div

	// Note: The convertTree() function is needed because the result of
	// thi.ng/geom's svgDoc() encodes shapes with a more efficient (and
	// flexible) hiccup format where all attribute values are still
	// non-stringified (and so can still easily be transformed further). Only
	// after calling convertTree() is the resulting hiccup tree compatible with
	// and ready for DOM generation... Also see docs for further details!
	const resampled = fromRAF().transform(
		comp(
			map(resamplePaths),
			map((shapes) =>
				convertTree(
					svgDoc(
						{
							viewBox: "-160 -160 320 320",
							stroke: "red",
							fill: "none",
						},
						...shapes
					)
				)
			),
			map((svg) => div(".dib.w-50", {}, svg))
		)
	);

	// compile DOM tree
	// LHS shows original SVG file
	// RHS shows resampled version (wrapped using $replace() control component)
	$compile(
		div({}, img(".dib.w-50", { src: SVG }), $replace(resampled))
	).mount(document.body);
})();
