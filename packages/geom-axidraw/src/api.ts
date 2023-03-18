import type { Fn } from "@thi.ng/api";
import type { DrawCommand } from "@thi.ng/axidraw";
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
	/**
	 * Currently only supported for shape groups and point clouds. See
	 * {@link InterleaveOpts} for details.
	 */
	interleave: InterleaveOpts;
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

/**
 * Config & behavior options for interleaving the normal shape command sequence
 * with tool-specific arbitrary utility command sequences (e.g. to regularly dip
 * a brush into a paint pot/palette).
 */
export interface InterleaveOpts {
	/**
	 * Number of elements after which to insert the interleave command sequence
	 */
	num: number;
	/**
	 * Single arg function which is called every `num` elements (with the count
	 * of elements already processed given as arg) and each time yielding a
	 * [`DrawCommand`](https://docs.thi.ng/umbrella/axidraw/types/DrawCommand.html)
	 * sequence, which will be inserted as-is into the generated main command
	 * sequence of the currently processed shape.
	 *
	 * @param num
	 */
	commands: Fn<number, Iterable<DrawCommand>>;
	/**
	 * If true (default), call the given `commands` fn at the beginning of the
	 * shape processing (with arg=0).
	 */
	start?: boolean;
	/**
	 * If true (default: false), call the given `commands` fn at the end of the
	 * shape processing (with arg=number of points/elements in the shape).
	 */
	end?: boolean;
}

export type PointOrdering = Fn<ReadonlyVec[], Iterable<ReadonlyVec>>;

export type ShapeOrdering = Fn<IShape[], Iterable<IShape>>;
