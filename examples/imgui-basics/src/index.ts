import { canvas } from "@thi.ng/hdom-canvas";
import { start } from "@thi.ng/hdom/start";
import { DEFAULT_THEME, Key } from "@thi.ng/imgui/api";
import { buttonH } from "@thi.ng/imgui/components/button";
import { sliderH } from "@thi.ng/imgui/components/sliderh";
import { IMGUI } from "@thi.ng/imgui/gui";
import { gridLayout } from "@thi.ng/layout/grid-layout";
import { gestureStream } from "@thi.ng/rstream-gestures";
import { fromDOMEvent } from "@thi.ng/rstream/from/event";
import { reactive } from "@thi.ng/rstream/stream";
import { tweenNumber } from "@thi.ng/rstream/tween";

// GUI initialization
const gui = new IMGUI({
    theme: {
        ...DEFAULT_THEME,
        font: "16px 'IBM Plex Mono', monospace",
        baseLine: 6,
        focus: "#000",
    },
});

// hdom-canvas component specialization
// use init lifecycle method to create/attach event listeners
// and feed relevant details to IMGUI
const _canvas = {
    ...canvas,
    init: (el: HTMLCanvasElement) => {
        // unified mouse & touch event handling
        gestureStream(el, {}).subscribe({
            next: (e) => gui.setMouse(e.pos, e.buttons),
        });
        // key events are only required to make IMGUI components more accessible
        // and keyboard controllable.
        // Important: key events CANNOT ever be attached to a canvas itself...
        fromDOMEvent(window, "keydown").subscribe({
            next(e) {
                if (e.target !== document.body) return;
                if (
                    e.key === Key.TAB ||
                    e.key === Key.SPACE ||
                    e.key === Key.UP ||
                    e.key === Key.DOWN
                ) {
                    e.preventDefault();
                }
                gui.setKey(e);
            },
        });
        fromDOMEvent(window, "keyup").subscribe({
            next(e) {
                gui.setKey(e);
            },
        });
    },
};

// dummy app state details (using https://thi.ng/rstream)

const PRESETS = <const>[
    ["Mute", 0, 0],
    ["Quiet", 1, 25],
    ["Medium", 33, 50],
    ["Party", 66, 75],
];

// initial volume state
const volume = reactive(55);

// interpolated version of volume
// note: this interpolation is entirely optional. also, the UX for this
// can/should be improved to avoid jittering when the user just briefly clicks
// anywhere on the related slider widget without any further dragging. in that
// case, there should be an additional value/flag to indicate if interpolation
// is desired or not. multiple ways to achieve that, but out of scope for this
// small example...
const smoothedVolume = tweenNumber(volume, 0, 0.2);

// derived view for slider label
const volumeLabel = smoothedVolume.map((x) => {
    for (let i = PRESETS.length; --i >= 0; ) {
        if (x >= PRESETS[i][1]) return `${Math.round(x)} (${PRESETS[i][0]})`;
    }
    return "";
});

// hdom update loop
start(() => {
    let res: any;
    // create grid layout using https://thi.ng/layout
    // position grid centered in window
    const grid = gridLayout(
        16,
        (window.innerHeight - 68) / 2,
        window.innerWidth - 32,
        1,
        32,
        4
    );

    // prep GUI for next frame
    gui.begin();

    // volume slider component
    // returns a number (new value) if user interacted w/ slider
    res = sliderH(
        gui,
        grid,
        "vol",
        0,
        100,
        1,
        smoothedVolume.deref()!,
        `Volume: ${volumeLabel.deref()!}`,
        () => ""
    );
    // update state if needed
    res !== undefined && volume.next(res);

    // create nested inner grid layout
    let inner = grid.nest(PRESETS.length);
    // create button for each volume preset
    // and update state if a button was pressed
    for (let preset of PRESETS) {
        res = buttonH(gui, inner, `bt${preset[0]}`, preset[0]);
        res && volume.next(preset[2]);
    }

    // end frame
    gui.end();

    // return main/only component (see definition further above)
    // the `gui` itself implements the `IToHiccup` interface and therefore
    // can just be provided as canvas body
    // (you can also provide other hiccup-canvas shapes/content here)
    return [
        _canvas,
        {
            // disable hdom diffing for canvas children
            __diff: false,
            width: window.innerWidth,
            height: window.innerHeight,
            style: { background: gui.theme.globalBg, cursor: gui.cursor },
            ...gui.attribs,
        },
        gui,
    ];
});
