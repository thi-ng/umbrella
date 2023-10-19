import { argMax } from "@thi.ng/arrays";
import { COSINE_GRADIENTS, cosineColor } from "@thi.ng/color";
import { threadLast } from "@thi.ng/compose";
import { fiber } from "@thi.ng/fibers";
import {
	area,
	asPolygon,
	centroid,
	circle,
	edges,
	group,
	intersects,
	polygon,
	ray,
	vertices,
	withAttribs,
	type Polygon,
} from "@thi.ng/geom";
import { Sampler } from "@thi.ng/geom-resample";
import { draw } from "@thi.ng/hiccup-canvas";
import { clamp, fitClamped, fract, mix } from "@thi.ng/math";
import { SYSTEM } from "@thi.ng/random";
import { $el } from "@thi.ng/rdom";
import {
	cycle,
	iterate,
	last,
	map,
	mapcat,
	range,
	take,
} from "@thi.ng/transducers";
import {
	add2,
	direction2,
	dist2,
	perpendicularCCW,
	pointOnRay2,
	type Vec,
} from "@thi.ng/vectors";

// default PRNG (aka Math.random wrapper)
const RND = SYSTEM;
// const RND = new XsAdd(0xdecafbad);

// min polygon area
const MIN_AREA = 100;
// max polygon area
const MAX_AREA = 1000;
// choose a cosine-gradient preset for tinting polygons
// https://github.com/thi-ng/umbrella/blob/develop/packages/color/README.md#cosine-gradients
const GRADIENT = COSINE_GRADIENTS["orange-magenta-blue"];

// function to split a polygon from a random point on its longest edge
// returns two new polygons (or the original if poly couldn't be split further)
const splitPoly = (poly: Polygon, base = 0.5, eps = 0, minArea = 0) => {
	// don't subdivide if already smaller than min area
	if (area(poly) < minArea) return [poly];
	// obtain polygon boundary as array of edges (each edge is just an `[a,b]`
	// tuple of points/vertices)
	const polyEdges = [...edges(poly)];
	// find longest edge
	const longestEdge = polyEdges[argMax(polyEdges.map((e) => dist2(...e)))];
	// create a (closed) boundary sampler, which allows us to query and extract
	// points and sections from the polygon boundary
	const sampler = new Sampler(vertices(poly), true);
	// compute parametric positions of that edge's vertices on the polygon's
	// boundary. these positions are based on the arc length (perimeter) and
	// always in the normalized [0..1] interval (e.g. t=0 corresponds to first
	// poly vertex, t=0.5 to half-way position etc.)
	const tmin = sampler.closestT(longestEdge[0])!;
	// since the last vertex of a polygon is the same as first, this function
	// can potentially return 0 (i.e. the parametric position of the first/last
	// vertex), however if that occurs the logical-or will force that result to
	// be 1.0 to ensure `tmax > tmin`
	const tmax = sampler.closestT(longestEdge[1])! || 1;
	// compute parametric base split position
	const tsplit = mix(tmin, tmax, base);
	// randomize split position (RND.norm(x) returns a value in [-x..+x] interval)
	// clamp position to interval of longest edge
	let ta = clamp(tsplit + RND.norm(eps), tmin, tmax);
	// compute actual boundary point for that position
	const pa = sampler.pointAt(ta)!;
	// compute boundary's normal vector for the split position (ray direction)
	// normal vector is obtained by rotating the tangent by 90 degrees
	const dir = perpendicularCCW([], sampler.tangentAt(ta)!);
	// next perform a raycast to compute the 2nd split point on the polygon
	// boundary. we translate/offset the ray's origin by a small amount along
	// the ray direction to ensure intersection is not `pa` itself
	const rayOrigin = pointOnRay2([], pa, dir, 0.01);
	// compute intersection point between ray and poly boundary
	const isec = intersects(ray(rayOrigin, dir), poly);
	// no intersection might be found in some extreme configurations, then bail
	if (!isec.isec) return [poly];
	// compute parametric position of intersection point:
	// fract() returns fractional part (in case resultng parametric position
	// falls outside the [0..1] interval)
	let tb = fract(sampler.closestT(<Vec>isec.isec)! + RND.norm(eps));
	// let tb = fract(sampler.closestT(<Vec>isec.isec)! + RND.norm(teps));
	// ensure `ta` is less than `tb` (swap if needed)...
	if (tb < ta) [ta, tb] = [tb, ta];
	// extract sub-sections of vertices from the original boundary:
	// from beginning to 1st split point
	const vertsA = sampler.extractRange(0, ta)!;
	// from 1st to 2nd split point
	const vertsAB = sampler.extractRange(ta, tb)!;
	// from 2nd split point to end
	const vertsB = sampler.extractRange(tb, 1)!;
	// remove last vertex (same as first in `vertsA`) to avoid duplication
	vertsB.pop();
	// build & return new polygons
	const result: Polygon[] = [];
	addPoly(result, vertsAB);
	addPoly(result, vertsA.concat(vertsB));
	return result;
};

