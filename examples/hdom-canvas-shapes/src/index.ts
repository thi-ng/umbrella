import { canvas, normalizeTree } from "@thi.ng/hdom-canvas";
// import { canvas2D, adaptDPI } from "@thi.ng/hdom-components/canvas";
import { dropdown } from "@thi.ng/hdom-components/dropdown";
import { stream } from "@thi.ng/rstream/stream";
import { fromRAF } from "@thi.ng/rstream/from/raf";
import { sync } from "@thi.ng/rstream/stream-sync";
import { updateDOM } from "@thi.ng/transducers-hdom";
import { range } from "@thi.ng/transducers/iter/range";
import { repeatedly } from "@thi.ng/transducers/iter/repeatedly";
import { map } from "@thi.ng/transducers/xform/map";
import { Mat23 } from "@thi.ng/vectors/mat23";

// for testing SVG conversion
import { COMMENT, serialize } from "@thi.ng/hiccup";
import { convertTree } from "@thi.ng/hiccup-svg/convert";
import { svg } from "@thi.ng/hiccup-svg/svg";

import logo from "../assets/logo-64.png"; // ignore error, resolved by parcel
import { download } from "./download";

// canvas size
const W = 300;
const W2 = W / 2;

const randpos = () =>
    [Math.random() * W - W2, Math.random() * W - W2];

const randdir = (n = 1) =>
    [Math.random() * n * 2 - n, Math.random() * n * 2 - n];

// various tests for different shapes & canvas drawing options
// each test is a standalone component (only one used at a time)
const TESTS = {

    "dash offset": {
        attribs: {},
        desc: "Simple path w/ animated stroke dash pattern",
        body: () =>
            ["path",
                {
                    fill: "blue", stroke: "#000", weight: 3,
                    dash: [4, 8], dashOffset: (Date.now() * 0.01) % 12
                },
                [
                    ["M", [10, 10]], ["Q", [W2, W2], [W2, W - 10]],
                    ["Q", [W2, W2], [W - 10, 10]], ["Q", [W2, W2], [10, 10]]
                ]
            ]
    },

    "shape morph": {
        attribs: { __clear: false },
        desc: "Animated semi-transparent path, stroke dash pattern, transformed origin, non-clearing background",
        body: () => {
            const t = Date.now() * 0.01;
            const a = 10 + 140 * (Math.sin(t * 0.33) * 0.5 + 0.5);
            return ["path",
                {
                    fill: "rgba(255,255,255,0.05)", stroke: "#000",
                    weight: 3,
                    miterLimit: 1,
                    dash: [20, 20], dashOffset: (t * 5) % 40,
                    translate: [W2, W2],
                    rotate: (t * 0.05) % (2 * Math.PI)
                },
                [
                    ["M", [-100, -100]], ["Q", [-a, 0], [0, 100]],
                    ["Q", [a, 0], [100, -100]], ["Q", [0, -a], [-100, -100]]
                ]
            ];
        }
    },

    "points 1k": {
        attribs: { __diff: false },
        desc: "1,000 random circles",
        body: () =>
            ["points",
                {
                    fill: "#000", stroke: "none", size: 4,
                    translate: [W2, W2],
                    scale: 0.6 + 0.4 * Math.sin(Date.now() * 0.005),
                    shape: "circle"
                },
                [...repeatedly(randpos, 1000)]],
    },

    "points 10k": {
        attribs: { __diff: false },
        desc: "10,000 random rects",
        body: () =>
            ["points",
                {
                    fill: "#000", stroke: "none",
                    translate: [W2, W2],
                    scale: 0.6 + 0.4 * Math.sin(Date.now() * 0.005)
                },
                [...repeatedly(randpos, 10000)]],
    },

    "points 50k": {
        attribs: { __diff: false },
        desc: "50,000 random rects",
        body: () =>
            ["points",
                {
                    fill: "#000", stroke: "none",
                    translate: [W2, W2],
                    scale: 0.6 + 0.4 * Math.sin(Date.now() * 0.005)
                },
                [...repeatedly(randpos, 50000)]],
    },

    "rounded rects": {
        attribs: {},
        desc: "Rounded rects w/ animated corner radii",
        body: () => {
            const t = Date.now() * 0.01;
            const r = 100 * (Math.sin(t * 0.5) * 0.5 + 0.5);
            return ["g",
                {
                    weight: 1,
                    stroke: "#00f",
                    align: "center",
                    baseline: "middle",
                    font: "48px Menlo",
                    __normalize: false
                },
                ...map((i) => ["rect", null, [i, i], W - 2 * i, W - 2 * i, r], range(10, 50, 5)),
                ["text", {}, [W2, W2], Math.round(r)]
            ];
        }
    },

    "linear gradient": {
        attribs: {},
        desc: "Animated linear gradients",
        body: () =>
            [
                ["defs", {},
                    ["linearGradient", { id: "grad1", from: [0, 0], to: [W, W] },
                        [[0, "#fc0"], [1, "#0ef"]]],
                    ["linearGradient", { id: "grad2", from: [0, 0], to: [W, W2 + W2 * Math.sin(Date.now() * 0.005)] },
                        [[0, "#700"], [0.5, "#d0f"], [1, "#fff"]]]
                ],
                ["circle", { fill: "$grad1" }, [W2, W2], W2 - 10],
                ["rect", { fill: "$grad2" }, [125, 0], 50, W],
                ["rect", { fill: "$grad2" }, [0, 125], W, 50]
            ],
    },

    "radial gradient": {
        attribs: {},
        desc: "Animated radial gradients (w/ alpha channel)",
        body: () => {
            const t = Date.now() * 0.01;
            const x = W2 + 50 * Math.sin(t * 0.5);
            const y = W2 + 20 * Math.sin(t * 0.3);
            const spos = [110, 120];
            return [
                ["defs", {},
                    ["radialGradient", { id: "bg", from: [x, W - 20], to: [W2, W], r1: W, r2: 100 },
                        [[0, "#07f"], [0.5, "#0ef"], [0.8, "#efe"], [1, "#af0"]]],
                    ["radialGradient", { id: "sun", from: spos, to: spos, r1: 5, r2: 50 },
                        [[0, "#fff"], [1, "rgba(255,255,192,0)"]]]
                ],
                ["circle", { fill: "$bg" }, [W2, y], W2 - 20],
                ["circle", { fill: "$sun" }, spos, 50],
            ];
        }
    },

    "images 1k": {
        attribs: {},
        desc: "1,000 stateful image sprite components",
        body: (() => {
            const img = new Image();
            img.src = logo;
            const w = W - 64;
            const ball = () => {
                const p = randpos();
                const v = randdir(4);
                return () => {
                    let x = p[0] + v[0];
                    let y = p[1] + v[1];
                    (x < 0) && (x *= -1, v[0] *= -1);
                    (y < 0) && (y *= -1, v[1] *= -1);
                    (x > w) && (x = w - (x - w), v[0] *= -1);
                    (y > w) && (y = w - (y - w), v[1] *= -1);
                    p[0] = x;
                    p[1] = y;
                    return ["img", {}, [...p], img];
                };
            };
            const body = ["g", {}, ...repeatedly(ball, 1000)];
            return () => body;
        })()
    },

    "static": {
        attribs: {},
        desc: "static scene (single draw) w/ skew matrix",
        body: (() => {
            const body =
                ["g",
                    {
                        transform: Mat23.concat(
                            Mat23.translation(150, 150),
                            Mat23.skewX(-Math.PI / 6)
                        ),
                    },
                    ["rect", { fill: "#ff0" }, [-50, -50], 100, 100],
                    ["text",
                        { fill: "#00f", font: "18px Menlo", align: "center", baseline: "middle" },
                        [0, 0], new Date().toISOString()
                    ]
                ];
            return () => body;
        })()
    }
};

