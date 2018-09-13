import { canvas } from "@thi.ng/hdom-canvas";
import { dropdown } from "@thi.ng/hdom-components/dropdown";
import { stream } from "@thi.ng/rstream/stream";
import { fromRAF } from "@thi.ng/rstream/from/raf";
import { sync } from "@thi.ng/rstream/stream-sync";
import { updateDOM } from "@thi.ng/transducers-hdom";
// import { peek } from "@thi.ng/transducers/func/peek";
import { range } from "@thi.ng/transducers/iter/range";
import { repeatedly } from "@thi.ng/transducers/iter/repeatedly";
import { benchmark } from "@thi.ng/transducers/xform/benchmark";
import { map } from "@thi.ng/transducers/xform/map";

import logo from "../assets/logo-64.png"; // ignore error, resolved by parcel

const randpos = () =>
    [Math.random() * 300 - 150, Math.random() * 300 - 150];

const randdir = (n = 1) =>
    [Math.random() * n * 2 - n, Math.random() * n * 2 - n];

// various tests for different shapes & canvas drawing options
// each test is a standalone component (only one used at a time)
const TESTS = {

    "dash offset": {
        attribs: {},
        body: () =>
            ["path",
                {
                    fill: "blue", stroke: "#000", weight: 3,
                    dash: [4, 8], dashOffset: (Date.now() * 0.01) % 12
                },
                [
                    ["M", [10, 10]], ["Q", [150, 150], [150, 290]],
                    ["Q", [150, 150], [290, 10]], ["Q", [150, 150], [10, 10]]
                ]
            ]
    },

    "shape morph": {
        attribs: { clear: false },
        body: () => {
            const t = Date.now() * 0.01;
            const a = 10 + 140 * (Math.sin(t * 0.33) * 0.5 + 0.5);
            return ["path",
                {
                    fill: "rgba(255,255,255,0.05)", stroke: "#000",
                    weight: 3,
                    miterLimit: 1,
                    dash: [20, 20], dashOffset: (t * 5) % 40,
                    translate: [150, 150],
                    rotate: (t * 0.05) % (2 * Math.PI)
                },
                [
                    ["M", [-100, -100]], ["Q", [-a, 0], [0, 100]],
                    ["Q", [a, 0], [100, -100]], ["Q", [0, -a], [-100, -100]]
                ]
            ];
        }
    },

    "points (1k)": {
        attribs: {},
        body: () =>
            ["points",
                {
                    fill: "#000", stroke: "none", size: 4,
                    translate: [150, 150],
                    scale: 0.6 + 0.4 * Math.sin(Date.now() * 0.005)
                },
                [...repeatedly(randpos, 1000)]],
    },

    "points (10k)": {
        attribs: {},
        body: () =>
            ["points",
                {
                    fill: "#000", stroke: "none",
                    translate: [150, 150],
                    scale: 0.6 + 0.4 * Math.sin(Date.now() * 0.005)
                },
                [...repeatedly(randpos, 10000)]],
    },

    "points (50k)": {
        attribs: {},
        body: () =>
            ["points",
                {
                    fill: "#000", stroke: "none",
                    translate: [150, 150],
                    scale: 0.6 + 0.4 * Math.sin(Date.now() * 0.005)
                },
                [...repeatedly(randpos, 50000)]],
    },

    "rounded rects": {
        attribs: {},
        body: () => {
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
                ...map((i) => ["rect", null, [i, i], 300 - 2 * i, 300 - 2 * i, r], range(10, 50, 5)),
                ["text", {}, [150, 150], Math.round(r)]
            ];
        }
    },

    "linear gradient": {
        attribs: {},
        body: () =>
            [
                ["linearGradient", { id: "grad1", from: [0, 0], to: [300, 300] },
                    [[0, "#fc0"], [1, "#0ef"]]],
                ["linearGradient", { id: "grad2", from: [0, 0], to: [300, 150 + 150 * Math.sin(Date.now() * 0.005)] },
                    [[0, "#700"], [0.5, "#d0f"], [1, "#fff"]]],
                ["circle", { fill: "$grad1" }, [150, 150], 140],
                ["rect", { fill: "$grad2" }, [125, 0], 50, 300],
                ["rect", { fill: "$grad2" }, [0, 125], 300, 50]
            ],
    },

    "radial gradient": {
        attribs: {},
        body: () => {
            const t = Date.now() * 0.01;
            const x = 150 + 50 * Math.sin(t * 0.5);
            const y = 150 + 20 * Math.sin(t * 0.3);
            const spos = [110, 120];
            return [
                ["radialGradient", { id: "bg", from: [x, 280], to: [150, 300], r1: 300, r2: 100 },
                    [[0, "#07f"], [0.5, "#0ef"], [0.8, "#efe"], [1, "#af0"]]],
                ["radialGradient", { id: "sun", from: spos, to: spos, r1: 5, r2: 50 },
                    [[0, "#fff"], [1, "rgba(255,255,192,0)"]]],
                ["circle", { fill: "$bg" }, [150, y], 130],
                ["circle", { fill: "$sun" }, spos, 50],
            ];
        }
    },

    "image": {
        attribs: {},
        body: (() => {
            const img = new Image();
            img.src = logo;
            const pos = [...repeatedly(randpos, 10)];
            const vel = [...repeatedly(() => randdir(4), 10)];
            const w = 300 - 64;
            return () =>
                pos.map((p, i) => {
                    let x = p[0] + vel[i][0];
                    let y = p[1] + vel[i][1];
                    (x < 0) && (x *= -1, vel[i][0] *= -1);
                    (y < 0) && (y *= -1, vel[i][1] *= -1);
                    (x > w) && (x = w - (x - w), vel[i][0] *= -1);
                    (y > w) && (y = w - (y - w), vel[i][1] *= -1);
                    p[0] = x;
                    p[1] = y;
                    return ["img", {}, img, [...p]];
                });
        })()
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
sel.next("shape morph");
// sel.next(peek(Object.keys(TESTS)));

const main = sync({
    src: { id: sel, time: fromRAF() }
})
main.transform(
    map(({ id }) =>
        ["div.vh-100.flex.flex-column.justify-center.items-center.code.f7",
            [choices, id],
            [canvas, { class: "ma2", width: 300, height: 300, ...TESTS[id].attribs }, TESTS[id].body],
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
