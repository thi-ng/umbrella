import { mapcatIndexed } from "@thi.ng/transducers";
import { dist2, heading, type ReadonlyVec } from "@thi.ng/vectors";
import type { PlotFn } from "../api.js";
import { __valueMapper } from "./utils.js";

export interface VectorFieldOpts {
	/**
	 * Group attributes.
	 */
	attribs?: any;
	/**
	 * Offset vector (in domain/grid coords), used to compute projected screen
	 * coords.
	 *
	 * @defaultValue [0.5, 0.5]
	 */
	offset: ReadonlyVec;
	/**
	 * Vector scale factor (applied to original field vectors)
	 *
	 * @defaultValue 1
	 */
	scale: number;
	/**
	 * Shape definition for visualizing individual vectors. Uses
	 * {@link vectorShapeLine} by default.
	 */
	shape: VectorFieldShape;
}

export interface VectorFieldShape {
	/**
	 * Optional marker for easy vector arrow visualization & reuse by shape function.
	 */
	marker?: any[];
	/**
	 * Shape function to represent a vector in the diagram as thi.ng/hiccup
	 * compatible shape/element.
	 *
	 * @param a - vector start point (in screen coords)
	 * @param b - vector end point (in screen coords)
	 * @param v - original vector
	 */
	fn: (a: ReadonlyVec, b: ReadonlyVec, v: ReadonlyVec) => any;
}

/**
 * Vectorfield plot function.
 *
 * @remarks
 * IMPORTANT: Domain ranges for this plot function MUST be zero-based and
 * integer-sized, corresponding to the shape of the supplied field data. The
 * field vectors should be normalized, but don't have to be...
 *
 * @param data
 * @param opts
 */
export const vectorField =
	(data: ReadonlyVec[][], opts: Partial<VectorFieldOpts> = {}): PlotFn =>
	(spec) => {
		const scale = opts.scale ?? 1;
		const [ox, oy] = opts.offset ?? [0.5, 0.5];
		const { marker, fn } = opts.shape ?? vectorShapeLine();
		const mapper = __valueMapper(spec.xaxis, spec.yaxis, spec.project);
		return [
			"g",
			opts.attribs || {},
			marker,
			...mapcatIndexed(
				(y, row) =>
					row.map((v, x) =>
						fn(
							mapper([x + ox, y + oy]),
							mapper([
								x + ox + v[0] * scale,
								y + oy + v[1] * scale,
							]),
							v
						)
					),
				data
			),
		];
	};

export const vectorShapeLine = (size = 5): VectorFieldShape => ({
	marker: [
		"marker",
		{
			id: "arrow",
			viewBox: "0 0 10 10",
			refX: 9,
			refY: 5,
			markerWidth: size,
			markerHeight: size,
			orient: "auto-start-reverse",
		},
		[
			"path",
			{
				stroke: "none",
				fill: "context-fill",
				d: "M0,0L10,5L0,10z",
			},
		],
	],
	fn: (a, b) => ["line", { "marker-end": "url(#arrow)" }, a, b],
});

export const vectorShapeLineHSL = (size = 5): VectorFieldShape => ({
	...vectorShapeLine(size),
	fn: (a, b, v) => {
		const col = `hsl(${heading(v).toFixed(2)}rad,100%,50%)`;
		return [
			"line",
			{ "marker-end": "url(#arrow)", fill: col, stroke: col },
			a,
			b,
		];
	},
});

export const vectorShapeDial: VectorFieldShape = {
	fn: (a, b) => ["g", {}, ["circle", {}, a, dist2(a, b)], ["line", {}, a, b]],
};
