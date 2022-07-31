import type { ILifecycle } from "@thi.ng/hdom";

export const NUM_COLS = 5;
export const NUM_ROWS = 10;

export const MAX_COL = "A".charCodeAt(0) + NUM_COLS - 1;

export const CELL_STYLE = "div.dib.h2.pa2.ma0.br.bb.f7";

export const RE_CELL_ID = /^([A-Z])(\d+)$/i;
export const RE_CELL_RANGE = /^([A-Z])(\d+):([A-Z])(\d+)$/i;

export interface Cell {
	formula: string;
	value: string | number;
	error: string | null;
	backup: string;
	focus: boolean;
}

export interface UICell extends ILifecycle {
	element?: HTMLDivElement;
	focus?: boolean;
}
