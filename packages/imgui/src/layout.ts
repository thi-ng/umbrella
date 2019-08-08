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
    readonly cellWG: number;
    readonly cellHG: number;
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
        this.cellWG = this.cellW + gap;
        this.cellHG = rowH + gap;
        this.gap = gap;
        this.currCol = 0;
        this.currRow = 0;
        this.rows = 0;
    }

    next(spans = DEFAULT_SPANS) {
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
        const cell = <LayoutBox>{
            x: this.x + this.currCol * cellWG,
            y: this.y + this.currRow * cellHG,
            w: cspan * cellWG - gap,
            h,
            cw: this.cellW,
            ch: this.cellH,
            gap
        };
        this.propagateSize(rspan);
        this.currCol = Math.min(this.currCol + cspan, cols) % cols;
        return cell;
    }

    nextSquare() {
        const box = this.next([
            1,
            Math.ceil(this.cellW / (this.cellH + this.gap)) + 1
        ]);
        box.h = box.w;
        return box;
    }

    /**
     * Requests a `spans` sized cell from this layout (via `.next()`)
     * and creates and returns a new child `GridLayout` for the returned
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
     * // single column layout
     * const outer = new GridLayout(null, 1, 0, 0, 200, 16, 4);
     *
     * // add button (1st row)
     * button(gui, outer, "foo",...);
     *
     * // 2-column nested layout
     * const inner = outer.nest(2)
     * // these buttons are on same row
     * button(gui, inner, "bar",...);
     * button(gui, inner, "baz",...);
     *
     * // continue with outer (3rd row)
     * button(gui, outer, "bye",...);
     * ```
     *
     * @param cols
     * @param spans default [1, 1] (i.e. size of single cell)
     */
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
