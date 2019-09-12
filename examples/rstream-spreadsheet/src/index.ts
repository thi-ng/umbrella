import { isNumber } from "@thi.ng/checks";
import { fromAtom } from "@thi.ng/rstream";
import { charRange, float } from "@thi.ng/strings";
import {
    comp,
    map,
    mapIndexed,
    partition,
    permutations,
    push,
    range,
    transduce
} from "@thi.ng/transducers";
import { updateDOM } from "@thi.ng/transducers-hdom";
import {
    CELL_STYLE,
    MAX_COL,
    NUM_COLS,
    NUM_ROWS,
    UICell
} from "./api";
import "./dsl";
import {
    blurCell,
    cancelCell,
    DB,
    focusCell,
    graph,
    updateCell
} from "./state";

const formatCell = (x: string | number) => (isNumber(x) ? float(2)(x) : x);

const cellBackground = (cell: any) =>
    cell.focus
        ? "bg-yellow"
        : cell.formula
        ? cell.error
            ? "bg-red white"
            : "bg-light-green"
        : "";

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
                    contentEditable: true,
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
                    }
                },
                String(
                    cell.focus && cell.formula
                        ? cell.formula
                        : cell.error || formatCell(cell.value)
                )
            ];
        }
    };

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
                    rowid
                ],
                ...CELLS[i].map((cell) => [cell, state])
            ],
            range(1, NUM_ROWS + 1)
        )
    ];
};

// setLogger(new ConsoleLogger("rstream"));

const main = fromAtom(DB);
main.transform(map(app()), updateDOM({ span: false }));

(<any>window)["DB"] = DB;
(<any>window)["graph"] = graph;

if (process.env.NODE_ENV !== "production") {
    const hot = (<any>module).hot;
    hot && hot.dispose(() => main.done());
}
