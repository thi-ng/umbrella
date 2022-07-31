import type { NumericArray, TypedArray } from "./typedarray.js";

export interface INDBase<BUF extends any[] | TypedArray = any[]> {
	size: NumericArray;
	stride: NumericArray;
	offset: number;
	data: BUF;

	readonly dim: number;

	order(): number[];
}

/**
 * Semi-typechecked interface for cases accepting 1D-4D grids, i.e.
 * {@link IGrid1D} - {@link IGrid4D}.
 */
export interface IGridND<BUF extends any[] | TypedArray = any[], T = any>
	extends INDBase<BUF> {
	/**
	 * Returns true if given position is valid (i.e. within grid bounds).
	 *
	 * @param pos -
	 */
	includes(
		...pos:
			| [number]
			| [number, number]
			| [number, number, number]
			| [number, number, number, number]
	): boolean;

	/**
	 * Returns index for given position. Returns negative value if outside the
	 * grid's defined region.
	 *
	 * @param pos -
	 */
	indexAt(
		...pos:
			| [number]
			| [number, number]
			| [number, number, number]
			| [number, number, number, number]
	): number;
	/**
	 * Non-boundschecked version of {@link IGridND.indexAt}. Assumes given
	 * position is valid.
	 *
	 * @param pos -
	 */
	indexAtUnsafe(
		...pos:
			| [number]
			| [number, number]
			| [number, number, number]
			| [number, number, number, number]
	): number;

	/**
	 * Returns value at given position. If outside the grid's defined region,
	 * returns a suitable zero value.
	 *
	 * @param pos -
	 */
	getAt(
		...pos:
			| [number]
			| [number, number]
			| [number, number, number]
			| [number, number, number, number]
	): T;
	/**
	 * Non-boundschecked version of {@link IGridND.getAt}. Assumes given
	 * position is valid.
	 *
	 * @param pos -
	 */
	getAtUnsafe(
		...pos:
			| [number]
			| [number, number]
			| [number, number, number]
			| [number, number, number, number]
	): T;

	/**
	 * Writes value at given position. Has no effect if outside of the defined
	 * region. Returns true, if succeeded.
	 *
	 * @param args -
	 */
	setAt(
		...args:
			| [number, T]
			| [number, number, T]
			| [number, number, number, T]
			| [number, number, number, number, T]
	): boolean;
	/**
	 * Non-boundschecked version of {@link IGridND.setAt}. Assumes given
	 * position is valid. Returns true, if succeeded.
	 *
	 * @param args -
	 */
	setAtUnsafe(
		...args:
			| [number, T]
			| [number, number, T]
			| [number, number, number, T]
			| [number, number, number, number, T]
	): boolean;
}

/**
 * Gridlike container for 1D accessible data.
 *
 * @remarks
 * See {@link IGrid1DMixin} for mixin implementation.
 */
export interface IGrid1D<BUF extends any[] | TypedArray = any[], T = any>
	extends INDBase<BUF> {
	readonly dim: 1;

	/**
	 * Returns true if given position is valid (i.e. within grid bounds).
	 *
	 * @param d0 -
	 */
	includes(d0: number): boolean;

	/**
	 * Returns index for given position. Returns negative value if outside the
	 * grid's defined region.
	 *
	 * @param d0 -
	 */
	indexAt(d0: number): number;
	/**
	 * Non-boundschecked version of {@link IGrid1D.indexAt}. Assumes given
	 * position is valid.
	 *
	 * @param d0 -
	 */
	indexAtUnsafe(d0: number): number;

	/**
	 * Returns value at given position. If outside the grid's defined region,
	 * returns a suitable zero value.
	 *
	 * @param d0 -
	 */
	getAt(d0: number): T;
	/**
	 * Non-boundschecked version of {@link IGrid1D.getAt}. Assumes given
	 * position is valid.
	 *
	 * @param d0 -
	 */
	getAtUnsafe(d0: number): T;

	/**
	 * Writes value at given position. Has no effect if outside of the defined
	 * region. Returns true, if succeeded.
	 *
	 * @param d0 -
	 * @param value -
	 */
	setAt(d0: number, value: T): boolean;
	/**
	 * Non-boundschecked version of {@link IGrid1D.setAt}. Assumes given
	 * position is valid. Returns true, if succeeded.
	 *
	 * @param d0 -
	 * @param value -
	 */
	setAtUnsafe(d0: number, value: T): boolean;
}

