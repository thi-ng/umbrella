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

const grid = {
    render(_, cells, w, numChanges, frame, interlace) {
        if (!frame) {
            this.prevChanged = null;
            return ["div"];
        }
        const isFirst = !this.prevChanged;
        const num = w * w;
        const changed = new Set<number>();
        for (let i = 0; i < numChanges; i++) {
            const idx = (Math.random() * num) | 0;
            changed.add(idx);
            cells[idx] = (cells[idx] + 1) % 16;
        }
        const body =
            transduce<number, any, any[]>(
                comp(
                    mapIndexed((i, x) =>
                        ["span",
                            isFirst || this.prevChanged.has(i) ?
                                { key: "c" + i, class: `cell cell-${x}` } :
                                changed.has(i) ?
                                    {
                                        key: "c" + i,
                                        class: `cell xcell-${x}`
                                    } :
                                    { key: "c" + i, __skip: true }
                        ]
                    ),
                    partition(w),
                    mapIndexed((i, row) =>
                        ["div.row", {
                            key: "r" + i,
                            __skip: !isFirst && ((i + frame) & interlace)
                        }, row]
                    )
                ),
                push(),
                ["div"],
                cells
            );
        this.prevChanged = changed;
        return body;
    }
};

const formatInterlace = (x) => {
    const res = x ? "but only every" : "and every";
    return x === 0 ?
        res :
        x === 1 ?
            res + " 2nd" :
            `${res} ${x + 1}th`;
};

const newCells = (res) => new Array(res * res).fill(0);

const stats = fpsCounter({ history: 50, sparkline: { width: 100 } });

let cells = newCells(32);
let interlace = 1;
let res = 32;
let delta = 1024;
let frame = -1;

const resOpts = [[24, 24], [32, 32], [40, 40], [48, 48], [56, 56], [64, 64]];
const deltaOpts = [[64, 64], [128, 128], [256, 256], [512, 512], [1024, 1024]];
const interlaceOpts = [[0, "None"], [1, 2], [3, 4], [7, 8], [15, 16], [31, 32]];

const cancel = start(
    () => {
        frame++;
        const total = res * res + res + 24;
        const estimate = Math.min(delta / (interlace + 1) + res / (interlace + 1) + 24, total);
        return ["div.ma3.code.f7",
            ["div.measure.lh-copy",
                `Each grid cell is one <span> element.
            ${delta} random cell states will be updated each frame,
            ${formatInterlace(interlace)} row will be updated in the browser DOM.`],
            ["div.mt3", ["span.pink", `~${estimate}`], " real node updates/frame, ", ["span.pink", total], " DOM nodes total"],
            ["div.mt3", [grid, cells, res, delta, frame, interlace]],
            ["div.mt3", [stats]],
            ["div.mt3",
                ["span.w5.dib", "Resolution: "],
                [dropdown,
                    {
                        class: "w3 code",
                        onchange: (e) => (res = parseInt(e.target.value), frame = -1, cells = newCells(res))
                    },
                    resOpts,
                    res]
            ],
            ["div.mt3",
                ["span.w5.dib", "Random updates/frame: "],
                [dropdown,
                    {
                        class: "w3 code",
                        onchange: (e) => (delta = parseInt(e.target.value))
                    },
                    deltaOpts,
                    delta]
            ],
            ["div.mt3",
                ["span.w5.dib", "Interlace rows: "],
                [dropdown,
                    {
                        class: "w3 code",
                        onchange: (e) => (interlace = parseInt(e.target.value))
                    },
                    interlaceOpts,
                    interlace]
            ],
            ["div.mt3",
                ["a", { href: "https://github.com/thi-ng/umbrella/tree/feature/hdom-skip/examples/hdom-benchmark2" }, "Source"]]
        ];
    });

// window["stop"] = cancel;

const hot = (<any>module).hot;
if (hot) {
    hot.dispose(cancel);
}
