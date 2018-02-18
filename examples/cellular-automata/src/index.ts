import { start } from "@thi.ng/hiccup-dom";

import { transduce } from "@thi.ng/transducers/transduce";
import { comp } from "@thi.ng/transducers/func/comp";
import { range2d } from "@thi.ng/transducers/iter/range2d";
import { repeatedly } from "@thi.ng/transducers/iter/repeatedly";
import { push } from "@thi.ng/transducers/rfn/push";
import { str } from "@thi.ng/transducers/rfn/str";
import { bits } from "@thi.ng/transducers/xform/bits";
import { convolve2d, buildKernel2d } from "@thi.ng/transducers/xform/convolve";
import { map } from "@thi.ng/transducers/xform/map";
import { multiplex } from "@thi.ng/transducers/xform/multiplex";
import { partition } from "@thi.ng/transducers/xform/partition";

const W = 128;
const H = 48;

let grid;
let rules;
// 3x3 convolution kernel (Moore neighborhood)
const kernel = buildKernel2d([1, 1, 1, 1, 0, 1, 1, 1, 1], 3, 3);

// parse rules from location hash (2 groups of 9 bits each)
// (essentially this is a compressed finite state machine)
if (location.hash.length === 20) {
    rules = transduce(comp(map((x: string) => parseInt(x, 2)), bits(9), partition(9)), push(), location.hash.substr(1).split("-"));
} else {
    // Conway CA default state rules [[dead], [alive]]
    rules = [[0, 0, 0, 1, 0, 0, 0, 0, 0], [0, 0, 1, 1, 0, 0, 0, 0, 0]];
}

const setHash = () => (location.hash = rules[0].join("") + "-" + rules[1].join(""));
const randomSeq = (num, prob = 0.5) => [...repeatedly(() => Math.random() < prob ? 1 : 0, num)];
const randomizeGrid = (prob = 0.5) => (grid = randomSeq(W * H, prob));
const randomizeRules = () => {
    rules = [randomSeq(9), randomSeq(9)];
    randomizeGrid();
    setHash();
};

// apply convolution & CA rules
// this produces the next generation of the CA
// we're using `multiplex` to produce a tuple of `[orig-cell-value, neighbor-count]`
export const convolve = (src, wrap = true) =>
    transduce(
        comp(
            multiplex(map((p) => src[p[0] + p[1] * W]), convolve2d(src, W, H, kernel, wrap)),
            map(([alive, neighbors]) => rules[alive][neighbors])
        ),
        push(),
        range2d(W, H)
    );

// format grid values as string
const format = (src) =>
    transduce(
        comp(
            map((x: number) => x ? "\u2588" : " "),
            partition(W),
            map(x => x.join(""))
        ),
        str("\n"),
        src
    );

// event handler for rule edits
const setRule = (i, j, s) => {
    rules[i][j] = s ? 1 : 0;
    setHash();
};

// single checkbox component
const checkbox = (x, onchange) => ["input", { type: "checkbox", checked: !!x, onchange }];

// component for single CA rule group (alive / dead FSM)
const ruleBoxes = (prefix, i) =>
    ["div",
        ["label", prefix],
        ...rules[i].map((rule, j) => checkbox(rule, (e) => setRule(i, j, e.target.checked))),
    ];

// seed grid with noise
randomizeGrid();

// define & start main app component
start("app", () => {
    return ["div",
        ruleBoxes("birth", 0),
        ruleBoxes("survive", 1),
        ["div", ["button", { onclick: () => randomizeRules() }, "randomize rules"]],
        ["div", ["button", { onclick: () => randomizeGrid() }, "reset grid"]],
        ["pre", format(grid = convolve(grid))]
    ];
});