/**
 * Gridlike container for 2D accessible data.
 *
 * @remarks
 * See {@link IGrid2DMixin} for mixin implementation.
 */
export interface IGrid2D<BUF extends any[] | TypedArray = any[], T = any>
	extends INDBase<BUF> {
	readonly dim: 2;

	/**
	 * Returns true if given position is valid (i.e. within grid bounds).
	 *
	 * @param d0 -
	 * @param d1 -
	 */
	includes(d0: number, d1: number): boolean;

	/**
	 * Returns index for given position (stated in same order as
	 * {@link IGrid2D.size} and {@link IGrid2D.stride}). Returns negative value
	 * if outside the grid's defined region.
	 *
	 * @param d0 -
	 * @param d1 -
	 */
	indexAt(d0: number, d1: number): number;
	/**
	 * Non-boundschecked version of {@link IGrid2D.indexAt}. Assumes given
	 * position is valid.
	 *
	 * @param d0 -
	 * @param d1 -
	 */
	indexAtUnsafe(d0: number, d1: number): number;

	/**
	 * Returns value at given position (given in same order as
	 * {@link IGrid2D.size} and {@link IGrid2D.stride}). If outside the grid's
	 * defined region, returns a suitable zero value.
	 *
	 * @param d0 -
	 * @param d1 -
	 */
	getAt(d0: number, d1: number): T;
	/**
	 * Non-boundschecked version of {@link IGrid2D.getAt}. Assumes given
	 * position is valid.
	 *
	 * @param d0 -
	 * @param d1 -
	 */
	getAtUnsafe(d0: number, d1: number): T;

	/**
	 * Writes value at given position (given in same order as
	 * {@link IGrid2D.size} and {@link IGrid2D.stride}). Has no effect if
	 * outside of the defined region. Returns true, if succeeded.
	 *
	 * @param d0 -
	 * @param d1 -
	 * @param value -
	 */
	setAt(d0: number, d1: number, value: T): boolean;
	/**
	 * Non-boundschecked version of {@link IGrid2D.setAt}. Assumes given
	 * position is valid. Returns true, if succeeded.
	 *
	 * @param d0 -
	 * @param d1 -
	 * @param value -
	 */
	setAtUnsafe(d0: number, d1: number, value: T): boolean;
}

/**
 * Gridlike container for 3D accessible data.
 *
 * @remarks
 * See {@link IGrid3DMixin} for mixin implementation.
 */
export interface IGrid3D<BUF extends any[] | TypedArray = any[], T = any>
	extends INDBase<BUF> {
	readonly dim: 3;

	/**
	 * Returns true if given position is valid (i.e. within grid bounds).
	 *
	 * @param d0 -
	 * @param d1 -
	 * @param d2 -
	 */
	includes(d0: number, d1: number, d2: number): boolean;

	/**
	 * Returns index for given position (stated in same order as
	 * {@link IGrid3D.size} and {@link IGrid3D.stride}). Returns negative value
	 * if outside the grid's defined region.
	 *
	 * @param d0 -
	 * @param d1 -
	 * @param d2 -
	 */
	indexAt(d0: number, d1: number, d2: number): number;
	/**
	 * Non-boundschecked version of {@link IGrid3D.indexAt}. Assumes given
	 * position is valid.
	 *
	 * @param d0 -
	 * @param d1 -
	 * @param d2 -
	 */
	indexAtUnsafe(d0: number, d1: number, d2: number): number;

	/**
	 * Returns value at given position (given in same order as
	 * {@link IGrid3D.size} and {@link IGrid3D.stride}). If outside the grid's
	 * defined region, returns a suitable zero value.
	 *
	 * @param d0 -
	 * @param d1 -
	 * @param d2 -
	 */
	getAt(d0: number, d1: number, d2: number): T;
	/**
	 * Non-boundschecked version of {@link IGrid3D.getAt}. Assumes given
	 * position is valid.
	 *
	 * @param d0 -
	 * @param d1 -
	 * @param d2 -
	 */
	getAtUnsafe(d0: number, d1: number, d2: number): T;

	/**
	 * Writes value at given position (given in same order as
	 * {@link IGrid3D.size} and {@link IGrid3D.stride}). Has no effect if
	 * outside of the defined region. Returns true, if succeeded.
	 *
	 * @param d0 -
	 * @param d1 -
	 * @param d2 -
	 * @param value -
	 */
	setAt(d0: number, d1: number, d2: number, value: T): boolean;
	/**
	 * Non-boundschecked version of {@link IGrid3D.setAt}. Assumes given
	 * position is valid. Returns true, if succeeded.
	 *
	 * @param d0 -
	 * @param d1 -
	 * @param d2 -
	 * @param value -
	 */
	setAtUnsafe(d0: number, d1: number, d2: number, value: T): boolean;
}

