import { buttonH, DEFAULT_THEME, defGUI, Key, sliderH } from "@thi.ng/imgui";
import { gridLayout } from "@thi.ng/layout";
import { $canvas } from "@thi.ng/rdom-canvas";
import { fromDOMEvent, fromRAF, reactive, tweenNumber } from "@thi.ng/rstream";
import { gestureStream } from "@thi.ng/rstream-gestures";

// GUI initialization
const gui = defGUI({
	theme: {
		...DEFAULT_THEME,
		font: "16px 'IBM Plex Mono', monospace",
		baseLine: 6,
		focus: "#000",
	},
});

// canvas component initialization, creates/attaches event listeners
// and feeds relevant details to the GUI instance
const initGUI = (el: HTMLCanvasElement) => {
	// unified mouse & touch event handling
	gestureStream(el).subscribe({
		next(e) {
			gui.setMouse(e.pos, e.buttons);
		},
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
};

const updateGUI = () => {
	let res: any;
	// create grid layout using https://thi.ng/layout
	// position grid centered in window
	const rowHeight = 32;
	const gap = 4;
	const grid = gridLayout(
		// start X position
		16,
		// start Y position (centered)
		(window.innerHeight - (2 * rowHeight + gap)) / 2,
		// layout width
		window.innerWidth - 32,
		// single column
		1,
		rowHeight,
		gap
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

	return gui;
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
	for (let i = PRESETS.length; i-- > 0; ) {
		if (x >= PRESETS[i][1]) return `${Math.round(x)} (${PRESETS[i][0]})`;
	}
	return "";
});

// reactive window size (canvas will subscribe to it)
// the `init` option is needed to ensure the stream is properly seeded
const windowSize = fromDOMEvent(window, "resize", false, {
	init: <any>{},
}).map(() => [window.innerWidth, window.innerHeight]);

// canvas component
$canvas(fromRAF().map(updateGUI), windowSize, {
	// execute above init handler when canvas has been mounted
	onmount: initGUI,
	style: {
		background: gui.theme.globalBg,
		// update cursor value each frame
		cursor: fromRAF().map(() => gui.cursor),
	},
	...gui.attribs,
}).mount(document.getElementById("app")!);
