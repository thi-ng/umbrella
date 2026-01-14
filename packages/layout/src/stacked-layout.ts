// SPDX-License-Identifier: Apache-2.0
import type { Maybe } from "@thi.ng/api";
import { argMax, argMin } from "@thi.ng/arrays/argmin";
import type { CellSpan, LayoutBox } from "./api.js";
import { layoutBox } from "./box.js";
import { GridLayout, __DEFAULT_SPANS } from "./grid-layout.js";

/**
 * An extension of {@link GridLayout} which tracks individual column-based
 * heights and so can create more complex, irregular, packed, space-filling
 * layout arrangements. This layout algorithm prioritizes allocating the
 * column(s) with the currently lowest height.
 *
 * The class also provides a {@link StackedLayout.availableSpan} method to find
 * available space and help equalize columns and fill/allocate any bottom gaps.
 *
 * **IMPORTANT:** As with {@link GridLayout}, nested layouts MUST be completed
 * first before requesting new cells (aka {@link LayoutBox}es) from a parent,
 * otherwise unintended overlaps will occur. Also see {@link IGridLayout.nest}
 * for more details.
 */
export class StackedLayout extends GridLayout {
	/** Number of rows per column */
	offsets: Uint32Array;
	currSpan = 1;

	constructor(
		parent: GridLayout | null,
		x: number,
		y: number,
		width: number,
		cols: number,
		rowH: number,
		gapX: number,
		gapY = gapX
	) {
		super(parent, x, y, width, cols, rowH, gapX, gapY);
		this.offsets = new Uint32Array(cols);
	}

	nest(
		cols: number,
		spans?: CellSpan,
		gapX = this.gapX,
		gapY = this.gapY
	): StackedLayout {
		const { x, y, w } = this.next(spans);
		return new StackedLayout(this, x, y, w, cols, this.cellH, gapX, gapY);
	}

	next(spans = __DEFAULT_SPANS) {
		const { cellWG, cellHG, gapX, gapY, cols, offsets } = this;
		const cspan = Math.min(spans[0], cols);
		const rspan = spans[1];
		let minY = Infinity;
		let maxY = 0;
		let column = 0;
		for (let i = 0; i <= cols - cspan; i++) {
			const chunk = offsets.subarray(i, i + cspan);
			const maxID = argMax(chunk);
			const y = chunk[maxID];
			if (y < minY) {
				minY = y;
				maxY = chunk[maxID];
				column = i;
			}
		}
		const h = rspan * cellHG - gapY;
		const cell = layoutBox(
			this.x + column * cellWG,
			this.y + maxY * cellHG,
			cspan * cellWG - gapX,
			h,
			this.cellW,
			this.cellH,
			gapX,
			gapY,
			[cspan, rspan]
		);
		this._currRow = maxY;
		this._currCol = column;
		offsets.fill(maxY + rspan, column, column + cspan);
		this.currSpan = cspan;
		this.parent?.propagateSize(Math.max(...offsets));
		return cell;
	}

	/**
	 * Finds the largest available span of free area, such that if it'll be
	 * allocated via {@link StackedLayout.next} or {@link StackedLayout.nest},
	 * the impacted columns will all have the same height, and that height will
	 * match that of the next column after (if any). Repeated use of this method
	 * can be used to fill up (aka equalize) any bottom gaps of a layout
	 * container until all columns are equal. If the function returns a vertical
	 * span of 0, all columns are equalized already.
	 *
	 * @remarks
	 * An optional `maxSpan` can be provided to constrain the returned span (by
	 * default unconstrained).
	 *
	 * @param maxSpan
	 */
	availableSpan(maxSpan: CellSpan = [Infinity, Infinity]): CellSpan {
		const { offsets, cols } = this;
		const minID = argMin(offsets);
		const y = offsets[minID];
		let result: Maybe<CellSpan>;
		for (let i = minID + 1; i < cols; i++) {
			if (offsets[i] > y) {
				result = [i - minID, offsets[i] - y];
				break;
			}
		}
		if (!result) result = [cols - minID, offsets[argMax(offsets)] - y];
		result[0] = Math.min(result[0], maxSpan[0]);
		result[1] = Math.min(result[1], maxSpan[1]);
		return result;
	}

	propagateSize(rspan: number): void {
		const newY = Math.max(
			this._currRow + rspan,
			this.offsets[this._currCol]
		);
		this.offsets.fill(newY, this._currCol, this._currCol + this.currSpan);
		this.parent?.propagateSize(newY);
	}

	/**
	 * Returns true if all column offsets/heights in the layout are equal.
	 */
	isEqualized() {
		return Math.min(...this.offsets) === Math.max(...this.offsets);
	}
}

/**
 * Syntax sugar for {@link StackedLayout} ctor. By default creates a 4-column
 * layout at given position and total width.
 *
 * @param x -
 * @param y -
 * @param width -
 * @param cols -
 * @param rowH -
 * @param gapX -
 * @param gapY -
 */
export const stackedLayout = (
	x: number,
	y: number,
	width: number,
	cols = 4,
	rowH = 16,
	gapX = 4,
	gapY = gapX
) => new StackedLayout(null, x, y, width, cols, rowH, gapX, gapY);
