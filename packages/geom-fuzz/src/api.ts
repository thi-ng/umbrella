import type { Fn } from "@thi.ng/api";
import type { IColor } from "@thi.ng/color";
import type { CubicOpts, IHiccupShape2, Polygon } from "@thi.ng/geom";
import type { PointTransform2D } from "@thi.ng/grid-iterators/api";

export type Color = string | number[] | IColor;

export type FillFn = Fn<Polygon, IHiccupShape2>;

export type HatchDir = "d" | "h" | "v";

export type FlipDir = "x" | "y" | "xy";

export interface FuzzyPolygonOpts {
	num: number;
	jitter: number;
	curve: Partial<CubicOpts>;
	fill: FillFn;
}

export interface FuzzyLineOpts {
	jitter: number;
	resample: number;
	attribs: any;
}

export interface HatchOpts {
	dir: HatchDir;
	/**
	 * Optional transform fn for generated grid points. If given,
	 * {@link HatchOpts.flip} will be ignored. See
	 * [`PointTransform`](https://docs.thi.ng/umbrella/grid-iterators/types/PointTransform2D.html)
	 * for more details.
	 */
	tx?: PointTransform2D;
	flip?: FlipDir;
	space: number;
	line: Partial<FuzzyLineOpts>;
}

export interface DotFillOpts {
	space: number;
	jitter: number;
	attribs: Partial<{
		shape: "circle" | "square";
		[id: string]: any;
	}>;
}

export const DEFAULT_LINE = {
	resample: 0,
	jitter: 2,
	attribs: {
		lineCap: "butt",
		lineJoin: "round",
		stroke: "black",
	},
};
