import { ConsoleLogger, IObjectOf } from "@thi.ng/api";
import { Atom } from "@thi.ng/atom";
import { isNumber } from "@thi.ng/checks";
import { ILifecycle } from "@thi.ng/hdom";
import { memoize1 } from "@thi.ng/memoize";
import { setIn, setInMany } from "@thi.ng/paths";
import { fromAtom, fromView, setLogger } from "@thi.ng/rstream";
import {
    add,
    addNode,
    div,
    mul,
    Node,
    NodeInputSpec,
    removeNode,
    sub
} from "@thi.ng/rstream-graph";
import { charRange, float, maybeParseFloat } from "@thi.ng/strings";
import {
    assocObj,
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

const NUM_COLS = 4;
const NUM_ROWS = 10;

const MAX_COL = "A".charCodeAt(0) + NUM_COLS - 1;

const RE_OP2 = /^=\s*([A-Z]\d+)\s*([+*/\-])\s*([A-Z]\d+)$/i;
const RE_SUM = /^=\s*SUM\(\s*([A-Z])(\d+)\s*\:\s*([A-Z])(\d+)\s*\)$/i;

const CELL_STYLE = "div.dib.h2.pa2.ma0.br.bb";

interface Cell {
    formula: string;
    value: string | number;
    backup: string;
    focus: boolean;
    error: boolean;
}

interface UICell extends ILifecycle {
    element?: HTMLDivElement;
    focus?: boolean;
}

const DB = new Atom<IObjectOf<Cell>>(
    transduce(
        map(([col, row]) => [
            `${col}${row}`,
            { formula: "", value: "", backup: "", focus: false, error: false }
        ]),
        assocObj(),
        permutations(charRange("A", MAX_COL), range(1, NUM_ROWS + 1))
    )
);

const graph: IObjectOf<Node> = {};

const removeCell = (id: string) => removeNode(graph, id);

const focusCell = (id: string) => {
    DB.swapIn(id, (cell: Cell) =>
        setInMany(cell, "focus", true, "backup", cell.formula)
    );
};

const blurCell = (id: string) => {
    DB.swapIn(id, (cell: Cell) => setIn(cell, "focus", false));
};

const cancelCell = (id: string) => {
    DB.swapIn(id, (cell: Cell) =>
        setInMany(cell, "focus", false, "formula", cell.backup)
    );
};

const updateCell = (id: string, val: string) => {
    if (val.startsWith("=")) {
        DB.resetIn([id, "formula"], val);
        let res = RE_OP2.exec(val);
        if (res) {
            DB.resetIn([id, "error"], false);
            addBinOp(res, id);
        } else if ((res = RE_SUM.exec(val))) {
            DB.resetIn([id, "error"], false);
            addSum(res, id);
        } else {
            DB.resetIn([id, "error"], true);
        }
    } else {
        removeCell(id);
        DB.swapIn(id, (cell) =>
            setInMany(cell, "value", val, "formula", "", "error", false)
        );
    }
};

const cellInput = memoize1(
    (id: string): NodeInputSpec => ({
        stream: () =>
            fromView(DB, [id.toUpperCase(), "value"], (x) =>
                maybeParseFloat(x, 0)
            )
    })
);

const addBinOp = ([_, a, op, b]: RegExpExecArray, id: string) => {
    removeCell(id);
    addNode(graph, DB, id, {
        fn: (<any>{ "+": add, "*": mul, "-": sub, "/": div })[op],
        ins: { a: cellInput(a), b: cellInput(b) },
        outs: {
            "*": [id, "value"]
        }
    });
};

const addSum = (
    [_, acol, arow, bcol, brow]: RegExpExecArray,
    cellID: string
) => {
    removeCell(cellID);
    addNode(graph, DB, cellID, {
        fn: add,
        ins: transduce(
            comp(map(([c, r]) => `${c}${r}`), map((id) => [id, cellInput(id)])),
            assocObj<NodeInputSpec>(),
            permutations(
                charRange(acol.toUpperCase(), bcol.toUpperCase()),
                range(parseInt(arow), parseInt(brow) + 1)
            )
        ),
        outs: {
            "*": [cellID, "value"]
        }
    });
};

const formatCell = (x: string | number) => (isNumber(x) ? float(2)(x) : x);

const cellBackground = (cell: any) =>
    cell.focus
        ? "bg-yellow"
        : cell.formula
        ? cell.error
            ? "bg-red"
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
                        : formatCell(cell.value)
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
