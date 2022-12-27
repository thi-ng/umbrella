import type { Fn } from "@thi.ng/api";
import type { IShape, SamplingOpts } from "@thi.ng/geom-api";
import type { ReadonlyVec } from "@thi.ng/vectors";

/**
 * Package-specific shape attributes used to control conversion behavior. MUST
 * be stored under the `__axi` attribute name.
 *
 * @remark
 * Important: TODO keep this in sync with
 * [PolylineOpts](https://docs.thi.ng/umbrella/axidraw/interfaces/PolylineOpts.html)
 *
 * @example
 * ```ts
 * // a circle which will be drawn at 25% speed
 * circle(100, { __axi: { speed: 0.25 } });
 * ```
 */
export interface AxiDrawAttribs {
	/**
	 * Clip polygon vertices. See {@link AsAxiDrawOpts.clip}.
	 */
	clip: ReadonlyVec[];
	/**
	 * Optional speed factor (multiple of globally configured draw speed).
	 * Depending on pen used, slower speeds might result in thicker strokes.
	 */
	speed: number;
	/**
	 * Optional shape specific delay (in ms), i.e. initial hold time for the
	 * stroke or when stippling...
	 */
	delayDown: number;
	/**
	 * Delay for pen up command at the end this particular shape/polyline/point.
	 */
	delayUp: number;
	/**
	 * Pen down position (%) for this particular shape/polyline. Will be reset
	 * to globally configured default at the end of the shape.
	 */
	down: number;
	/**
	 * Ordering function (in lieu of full path planning/optimization, which is
	 * planned for a later stage). For shapes other than `points()`, order of
	 * appearance is used by default.
	 *
	 * @remarks
	 * Currently available implementations:
	 *
	 * - {@link pointsByNearestNeighbor} (for `points()`, default)
	 * - {@link pointsByProximity} (for `points()`)
	 * - {@link shapesByProximity} (for `group()`)
	 */
	sort: PointOrdering | ShapeOrdering;
	/**
	 * Only used for groups or point clouds. If given, only every (n+1)th child
	 * shape or point is being processed and the others ignored. Useful for low
	 * detail test runs.
	 */
	skip: number;
}

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

export type PointOrdering = Fn<ReadonlyVec[], Iterable<ReadonlyVec>>;

export type ShapeOrdering = Fn<IShape[], Iterable<IShape>>;