/**
 * Gridlike container for 4D accessible data.
 *
 * @remarks
 * See {@link IGrid4DMixin} for mixin implementation.
 */
export interface IGrid4D<BUF extends any[] | TypedArray = any[], T = any>
	extends INDBase<BUF> {
	readonly dim: 4;

	/**
	 * Returns true if given position is valid (i.e. within grid bounds).
	 *
	 * @param d0 -
	 * @param d1 -
	 * @param d2 -
	 * @param d3 -
	 */
	includes(d0: number, d1: number, d2: number, d3: number): boolean;

	/**
	 * Returns index for given position (stated in same order as
	 * {@link IGrid4D.size} and {@link IGrid4D.stride}). Returns negative value
	 * if outside the grid's defined region.
	 *
	 * @param d0 -
	 * @param d1 -
	 * @param d2 -
	 * @param d3 -
	 */
	indexAt(d0: number, d1: number, d2: number, d3: number): number;
	/**
	 * Non-boundschecked version of {@link IGrid4D.indexAt}. Assumes given
	 * position is valid.
	 *
	 * @param d0 -
	 * @param d1 -
	 * @param d2 -
	 * @param d3 -
	 */
	indexAtUnsafe(d0: number, d1: number, d2: number, d3: number): number;

	/**
	 * Returns value at given position (given in same order as
	 * {@link IGrid4D.size} and {@link IGrid4D.stride}). If outside the grid's
	 * defined region, returns a suitable zero value.
	 *
	 * @param d0 -
	 * @param d1 -
	 * @param d2 -
	 * @param d3 -
	 */
	getAt(d0: number, d1: number, d2: number, d3: number): T;
	/**
	 * Non-boundschecked version of {@link IGrid4D.getAt}. Assumes given
	 * position is valid.
	 *
	 * @param d0 -
	 * @param d1 -
	 * @param d2 -
	 * @param d3 -
	 */
	getAtUnsafe(d0: number, d1: number, d2: number, d3: number): T;

	/**
	 * Writes value at given position (given in same order as
	 * {@link IGrid4D.size} and {@link IGrid4D.stride}). Has no effect if
	 * outside of the defined region. Returns true, if succeeded.
	 *
	 * @param d0 -
	 * @param d1 -
	 * @param d2 -
	 * @param d3 -
	 * @param value -
	 */
	setAt(d0: number, d1: number, d2: number, d3: number, value: T): boolean;
	/**
	 * Non-boundschecked version of {@link IGrid4D.setAt}. Assumes given
	 * position is valid. Returns true, if succeeded.
	 *
	 * @param d0 -
	 * @param d1 -
	 * @param d2 -
	 * @param d3 -
	 * @param value -
	 */
	setAtUnsafe(
		d0: number,
		d1: number,
		d2: number,
		d3: number,
		value: T
	): boolean;
}
