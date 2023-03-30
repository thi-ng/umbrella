import type { Fn, FnU2, FnU3 } from "@thi.ng/api";

export type GridCoord2D = [number, number];

export type GridCoord3D = [number, number, number];

/**
 * Higher order point coordinate transformation function. First is called with
 * grid resolution (cols,rows), then returns a function which is applied to each
 * generated grid coordinate.
 */
export type PointTransform2D = FnU2<number, FnU2<number, GridCoord2D>>;
/**
 * Higher order point coordinate transformation function. First is called with
 * grid resolution (cols,rows,slices), then returns a function which is applied
 * to each generated grid coordinate.
 */
export type PointTransform3D = FnU3<number, FnU3<number, GridCoord3D>>;

export interface GridIterOpts2D {
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
	tx?: PointTransform2D;
}

export type GridIterator2D = Fn<GridIterOpts2D, Iterable<GridCoord2D>>;

export type GridIterator3D = Fn<GridIterOpts2D, Iterable<GridCoord3D>>;
