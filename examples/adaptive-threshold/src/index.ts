import { peek } from "@thi.ng/arrays";
import type { PackedBuffer } from "@thi.ng/pixel";
import { fromRAF, sidechainPartition } from "@thi.ng/rstream";
import { map } from "@thi.ng/transducers";
import { updateDOM } from "@thi.ng/transducers-hdom";
import {
    AppState,
    Event,
    SET_IMAGE,
    SET_KERNEL_OFFSET,
    SET_KERNEL_WIDTH,
} from "./api";
import { dispatch } from "./events";
import { state } from "./state";

/**
 * Canvas component w/ life cycle methods
 */
const canvas = <any>{
    init(el: HTMLCanvasElement, _: any, pix: PackedBuffer) {
        this.el = el;
        this.render(null, pix);
    },
    render(_: any, pix: PackedBuffer) {
        // delay blitting until just after DOM update. this is needed
        // due to setting canvas size also clears content...
        this.el && setTimeout(() => pix.blitCanvas(this.el), 0);
        return [
            "canvas.mv3.pa1.ba",
            {
                width: pix.width,
                height: pix.height,
            },
        ];
    },
};

/**
 * File/image chooser component w/ event dispatch
 */
const fileChooser = [
    "div.mb3",
    ["label.dib.w3", `Image:`],
    [
        "input.f7",
        {
            type: "file",
            accept: "image/png, image/jpeg, image/webp",
            onchange: (e: any) => dispatch([SET_IMAGE, e.target.files[0]]),
        },
    ],
];

/**
 * Numeric input component.
 *
 * @param eventID
 * @param label
 * @param value
 * @param opts
 */
const param = (eventID: string, label: string, value: number, opts: any) => [
    "div",
    ["label.dib.w3", `${label}:`],
    [
        "input.w3",
        {
            type: "number",
            value,
            onchange: (e: any) =>
                dispatch(<Event>[eventID, parseInt(e.target.value)]),
            ...opts,
        },
    ],
];

/**
 * Composite component of image canvas & controls for adaptive threshold
 * computation. Only used/shown once an image has been loaded.
 *
 * @param state
 */
const imageEditor = ({ destImg, threshold }: AppState) => [
    "div",
    param(SET_KERNEL_WIDTH, "Width", threshold.windowSize, {
        min: 3,
        max: 29,
        step: 2,
    }),
    param(SET_KERNEL_OFFSET, "Offset", threshold.offset, {
        min: -20,
        max: 20,
        step: 1,
    }),
    [canvas, destImg],
];

/**
 * Main/root UI component, receives app state and returns hdom component tree.
 *
 * @param state
 */
const app = (state: AppState) => {
    return [
        "div",
        ["h1", "Adaptive thresholding"],
        fileChooser,
        state.destImg ? imageEditor(state) : null,
    ];
};

// subscription & transformation of app state stream. uses a RAF
// sidechain to buffer intra-frame state updates. then only passes the
// most recent one to `app()` and its resulting UI tree to the
// `updateDOM()` transducer
state
    .subscribe(sidechainPartition<AppState, number>(fromRAF()))
    .transform(map(peek), map(app), updateDOM());
