import { splat4_24 } from "@thi.ng/binary/splat";
import { dropdown } from "@thi.ng/hdom-components/dropdown";
import { fpsCounter } from "@thi.ng/hdom-components/fps-counter";
import { start } from "@thi.ng/hdom/start";
import { css } from "@thi.ng/hiccup-css/css";
import { injectStyleSheet } from "@thi.ng/hiccup-css/inject";
import { U24 } from "@thi.ng/strings/radix";
import { comp } from "@thi.ng/transducers/func/comp";
import { range } from "@thi.ng/transducers/iter/range";
import { push } from "@thi.ng/transducers/rfn/push";
import { transduce } from "@thi.ng/transducers/transduce";
import { map } from "@thi.ng/transducers/xform/map";
import { mapIndexed } from "@thi.ng/transducers/xform/map-indexed";
import { partition } from "@thi.ng/transducers/xform/partition";

const SIZE = "0.5rem";
const RES = 32;
const DELTA = 1024;

injectStyleSheet(
    css([
        map(
            (x: number) =>
                [`.cell-${x}`, {
                    background: `#${U24(splat4_24(x))}`
                }],
            range(16)
        ),
        map(
            (x: number) =>
                [`.xcell-${x}`, {
                    background: `#${U24(splat4_24(x) | 0x00ff00)}`
                }],
            range(16)
        ),
        [".cell", {
            display: "inline-block",
            width: SIZE,
            height: SIZE,
        }],
        [".row", {
            height: SIZE
        }],
    ])
);

const grid = (w, numChanges) => ({
    init() {
        this.cells = new Array(w * w).fill(0);
        this.frame = 0;
    },
    render(_, interlace) {
        if (!this.cells) return ["div"];
        const num = w * w;
        const changed = new Set<number>();
        for (let i = 0; i < numChanges; i++) {
            const idx = (Math.random() * num) | 0;
            changed.add(idx);
            this.cells[idx] = (this.cells[idx] + 1) % 16;
        }
        const isFirst = this.frame == 0;
        const body = transduce<number, any, any[]>(
            comp(
                mapIndexed((i, x) => {
                    const diff = isFirst || changed.has(i);
                    return ["span", { key: "c" + i, __diff: diff, class: `cell ${diff ? "x" : ""}cell-${x}` }];
                }
                ),
                partition(w),
                mapIndexed((i, row) =>
                    ["div.row", { key: "r" + i, __skip: !isFirst && ((i + this.frame) & interlace) }, ...row]
                )
            ),
            push(),
            ["div"],
            this.cells
        );
        this.frame++;
        return body;
    }
});

const grid1 = grid(RES, DELTA);
const stats = fpsCounter({ history: 50, sparkline: { width: 100 } });

let interlace = 1;

const cancel = start(
    () => ["div.ma3.code",
        ["div", [grid1, interlace]],
        ["div.mt3", [stats]],
        ["div.mt3",
            "Interlace: ",
            [dropdown,
                { class: "code", onchange: (e) => interlace = parseInt(e.target.value) },
                [[0, "None"], [1, 1], [3, 3], [7, 7], [15, 15], [31, 31]],
                interlace
            ]
        ],
        ["div.mt3", `~${DELTA / (interlace + 1) + RES / (interlace + 1) + 20} nodes diffed per frame, ${RES * RES + RES + 20} total`]
    ]);

// window["stop"] = cancel;

const hot = (<any>module).hot;
if (hot) {
    hot.dispose(cancel);
}