// helper function to check polygon verts and only add to result if not degenerate
const addPoly = (res: Polygon[], verts: Vec[]) =>
	verts.length >= 3 && res.push(polygon(verts));

// for convex polygons only: insets all vertices by distance `d` towards the
// centroid of the polygon
const insetConvex = (poly: Polygon, d = 1) => {
	const c = centroid(poly)!;
	poly.points.forEach((p) => add2(p, p, direction2([], p, c, d)));
	return poly;
};

// computes a gradient color for given polygon based on its area and globally
// configured min/max areas. uses cosine color gradient defined further above
// the `exp` arg is used to control the gradient bias/curve, i.e. if `exp<1`
// more shapes will receive colors towards the end color, if `exp>1` more shapes
// will receive colors near the start color.
const tonemap = (poly: Polygon, exp = 0.5) =>
	cosineColor(
		GRADIENT,
		fitClamped(area(poly), MIN_AREA, MAX_AREA, 0, 1) ** exp
	);

// create canvas element with attribs
const canvas = <HTMLCanvasElement>(
	$el("canvas", { width: 600, height: 600 }, null, document.body)
);
const ctx = canvas.getContext("2d")!;

// infinite update loop (will be run as fiber/co-routine)
function* update() {
	// polygon splitting variance (should be in [0..0.1] range, YMMV)
	const eps = 0;
	// cycle(...) creates an infinitely repeating sequence of values
	for (let base of cycle(range(0.01, 1, 0.01))) {
		// pointfree dataflow pipeline to iteratively subdivide a seed polygon
		// and transform the result shapes. the given operations are executed in
		// sequence, with each result being threaded (as last arg) to the
		// following processing step and so on... `threadLast()` returns the
		// result of the final processing step. see links for details/docs about
		// this function/operator:
		// https://docs.thi.ng/umbrella/compose/functions/threadLast.html
		// https://mastodon.thi.ng/@toxi/110972322869333970
		const shapes = threadLast(
			// original shape: circle w/ radius=300, converted to polygon with N vertices
			[asPolygon(circle(300), 40)],
			// lazy, iterative & infinite(!) subdivision: `iterate()` produces the
			// inductive sequence: f(x+1) = f(f(x)), i.e. the result of the current
			// iteration becomes the input for the next iteration...
			// https://docs.thi.ng/umbrella/transducers/functions/iterate.html
			[
				iterate,
				(polys: Iterable<Polygon>) =>
					mapcat((p) => splitPoly(p, base, eps, MIN_AREA), polys),
			],
			// since `iterate()` is infinite (but lazy, this is key!), we're
			// only interested in the first N iterations
			[take, 11],
			// ...of these first N iterations, we only take the result of the
			// last one, discarding the rest. in other words: in this case here,
			// this gives us the result of the 11th iteration
			last,
			// now inset the corners of each polygon
			[map, (x: Polygon) => insetConvex(x)],
			// assign a color to each polygon
			[map, (x: Polygon) => withAttribs(x, { fill: tonemap(x) })],
			// wrap all shapes within a single group
			// (the attribs are only needed/used for canvas drawing)
			(x) => group({ translate: [300, 300], __clear: true }, [...x])
		);
		// draw to canvas
		draw(ctx, shapes);
		// wait for next frame
		yield;
	}
}

// start execution... by default via requestAnimationFrame()
fiber(update).run();

// alternative invocation w/ custom scheduler
// fiber(update).runWith((f) => setTimeout(f, 300));
