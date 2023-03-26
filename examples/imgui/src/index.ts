import { Atom, History } from "@thi.ng/atom";
import { timedResult } from "@thi.ng/bench";
import { line, normalizedPath, pathFromSvg } from "@thi.ng/geom";
import { canvas } from "@thi.ng/hdom-canvas";
import { DOWNLOAD, RESTART } from "@thi.ng/hiccup-carbon-icons";
import {
	DEFAULT_THEME,
	IMGUI,
	Key,
	NONE,
	buttonH,
	buttonV,
	dialGroup,
	dropdown,
	iconButton,
	radialMenu,
	radio,
	ring,
	ringGroup,
	sliderH,
	sliderHGroup,
	sliderVGroup,
	textField,
	textLabel,
	textLabelRaw,
	toggle,
	xyPad,
	type GUITheme,
} from "@thi.ng/imgui";
import { GridLayout, gridLayout, layoutBox } from "@thi.ng/layout";
import { PI, clamp } from "@thi.ng/math";
import { setInManyUnsafe } from "@thi.ng/paths";
import {
	fromAtom,
	fromDOMEvent,
	merge,
	sidechainPartitionRAF,
	sync,
} from "@thi.ng/rstream";
import { gestureStream } from "@thi.ng/rstream-gestures";
import { float } from "@thi.ng/strings";
import { comp, iterator, map, mapcat, step } from "@thi.ng/transducers";
import { updateDOM } from "@thi.ng/transducers-hdom";
import { sma } from "@thi.ng/transducers-stats";
import {
	ZERO2,
	add2,
	hash,
	min2,
	setC2,
	vecOf,
	type Vec,
} from "@thi.ng/vectors";

// define theme colors in RGBA format for future compatibility with
// WebGL backend
const THEMES: Partial<GUITheme>[] = [
	DEFAULT_THEME,
	{
		globalBg: "#ccc",
		focus: [1, 0.66, 0, 1],
		cursor: [0, 0, 0, 1],
		bg: [1, 1, 1, 0.66],
		bgDisabled: [1, 1, 1, 0.33],
		bgHover: [1, 1, 1, 0.9],
		fg: [0.8, 0, 0.8, 1],
		fgDisabled: [0.8, 0, 0.8, 0.5],
		fgHover: [1, 0, 1, 1],
		text: [0.3, 0.3, 0.3, 1],
		textDisabled: [0.3, 0.3, 0.3, 0.5],
		textHover: [0.2, 0.2, 0.4, 1],
		bgTooltip: [1, 1, 0.8, 0.85],
		textTooltip: [0, 0, 0, 1],
	},
];

// float value formatters
const F1 = float(1);
const F2 = float(2);

// UI constants
const FONT = "10px 'IBM Plex Mono'";
const RADIO_LABELS = ["Yes", "No", "Maybe"];
const RGB_LABELS = ["R", "G", "B"];
const RGB_TOOLTIPS = ["Red", "Green", "Blue"];
const RADIAL_LABELS = ["Buttons", "Slider", "Dials", "Dropdown", "Text"];
const THEME_IDS = ["Default", "Raspberry"];

// helper function to normalize hiccup icon paths
// (transforms each path into one only consisting of cubic spline segments)
const mkIcon = (icon: any[]) => [
	"g",
	{ stroke: "none", scale: 16 / 32 },
	...iterator(
		comp(
			mapcat((p) => pathFromSvg(p[1].d)),
			map(normalizedPath)
		),
		icon.slice(2)
	),
];

// icon definitions (from @thi.ng/hiccup-carbon-icons)
const ICON1 = mkIcon(DOWNLOAD);
const ICON2 = mkIcon(RESTART);

interface AppState {
	uiVisible: boolean;
	uiMode: number;
	theme: number;
	radius: number;
	gridW: number;
	rgb: number[];
	pos: Vec;
	txt: string;
	toggles: boolean[];
	flags: boolean[];
	radio: number;
}