// test case selection dropdown
const choices = (_, target, id) =>
    [dropdown,
        {
            class: "w4 ma2",
            onchange: (e) => {
                window.location.hash = e.target.value.replace(/\s/g, "-");
                target.next(e.target.value);
            }
        },
        Object.keys(TESTS).map((k) => [k, k]),
        id];

// event stream for triggering SVG conversion / export
const trigger = stream<boolean>();
// stream supplying current test ID
const selection = stream<string>();

// stream combinator updating & normalizing selected test component tree
// (one of the inputs is linked to RAF to trigger updates)
const scene = sync({
    src: {
        id: selection,
        time: fromRAF()
    }
}).transform(
    map(({ id }) => ({ id, shapes: normalizeTree({}, TESTS[id].body()) }))
);

// stream transformer to produce & update main user interface root component
scene.transform(
    map(({ id, shapes }) =>
        ["div.vh-100.flex.flex-column.justify-center.items-center.code.f7",
            ["div",
                [choices, selection, id],
                ["button.ml2", { onclick: () => trigger.next(true) }, "convert & export"]],

            // hdom-canvas component w/ injected `scene` subtree
            // turn __normalize off because `scene` already contains normalized tree
            [canvas,
                {
                    class: "ma2",
                    width: 300,
                    height: 300,
                    __normalize: false,
                    ...TESTS[id].attribs
                },
                shapes],

            ["div.ma2.tc", TESTS[id].desc],
            ["a.link",
                { href: "https://github.com/thi-ng/umbrella/tree/master/examples/hdom-canvas-shapes" },
                "Source code"]
        ]
    ),
    updateDOM()
);

// stream combinator which triggers SVG conversion and file download
// when both inputs have triggered (one of them being linked to the export button)
sync({
    src: { scene, trigger },
    reset: true,
    xform: map(({ scene }) =>
        download(
            new Date().toISOString().replace(/[:.-]/g, "") + ".svg",
            serialize(
                svg(
                    { width: 300, height: 300, stroke: "none", fill: "none" },
                    [COMMENT, `generated by @thi.ng/hiccup-svg @ ${new Date()}`],
                    convertTree(scene.shapes)
                )
            )
        )
    )
});

// seed initial test selection
selection.next(
    window.location.hash.length > 1 ?
        window.location.hash.substr(1).replace(/-/g, " ") :
        "shape morph"
);

// HMR handling
// terminate `scene` rstream to avoid multiple running instances after HMR
// (this will also terminate all attached child streams/subscriptions)
const hot = (<any>module).hot;
if (hot) {
    hot.dispose(() => scene.done());
}
