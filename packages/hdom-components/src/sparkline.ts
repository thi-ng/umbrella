import { fitClamped } from "@thi.ng/math/fit";
import { mapIndexed } from "@thi.ng/transducers/map-indexed";
import { str } from "@thi.ng/transducers/str";

export interface SparklineOpts {
	/**
	 * Sparkline width
	 * Default: 50
	 */
	width: number;
	/**
	 * Sparkline height
	 * Default: 16
	 */
	height: number;
	/**
	 * Min domain value.
	 * Default: 0
	 */
	min: number;
	/**
	 * Max domain value.
	 * Default: 100
	 */
	max: number;
	/**
	 * Sparkline CSS color
	 * Default: red
	 */
	col: string;
	/**
	 * Radius of sparkline head marker circle.
	 * Default: 1.5
	 */
	r: number;
}

/**
 * Customizable, stateless SVG sparkline component.
 *
 * @param _ - hdom context object (ignored)
 * @param opts - config options
 * @param vals - data values
 */
export const sparkline = (
	_: any,
	_opts: Partial<SparklineOpts>,
	vals: number[]
) => {
	const opts = {
		min: 0,
		max: 100,
		width: 50,
		height: 16,
		col: "red",
		r: 1.5,
		..._opts,
	};
	const n = vals.length;
	const s = opts.width / n;
	const r = opts.r;
	const h = opts.height - r;
	return [
		"svg",
		{
			width: opts.width + 2 * r,
			height: opts.height,
			stroke: opts.col,
			fill: "none",
		},
		[
			"polyline",
			{
				points: str(
					",",
					mapIndexed(
						(i, y: number) => [
							(i * s) | 0,
							fitClamped(y, opts.min, opts.max, h, r) | 0,
						],
						0,
						vals
					)
				),
			},
		],
		[
			"circle",
			{
				cx: ((n - 1) * s) | 0,
				cy: fitClamped(vals[n - 1], opts.min, opts.max, h, r) | 0,
				r,
				fill: opts.col,
			},
		],
	];
};
