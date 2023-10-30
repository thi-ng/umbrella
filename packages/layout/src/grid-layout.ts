import { isNumber } from "@thi.ng/checks/is-number";
import type { CellSpan, IGridLayout, LayoutBox } from "./api.js";

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
	readonly gap: number;

	protected currCol: number;
	protected currRow: number;
	protected rows: number;

	constructor(
		parent: GridLayout | null,
		x: number,
		y: number,
		width: number,
		cols: number,
		rowH: number,
		gap: number
	) {
		this.parent = parent;
		this.cols = cols;
		this.x = x;
		this.y = y;
		this.width = width;
		this.cellW = (width - (cols - 1) * gap) / cols;
		this.cellH = rowH;
		this.cellWG = this.cellW + gap;
		this.cellHG = rowH + gap;
		this.gap = gap;
		this.currCol = 0;
		this.currRow = 0;
		this.rows = 0;
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
		const size = isNumber(w) ? [w, h!] : w;
		return [this.colsForWidth(size[0]), this.rowsForHeight(size[1])];
	}

	next(spans = __DEFAULT_SPANS) {
		const { cellWG, cellHG, gap, cols } = this;
		const cspan = Math.min(spans[0], cols);
		const rspan = spans[1];
		if (this.currCol > 0) {
			if (this.currCol + cspan > cols) {
				this.currCol = 0;
				this.currRow = this.rows;
			}
		} else {
			this.currRow = this.rows;
		}
		const h = rspan * cellHG - gap;
		const cell: LayoutBox = {
			x: this.x + this.currCol * cellWG,
			y: this.y + this.currRow * cellHG,
			w: cspan * cellWG - gap,
			h,
			cw: this.cellW,
			ch: this.cellH,
			gap,
			span: [cspan, rspan],
		};
		this.propagateSize(rspan);
		this.currCol = Math.min(this.currCol + cspan, cols) % cols;
		return cell;
	}

	// TODO add optional colspan arg, fix rounding
	nextSquare() {
		const box = this.next([
			1,
			Math.ceil(this.cellW / (this.cellH + this.gap)) + 1,
		]);
		box.h = box.w;
		return box;
	}

	nest(cols: number, spans?: CellSpan, gap = this.gap): GridLayout {
		const { x, y, w } = this.next(spans);
		return new GridLayout(this, x, y, w, cols, this.cellH, gap);
	}

	/**
	 * Updates max rows used in this layout and all of its parents.
	 *
	 * @param rspan -
	 */
	propagateSize(rspan: number) {
		let rows = this.rows;
		this.rows = rows = Math.max(rows, this.currRow + rspan);
		const parent = this.parent;
		parent && parent.propagateSize(rows);
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
 * @param gap -
 */
export const gridLayout = (
	x: number,
	y: number,
	width: number,
	cols = 1,
	rowH = 16,
	gap = 4
) => new GridLayout(null, x, y, width, cols, rowH, gap);
