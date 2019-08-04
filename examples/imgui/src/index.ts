import { timedResult } from "@thi.ng/bench";
import { sin } from "@thi.ng/dsp";
import { circle } from "@thi.ng/geom";
import { start } from "@thi.ng/hdom";
import { canvas } from "@thi.ng/hdom-canvas";
import {
    button,
    DEFAULT_THEME,
    dropdown,
    GUITheme,
    IMGUI,
    radio,
    sliderH,
    sliderHGroup,
    sliderVGroup,
    textField,
    textLabel,
    toggle,
    xyPad
} from "@thi.ng/imgui";
import { PI } from "@thi.ng/math";
import { float } from "@thi.ng/strings";
import { map, range2d } from "@thi.ng/transducers";
import { mulN } from "@thi.ng/vectors";

const FONT = "10px 'IBM Plex Mono'";

// define theme colors in RGBA format for future compatibility with
// WebGL backend
const THEMES: Partial<GUITheme>[] = [
    DEFAULT_THEME,
    {
        focus: [0.6, 0, 0.6, 1],
        cursor: [1, 1, 1, 1],
        bg: [0, 0, 0, 0.4],
        fg: [0, 0, 0, 1],
        text: [0.5, 0.5, 0.5, 1],
        bgHover: [0, 0, 0, 0.75],
        fgHover: [0.4, 0.4, 0.4, 1],
        textHover: [0.9, 0.9, 0.9, 1],
        bgTooltip: [0, 0, 0, 0.85],
        textTooltip: [0.8, 0.8, 0.8, 1]
    },
    {
        globalBg: "#ccc",
        focus: [0, 1, 0, 1],
        cursor: [0, 0, 0, 1],
        bg: [1, 1, 1, 0.66],
        fg: [0.2, 0.8, 1, 1],
        text: [0.3, 0.3, 0.3, 1],
        bgHover: [1, 1, 1, 0.9],
        fgHover: [0, 0.7, 0.9, 1],
        textHover: [0.2, 0.2, 0.4, 1],
        bgTooltip: [1, 1, 0.8, 0.85],
        textTooltip: [0, 0, 0, 1]
    }
];

const app = () => {
    // state variables
    let isUiVisibe = true;
    let rad = [10];
    let gridW = [4];
    let rgb = [0.9, 0.45, 0.5];
    let pos = [400, 240];
    let txt: any = ["Hello there! This is a test, do not panic!"];
    let theme: any = [2, false];
    let flags = [true, false];
    let level = [0];
    // GUI instance
    const gui = new IMGUI({
        width: 640,
        height: 480,
        theme: {
            ...THEMES[theme[0]],
            font: FONT
        }
    });
    // main update loop
    return () => {
        const stats = timedResult(() => {
            gui.begin();
            // prettier-ignore
            if (button(gui,"show", 0, 0, 100, 20, isUiVisibe ? "Hide UI" : "Show UI")) {
                isUiVisibe = !isUiVisibe;
            }
            // prettier-ignore
            if (isUiVisibe) {
                sliderH(gui, "numc", 0, 22, 100, 20, 1, 20, 1, gridW, 0, "Grid", undefined, "Grid size");
                sliderH(gui, "rad", 0, 44, 100, 20, 2, 20, 1, rad, 0, "Radius", undefined, "Dot radius");
                sliderHGroup(gui, "col", 102, 22, 100, 20, 0, 22, 0, 1, 0.05, rgb, ["R","G","B"], float(2), ["Red", "Green", "Blue"]);
                sliderVGroup(gui, "colv", 204,22,20,66,22,0,0,1,0.05,rgb,["R","G","B"],float(2));
                if (textField(gui, "txt", 0, 88, 202, 20, txt, undefined, "Type something...")) {
                    console.log(txt[0]);
                }
                xyPad(gui, "xy", 0, 110, 100, 100, [0, 0], [640, 480], 10, pos, false, 0, 112, undefined, undefined, "Origin");
                if (dropdown(gui, "theme", 102, 110, 100, 20, 2, theme, ["Default", "Mono", "Light"], "GUI theme")) {
                    gui.setTheme({...THEMES[theme[0]], font: FONT });
                }
                toggle(gui, "opt1", 0, 240, 49, 20, 0, flags, 0, flags[0] ? "ON" : "OFF", "Unused");
                toggle(gui, "opt2", 51, 240, 49, 20, 0, flags, 1, flags[1] ? "ON" : "OFF", "Unused");
                radio(gui, "level", 0, 262, 20, 20, 20, 100, 0, level, 0, ["Amateur", "Enthusiast", "Pro"]);
            }
            const { key, hotID, activeID, focusID, lastID } = gui;
            // prettier-ignore
            gui.add(
                textLabel([10, 440], "#fff", `Keys: ${key} / ${[...gui.keys]}`),
                textLabel([10, 456], "#fff", `Focus: ${focusID} / ${lastID}`),
                textLabel([10, 470], "#fff", `IDs: ${hotID || "none"} / ${activeID || "none"}`)
            );
            gui.end();
        });
        gui.add(textLabel([10, 426], "#ff0", `time: ${stats[1]}ms`));
        const n = gridW[0] - 1;
        return [
            canvas,
            { ...gui.attribs },
            // circle grid
            [
                "g",
                {
                    fill: rgb,
                    translate: pos,
                    rotate: PI / 4,
                    scale: rad[0]
                },
                ...map(
                    (p) => circle(mulN(p, p, sin(gui.time, 0.25, 0.5, 2.5)), 1),
                    range2d(-n, n + 1, -n, n + 1)
                )
            ],
            // IMGUI implements IToHiccup interface so can just supply it as is
            gui
        ];
    };
};

const cancel = start(app());

if (process.env.NODE_ENV !== "production") {
    const hot = (<any>module).hot;
    hot && hot.dispose(cancel);
}
