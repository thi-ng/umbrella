import { canvas } from "@thi.ng/hdom-canvas";
import { dropdown } from "@thi.ng/hdom-components/dropdown";
import { stream } from "@thi.ng/rstream";
import { fromRAF } from "@thi.ng/rstream/from/raf";
import { sync } from "@thi.ng/rstream/stream-sync";
import { updateDOM } from "@thi.ng/transducers-hdom";
import { peek } from "@thi.ng/transducers/func/peek";
import { range } from "@thi.ng/transducers/iter/range";
import { repeatedly } from "@thi.ng/transducers/iter/repeatedly";
import { benchmark } from "@thi.ng/transducers/xform/benchmark";
import { map } from "@thi.ng/transducers/xform/map";

// various tests for different shapes & canvas drawing options
// each test is a standalone component (only one used at a time)
const TESTS = {

    "dash offset":
        () => ["path",
            {
                fill: "blue", stroke: "#000", weight: 3,
                dash: [4, 8], dashOffset: (Date.now() * 0.01) % 12
            },
            [["M", [10, 10]], ["Q", [150, 150], [150, 290]], ["Q", [150, 150], [290, 10]], ["Q", [150, 150], [10, 10]]]],

    "shape morph":
        () => {
            const t = Date.now() * 0.01;
            const a = 10 + 140 * (Math.sin(t * 0.25) * 0.5 + 0.5);
            return ["path",
                {
                    fill: "red", stroke: "#000", weight: 3,
                    dash: [20, 20], dashOffset: (t * 5) % 40,
                    translate: [150, 150],
                    rotate: (t * 0.1) % (2 * Math.PI)
                },
                [["M", [-100, -100]], ["Q", [-a, 0], [0, 100]], ["Q", [a, 0], [100, -100]], ["Q", [0, -a], [-100, -100]]]];
        },

    "noise (1k)":
        () => ["g", { __normalize: false, fill: "#000", stroke: "none" },
            ...repeatedly(() => ["rect", null, [Math.random() * 300, Math.random() * 300], 2, 2], 1000)],

    "noise (10k)":
        () => ["g", { __normalize: false, fill: "#000", stroke: "none" },
            ...repeatedly(() => ["rect", null, [Math.random() * 300, Math.random() * 300], 2, 2], 10000)],

    "noise (50k)":
        () => ["g", { __normalize: false, fill: "#000", stroke: "none" },
            ...repeatedly(() => ["rect", null, [Math.random() * 300, Math.random() * 300], 2, 2], 50000)],

    "rounded rects":
        () => {
            const t = Date.now() * 0.01;
            const r = 100 * (Math.sin(t * 0.5) * 0.5 + 0.5);
            return ["g",
                {
                    weight: 1,
                    stroke: "#00f",
                    align: "center",
                    baseLine: "middle",
                    font: "48px Menlo",
                    __normalize: false
                },
                ...map((i) => ["rect", {}, [i, i], 300 - 2 * i, 300 - 2 * i, r], range(10, 50, 5)),
                ["text", {}, [150, 150], Math.round(r)]
            ];
        },

    "linear gradient":
        () => [
            ["linearGradient", { id: "grad1", from: [0, 0], to: [300, 300] }, [0, "#fc0"], [1, "#0ef"]],
            ["linearGradient", { id: "grad2", from: [0, 0], to: [300, 0] }, [0, "#700"], [0.5, "#d0f"], [1, "#fff"]],
            ["circle", { fill: "$grad1" }, [150, 150], 140],
            ["rect", { fill: "$grad2" }, [0, 250], 300, 50]
        ],

    "radial gradient":
        () => {
            const t = Date.now() * 0.01;
            const x = 50 * Math.sin(t * 0.5);
            const y = 20 * Math.sin(t * 0.3);
            const spos = [110, 120];
            return [
                ["radialGradient", { id: "bg", from: [150 + x, 280], to: [150, 300], r1: 300, r2: 100 },
                    [0, "#07f"], [0.5, "#0ef"], [0.8, "#efe"], [1, "#af0"]],
                ["radialGradient", { id: "sun", from: spos, to: spos, r1: 5, r2: 50 },
                    [0, "#fff"], [1, "rgba(255,255,192,0)"]],
                ["circle", { fill: "$bg" }, [150, 150 + y], 130],
                ["circle", { fill: "$sun" }, spos, 50],
            ];
        }
};

// test case selection dropdown
const choices = (_, id) =>
    [dropdown,
        {
            class: "w4 ma2",
            onchange: (e) => sel.next(e.target.value)
        },
        Object.keys(TESTS).map((k) => [k, k]),
        id];


const sel = stream<string>();
sel.next(peek(Object.keys(TESTS)));

const main = sync({
    src: { id: sel, time: fromRAF() }
})
main.transform(
    map(({ id }) =>
        ["div.vh-100.flex.flex-column.justify-center.items-center.code.f7",
            [choices, id],
            [canvas, { class: "ma2", width: 300, height: 300 }, TESTS[id]],
            ["a.link",
                { href: "https://github.com/thi-ng/umbrella/tree/feature/hdom-canvas/examples/hdom-canvas-shapes" },
                "Source code"]
        ]),
    updateDOM(),
    benchmark()
);
// main.subscribe({ next: console.log });

const hot = (<any>module).hot;
if (hot) {
    hot.dispose(() => (main.done(), console.log(main)));
}
