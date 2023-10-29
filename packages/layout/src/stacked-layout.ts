import { argMax, argMin } from "@thi.ng/arrays/argmin";
import type { CellSpan, LayoutBox } from "./api.js";
import { GridLayout, __DEFAULT_SPANS } from "./grid-layout.js";

export class StackedLayout extends GridLayout {
	offsets: Uint32Array;
	currSpan = 1;

	constructor(
		parent: GridLayout | null,
		x: number,
		y: number,
		width: number,
		cols: number,
		rowH: number,
		gap: number
	) {
		super(parent, x, y, width, cols, rowH, gap);
		this.offsets = new Uint32Array(cols);
	}

	nest(cols: number, spans?: CellSpan, gap = this.gap): StackedLayout {
		const { x, y, w } = this.next(spans);
		return new StackedLayout(this, x, y, w, cols, this.cellH, gap);
	}

	next(spans = __DEFAULT_SPANS): LayoutBox {
		const { cellWG, cellHG, gap, cols, offsets } = this;
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
		const h = rspan * cellHG - gap;
		const cell: LayoutBox = {
			x: this.x + column * cellWG,
			y: this.y + maxY * cellHG,
			w: cspan * cellWG - gap,
			h,
			cw: this.cellW,
			ch: this.cellH,
			gap,
			span: [cspan, rspan],
		};
		this.currRow = maxY;
		this.currCol = column;
		offsets.fill(maxY + rspan, column, column + cspan);
		this.currSpan = cspan;
		this.parent && this.parent.propagateSize(Math.max(...this.offsets));
		return cell;
	}

	largestSpan(): CellSpan {
		const { offsets, cols } = this;
		const minID = argMin(offsets);
		const y = offsets[minID];
		for (let i = minID + 1; i < cols; i++) {
			if (offsets[i] > y) {
				return [i - minID, offsets[i] - y];
			}
		}
		return [cols - minID, offsets[argMax(offsets)] - y];
	}

	propagateSize(rspan: number): void {
		const newY = Math.max(this.currRow + rspan, this.offsets[this.currCol]);
		this.offsets.fill(newY, this.currCol, this.currCol + this.currSpan);
		this.parent && this.parent.propagateSize(newY);
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
 * @param gap -
 */
export const stackedLayout = (
	x: number,
	y: number,
	width: number,
	cols = 4,
	rowH = 16,
	gap = 4
) => new StackedLayout(null, x, y, width, cols, rowH, gap);
