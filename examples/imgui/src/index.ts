import { timedResult } from "@thi.ng/bench";
import { line, pathFromSvg, normalizedPath } from "@thi.ng/geom";
import { canvas } from "@thi.ng/hdom-canvas";
import { DOWNLOAD } from "@thi.ng/hiccup-carbon-icons/download";
import { RESTART } from "@thi.ng/hiccup-carbon-icons/restart";
import {
    buttonH,
    buttonV,
    DEFAULT_THEME,
    dial,
    dropdown,
    GridLayout,
    GUITheme,
    iconButton,
    IMGUI,
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
    xyPad,
    Key,
    gridLayout,
    layoutBox,
} from "@thi.ng/imgui";
import { clamp, PI } from "@thi.ng/math";
import { sync, trigger, fromDOMEvent, sidechainPartition, fromRAF, merge, CloseMode, fromAtom } from "@thi.ng/rstream";
import { gestureStream, GestureType } from "@thi.ng/rstream-gestures";
import { float } from "@thi.ng/strings";
import { step, sideEffect, map } from "@thi.ng/transducers";
import { updateDOM } from "@thi.ng/transducers-hdom";
import { sma } from "@thi.ng/transducers-stats";
import { ZERO2, setC2, min2, Vec, vecOf, add2 } from "@thi.ng/vectors";
import { History, Atom } from "@thi.ng/atom";
import { setInMany } from "@thi.ng/paths";

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
const THEME_IDS = ["Default", "Mono", "Raspberry"];

// TODO create wrapper / simplify
const ICON1 = ["g", {stroke: "none"}, ...pathFromSvg((<any>DOWNLOAD)[2][1].d)];
const ICON2 = ["g", {stroke: "none"}, normalizedPath(pathFromSvg((<any>RESTART)[2][1].d)[0])];

const themeForID = (theme: number): Partial<GUITheme> =>
    ({ ...THEMES[theme], font: FONT, cursorBlink: 0 });

const DB = new History(new Atom({
    uiVisible: true,
    uiMode: 0,
    theme: 0,
    radius: 10,
    gridW: 15,
    rgb: [0.9, 0.45, 0.5],
    pos: [400, 140],
    txt: "Hello there! This is a test, do not panic!",
    toggles: new Array<boolean>(12).fill(false),
    flags: [true, false],
    level: 0,
}), 500);


