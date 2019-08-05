import { LayoutBox } from "./api";

export class GridLayout {
    readonly parent: GridLayout | null;
    readonly cols: number;
    readonly width: number;
    readonly x: number;
    readonly y: number;
    readonly colW: number;
    readonly rowH: number;
    readonly gap: number;

    currCol: number;
    currRow: number;
    rows: number;

    id: string;

    constructor(
        id: string,
        parent: GridLayout | null,
        cols: number,
        x: number,
        y: number,
        width: number,
        rowH: number,
        gap: number
    ) {
        this.id = id;
        this.parent = parent;
        this.cols = cols;
        this.x = x;
        this.y = y;
        this.width = width;
        this.rowH = rowH;
        this.gap = gap;
        this.colW = (width - (cols - 1) * gap) / cols;
        this.currCol = 0;
        this.currRow = 0;
        this.rows = 0;
    }

    next(cspan = 1, rspan = 1) {
        if (this.currCol > 0) {
            if (this.currCol + cspan > this.cols) {
                this.currCol = 0;
                this.currRow = this.rows;
            }
        } else {
            this.currRow = this.rows;
        }
        const gap = this.gap;
        const h = rspan * this.rowH + (rspan - 1) * gap;
        const cell = <LayoutBox>{
            x: this.x + this.currCol * (this.colW + gap),
            y: this.y + this.currRow * (this.rowH + gap),
            w: cspan * this.colW + (cspan - 1) * gap,
            h,
            cw: this.colW,
            ch: this.rowH,
            gap
        };
        this.updateMaxRows(rspan);
        this.currCol = Math.min(this.currCol + cspan, this.cols) % this.cols;
        return cell;
    }

    nest(id: string, cols: number, cspan = 1, rspan = 1) {
        const { x, y, w } = this.next(cspan, rspan);
        return new GridLayout(id, this, cols, x, y, w, this.rowH, this.gap);
    }

    protected updateMaxRows(rspan: number) {
        this.rows = Math.max(this.rows, this.currRow + rspan);
        if (this.parent) {
            this.parent.updateMaxRows(this.rows);
        }
    }
}

export const isLayout = (x: any): x is GridLayout => x instanceof GridLayout;
