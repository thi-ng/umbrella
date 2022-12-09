import { DrawCommand, UP } from "@thi.ng/axidraw/api";
import { polyline } from "@thi.ng/axidraw/polyline";
import type { MultiFn1O } from "@thi.ng/defmulti";
import { defmulti } from "@thi.ng/defmulti/defmulti";
import type { Group } from "@thi.ng/geom";
import type { Attribs, IShape, PCLike, SamplingOpts } from "@thi.ng/geom-api";
import { clipPolylinePoly } from "@thi.ng/geom-clip-line/clip-poly";
import { pointInPolygon2 } from "@thi.ng/geom-isec/point";
import { applyTransforms } from "@thi.ng/geom/apply-transforms";
import { asPolyline } from "@thi.ng/geom/as-polyline";
import { __dispatch } from "@thi.ng/geom/internal/dispatch";
import type { ReadonlyVec } from "@thi.ng/vectors";
import type { AxiDrawAttribs, PointOrdering, ShapeOrdering } from "./api.js";

export interface AsAxiDrawOpts {
	/**
	 * Global options for sampling non-polygonal shape. Shapes can also provide
	 * a `__samples` attribute to override these global options.
	 *
	 * @remarks
	 * References:
	 * - https://docs.thi.ng/umbrella/geom-api/interfaces/SamplingOpts.html
	 * - https://docs.thi.ng/umbrella/geom/functions/vertices.html
	 */
	samples: number | Partial<SamplingOpts>;
	/**
	 * Clip polygon vertices. Can also be provided per-shape as
	 * {@link AxiDrawAttribs.clip} (i.e. as part of a shape's `__axi` attrib).
	 */
	clip: ReadonlyVec[];
}

/**
 * Lazily converts given shape (or group) into an iterable of thi.ng/axidraw
 * drawing commands, using optionally provided config options.
 *
 * @remarks
 * The provided conversion options can (and will) be overridden by a shape's
 * `__axi` attribute. See {@link AxiDrawAttribs} for details.
 *
 * Currently supported shape types (basically all types which
 * are supported by the
 * [`asPolyline()`](https://docs.thi.ng/umbrella/geom/functions/asPolyline.html)
 * function):
 *
 * - arc
 * - circle
 * - cubic
 * - ellipse
 * - line
 * - path
 * - polygon
 * - polyline
 * - quad
 * - quadratic
 * - rect
 * - triangle
 *
 */
export const asAxiDraw: MultiFn1O<
	IShape,
	Partial<AsAxiDrawOpts>,
	Iterable<DrawCommand>
> = defmulti<IShape, Partial<AsAxiDrawOpts> | undefined, Iterable<DrawCommand>>(
	__dispatch,
	{
		arc: "circle",
		cubic: "circle",
		ellipse: "circle",
		line: "polyline",
		path: "circle",
		poly: "polyline",
		quad: "polyline",
		quadratic: "circle",
		rect: "polyline",
		tri: "polyline",
	},
	{
		points: ($, opts) =>
			__points((<PCLike>applyTransforms($)).points, $.attribs, opts),

		// used for all shapes which need to be sampled
		circle: ($, opts) =>
			__polyline(
				asPolyline(applyTransforms($), opts?.samples).points,
				$.attribs,
				opts
			),

		// ignore sample opts for polyline & other polygonal shapes
		// i.e. use points verbatim
		polyline: ($, opts) =>
			__polyline(asPolyline(applyTransforms($)).points, $.attribs, opts),

		group: ($, opts) => __group(<Group>$, opts),
	}
);

function* __group(
	$: Group,
	opts?: Partial<AsAxiDrawOpts>
): IterableIterator<DrawCommand> {
	const { sort } = __axiAttribs($.attribs);
	const children = sort ? (<ShapeOrdering>sort)($.children) : $.children;
	for (let child of children) {
		const shape = applyTransforms(child);
		shape.attribs = {
			...shape.attribs,
			...$.attribs,
		};
		yield* asAxiDraw(shape, opts);
	}
}

function* __points(
	pts: ReadonlyVec[],
	attribs?: Attribs,
	opts?: Partial<AsAxiDrawOpts>
): IterableIterator<DrawCommand> {
	if (!pts.length) return;
	const { clip, delayDown, delayUp, down, speed, sort } =
		__axiAttribs(attribs);
	const clipPts = clip || opts?.clip;
	if (clipPts) {
		pts = pts.filter((p) => !!pointInPolygon2(p, clipPts));
		if (!pts.length) return;
	}
	yield UP;
	if (down != undefined) yield ["pen", down];
	for (let p of sort ? (<PointOrdering>sort)(pts) : pts) {
		yield* <DrawCommand[]>[
			["m", p, speed],
			["d", delayDown],
			["up", delayUp],
		];
	}
	if (down != undefined) yield ["pen"];
}

function* __polyline(
	pts: ReadonlyVec[],
	attribs?: Attribs,
	opts?: Partial<AsAxiDrawOpts>
): IterableIterator<DrawCommand> {
	if (!pts.length) return;
	const { clip, down, delayDown, delayUp, speed } = __axiAttribs(attribs);
	const clipPts = clip || opts?.clip;
	const chunks = clipPts ? clipPolylinePoly(pts, clipPts) : [pts];
	if (!chunks.length) return;
	for (let chunk of chunks) {
		yield* polyline(chunk, { down, delayDown, delayUp, speed });
	}
}

/** @internal */
const __axiAttribs = (attribs?: Attribs): Partial<AxiDrawAttribs> =>
	attribs ? attribs.__axi || {} : {};