const app = () => {
    let maxW = 240;
    let size = [window.innerWidth, window.innerHeight];
    let radialPos = [0, 0];
    let prevMeta = false;
    // GUI instance
    const gui = new IMGUI({ theme: themeForID(DB.deref().theme) });
    // GUI benchmark (moving average)
    const bench = step(sma(50));
    const _canvas = {
        ...canvas,
        init(canv: HTMLCanvasElement) {
            // add event streams to trigger GUI updates
            main.add(
                merge<any,any>({
                    src: [
                        gestureStream(canv, {}).transform(
                            sideEffect((e) => gui.setMouse(
                                [...e[1].pos],
                                e[0] === GestureType.START || e[0] === GestureType.DRAG
                                    ? MouseButton.LEFT
                                    : 0
                            ))
                        ),
                        fromDOMEvent(window, "keydown").transform(
                            sideEffect((e: KeyboardEvent) => {
                                if (e.key === Key.TAB) {
                                    e.preventDefault();
                                }
                                if ((e.metaKey || e.ctrlKey) && e.key === "z") {
                                    DB.undo();
                                } else if ((e.metaKey || e.ctrlKey) && e.key === "y") {
                                    DB.redo();
                                } else {
                                    gui.setKey(e);
                                }
                            })
                        ),
                        fromDOMEvent(window, "keyup").transform(
                            sideEffect((e) => gui.setKey(e))
                        ),
                        fromDOMEvent(window, "resize").transform(
                            sideEffect(() => {
                                maxW = Math.min(maxW, window.innerWidth - 16);
                                setC2(size, window.innerWidth, window.innerHeight);
                                DB.swapIn("pos", (pos: Vec) => min2([], pos, size));
                            })
                        )
                    ]
                })
            );
        }
    };

    const updateGUI = () => {
        const state = DB.deref();
        const grid = gridLayout(10, 10, maxW - 20, 1, 16, 4);
        gui.setTheme(themeForID(state.theme));
        gui.begin();
        if (buttonH(gui, grid, "show", state.uiVisible ? "Hide UI" : "Show UI")) {
            DB.resetIn("uiVisible", !state.uiVisible);
        }
        if (state.uiVisible) {
            let inner: GridLayout;
            let inner2: GridLayout;
            let res: any;
            switch(state.uiMode) {
                case 0:
                    grid.next();

                    inner = grid.nest(2);
                    iconButton(gui, inner, "icon", ICON1, 14, 16, "Download", "Icon button");
                    iconButton(gui, inner, "icon2", ICON2, 13, 16, "Restart", "Icon button");

                    grid.next();
                    textLabel(gui, grid, "Toggles:");

                    inner = grid.nest(8);
                    if (buttonV(gui, inner, "toggleAll", 3, "INVERT")) {
                        DB.swapIn("toggles", (toggles: boolean[]) => toggles.map((x)=>!x));
                    }

                    inner2 = inner.nest(4, [7, 1]);
                    for(let i = 0; i < state.toggles.length; i++) {
                        if ((res = toggle(gui, inner2, `toggle${i}`, state.toggles[i], false, `${i}`)) !== undefined) {
                            DB.resetIn(["toggles", i], res);
                        }
                    }

                    inner = grid.nest(2);
                    gui.pushTheme(themeForID((state.theme + 2) % 3));
                    if ((res = toggle(gui, inner, "opt1", state.flags[0], false, state.flags[0] ? "ON" : "OFF", "Unused")) !== undefined) {
                        DB.resetIn(["flags", 0], res);
                    }
                    if ((res = toggle(gui, inner, "opt2", state.flags[1], false, state.flags[1] ? "ON" : "OFF", "Unused")) !== undefined) {
                        DB.resetIn(["flags", 1], res);
                    }
                    gui.popTheme();

                    grid.next();
                    textLabel(gui, grid, "Radio (horizontal):");
                    if ((res = radio(gui, grid, "level1", true, state.level, false, RADIO_LABELS)) !== undefined) {
                        DB.resetIn("level", res);
                    }
                    grid.next();
                    if ((res = radio(gui, grid, "level2", true, state.level, true, RADIO_LABELS)) !== undefined) {
                        DB.resetIn("level", res);
                    }

                    grid.next();
                    textLabel(gui, grid, "Radio (vertical):");
                    if ((res = radio(gui, grid, "level3", false, state.level, false, RADIO_LABELS)) !== undefined) {
                        DB.resetIn("level", res);
                    }
                    grid.next();
                    if ((res = radio(gui, grid, "level4", false, state.level, true, RADIO_LABELS)) !== undefined) {
                        DB.resetIn("level", res);
                    }
                    break;

                case 1:
                    grid.next();
                    textLabel(gui, grid, "Slider:");

                    inner = grid.nest(2);
                    if ((res = sliderH(gui, inner, "grid", 1, 20, 1, state.gridW, "Grid", undefined, "Grid size")) !== undefined) {
                        DB.resetIn("gridW", res);
                    }
                    if ((res = sliderH(gui, inner, "rad", 2, 20, 1, state.radius, "Radius", undefined, "Dot radius")) !== undefined) {
                        DB.resetIn("radius", res);
                    }

                    textLabel(gui, grid, "Slider groups:");
                    textLabel(gui, grid, "(Alt + drag to adjust all):");

                    inner = grid.nest(4);
                    res = sliderVGroup(gui, inner, "col2", 0, 1, 0.05, state.rgb, 5, RGB_LABELS, F2, RGB_TOOLTIPS);
                    res = sliderVGroup(gui, inner, "col3", 0, 1, 0.05, state.rgb, 5, RGB_LABELS, F2, RGB_TOOLTIPS) || res;
                    res = sliderHGroup(gui, inner.nest(1, [2, 1]), "col", 0, 1, 0.05, false, state.rgb, RGB_LABELS, F2, RGB_TOOLTIPS) || res;
                    res !== undefined &&
                        (gui.isAltDown()
                            ? DB.resetIn("rgb", vecOf(3, res[1]))
                            : DB.resetIn(["rgb", res[0]], res[1]));

                    textLabel(gui, grid, "2D controller:");

                    inner = grid.nest(4);
                    res = xyPad(gui, inner, "xy1", ZERO2, size, 10, state.pos, 3, false, undefined, undefined, "Origin");
                    res = xyPad(gui, inner, "xy2", ZERO2, size, 10, state.pos, 4, false, undefined, undefined, "Origin") || res;
                    res = xyPad(gui, inner, "xy3", ZERO2, size, 10, state.pos, -1, false, undefined, undefined, "Origin") || res;
                    res = xyPad(gui, inner, "xy4", ZERO2, size, 10, state.pos, -2, false, undefined, undefined, "Origin") || res;
                    res !== undefined && DB.resetIn("pos", res);
                    break;

                case 2:
                    grid.next();
                    textLabel(gui, grid, "Dials:");

                    inner = grid.nest(6);
                    if ((res = dial(gui, inner, "dial1", 0, 1, 0.05, state.rgb[0], undefined, F1)) !== undefined) {
                        DB.resetIn(["rgb", 0], res);
                    }
                    if ((res = dial(gui, inner, "dial2", 0, 1, 0.05, state.rgb[1], undefined, F1)) !== undefined) {
                        DB.resetIn(["rgb", 1], res);
                    }
                    if ((res = dial(gui, inner, "dial3", 0, 1, 0.05, state.rgb[2], undefined, F1)) !== undefined) {
                        DB.resetIn(["rgb", 2], res);
                    }
                    if ((res = dial(gui, inner, "dial4", 0, 1, 0.05, state.rgb[0], undefined, F1)) !== undefined) {
                        DB.resetIn(["rgb", 0], res);
                    }
                    if ((res = dial(gui, inner, "dial5", 0, 1, 0.05, state.rgb[1], undefined, F1)) !== undefined) {
                        DB.resetIn(["rgb", 1], res);
                    }
                    if ((res = dial(gui, inner, "dial6", 0, 1, 0.05, state.rgb[2], undefined, F1)) !== undefined) {
                        DB.resetIn(["rgb", 2], res);
                    }

                    inner = grid.nest(6);
                    const gap = PI;
                    if ((res = ring(gui, inner, "small", 0, 1, 0.05, state.rgb[0], gap, 0.5, "R", F2, "Red")) !== undefined) {
                        DB.resetIn(["rgb", 0], res);
                    }
                    if ((res = ring(gui, inner.nest(1, [2, 2]), "medium", 0, 1, 0.05, state.rgb[1], gap, 0.5, "G", F2, "Green")) !== undefined) {
                        DB.resetIn(["rgb", 1], res);
                    }
                    if ((res = ring(gui, inner.nest(1, [3, 3]), "large", 0, 1, 0.05, state.rgb[2], gap, 0.5, "B", F2, "Blue")) !== undefined) {
                        DB.resetIn(["rgb", 2], res);
                    }

                    inner = grid.nest(3);
                    if ((res = ring(gui, inner, "dial11", 0, 1, 0.05, state.rgb[0], gap, 0.33, "R", F2, "Red")) !== undefined) {
                        DB.resetIn(["rgb", 0], res);
                    }
                    if ((res = ring(gui, inner, "dial12", 0, 1, 0.05, state.rgb[1], PI * 0.66, 0.66, "G", F2, "Green")) !== undefined) {
                        DB.resetIn(["rgb", 1], res);
                    }
                    if ((res = ring(gui, inner, "dial13", 0, 1, 0.05, state.rgb[2], PI * 0.33, 0.9, "B", F2, "Blue")) !== undefined) {
                        DB.resetIn(["rgb", 2], res);
                    }
                    break;

                case 3:
                    grid.next();
                    textLabel(gui, grid, "Select theme:");
                    if ((res = dropdown(gui, grid, "theme", state.theme, THEME_IDS, "GUI theme")) !== undefined) {
                        DB.resetIn("theme", res);
                    }
                    const box = layoutBox(10, 170, 150, 120, 200, 24, 0);
                    if ((res = dropdown(gui, box, "theme2", state.theme, THEME_IDS, "GUI theme")) !== undefined) {
                        DB.resetIn("theme", res);
                    }
                    break;

                case 4:
                    grid.next();
                    textLabel(gui, grid, "Editable textfield:");
                    if ((res = textField(gui, grid, "txt", state.txt, undefined, "Type something...")) !== undefined) {
                        DB.resetIn("txt", res);
                    }
                    break;

                default:
            }
        }
        // radial menu
        if (gui.hotID === "" && gui.isMetaDown()) {
            if (!prevMeta) {
                radialPos = [...gui.mouse];
            }
            prevMeta = true;
            let res: number | undefined;
            if ((res = radialMenu(gui, "radial", radialPos[0], radialPos[1], 100, RADIAL_LABELS, [])) !== undefined) {
                DB.swap((db) => setInMany(db, "uiMode", res, "uiVisible", true));
            }
            const txt = "Click to switch UI";
            gui.add(textLabelRaw(add2([],radialPos, [-gui.textWidth(txt)/2, 120]),"#000",txt));
        } else {
            prevMeta = false;
        }
        // resize
        if (
            gui.activeID === NONE &&
            gui.isMouseDown() &&
            Math.abs(gui.mouse[0] - maxW) < 80
        ) {
            maxW = clamp(gui.mouse[0], 240, size[0] - 16);
        }

        const { key, hotID, activeID, focusID, lastID } = gui;
        const statLayout = gridLayout(10, size[1] - 10 - 3 * 14, size[0], 1, 14, 0);
        textLabel(gui, statLayout, `Keys: ${key}`);
        textLabel(gui, statLayout, `Focus: ${focusID} / ${lastID}`);
        textLabel(gui, statLayout, `IDs: ${hotID || "none"} / ${activeID || "none"}`);

        gui.end();
    };

    // main component function
    return () => {
        const w = window.innerWidth;
        const h = window.innerHeight;

        // this is only needed because we're NOT using a RAF update loop:
        // call updateGUI twice to compensate for lack of regular 60fps update
        // Note: Unless your GUI is super complex, this cost is pretty neglible
        // and no actual drawing takes place here ...
        const t = <number>bench(timedResult(() => { updateGUI(); updateGUI(); })[1]);
        // const t = <number>fps(timedResult(() => { updateGUI(); })[1]);

        t != null && gui.add(textLabelRaw([10, h - 10 - 4 * 14], "#ff0", `GUI time: ${F2(t)}ms`));
        // return hdom-canvas component with embedded GUI
        return [
            _canvas,
            {
                width: w,
                height: h,
                style: { background: gui.theme.globalBg, cursor: gui.cursor },
                oncontextmenu: (e: Event) => e.preventDefault(),
                ...gui.attribs
            },
            line([maxW, 0], [maxW, h], { stroke: "#000" }),
            [
                "text",
                {
                    transform: [0, -1, 1, 0, maxW + 12, h / 2],
                    fill: "#000",
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

// main stream combinator
// the trigger() input is merely used to kick off the system
// once the 1st frame renders, the canvas component will create and attach
// event streams to this stream sync, which are then used to trigger future
// updates on demand...
const main = sync<any,any>({
    src: {
        _: trigger(),
        state: fromAtom(DB)
    },
    close: CloseMode.NEVER
});

// transform the stream:
main
    // group potentially higher frequency event updates & sync with RAF
    // to avoid extraneous real DOM/Canvas updates
    .subscribe(sidechainPartition<any,number>(fromRAF()))
    // then apply main compoment function & apply hdom
    .transform(
        map(app()),
        updateDOM()
    );

// HMR handling / cleanup
if (process.env.NODE_ENV !== "production") {
    const hot = (<any>module).hot;
    hot && hot.dispose(() => main.done());
}
