import type { Fn, FnU2 } from "@thi.ng/api";

/**
 * Higher order point coordinate transformation function. First is called with
 * grid resolution (cols,rows), then returns a function which is applied to each
 * generated grid coordinate.
 */
export type PointTransform = FnU2<number, FnU2<number, [number, number]>>;

export interface GridIterOpts {
	/**
	 * Number of grid columns
	 */
	cols: number;
	/**
	 * Number of grid rows, by default same as columns.
	 */
	rows?: number;
	/**
	 * Point coordinate transformation function, e.g. to mirror iteration order
	 * along X or Y. See {@link flipX}, {@link flipY}, {@link flipXY} etc.
	 *
	 * @defaultValue {@link ident}
	 */
	tx?: PointTransform;
}

export type GridIterator2D = Fn<GridIterOpts, Iterable<[number, number]>>;

export type GridIterator3D = Fn<
	GridIterOpts,
	Iterable<[number, number, number]>
>;
