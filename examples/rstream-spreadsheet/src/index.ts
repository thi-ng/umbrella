import { isNumber } from "@thi.ng/checks/is-number";
import { exposeGlobal } from "@thi.ng/expose";
import { fromAtom } from "@thi.ng/rstream/atom";
import { charRange } from "@thi.ng/strings/range";
import { updateDOM } from "@thi.ng/transducers-hdom";
import { comp } from "@thi.ng/transducers/comp";
import { map } from "@thi.ng/transducers/map";
import { mapIndexed } from "@thi.ng/transducers/map-indexed";
import { partition } from "@thi.ng/transducers/partition";
import { permutations } from "@thi.ng/transducers/permutations";
import { push } from "@thi.ng/transducers/push";
import { range } from "@thi.ng/transducers/range";
import { transduce } from "@thi.ng/transducers/transduce";
import { CELL_STYLE, MAX_COL, NUM_COLS, NUM_ROWS, type UICell } from "./api";
import {
    blurCell,
    cancelCell,
    DB,
    focusCell,
    graph,
    updateCell,
} from "./state";

const formatCell = (x: string | number) => (isNumber(x) ? x.toFixed(2) : x);

/**
 * Choose background color based on cell state.
 *
 * @param cell
 */
const cellBackground = (cell: any) =>
    cell.focus
        ? "bg-yellow"
        : cell.formula
        ? cell.error
            ? "bg-red white"
            : "bg-light-green"
        : "";

/**
 * thi.ng/hdom cell component with lifecycle methods. (The current
 * markup used (editable div's) is far from perfect...)
 *
 * @param cellid tuple
 */
const cell = ([row, col]: [number, string]) =>
    <UICell>{
        init(el: HTMLDivElement) {
            this.element = el;
            this.focus = false;
        },
        render(_: any, cells: any) {
            const id = `${col}${row}`;
            const cell = cells[id];
            return [
                `${CELL_STYLE}.w4.overflow-y-hidden.overflow-x-scroll`,
                {
                    class: cellBackground(cell),
                    contenteditable: true,
                    title: cell.formula,
                    onfocus: () => {
                        this.focus = true;
                        focusCell(id);
                    },
                    onblur: () => {
                        if (this.focus) {
                            updateCell(id, this.element!.textContent!.trim());
                            this.focus = false;
                        }
                        blurCell(id);
                    },
                    onkeydown: (e: KeyboardEvent) => {
                        switch (e.key) {
                            case "Enter":
                            case "Tab":
                                updateCell(
                                    id,
                                    this.element!.textContent!.trim()
                                );
                                this.element!.blur();
                                break;
                            case "Escape":
                                this.focus = false;
                                cancelCell(id);
                                this.element!.blur();
                        }
                    },
                },
                String(
                    cell.focus && cell.formula
                        ? cell.formula
                        : cell.error || formatCell(cell.value)
                ),
            ];
        },
    };

/**
 * Main UI component HOF. Attached to to `main` rstream (defined below)
 * and called with the DB state atom's current state when it changes.
 * The function returns a thi.ng/hdom component tree representing the
 * entire spreadsheet.
 */
const app = () => {
    const CELLS: UICell[][] = transduce(
        comp(map(cell), partition(NUM_COLS)),
        push(),
        permutations(range(1, NUM_ROWS + 1), charRange("A", MAX_COL))
    );
    return (state: any) => [
        "div",
        {},
        [`${CELL_STYLE}.w2.b.bg-moon-gray`, "\u00a0"],
        map(
            (col) => [`${CELL_STYLE}.w4.b.bg-moon-gray`, {}, col],
            charRange("A", MAX_COL)
        ),
        mapIndexed(
            (i, rowid) => [
                "div",
                {},
                [
                    `${CELL_STYLE}.w2.b.bg-moon-gray.overflow-y-hidden.overflow-x-scroll`,
                    {},
                    rowid,
                ],
                ...CELLS[i].map((cell) => [cell, state]),
            ],
            range(1, NUM_ROWS + 1)
        ),
    ];
};

// setLogger(new ConsoleLogger("rstream"));

// main state value subscription
const main = fromAtom(DB);

// transform state value into UI components and then apply to DOM.
// due to the use of `contenteditable` div's for spreadsheet cells, we
// need to disable the use of automatic span wrappers for text content
// in hdom
main.transform(map(app()), updateDOM({ span: false }));

exposeGlobal("DB", DB);
exposeGlobal("graph", graph);