// main immutable app state wrapper (with time travel)
const DB = new History(
	new Atom<AppState>({
		uiVisible: true,
		uiMode: 0,
		theme: 0,
		radius: 10,
		gridW: 15,
		rgb: [0.9, 0.45, 0.5],
		pos: <Vec>[400, 140],
		txt: "Hello there! This is a test, do not panic!",
		toggles: new Array<boolean>(12).fill(false),
		flags: [true, false],
		radio: 0,
	}),
	// max. 500 undo steps
	500
);

// theme merging helper
const themeForID = (theme: number): Partial<GUITheme> => ({
	...THEMES[theme % THEMES.length],
	font: FONT,
	cursorBlink: 0,
});

// state update handler for `rgb` value
// if Alt key is pressed when this handler executes,
// then all values will be set uniformly...
const setRGB = (gui: IMGUI, res: number[]) =>
	res !== undefined &&
	(gui.isAltDown()
		? DB.resetIn(["rgb"], vecOf(3, res[1]))
		: DB.resetIn(["rgb", res[0]], res[1]));

// main application
const app = () => {
	let maxW = 240;
	let size = [window.innerWidth, window.innerHeight];
	let radialPos = [0, 0];
	let radialActive = false;

	// GUI instance
	const gui = new IMGUI({ theme: themeForID(DB.deref().theme) });

	// GUI benchmark (moving average) transducer
	const bench = step(sma(50));

	// augment hdom-canvas component with init lifecycle method to
	// attach event streams once canvas has been mounted
	const _canvas = {
		...canvas,
		init(canv: HTMLCanvasElement) {
			// add event streams to main stream combinator
			// in order to trigger GUI updates...
			main.add(
				// merge all event streams into a single input to `main`
				// (we don't actually care about their actual values and merely
				// use them as mechanism to trigger updates)
				merge<any, any>({
					src: [
						// mouse & touch events
						gestureStream(canv, {}).subscribe({
							next(e) {
								gui.setMouse(e.pos, e.buttons);
							},
						}),
						// keydown & undo/redo handler:
						// Ctrl/Command + Z = undo
						// Shift + Ctrl/Command + Z = redo
						fromDOMEvent(window, "keydown").subscribe({
							next(e) {
								if (e.key === Key.TAB) {
									e.preventDefault();
								}
								if (
									(e.metaKey || e.ctrlKey) &&
									e.key.toLowerCase() === "z"
								) {
									e.shiftKey ? DB.redo() : DB.undo();
								} else {
									gui.setKey(e);
								}
							},
						}),
						fromDOMEvent(window, "keyup").subscribe({
							next(e) {
								gui.setKey(e);
							},
						}),
						fromDOMEvent(window, "resize").subscribe({
							next() {
								maxW = Math.min(maxW, window.innerWidth - 16);
								setC2(
									size,
									window.innerWidth,
									window.innerHeight
								);
								DB.swapIn(["pos"], (pos: Vec) =>
									min2([], pos, size)
								);
							},
						}),
					],
				})
			);
		},
	};

	// main GUI update function
	const updateGUI = (draw: boolean) => {
		// obtain atom value
		const state = DB.deref();
		// setup initial layout (single column)
		const grid = gridLayout(10, 10, maxW - 20, 1, 16, 4);

		gui.setTheme(themeForID(state.theme));

		// start frame
		gui.begin(draw);

		// disable all GUI components if radial menu is active
		gui.beginDisabled(radialActive);

		// button components return true if clicked
		if (
			buttonH(gui, grid, "show", state.uiVisible ? "Hide UI" : "Show UI")
		) {
			DB.resetIn(["uiVisible"], !state.uiVisible);
		}
		if (state.uiVisible) {
			let inner: GridLayout;
			let inner2: GridLayout;
			let res: any;
			// prettier-ignore
			switch(state.uiMode) {
                case 0:
                    // create empty row
                    grid.next();

                    // create 2-column layout in next row
                    inner = grid.nest(2);
                    // no actions for these buttons (demo only)
                    iconButton(gui, inner, "icon", ICON1, 14, 16, "Download", "Icon button");
                    iconButton(gui, inner, "icon2", ICON2, 13, 16, "Restart", "Icon button");

                    grid.next();
                    // text labels on their own never are non-interactive
                    textLabel(gui, grid, "Toggles:");

                    // create 8 column layout
                    inner = grid.nest(8);
                    // vertical button in 1st column and spanning 3 rows
                    if (buttonV(gui, inner, "toggleAll", 3, "INVERT")) {
                        DB.swapIn(["toggles"], (toggles: boolean[]) => toggles.map((x) => !x));
                    }

                    // create nested 4 column layout using remaining 7 columns of current layout
                    inner2 = inner.nest(4, [7, 1]);
                    // create toggle button for each array item
                    for(let i = 0; i < state.toggles.length; i++) {
                        if ((res = toggle(gui, inner2, `toggle${i}`, state.toggles[i], false, `${i}`)) !== undefined) {
                            DB.resetIn(["toggles", i], res);
                        }
                    }

                    inner = grid.nest(2);
                    // temporarily use different theme by pushing on stack
                    gui.beginTheme(themeForID(state.theme + 1));
                    if ((res = toggle(gui, inner, "opt1", state.flags[0], false, state.flags[0] ? "ON" : "OFF", "Unused")) !== undefined) {
                        DB.resetIn(["flags", 0], res);
                    }
                    if ((res = toggle(gui, inner, "opt2", state.flags[1], false, state.flags[1] ? "ON" : "OFF", "Unused")) !== undefined) {
                        DB.resetIn(["flags", 1], res);
                    }
                    // restore theme
                    gui.endTheme();

                    grid.next();
                    // these next radio buttons are always disabled
                    gui.beginDisabled();
                    textLabel(gui, grid, "Radio (horizontal):");
                    radio(gui, grid, "radio1", true, state.radio, false, RADIO_LABELS);
                    gui.endDisabled();

                    grid.next();
                    // alternative theme override for all components created by given function
                    if ((res = gui.withTheme(themeForID(state.theme + 1), () => radio(gui, grid, "radio2", true, state.radio, true, RADIO_LABELS))) !== undefined) {
                        DB.resetIn(["radio"], res);
                    }

                    grid.next();
                    textLabel(gui, grid, "Radio (vertical):");
                    if ((res = radio(gui, grid, "radio3", false, state.radio, false, RADIO_LABELS)) !== undefined) {
                        DB.resetIn(["radio"], res);
                    }
                    grid.next();
                    if ((res = radio(gui, grid, "radio4", false, state.radio, true, RADIO_LABELS)) !== undefined) {
                        DB.resetIn(["radio"], res);
                    }
                    break;

                case 1:
                    grid.next();
                    textLabel(gui, grid, "Sliders:");

                    inner = grid.nest(2);
                    if ((res = sliderH(gui, inner, "grid", 1, 20, 1, state.gridW, "Grid", undefined, "Grid size")) !== undefined) {
                        DB.resetIn(["gridW"], res);
                    }
                    if ((res = sliderH(gui, inner, "rad", 2, 20, 1, state.radius, "Radius", undefined, "Dot radius")) !== undefined) {
                        DB.resetIn(["radius"], res);
                    }

                    textLabel(gui, grid, "Slider groups:");
                    textLabel(gui, grid, "(Alt + drag to adjust all):");

                    inner = grid.nest(4);
                    res = sliderVGroup(gui, inner, "col2", 0, 1, 0.05, state.rgb, 5, RGB_LABELS, F2, RGB_TOOLTIPS);
                    res = sliderVGroup(gui, inner, "col3", 0, 1, 0.05, state.rgb, 5, RGB_LABELS, F2, RGB_TOOLTIPS) || res;
                    res = sliderHGroup(gui, inner.nest(1, [2, 1]), "col", 0, 1, 0.05, false, state.rgb, RGB_LABELS, F2, RGB_TOOLTIPS) || res;
                    setRGB(gui, res);

                    textLabel(gui, grid, "2D controller:");

                    inner = grid.nest(4);
                    res = xyPad(gui, inner, "xy1", ZERO2, size, 10, state.pos, 3, false, undefined, undefined, "Origin");
                    res = xyPad(gui, inner, "xy2", ZERO2, size, 10, state.pos, 4, false, undefined, undefined, "Origin") || res;
                    res = xyPad(gui, inner, "xy3", ZERO2, size, 10, state.pos, -1, false, undefined, undefined, "Origin") || res;
                    res = xyPad(gui, inner, "xy4", ZERO2, size, 10, state.pos, -2, false, undefined, undefined, "Origin") || res;
                    res !== undefined && DB.resetIn(["pos"], res);
                    break;

                case 2:
                    grid.next();
                    textLabel(gui, grid, "Dials:");

                    inner = grid.nest(6);
                    res = dialGroup(gui, inner, "dials1", 0, 1, 0.05, true, state.rgb, [], F1, RGB_TOOLTIPS);
                    res = dialGroup(gui, inner, "dials2", 0, 1, 0.05, true, state.rgb, [], F1, RGB_TOOLTIPS) || res;
                    setRGB(gui, res);

                    inner = grid.nest(6);
                    if ((res = ring(gui, inner, "small", 0, 1, 0.05, state.rgb[0], PI, 0.5, "R", F2, "Red")) !== undefined) {
                        DB.resetIn(["rgb", 0], res);
                    }
                    if ((res = ring(gui, inner.nest(1, [2, 2]), "medium", 0, 1, 0.05, state.rgb[1], PI, 0.5, "G", F2, "Green")) !== undefined) {
                        DB.resetIn(["rgb", 1], res);
                    }
                    if ((res = ring(gui, inner.nest(1, [3, 3]), "large", 0, 1, 0.05, state.rgb[2], PI, 0.5, "B", F2, "Blue")) !== undefined) {
                        DB.resetIn(["rgb", 2], res);
                    }

                    inner = grid.nest(3);
                    res = ringGroup(gui,inner,"rings1", 0, 1, 0.05, true, PI * 0.75, 0.5, state.rgb, RGB_LABELS, F2, RGB_TOOLTIPS);
                    res = ringGroup(gui,inner,"rings2", 0, 1, 0.05, true, PI * 0.5, 0.75, state.rgb, RGB_LABELS, F2, RGB_TOOLTIPS) || res;
                    res = ringGroup(gui,inner,"rings3", 0, 1, 0.05, true, PI * 0.25, 0.9, state.rgb, RGB_LABELS, F2, RGB_TOOLTIPS) || res;
                    setRGB(gui, res);
                    break;

                case 3:
                    grid.next();
                    textLabel(gui, grid, "Select theme:");
                    if ((res = dropdown(gui, grid, "theme", state.theme, THEME_IDS, "GUI theme")) !== undefined) {
                        DB.resetIn(["theme"], res);
                    }
                    const box = layoutBox(10, 150, 150, 120, 200, 24, 0);
                    if ((res = dropdown(gui, box, "theme2", state.theme, THEME_IDS, "GUI theme")) !== undefined) {
                        DB.resetIn(["theme"], res);
                    }
                    break;

                case 4:
                    grid.next();
                    textLabel(gui, grid, "Editable textfield:");
                    if ((res = textField(gui, grid, "txt", state.txt, undefined, "Type something...")) !== undefined) {
                        DB.resetIn(["txt"], res);
                    }
                    break;

                default:
            }
		}
		// remove disabled flag from stack
		gui.endDisabled();

		// radial menu
		if (gui.isControlDown()) {
			if (!radialActive) {
				radialPos = [...gui.mouse];
			}
			// menu backdrop
			gui.add(
				gui.resource("radial", hash(radialPos) + 1, () => [
					"g",
					{},
					[
						"radialGradient",
						{
							id: "shadow",
							from: radialPos,
							to: radialPos,
							r1: 5,
							r2: 300,
						},
						[
							[0, [1, 1, 1, 0.8]],
							[0.5, [1, 1, 1, 0.66]],
							[1, [1, 1, 1, 0]],
						],
					],
					["circle", { fill: "$shadow" }, radialPos, 300],
				])
			);
			let res: number | undefined;
			if (
				(res = radialMenu(
					gui,
					"radial",
					radialPos[0],
					radialPos[1],
					100,
					RADIAL_LABELS,
					[]
				)) !== undefined
			) {
				DB.swap((db) =>
					setInManyUnsafe(db, ["uiMode"], res, ["uiVisible"], true)
				);
			}
			gui.add(
				textLabelRaw(
					add2([], radialPos, [0, 120]),
					{ fill: "#000", align: "center" },
					"Use cursor keys to navigate"
				),
				textLabelRaw(
					add2([], radialPos, [0, 134]),
					{ fill: "#000", align: "center" },
					"Click or Enter to switch UI"
				)
			);
			if (!radialActive) {
				gui.focusID = gui.hotID;
			}
			radialActive = true;
		} else {
			radialActive = false;
		}
		// resize
		const [w, h] = size;
		if (
			gui.activeID === NONE &&
			gui.isMouseDown() &&
			Math.abs(gui.mouse[0] - maxW) < 80
		) {
			maxW = clamp(gui.mouse[0], 240, w - 16);
		}

		const { key, hotID, activeID, focusID, lastID } = gui;
		const statLayout = gridLayout(10, h - 10 - 3 * 14, w, 1, 14, 0);
		textLabel(gui, statLayout, `Key: ${key}`);
		textLabel(gui, statLayout, `Focus: ${focusID} / ${lastID}`);
		textLabel(
			gui,
			statLayout,
			`IDs: ${hotID || "none"} / ${activeID || "none"}`
		);

		gui.end();
	};

	// main component function
	return () => {
		const width = window.innerWidth;
		const height = window.innerHeight;

		// this is only needed because we're NOT using a RAF update loop:
		// call updateGUI twice to compensate for lack of regular 60fps update
		// Note: Unless your GUI is super complex, this cost is pretty neglible
		// and no actual drawing takes place here ...

		// the `timedResult` function measures execution time and returns tuple
		// of [result, time]. We then pass the time taken to our SMA transducer
		// to update and return a moving average.
		const t = <number>bench(
			timedResult(() => {
				updateGUI(false);
				updateGUI(true);
			})[1]
		);
		// since the MA will only be available after the configured period,
		// we will only display stats when they're ready...
		t != null &&
			gui.add(
				textLabelRaw(
					[10, height - 10 - 4 * 14],
					"#ff0",
					`GUI time: ${F2(t)}ms`
				)
			);
		// return hdom-canvas component with embedded GUI
		return [
			_canvas,
			{
				width,
				height,
				style: { background: gui.theme.globalBg, cursor: gui.cursor },
				oncontextmenu: (e: Event) => e.preventDefault(),
				...gui.attribs,
			},
			// GUI resize border line
			line([maxW, 0], [maxW, height], { stroke: "#000" }),
			[
				"text",
				{
					transform: [0, -1, 1, 0, maxW + 12, height / 2],
					fill: "#000",
					font: FONT,
					align: "center",
				},
				[0, 0],
				"DRAG TO RESIZE",
			],
			// IMGUI implements IToHiccup interface so just supply as is
			gui,
		];
	};
};

// main stream combinator
// the trigger() input is merely used to kick off the system
// once the 1st frame renders, the canvas component will create and attach
// event streams to this stream sync, which are then used to trigger future
// updates on demand...
const main = sync({
	src: {
		state: fromAtom(DB),
	},
});

// subscription & transformation of app state stream. uses a RAF
// sidechain to buffer intra-frame state updates. then only passes the
// most recent one to `app()` and its resulting UI tree to the
// `updateDOM()` transducer
sidechainPartitionRAF(main).transform(map(app()), updateDOM());
