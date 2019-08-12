import { timedResult } from "@thi.ng/bench";
import { line } from "@thi.ng/geom";
import { start } from "@thi.ng/hdom";
import { clamp, PI } from "@thi.ng/math";
import { canvas } from "@thi.ng/hdom-canvas";
import {
    buttonH,
    buttonV,
    DEFAULT_THEME,
    dial,
    dropdown,
    GridLayout,
    GUITheme,
    IMGUI,
    KeyModifier,
    MouseButton,
    NONE,
    radialMenu,
    radio,
    ring,
    sliderH,
    sliderHGroup,
    sliderVGroup,
    textField,
    textLabel,
    textLabelRaw,
    toggle,
    xyPad
} from "@thi.ng/imgui";
import { float } from "@thi.ng/strings";
import { step } from "@thi.ng/transducers";
import { sma } from "@thi.ng/transducers-stats";
import { ZERO2 } from "@thi.ng/vectors";

const FONT = "10px 'IBM Plex Mono'";

// define theme colors in RGBA format for future compatibility with
// WebGL backend
const THEMES: Partial<GUITheme>[] = [
    DEFAULT_THEME,
    {
        globalBg: "#888",
        focus: [0.6, 0, 0.6, 1],
        cursor: [1, 1, 1, 1],
        bg: [0, 0, 0, 0.4],
        fg: [0, 0, 0, 1],
        text: [0.9, 0.9, 0.9, 1],
        bgHover: [0, 0, 0, 0.75],
        fgHover: [0.8, 0.8, 0.8, 1],
        textHover: [1, 1, 1, 1],
        bgTooltip: [0, 0, 0, 0.85],
        textTooltip: [0.8, 0.8, 0.8, 1]
    },
    {
        globalBg: "#ccc",
        focus: [1, 0.66, 0, 1],
        cursor: [0, 0, 0, 1],
        bg: [1, 1, 1, 0.66],
        fg: [0.8, 0, 0.8, 1],
        text: [0.3, 0.3, 0.3, 1],
        bgHover: [1, 1, 1, 0.9],
        fgHover: [1, 0, 1, 1],
        textHover: [0.2, 0.2, 0.4, 1],
        bgTooltip: [1, 1, 0.8, 0.85],
        textTooltip: [0, 0, 0, 1]
    }
];

const F1 = float(1);
const F2 = float(2);

const RADIO_LABELS = ["Yes", "No", "Maybe"];
const RGB_LABELS = ["R", "G", "B"];
const RGB_TOOLTIPS = ["Red", "Green", "Blue"];
const RADIAL_LABELS = ["Buttons", "Slider", "Dials", "Dropdown", "Text"];

