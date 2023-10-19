import { circle, group, polygon, text, vertices } from "@thi.ng/geom";
import { DVMesh } from "@thi.ng/geom-voronoi";
import { haltonND, kroneckerND, plasticND } from "@thi.ng/lowdisc";
import { $canvas } from "@thi.ng/rdom-canvas";
import { fromRAF } from "@thi.ng/rstream";
import { comp, iterator, map, take } from "@thi.ng/transducers";
import { floor2, fract2, mul2, mulN2, randMinMax2 } from "@thi.ng/vectors";

// canvas width
const W = 480;
// clipping boundary vertices (can use any convex polygon)
const BOUNDS = vertices(circle([W / 2, W / 2], W * 0.49), 40);

// choose random coefficients to transform generated points
// each combination will result in a different quasi-random lattice structure
const CRYSTAL = floor2(null, randMinMax2([], [1, 1], [50, 50]));

// create a stream of requestAnimationFrame events and transform each value
// (i.e. frame counter) into a group of voronoi cells. to slow down the
// animation, replace `fromRAF()` with e.g. `fromInterval(N)` (where N is a
// delay value in milliseconds)
const geo = fromRAF().map((frame) => {
	// obtain point iterator from one of the available quasi-random
	// (aka low-discrepancy) sequence generators (see https://thi.ng/lowdisc).
	// each of these sequence gens are lazy & infinite and able to produce
	// n-dimensional samples/points. we compose a transducer to limit the number
	// of points used and scale them from the [0..1] range to the configured
	// canvas size...
	// note: using transducers avoids allocating any temporary arrays for
	// interim results, as well as being entirely lazy (i.e. the points will
	// only be generated & transformed once the iterator will be consumed
	// further below...)
	const points = iterator(
		comp(
			// take a growing number of points each frame (cyclic)
			take(((frame % 300) + 1) * 8),
			// scale points by crystal coefficients, then only keep fractional part
			map((p) => fract2(null, mul2(p, p, CRYSTAL))),
			// scale points to canvas size
			map((p) => mulN2(p, p, W))
		),
		// choose one of the sequence generators (again, see readme!) and for background:
		// https://extremelearning.com.au/unreasonable-effectiveness-of-quasirandom-sequences/
		// https://en.wikipedia.org/wiki/Low-discrepancy_sequence
		plasticND(2)
		// the following generators are parametric and will produce different
		// characteristics/orderings. read up & experiment!
		// kroneckerND([1 / 2 ** 0.5, 1 / 5 ** 0.5])
		// haltonND([2, 3])
	);
	// add the points to a dual Delaunay-Voronoi mesh
	const mesh = new DVMesh([...points]);
	// obtain voronoi cells vertices from the mesh, convert into polygons and
	// return as group of shapes
	return group(
		{ __background: "#eee", stroke: "#00f", fill: "none", baseline: "top" },
		[
			// by default the voronoi cells are returned as is, but can be filtered
			// & clipped using a provided convex boundary polygon (given as array of
			// vertices)
			...map(polygon, mesh.voronoi(BOUNDS)),
			// alternatively, obtain Delaunay triangles
			// ...map(polygon, mesh.delaunay(BOUNDS)),

			// include the randomly chosen crystal coefficients as label
			text([10, 10], JSON.stringify(CRYSTAL)),
		]
	);
});

// create a reactive canvas component (subscribed to the above geometry stream).
// each time the `geo` stream yields a new value, the canvas will update & draw
// the new given shapes...
$canvas(geo, [W, W]).mount(document.getElementById("app")!);
