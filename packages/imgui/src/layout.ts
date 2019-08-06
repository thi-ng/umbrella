import { implementsFunction } from "@thi.ng/checks";
import { IGridLayout, ILayout, LayoutBox } from "./api";

const DEFAULT_SPANS: [number, number] = [1, 1];

export class GridLayout implements IGridLayout {
    readonly parent: GridLayout | null;
    readonly cols: number;
    readonly width: number;
    readonly x: number;
    readonly y: number;
    readonly cellW: number;
    readonly cellH: number;
    readonly gap: number;

    currCol: number;
    currRow: number;
    rows: number;

    constructor(
        parent: GridLayout | null,
        cols: number,
        x: number,
        y: number,
        width: number,
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
        this.gap = gap;
        this.currCol = 0;
        this.currRow = 0;
        this.rows = 0;
    }

    next(spans = DEFAULT_SPANS) {
        const { cellW, cellH, gap, cols } = this;
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
        const h = (rspan * cellH + (rspan - 1) * gap) | 0;
        const cell = <LayoutBox>{
            x: (this.x + this.currCol * (cellW + gap)) | 0,
            y: (this.y + this.currRow * (cellH + gap)) | 0,
            w: (cspan * cellW + (cspan - 1) * gap) | 0,
            h,
            cw: cellW,
            ch: cellH,
            gap
        };
        this.propagateSize(rspan);
        this.currCol = Math.min(this.currCol + cspan, cols) % cols;
        return cell;
    }

    nest(cols: number, spans?: [number, number]) {
        const { x, y, w } = this.next(spans);
        return new GridLayout(this, cols, x, y, w, this.cellH, this.gap);
    }

    protected propagateSize(rspan: number) {
        let rows = this.rows;
        rows = this.rows = Math.max(rows, this.currRow + rspan);
        const parent = this.parent;
        parent && parent.propagateSize(rows);
    }
}

export const isLayout = (x: any): x is ILayout<any, any> =>
    implementsFunction(x, "next");
