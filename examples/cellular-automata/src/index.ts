import { dropdown, DropDownOption } from "@thi.ng/hdom-components/dropdown";
import { start } from "@thi.ng/hdom/start";
import { bits } from "@thi.ng/transducers-binary/bits";
import { comp } from "@thi.ng/transducers/comp";
import { buildKernel2d, convolve2d } from "@thi.ng/transducers/convolve";
import { map } from "@thi.ng/transducers/map";
import { mapIndexed } from "@thi.ng/transducers/map-indexed";
import { partition } from "@thi.ng/transducers/partition";
import { push } from "@thi.ng/transducers/push";
import { range2d } from "@thi.ng/transducers/range2d";
import { repeatedly } from "@thi.ng/transducers/repeatedly";
import { step } from "@thi.ng/transducers/step";
import { str } from "@thi.ng/transducers/str";
import { transduce } from "@thi.ng/transducers/transduce";

const W = 128;
const H = 48;

const presets: DropDownOption[] = [
    ["", "custom"],
    ["000100000001100000", "conway"],
    ["000100000001110000", "maze #1"],
    ["000111111000001111", "maze #2"],
    ["000001111111111110", "dots"],
    ["000101111000001111", "growth"],
    ["000001111000011111", "organic"],
    ["000010011000011111", "angular"],
];

// container for cell states
let grid: number[];
// CA rules are stored in a linearized 2x9 array: 2 groups of 9 bits each
// essentially these rules are a compressed finite state machine
let rules: number[];
// 3x3 convolution kernel (Moore neighborhood)
const kernel = buildKernel2d([1, 1, 1, 1, 0, 1, 1, 1, 1], 3, 3);

const setHash = () => (location.hash = rules.join(""));

// build transducer to parse rules from string (e.g. location hash or preset)
// (an older version used a preset format w/ "-" to separate rule groups)
const parseRules = step(
    comp(
        map((x: string) => parseInt(x.replace("-", ""), 2)),
        bits(18)
    )
);

const applyRules = (raw: string) => {
    if (raw.length >= 18) {
        rules = <number[]>parseRules(raw);
        randomizeGrid();
        setHash();
    }
};

// create random bit sequence w/ ones appearing in given probability
const randomSeq = (num: number, prob = 0.5) => [
    ...repeatedly(() => (Math.random() < prob ? 1 : 0), num),
];

const randomizeGrid = (prob = 0.5) => (grid = randomSeq(W * H, prob));

const randomizeRules = () => {
    rules = randomSeq(18);
    randomizeGrid();
    setHash();
};

// apply convolution & CA rules (in basically 2 lines of code, i.e. the transducer part!!)
// this produces the next generation of the CA
// we're using `multiplex` to run 2 transducers in parallel and
// produce a tuple of `[neighbor-count, orig-cell-value]`
// this tuple is then used to lookup the next cell state using the current rule set
export const convolve = (
    src: number[],
    rules: number[],
    width: number,
    height: number,
    rstride = 9,
    wrap = true
) =>
    transduce<number[], number, number[]>(
        comp(
            convolve2d({ src, width, height, kernel, wrap }),
            mapIndexed((i, x) => rules[x + src[i] * rstride])
        ),
        push(),
        range2d(width, height)
    );

// format grid values as string
const format = (src: number[], width: number, fill = "\u2588", empty = " ") =>
    transduce(
        comp(
            map((x: number) => (x ? fill : empty)),
            partition(width),
            map((x) => x.join(""))
        ),
        str("\n"),
        src
    );

// event handler for rule edits
const setRule = (i: number, j: number, s: boolean, rstride = 9) => {
    rules[i * rstride + j] = s ? 1 : 0;
    setHash();
};

// single checkbox component
const checkbox = (x: number, onchange: EventListener) => [
    "input",
    { type: "checkbox", checked: !!x, onchange },
];

// component for single CA rule group (alive / dead FSM)
const ruleBoxes = (prefix: string, i: number, rstride = 9) => [
    "div",
    ["label", prefix],
    ...rules
        .slice(i * rstride, (i + 1) * rstride)
        .map((rule, j) =>
            checkbox(rule, (e) =>
                setRule(i, j, (<HTMLInputElement>e.target).checked)
            )
        ),
];

const isPreset = (id: string) => presets.findIndex((x) => x[0] === id) !== -1;

// Use Conway CA default state rules [[dead], [alive]] if no preset present in hash
applyRules(
    location.hash.length > 18 ? location.hash.substr(1) : <string>presets[1][0]
);

// define & start main app component
start(() => {
    const id = location.hash.substr(1);
    return [
        "div",
        ruleBoxes("birth", 0),
        ruleBoxes("survive", 1),
        [
            "div",
            ["button", { onclick: () => randomizeRules() }, "randomize rules"],
            ["button", { onclick: () => randomizeGrid() }, "reset grid"],
            [
                dropdown,
                {
                    onchange: (e: Event) =>
                        applyRules((<HTMLSelectElement>e.target).value),
                },
                presets,
                isPreset(id) ? id : "",
            ],
        ],
        ["pre", format((grid = convolve(grid, rules, W, H)), W)],
    ];
});
