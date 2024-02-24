import type { DrawCommand } from "@thi.ng/axidraw/api";
import { DOWN, MOVE, UP } from "@thi.ng/axidraw/commands";
import { polyline } from "@thi.ng/axidraw/polyline";
import type { MultiFn1O } from "@thi.ng/defmulti";
import { defmulti } from "@thi.ng/defmulti/defmulti";
import type { Group } from "@thi.ng/geom";
import type { Attribs, IHiccupShape, IShape, PCLike } from "@thi.ng/geom-api";
import { clipPolylinePoly } from "@thi.ng/geom-clip-line/clip-poly";
import { pointInPolygon2 } from "@thi.ng/geom-isec/point";
import { applyTransforms } from "@thi.ng/geom/apply-transforms";
import { asPolyline } from "@thi.ng/geom/as-polyline";
import { __dispatch } from "@thi.ng/geom/internal/dispatch";
import { __sampleAttribs } from "@thi.ng/geom/internal/vertices";
import { takeNth } from "@thi.ng/transducers/take-nth";
import type { ReadonlyVec } from "@thi.ng/vectors";
import type {
	AsAxiDrawOpts,
	AxiDrawAttribs,
	PointOrdering,
	ShapeOrdering,
} from "./api.js";
import { pointsByNearestNeighbor } from "./sort.js";

/**
 * Lazily converts given shape (or group) into an iterable of thi.ng/axidraw
 * drawing commands, using optionally provided config options.
 *
 * @remarks
 * The provided conversion options can (and will) be overridden by a shape's
 * `__axi` attribute. See {@link AxiDrawAttribs} for details.
 *
 * Currently supported shape types (at least all types which are supported by
 * the
 * [`asPolyline()`](https://docs.thi.ng/umbrella/geom/functions/asPolyline.html)
 * function):
 *
 * - arc
 * - circle
 * - cubic
 * - ellipse
 * - group
 * - line
 * - path
 * - points
 * - polygon
 * - polyline
 * - quad
 * - quadratic
 * - rect
 * - triangle
 *
 * @example
 * ```ts
 * import { circle } from "@thi.ng/geom";
 * import { asAxiDraw } from "@thi.ng/geom-axidraw";
 *
 * [...asAxiDraw(circle(100), { samples: 100 })]
 * [
 *   [ 'm', [ 10, 0 ] ],
 *   [ 'd' ],
 *   [ 'm', [ 9.980267284282716, 0.6279051952931337 ], undefined ],
 *   ...
 * ]
 * ```
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
	const $sampleOpts = __sampleAttribs(opts?.samples, $.attribs);
	const { skip, sort, interleave } = __axiAttribs($.attribs);
	const children = skip ? [...takeNth(skip + 1, $.children)] : $.children;
	function* emitChunk(chunk: IHiccupShape[]) {
		const iter = sort ? (<ShapeOrdering>sort)(chunk) : chunk;
		for (let child of iter) {
			const shape = applyTransforms(child);
			shape.attribs = {
				...$.attribs,
				...shape.attribs,
				__samples: __sampleAttribs($sampleOpts, shape.attribs),
			};
			yield* asAxiDraw(shape, opts);
		}
	}
	if (interleave) {
		const { num, commands } = interleave;
		if (interleave.start !== false) yield* commands(0);
		for (let i = 0, n = children.length; i < n; ) {
			yield* emitChunk(children.slice(i, i + num));
			i += num;
			if (i < n) yield* commands(i);
		}
		if (interleave.end) yield* interleave.commands(children.length);
	} else {
		yield* emitChunk(children);
	}
}

function* __points(
	pts: ReadonlyVec[],
	attribs?: Attribs,
	opts?: Partial<AsAxiDrawOpts>
): IterableIterator<DrawCommand> {
	if (!pts.length) return;
	const {
		sort = pointsByNearestNeighbor(),
		clip,
		delayDown,
		delayUp,
		down,
		interleave,
		skip,
		speed,
	} = __axiAttribs(attribs);
	const clipPts = clip || opts?.clip;
	if (clipPts) {
		pts = pts.filter((p) => !!pointInPolygon2(p, clipPts));
		if (!pts.length) return;
	}
	if (skip) {
		pts = [...takeNth(skip + 1, pts)];
	}
	function* emitChunk($pts: ReadonlyVec[]): IterableIterator<DrawCommand> {
		if (down != undefined) yield ["pen", down];
		for (let p of sort ? (<PointOrdering>sort)($pts) : $pts) {
			yield MOVE(p, speed);
			yield DOWN(delayDown);
			yield UP(delayUp);
		}
		if (down != undefined) yield ["pen"];
	}
	yield UP();
	if (interleave) {
		const { num, commands } = interleave;
		if (interleave.start !== false) yield* commands(0);
		for (let i = 0, n = pts.length; i < n; ) {
			yield* emitChunk(pts.slice(i, i + num));
			i += num;
			if (i < n) yield* commands(i);
		}
		if (interleave.end) yield* interleave.commands(pts.length);
	} else {
		yield* emitChunk(pts);
	}
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
