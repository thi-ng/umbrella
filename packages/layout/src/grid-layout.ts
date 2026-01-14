// SPDX-License-Identifier: Apache-2.0
import { isNumber } from "@thi.ng/checks/is-number";
import type { CellSpan, IGridLayout } from "./api.js";
import { layoutBox } from "./box.js";

/** @internal */
export const __DEFAULT_SPANS: CellSpan = [1, 1];

export class GridLayout implements IGridLayout<GridLayout> {
	readonly parent: GridLayout | null;
	readonly cols: number;
	readonly width: number;
	readonly x: number;
	readonly y: number;
	readonly cellW: number;
	readonly cellH: number;
	readonly cellWG: number;
	readonly cellHG: number;
	readonly gapX: number;
	readonly gapY: number;

	protected _currCol = 0;
	protected _currRow = 0;
	protected _rows = 0;

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
		this.parent = parent;
		this.cols = cols;
		this.x = x;
		this.y = y;
		this.width = width;
		this.cellW = (width - (cols - 1) * gapX) / cols;
		this.cellH = rowH;
		this.cellWG = this.cellW + gapX;
		this.cellHG = rowH + gapY;
		this.gapX = gapX;
		this.gapY = gapY;
	}

	get currX() {
		return this.x + this._currCol * this.cellWG;
	}

	get currY() {
		return this.y + this._currRow * this.cellHG;
	}

	get currCol() {
		return this._currCol;
	}

	get currRow() {
		return this._currRow;
	}

	get height() {
		return this.y + this._rows * this.cellHG;
	}

	colsForWidth(w: number) {
		return Math.ceil(w / this.cellWG);
	}

	rowsForHeight(h: number) {
		return Math.ceil(h / this.cellHG);
	}

	spanForSize(size: ArrayLike<number>): CellSpan;
	spanForSize(w: number, h: number): CellSpan;
	spanForSize(w: ArrayLike<number> | number, h?: number): CellSpan {
		const size = isNumber(w) ? [w, h ?? w] : w;
		return [this.colsForWidth(size[0]), this.rowsForHeight(size[1])];
	}

	next(spans = __DEFAULT_SPANS) {
		const { cellWG, cellHG, gapX, gapY, cols } = this;
		const cspan = Math.min(spans[0], cols);
		const rspan = spans[1];
		if (this._currCol > 0) {
			if (this._currCol + cspan > cols) {
				this._currCol = 0;
				this._currRow = this._rows;
			}
		} else {
			this._currRow = this._rows;
		}
		const h = rspan * cellHG - gapY;
		const cell = layoutBox(
			this.x + this._currCol * cellWG,
			this.y + this._currRow * cellHG,
			cspan * cellWG - gapX,
			h,
			this.cellW,
			this.cellH,
			gapX,
			gapY,
			[cspan, rspan]
		);
		this.propagateSize(rspan);
		this._currCol = Math.min(this._currCol + cspan, cols) % cols;
		return cell;
	}

	// TODO add optional colspan arg, fix rounding
	nextSquare() {
		const box = this.next([1, Math.ceil(this.cellW / this.cellHG) + 1]);
		box.h = box.w;
		return box;
	}

	nest(
		cols: number,
		spans?: CellSpan,
		gapX = this.gapX,
		gapY = this.gapY
	): GridLayout {
		const { x, y, w } = this.next(spans);
		return new GridLayout(this, x, y, w, cols, this.cellH, gapX, gapY);
	}

	/**
	 * Updates max rows used in this layout and all of its parents.
	 *
	 * @param rspan -
	 */
	propagateSize(rspan: number) {
		this._rows = Math.max(this._rows, this._currRow + rspan);
		this.parent?.propagateSize(this._rows);
	}
}

/**
 * Syntax sugar for {@link GridLayout} ctor. By default creates a
 * single-column layout at given position and width.
 *
 * @param x -
 * @param y -
 * @param width -
 * @param cols -
 * @param rowH -
 * @param gapX -
 * @param gapY -
 */
export const gridLayout = (
	x: number,
	y: number,
	width: number,
	cols = 1,
	rowH = 16,
	gapX = 4,
	gapY = gapX
) => new GridLayout(null, x, y, width, cols, rowH, gapX, gapY);
