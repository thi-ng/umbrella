import { start } from "@thi.ng/hiccup-dom";
import { dropdown, DropDownOption } from "@thi.ng/hiccup-dom-components/dropdown";

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

const presets: DropDownOption[] = [
    ["", "custom"],
    ["000100000-001100000", "conway"],
    ["000100000-001110000", "maze #1"],
    ["000111111-000001111", "maze #2"],
    ["000001111-111111110", "dots"],
    ["000101111-000001111", "growth"],
    ["000001011-001011111", "organic"],
    ["000010011-000011111", "angular"],
];

let grid;
let rules;
// 3x3 convolution kernel (Moore neighborhood)
const kernel = buildKernel2d([1, 1, 1, 1, 0, 1, 1, 1, 1], 3, 3);

const setHash = () => (location.hash = rules[0].join("") + "-" + rules[1].join(""));

// parse rules from string (e.g. location hash): 2 groups of 9 bits each
// (essentially these rules are a compressed finite state machine)
const parseRules = (raw) =>
    transduce(
        comp(
            map((x: string) => parseInt(x, 2)),
            bits(9),
            partition(9)
        ),
        push(),
        raw.split("-")
    );

const applyRules = (raw) => {
    if (raw.length === 19) {
        rules = parseRules(raw);
        randomizeGrid();
        setHash();
    }
};

// create random bit sequence w/ ones appearing in given probability
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

// Use Conway CA default state rules [[dead], [alive]] if no preset present in hash
applyRules(location.hash.length === 20 ? location.hash.substr(1) : presets[1][0]);

// define & start main app component
start("app", () => {
    return ["div",
        ruleBoxes("birth", 0),
        ruleBoxes("survive", 1),
        ["div",
            ["button", { onclick: () => randomizeRules() }, "randomize rules"],
            ["button", { onclick: () => randomizeGrid() }, "reset grid"],
            dropdown({ onchange: (e) => applyRules(e.target.value) }, presets, location.hash.substr(1))
        ],
        ["pre", format(grid = convolve(grid))]
    ];
});
