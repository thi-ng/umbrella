// SPDX-License-Identifier: Apache-2.0
export type CellSpan = [number, number];

export interface LayoutBox {
	/**
	 * Top-left corner X
	 */
	x: number;
	/**
	 * Top-left corner Y
	 */
	y: number;
	/**
	 * Box width (based on requested col span and inner gutter(s))
	 */
	w: number;
	/**
	 * Box height (based on requested row span and inner gutter(s))
	 */
	h: number;
	/**
	 * Single cell column width (always w/o col span), based on layout's
	 * available space and configured number of columns.
	 */
	cw: number;
	/**
	 * Single cell row height (always same as `rowHeight` arg given to layout
	 * ctor).
	 */
	ch: number;
	/**
	 * Horizontal gutter size.
	 */
	gapX: number;
	/**
	 * Vertical gutter size.
	 */
	gapY: number;
	/**
	 *
	 */
	span: CellSpan;
}

export interface ILayout<O, T> {
	next(opts?: O): T;
}

export interface IGridLayout<T extends IGridLayout<T>>
	extends ILayout<CellSpan, LayoutBox> {
	readonly parent: IGridLayout<T> | null;
	/** Left coordinate of entire layout */
	readonly x: number;
	/** Top coordinate of entire layout */
	readonly y: number;
	/** Configured total width */
	readonly width: number;
	/** The current total height of the layout */
	readonly height: number;
	/** Configured number of columns */
	readonly cols: number;
	/** Width of single grid cell (without gap) */
	readonly cellW: number;
	/** Height of single grid cell (without gap) */
	readonly cellH: number;
	/** Width of single grid cell (incl. gap) */
	readonly cellWG: number;
	/** Height of single grid cell (incl. gap) */
	readonly cellHG: number;
	/** Horizontal gap/gutter between grid cells */
	readonly gapX: number;
	/** Vertical gap/gutter between grid cells */
	readonly gapY: number;
	/**
	 * Returns the number of columns for given width.
	 *
	 * @param width -
	 */
	colsForWidth(width: number): number;

	/**
	 * Returns the number of rows for given height.
	 *
	 * @param height -
	 */
	rowsForHeight(height: number): number;

	/**
	 * Calculates the required number of columns & rows for the given size.
	 *
	 * @param size -
	 */
	spanForSize(size: ArrayLike<number>): CellSpan;
	spanForSize(w: number, h: number): CellSpan;

	/**
	 * Returns a squared {@link LayoutBox} based on this layout's column width.
	 * This box will consume `ceil(columnWidth / rowHeight)` rows, but the
	 * returned box height might be less to satisfy the square constraint.
	 */
	nextSquare(): LayoutBox;

	/**
	 * Requests a `spans` sized cell from this layout (via `.next()`) and
	 * creates and returns a new child {@link GridLayout} for the returned box /
	 * grid cell. This child layout is configured to use `cols` columns and (by
	 * default) shares same `gapX` and `gapY` as this (parent) layout. The
	 * configured row span only acts as initial minimum vertical space
	 * reservation, but is allowed to grow and if needed will propagate the new
	 * space requirements to parent layouts.
	 *
	 * IMPORTANT: This child-parent size propagation ONLY works until the next
	 * cell is requested from any parent. Ion other words, child layouts MUST be
	 * completed/populated first before continuing with siblings/ancestors of
	 * this current layout.
	 *
	 * ```ts tangle:../export/nest.ts
	 * import { gridLayout } from "@thi.ng/layout";
	 *
	 * // single column layout (default config)
	 * const outer = gridLayout(0, 0, 200, 1, 16, 4);
	 *
	 * // obtain a box for entire 1st row
	 * console.log(outer.next());
	 * // { x: 0, y: 0, w: 200, h: 16, cw: 200, ch: 16, gapX: 4, gapY: 4, span: [ 1, 1 ] }
	 *
	 * // 2-column nested layout (2nd row)
	 * const inner = outer.nest(2);
	 *
	 * // these smaller boxes are on same row
	 * console.log(inner.next());
	 * // { x: 0, y: 20, w: 98, h: 16, cw: 98, ch: 16, gapX: 4, gapY: 4, span: [ 1, 1 ] }
	 *
	 * console.log(inner.next());
	 * // { x: 102, y: 20, w: 98, h: 16, cw: 98, ch: 16, gapX: 4, gapY: 4, span: [ 1, 1 ] }
	 *
	 * // continue with outer (again full row)
	 * console.log(outer.next());
	 * // { x: 0, y: 40, w: 200, h: 16, cw: 200, ch: 16, gapX: 4, gapY: 4, span: [ 1, 1 ] }
	 * ```
	 *
	 * @param cols - columns in nested layout
	 * @param spans - default `[1,1]` (i.e. size of single cell)
	 * @param gapX - horizontal gap for child layout
	 * @param gapY - vertical gap for child layout
	 */
	nest(cols: number, spans?: CellSpan, gapX?: number, gapY?: number): T;
}
