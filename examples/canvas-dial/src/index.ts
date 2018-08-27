import { fromRAF } from "@thi.ng/rstream/from/raf";
import { sync } from "@thi.ng/rstream/stream-sync";
import { percent } from "@thi.ng/strings/percent";
import { updateUI } from "@thi.ng/transducers-hdom";
import { comp } from "@thi.ng/transducers/func/comp";
import { map } from "@thi.ng/transducers/xform/map";
// import { stream } from "@thi.ng/rstream/stream";

import { dial } from "./dial";

export const ctx = {
    //     state: new Atom<any>({
    //         bass: 0
    //     })
    ui: {
        root: { class: "vh-100 flex justify-center items-center" },
        dial: { width: 100, height: 100, class: "mh1" },
    }
};

const sine = (freq: number) =>
    map((x: number) => 0.5 + 0.5 * Math.sin(x * freq));

const app = () => {
    const dialA = dial({
        r1: 0.5,
        color: { from: [0, 0], to: [1, 1], stops: [[0, "#075"], [1, "#6f9"]] },
        font: "20px Menlo",
        label: (x) => percent(0)(x)
    });
    const dialB = dial({
        r1: 0.66,
        base: 0,
        color: { from: [0, 0], to: [1, 0], stops: [[0, "#f60"], [1, "#ff0"]] },
        font: "20px Menlo",
        label: (x) => percent(0)(x)
    });
    const dialC = dial({
        r1: 0.75,
        spread: Math.PI,
        color: { from: [0, 0], to: [1, 0], stops: [[0, "#407"], [1, "#03f"]] },
        font: "20px Menlo",
        label: (x) => percent(0)(x),
    });
    return ({ a, b, c }) =>
        ["div", ctx.ui.root,
            [dialA, ctx.ui.dial, a],
            [dialB, ctx.ui.dial, b],
            [dialC, ctx.ui.dial, c]
        ];
};

sync({
    src: {
        a: fromRAF().transform(sine(0.1)),
        b: fromRAF().transform(sine(0.07)),
        c: fromRAF().transform(sine(0.04)),
    },
    xform: comp(
        map(app()),
        updateUI("app")
    )
});
