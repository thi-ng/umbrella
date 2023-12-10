import type { IntBuffer } from "@thi.ng/pixel";
import { MIME_IMAGE_COMMON } from "@thi.ng/mime/presets";
import { syncRAF } from "@thi.ng/rstream";
import { updateDOM } from "@thi.ng/transducers-hdom";
import { map } from "@thi.ng/transducers/map";
import {
	SET_IMAGE,
	SET_KERNEL_OFFSET,
	SET_KERNEL_WIDTH,
	type AppState,
	type Event,
} from "./api";
import { dispatch } from "./events";
import { state } from "./state";

/**
 * Canvas component w/ life cycle methods
 */
const canvas = <any>{
	init(el: HTMLCanvasElement, _: any, pix: IntBuffer) {
		this.el = el;
		this.render(null, pix);
	},
	render(_: any, pix: IntBuffer) {
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
			accept: MIME_IMAGE_COMMON,
			onchange: (e: any) => dispatch([SET_IMAGE, e.target.files[0]]),
		},
	],
];

/**
 * Numeric input component.
 *
 * @param eventID -
 * @param label -
 * @param value -
 * @param opts -
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
 * @param state -
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
 * @param state -
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
syncRAF(state).transform(map(app), updateDOM());
