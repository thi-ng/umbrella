import { peek } from "@thi.ng/arrays/peek";
import { isString } from "@thi.ng/checks/is-string";
import { wordWrapLines } from "@thi.ng/strings/word-wrap";
import { Border, TableOpts } from "./api";
import {
    beginClip,
    beginStyle,
    Canvas,
    canvas,
    endClip,
    endStyle,
    setAt,
} from "./canvas";
import { hline, vline } from "./hvline";
import { fillRect, strokeRect } from "./rect";
import { horizontalOnly, verticalOnly } from "./style";
import { textLines } from "./text";

type RawCell = {
    body: string;
    format?: number;
    height?: number;
    hard?: boolean;
    wrap?: boolean;
};

type Cell = { body: string[]; format?: number; height?: number };

export const initTable = (opts: TableOpts, cells: (string | RawCell)[][]) => {
    const b = opts.border !== undefined ? opts.border : Border.ALL;
    const bH = b & Border.H ? 1 : 0;
    const bV = b & Border.V ? 1 : 0;
    const bF = (bH && bV) || b & Border.FRAME ? 1 : 0;
    const bFH = bF | bH;
    const bFV = bF | bV;
    const [padH, padV] = (opts.padding || [0, 0]).map((x) => x << 1);
    const cols = opts.cols;
    const numCols = cols.length - 1;
    const numRows = cells.length - 1;
    const rowHeights = new Array<number>(numRows + 1).fill(0);
    const wrapped: Cell[][] = [];
    for (let i = 0; i <= numRows; i++) {
        const row = cells[i];
        const wrappedRow: Cell[] = [];
        for (let j = 0; j <= numCols; j++) {
            const cell = isString(row[j])
                ? { body: <string>row[j] }
                : <RawCell>row[j];
            const lines =
                cell.wrap !== false
                    ? wordWrapLines(cell.body, {
                          width: cols[j].width,
                          hard: cell.hard || opts.hard,
                      }).map((l) => l.toString())
                    : cell.body.split(/\r?\n/g);
            wrappedRow.push({
                body: lines,
                format: cell.format,
            });
            rowHeights[i] = Math.max(
                rowHeights[i],
                lines.length,
                cell.height || 0
            );
        }
        wrapped.push(wrappedRow);
    }
    return {
        style: opts.style,
        format: opts.format,
        formatHead: opts.formatHead,
        width:
            cols.reduce((acc, x) => acc + x.width, 0) +
            2 * bFV +
            numCols * bV +
            (numCols + 1) * padH,
        height:
            rowHeights.reduce((acc, x) => acc + x, 0) +
            2 * bFH +
            numRows * bH +
            (numRows + 1) * padV,
        cells: wrapped,
        rowHeights,
        cols,
        numCols,
        numRows,
        padH,
        padV,
        b,
        bH,
        bV,
        bFH,
        bFV,
    };
};

export const drawTable = (
    canvas: Canvas,
    x: number,
    y: number,
    opts: ReturnType<typeof initTable>
) => {
    const {
        cells,
        cols,
        numCols,
        numRows,
        rowHeights,
        width,
        height,
        padH,
        padV,
        bH,
        bV,
        bFH,
        bFV,
    } = opts;
    const fmt = opts.format !== undefined ? opts.format : canvas.format;
    const fmtHd = opts.formatHead !== undefined ? opts.formatHead : fmt;
    const currFormat = canvas.format;
    canvas.format = fmt;
    let style = opts.style || peek(canvas.styles);
    style =
        opts.b === Border.H
            ? horizontalOnly(style)
            : opts.b === Border.V
            ? verticalOnly(style)
            : style;

    beginStyle(canvas, style);
    fillRect(canvas, x + bFV, y + bFH, width - 2 * bFV, height - 2 * bFH, " ");
    opts.b && strokeRect(canvas, x, y, width, height);
    if (bV) {
        for (
            let i = 1, xx = x + cols[0].width + padH + 1;
            i <= numCols;
            xx += cols[i].width + padH + 1, i++
        ) {
            vline(canvas, xx, y, height, style.tjt, style.tjb, style.vl);
        }
    }

    for (let i = 0, yy = y + bFH; i <= numRows; i++) {
        const row = cells[i];
        const rowH = rowHeights[i];
        const y2 = yy + rowH + padV;
        if (bH && i < numRows) {
            hline(canvas, x, y2, width, style.tjl, style.tjr, style.hl);
        }
        for (let j = 0, xx = x + bFV; j <= numCols; j++) {
            const col = cols[j];
            const curr = row[j];
            if (curr.body) {
                beginClip(canvas, xx, yy, col.width + padH, rowH + padV);
                textLines(
                    canvas,
                    xx + padH / 2,
                    yy + padV / 2,
                    curr.body,
                    curr.format || (i ? fmt : fmtHd)
                );
                endClip(canvas);
            }
            if (bH && bV && j > 0 && i < numRows) {
                setAt(canvas, xx - 1, y2, style.jct);
            }
            xx += col.width + bV + padH;
        }
        yy = y2 + bH;
    }

    endStyle(canvas);
    canvas.format = currFormat;
};

export const table = (
    canvas: Canvas,
    x: number,
    y: number,
    opts: TableOpts,
    cells: (string | RawCell)[][]
) => {
    const spec = initTable(opts, cells);
    drawTable(canvas, x, y, spec);
    return [spec.width, spec.height];
};

/**
 * Initializes table with given options and contents. Then creates
 * auto-sized canvas for it, renders table and returns canvas.
 *
 * @param opts - table config
 * @param cells - table cells (row major)
 */
export const tableCanvas = (opts: TableOpts, cells: (string | RawCell)[][]) => {
    const tbl = initTable(opts, cells);
    const result = canvas(tbl.width, tbl.height);
    drawTable(result, 0, 0, tbl);
    return result;
};
