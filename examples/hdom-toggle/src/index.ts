import { start } from "@thi.ng/hdom";
import {
    slideToggleDot,
    slideToggleRect,
    ToggleDotOpts,
    ToggleRectOpts,
} from "@thi.ng/hdom-components";

const state = [true, false, true, false, true];

const toggleState = (i: number) => (state[i] = !state[i]);

const dotOpts: Partial<ToggleDotOpts> = {
    r: 8,
    pad: 2,
    margin: 2,
};

const rectOpts: Partial<ToggleRectOpts> = {
    w: 16,
    h: 8,
    pad: 2,
    margin: 2,
};

const strokeOpts = {
    bgOn: { stroke: "#00f", "stroke-width": 2, fill: "none" },
    bgOff: { stroke: "#99f", "stroke-width": 2, fill: "none" },
    fgOn: { fill: "#00f" },
    fgOff: { fill: "#99f" },
};

const toggleH = slideToggleDot(dotOpts);
const toggleHStroke = slideToggleDot({ ...dotOpts, ...strokeOpts });
const toggleV = slideToggleDot({ ...dotOpts, vertical: true });
const toggleVStroke = slideToggleDot({
    ...dotOpts,
    ...strokeOpts,
    fgOn: { stroke: "#00f", fill: "#00f" },
    fgOff: { stroke: "#99f", fill: "none" },
    vertical: true,
    pad: 3,
    r: 7,
});

const toggleHSq = slideToggleRect({ ...rectOpts });
const toggleHSqStroke = slideToggleRect({ ...rectOpts, ...strokeOpts });
const toggleVSq = slideToggleRect({ ...rectOpts, vertical: true });
const toggleVSqStroke = slideToggleRect({
    ...rectOpts,
    ...strokeOpts,
    w: 8,
    h: 20,
    vertical: true,
});

const toggleGroup = (_: any, toggle: any) => [
    "div.mb3",
    ...state.map((x, i) => [
        "div.dib",
        [
            toggle,
            {
                class: "pointer mr1",
                onclick: () => toggleState(i),
            },
            x,
        ],
        ["div.tc", i],
    ]),
];

const cancel = start(() => [
    "div",
    [toggleGroup, toggleH],
    [toggleGroup, toggleHStroke],
    [toggleGroup, toggleV],
    [toggleGroup, toggleVStroke],
    [toggleGroup, toggleHSq],
    [toggleGroup, toggleHSqStroke],
    [toggleGroup, toggleVSq],
    [toggleGroup, toggleVSqStroke],
]);

if (process.env.NODE_ENV !== "production") {
    const hot = (<any>module).hot;
    hot && hot.dispose(cancel);
}
