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
	 * Single cell column width (always w/o col span), based on
	 * layout's available space and configured number of columns.
	 */
	cw: number;
	/**
	 * Single cell row height (always same as `rowHeight` arg given to
	 * layout ctor).
	 */
	ch: number;
	/**
	 * Gutter size.
	 */
	gap: number;
	/**
	 *
	 */
	span: CellSpan;
}

export interface ILayout<O, T> {
	next(opts?: O): T;
}

export interface IGridLayout extends ILayout<CellSpan, LayoutBox> {
	readonly x: number;
	readonly y: number;
	readonly width: number;
	readonly cols: number;
	readonly cellW: number;
	readonly cellH: number;
	readonly gap: number;

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
	 * Calculates the required number of columns & rows for the given
	 * size.
	 *
	 * @param size -
	 */
	spanForSize(size: ArrayLike<number>): CellSpan;
	spanForSize(w: number, h: number): CellSpan;

	/**
	 * Returns a squared {@link LayoutBox} based on this layout's column
	 * width. This box will consume `ceil(columnWidth / rowHeight)`
	 * rows, but the returned box height might be less to satisfy the
	 * square constraint.
	 */
	nextSquare(): LayoutBox;

	/**
	 * Requests a `spans` sized cell from this layout (via `.next()`)
	 * and creates and returns a new child {@link GridLayout} for the returned
	 * box / grid cell. This child layout is configured to use `cols`
	 * columns and shares same `gap` as this (parent) layout. The
	 * configured row span only acts as initial minimum vertical space
	 * reseervation, but is allowed to grow and if needed will propagate
	 * the new space requirements to parent layouts.
	 *
	 * Note: this size child-parent size propagation ONLY works until
	 * the next cell is requested from any parent. IOW, child layouts
	 * MUST be completed/populated first before continuing with
	 * siblings/ancestors of this current layout.
	 *
	 * ```
	 * // single column layout (default config)
	 * const outer = gridLayout(null, 0, 0, 200, 1, 16, 4);
	 *
	 * // add button (full 1st row)
	 * button(gui, outer, "foo",...);
	 *
	 * // 2-column nested layout (2nd row)
	 * const inner = outer.nest(2)
	 * // these buttons are on same row
	 * button(gui, inner, "bar",...);
	 * button(gui, inner, "baz",...);
	 *
	 * // continue with outer, create empty row
	 * outer.next();
	 *
	 * // continue with outer (4th row)
	 * button(gui, outer, "bye",...);
	 * ```
	 *
	 * @param cols - columns in nested layout
	 * @param spans - default [1, 1] (i.e. size of single cell)
	 * @param gap - gap for child layout
	 */
	nest(cols: number, spans?: CellSpan, gap?: number): IGridLayout;
}
