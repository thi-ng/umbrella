import type { Fn, Maybe } from "@thi.ng/api";
import type { DrawCommand } from "@thi.ng/axidraw/api";
import { DOWN, MOVE, UP } from "@thi.ng/axidraw/commands";
import { polyline } from "@thi.ng/axidraw/polyline";
import type { MultiFn1O } from "@thi.ng/defmulti";
import { defmulti } from "@thi.ng/defmulti/defmulti";
import type {
	Attribs,
	Circle,
	ComplexPolygon,
	Group,
	IHiccupShape2,
	IShape2,
	PCLike,
	Polyline,
} from "@thi.ng/geom";
import { clipPolylinePoly } from "@thi.ng/geom-clip-line/clip-poly";
import { pointInPolygon2 } from "@thi.ng/geom-isec/point";
import { applyTransforms } from "@thi.ng/geom/apply-transforms";
import { asPolyline } from "@thi.ng/geom/as-polyline";
import { __dispatch } from "@thi.ng/geom/internal/dispatch";
import { __sampleAttribs } from "@thi.ng/geom/internal/vertices";
import { withAttribs } from "@thi.ng/geom/with-attribs";
import { mapcat } from "@thi.ng/transducers/mapcat";
import { takeNth } from "@thi.ng/transducers/take-nth";
import type { ReadonlyVec } from "@thi.ng/vectors";
import type {
	AsAxiDrawOpts,
	AxiDrawAttribs,
	InterleaveOpts,
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
 * - complexpoly
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
	IShape2,
	Partial<AsAxiDrawOpts>,
	Iterable<DrawCommand>
> = defmulti<any, Maybe<Partial<AsAxiDrawOpts>>, Iterable<DrawCommand>>(
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
		points: ($: PCLike, opts) =>
			__points((<PCLike>applyTransforms($)).points, $.attribs, opts),

		// used for all shapes which need to be sampled
		circle: ($: Circle, opts) =>
			mapcat(
				(line) => __polyline(line.points, $.attribs, opts),
				asPolyline(applyTransforms($), opts?.samples)
			),

		complexpoly: ($: ComplexPolygon, opts) =>
			mapcat(
				(poly) => asAxiDraw(withAttribs(poly, $.attribs, false), opts),
				[$.boundary, ...$.children]
			),

		// ignore sample opts for polyline & other polygonal shapes
		// i.e. use points verbatim
		polyline: ($: Polyline, opts) =>
			__polyline(
				asPolyline(applyTransforms($))[0].points,
				$.attribs,
				opts
			),

		group: __group,
	}
);

/** @internal */
function* __interleaved<T>(
	emitChunk: Fn<T[], Iterable<DrawCommand>>,
	items: T[],
	opts: InterleaveOpts
) {
	const { num, commands } = opts;
	if (opts.start !== false) yield* commands(0);
	for (let i = 0, n = items.length; i < n; ) {
		yield* emitChunk(items.slice(i, i + num));
		i += num;
		if (i < n) yield* commands(i);
	}
	if (opts.end) yield* opts.commands(items.length);
}

/** @internal */
function* __group(
	$: Group,
	opts?: Partial<AsAxiDrawOpts>
): IterableIterator<DrawCommand> {
	const $sampleOpts = __sampleAttribs(opts?.samples, $.attribs);
	const { skip, sort, interleave } = __axiAttribs($.attribs);
	const children = skip ? [...takeNth(skip + 1, $.children)] : $.children;
	function* emitChunk(chunk: IHiccupShape2[]) {
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
	yield* interleave
		? __interleaved(emitChunk, children, interleave)
		: emitChunk(children);
}

/** @internal */
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
	yield* interleave
		? __interleaved(emitChunk, pts, interleave)
		: emitChunk(pts);
}

/** @internal */
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
