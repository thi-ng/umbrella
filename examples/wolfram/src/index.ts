import { dropdown } from "@thi.ng/hdom-components";
import {
    fromIterable,
    fromRAF,
    stream,
    sync
} from "@thi.ng/rstream";
import {
    buildKernel1d,
    comp,
    convolve1d,
    iterator1,
    lookup1d,
    map,
    range,
    reducer,
    scan,
    slidingWindow
} from "@thi.ng/transducers";
import { bits, randomBits } from "@thi.ng/transducers-binary";
import { updateDOM } from "@thi.ng/transducers-hdom";

const resetCA = () => [...randomBits(0.25, 128)];

const evolveCA = (src, { kernel, rule, reset }) =>
    reset
        ? resetCA()
        : [
              ...iterator1(
                  comp(
                      convolve1d({
                          src,
                          kernel,
                          width: src.length,
                          wrap: true
                      }),
                      map(lookup1d(<number[]>rule))
                  ),
                  range(src.length)
              )
          ];

const triggerReset = () =>
    wolfram.add(fromIterable([true, false], 16), "reset");

const setRule = (e) => {
    rule.next(parseInt(e.target.value));
    triggerReset();
};

const setKernel = (e) => kernel.next(parseInt(e.target.value));

const app = ({ id, ksize, sim }) => [
    "div.sans-serif.ma3",
    [
        "div",
        "Rule:",
        [
            "input.w4.h2.mh3.pa2",
            {
                type: "number",
                value: id,
                oninput: setRule
            }
        ],
        "Kernel:",
        [
            dropdown,
            { class: "h2 pa2 mh3", onchange: setKernel },
            [[3, "3"], [5, "5"]],
            ksize
        ],
        [
            "button.mr3.pa2",
            {
                onclick: triggerReset
            },
            "Reset"
        ],
        [
            "a.link.blue",
            {
                href:
                    "https://en.wikipedia.org/wiki/Elementary_cellular_automaton#Random_initial_state"
            },
            "Wikipedia"
        ]
    ],
    ["pre.f7.code", sim]
];

const rule = stream<number>();
const kernel = stream<number>();

const wolfram = sync({
    src: {
        rule: rule.transform(map((x) => [...bits(32, false, [x])])),
        kernel: kernel.transform(
            map((x) => buildKernel1d([1, 2, 4, 8, 16], x))
        ),
        _: fromRAF()
    }
});

const main = sync({
    src: {
        id: rule,
        ksize: kernel,
        sim: wolfram.transform(
            scan(reducer<number[], any>(resetCA, evolveCA)),
            map((gen) => gen.map((x) => (x ? "█" : " ")).join("")),
            slidingWindow(32),
            map((win: string[]) => win.join("\n"))
        )
    }
}).transform(map(app), updateDOM());

rule.next(105);
kernel.next(3);

if (process.env.NODE_ENV !== "production") {
    const hot = (<any>module).hot;
    hot && hot.dispose(() => main.done());
}
