import type { Predicate } from "@thi.ng/api";
import { DrawCommand, UP } from "@thi.ng/axidraw/api";
import { polyline } from "@thi.ng/axidraw/utils";
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
import type { AxiDrawAttribs } from "./api.js";

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
	for (let child of $.children) {
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
	const { clip, delay, down, speed } = __axiAttribs(attribs);
	const clipPts = clip || opts?.clip;
	const clipFn: Predicate<ReadonlyVec> = clipPts
		? (p: ReadonlyVec) => !!pointInPolygon2(p, clipPts)
		: () => true;
	yield UP;
	if (down != undefined) yield ["pen", down];
	for (let p of pts) {
		if (clipFn(p)) {
			yield* [["m", p, speed], ["d", delay], UP];
		}
	}
	if (down != undefined) yield ["pen"];
}

function* __polyline(
	pts: ReadonlyVec[],
	attribs?: Attribs,
	opts?: Partial<AsAxiDrawOpts>
): IterableIterator<DrawCommand> {
	if (!pts.length) return;
	const { clip, down, speed } = __axiAttribs(attribs);
	const clipPts = clip || opts?.clip;
	const chunks = clipPts ? clipPolylinePoly(pts, clipPts) : [pts];
	if (!chunks.length) return;
	if (down != undefined) yield ["pen", down];
	for (let chunk of chunks) {
		yield* polyline(chunk, speed);
	}
	if (down != undefined) yield ["pen"];
}

/** @internal */
const __axiAttribs = (attribs?: Attribs): Partial<AxiDrawAttribs> =>
	attribs ? attribs.__axi || {} : {};