const app = () => {
    // state variables
    let isUiVisibe = true;
    let rad = [10];
    let gridW = [15];
    let rgb = [0.9, 0.45, 0.5];
    let pos = [400, 140];
    let txt: any = ["Hello there! This is a test, do not panic!"];
    let theme: any = [0, false];
    let toggles: boolean[] = new Array(12).fill(false);
    let level = [0];
    let flags = [true, false];
    let radialPos = [0, 0];
    let uiMode = 0;
    // GUI instance
    const gui = new IMGUI({
        width: window.innerWidth,
        height: window.innerHeight,
        theme: {
            ...THEMES[theme[0]],
            font: FONT
        }
    });
    let maxW = 240;
    let prevMeta = false;
    const fps = step(sma(50));
    // main update loop
    return () => {
        const w = gui.width = window.innerWidth;
        const h = gui.height = window.innerHeight;
        const size = [w, h];
        const stats = timedResult(() => {
            gui.updateAttribs();
            gui.begin();
            const grid = new GridLayout(null, 1, 10, 10, maxW - 20, 16, 4);
            if (
                buttonH(gui, grid, "show", isUiVisibe ? "Hide UI" : "Show UI")
            ) {
                isUiVisibe = !isUiVisibe;
            }
            if (isUiVisibe) {
                let inner: GridLayout;
                let inner2: GridLayout;
                switch(uiMode) {
                    case 0:
                        grid.next();
                        textLabel(gui, grid, "Toggles:");
                        inner = grid.nest(8);
                        if (buttonV(gui, inner, "toggleAll", 3, "INVERT")) {
                            for(let i = toggles.length; --i >= 0;) {
                                toggles[i] = !toggles[i];
                            }
                        }
                        inner2 = inner.nest(4, [7, 1]);
                        for(let i = 0; i < toggles.length; i++) {
                            toggle(gui, inner2, `toggle${i}`, toggles, i, false, `${i}`);
                        }
                        inner = grid.nest(2);
                        toggle(gui, inner, "opt1", flags, 0, false, flags[0] ? "ON" : "OFF", "Unused");
                        toggle(gui, inner, "opt2", flags, 1, false, flags[1] ? "ON" : "OFF", "Unused");
                        textLabel(gui, grid, "Radio (horizontal):");
                        radio(gui, grid, "level1", true, level, 0, false, RADIO_LABELS);
                        radio(gui, grid, "level2", true, level, 0, true, RADIO_LABELS);
                        textLabel(gui, grid, "Radio (vertical):");
                        radio(gui, grid, "level3", false, level, 0, false, RADIO_LABELS);
                        radio(gui, grid, "level4", false, level, 0, true, RADIO_LABELS);
                        break;
                    case 1:
                        grid.next();
                        textLabel(gui, grid, "Slider:");
                        inner = grid.nest(2);
                        sliderH(gui, inner, "grid", 1, 20, 1, gridW, 0, "Grid", undefined, "Grid size");
                        sliderH(gui, inner, "rad", 2, 20, 1, rad, 0, "Radius", undefined, "Dot radius");
                        textLabel(gui, grid, "Slider groups:");
                        textLabel(gui, grid, "(Alt + drag to adjust all):");
                        inner = grid.nest(4)
                        sliderVGroup(gui, inner, "col2", 0, 1, 0.05, rgb, 5, RGB_LABELS, F2, RGB_TOOLTIPS);
                        sliderVGroup(gui, inner, "col3", 0, 1, 0.05, rgb, 5, RGB_LABELS, F2, RGB_TOOLTIPS);
                        sliderHGroup(gui, inner.nest(1, [2, 1]), "col", 0, 1, 0.05, false, rgb, RGB_LABELS, F2, RGB_TOOLTIPS);
                        textLabel(gui, grid, "2D controller:");
                        inner = grid.nest(4);
                        xyPad(gui, inner, "xy1", ZERO2, size, 10, pos, 3, false, undefined, undefined, "Origin");
                        xyPad(gui, inner, "xy2", ZERO2, size, 10, pos, 4, false, undefined, undefined, "Origin");
                        xyPad(gui, inner, "xy3", ZERO2, size, 10, pos, -1, false, undefined, undefined, "Origin");
                        xyPad(gui, inner, "xy4", ZERO2, size, 10, pos, -2, false, undefined, undefined, "Origin");
                        break;
                    case 2:
                        grid.next();
                        textLabel(gui, grid, "Dials:");
                        inner = grid.nest(6);
                        dial(gui, inner, "dial1", 0, 1, 0.05, rgb, 0, undefined, F1);
                        dial(gui, inner, "dial2", 0, 1, 0.05, rgb, 1, undefined, F1);
                        dial(gui, inner, "dial3", 0, 1, 0.05, rgb, 2, undefined, F1);
                        dial(gui, inner, "dial4", 0, 1, 0.05, rgb, 0, undefined, F1);
                        dial(gui, inner, "dial5", 0, 1, 0.05, rgb, 1, undefined, F1);
                        dial(gui, inner, "dial6", 0, 1, 0.05, rgb, 2, undefined, F1);
                        inner = grid.nest(6);
                        const gap = PI;
                        ring(gui, inner, "small", 0, 1, 0.05, rgb, 0, gap, 0.5, undefined, F2, "Red");
                        ring(gui, inner.nest(1, [2, 2]), "medium", 0, 1, 0.05, rgb, 1, gap, 0.5, undefined, F2, "Green");
                        ring(gui, inner.nest(1, [3, 3]), "large", 0, 1, 0.05, rgb, 2, gap, 0.5, undefined, F2, "Blue");
                        inner = grid.nest(3);
                        ring(gui, inner, "dial11", 0, 1, 0.05, rgb, 0, gap, 0.33, "G", F2, "Red");
                        ring(gui, inner, "dial12", 0, 1, 0.05, rgb, 1, PI * 0.66, 0.66, "G", F2, "Green");
                        ring(gui, inner, "dial13", 0, 1, 0.05, rgb, 2, PI * 0.33, 0.9, "B", F2, "Blue");
                        break;
                    case 3:
                        grid.next();
                        textLabel(gui, grid, "Select theme:");
                        if (dropdown(gui, grid, "theme", theme, ["Default", "Mono", "Miaki"], "GUI theme")) {
                            gui.setTheme({...THEMES[theme[0]], font: FONT });
                        }
                        break;
                    case 4:
                        grid.next();
                        textLabel(gui, grid, "Editable textfield:");
                        if (textField(gui, grid, "txt", txt, undefined, "Type something...")) {
                            console.log(txt[0]);
                        }
                        break;
                    default:
                }
            }
            if (gui.hotID === "" && (gui.modifiers & KeyModifier.META)) {
                if (!prevMeta) {
                    radialPos = [...gui.mouse];
                }
                prevMeta = true;
                let choice: number;
                if ((choice = radialMenu(gui, "radial", radialPos[0], radialPos[1], 100, RADIAL_LABELS, [])) !== -1) {
                    uiMode = choice;
                    isUiVisibe = true;
                }
            } else {
                prevMeta = false;
            }
            // resize
            if (
                gui.activeID === NONE &&
                gui.buttons & MouseButton.LEFT &&
                Math.abs(gui.mouse[0] - maxW - 4) < 80
            ) {
                maxW = clamp(gui.mouse[0], 240, w - 16);
            }
            const { key, hotID, activeID, focusID, lastID } = gui;
            const statLayout = new GridLayout(null, 1, 10, h - 10 - 3 * 14, w, 14, 0);
            textLabel(gui, statLayout, `Keys: ${key} / ${[...gui.keys]}`);
            textLabel(gui, statLayout, `Focus: ${focusID} / ${lastID}`);
            textLabel(gui, statLayout, `IDs: ${hotID || "none"} / ${activeID || "none"}`);
            gui.end();
        });
        const t = <number>fps(stats[1]);
        t != null && gui.add(textLabelRaw([10, h - 10 - 4 * 14], "#ff0", `time: ${F2(t)}ms`));
        return [
            canvas,
            { ...gui.attribs },
            line([maxW + 1, 0], [maxW + 1, h], {
                stroke: gui.textColor(false)
            }),
            [
                "text",
                {
                    transform: [0, -1, 1, 0, maxW + 12, h / 2],
                    fill: gui.textColor(false),
                    font: FONT,
                    align: "center"
                },
                [0, 0],
                "DRAG TO RESIZE"
            ],
            // IMGUI implements IToHiccup interface so just supply as is
            gui
        ];
    };
};

const cancel = start(app());

if (process.env.NODE_ENV !== "production") {
    const hot = (<any>module).hot;
    hot && hot.dispose(cancel);
}
