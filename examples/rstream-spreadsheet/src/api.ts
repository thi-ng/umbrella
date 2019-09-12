import { ILifecycle } from "@thi.ng/hdom";

export const NUM_COLS = 5;
export const NUM_ROWS = 10;

export const MAX_COL = "A".charCodeAt(0) + NUM_COLS - 1;

export const CELL_STYLE = "div.dib.h2.pa2.ma0.br.bb";

export interface Cell {
    formula: string;
    value: string | number;
    backup: string;
    focus: boolean;
    error: boolean;
}

export interface UICell extends ILifecycle {
    element?: HTMLDivElement;
    focus?: boolean;
}
