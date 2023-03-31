import { exposeGlobal } from "@thi.ng/expose";
import { button, div, inputColor } from "@thi.ng/hiccup-html";
import { $compile, $list } from "@thi.ng/rdom";
import { $canvas } from "@thi.ng/rdom-canvas";
import { staticDropdown } from "@thi.ng/rdom-components";
import { fromView } from "@thi.ng/rstream";
import { DITHER_MODES, type DitherMode } from "./api";
import { fileButton } from "./components/button";
import { imageParam } from "./components/image";
import { layerControlsForID } from "./components/layer";
import { stats } from "./components/stats";
import { DB } from "./state";
import {
	initGestures,
	resizeCanvas,
	setCanvasBackground,
} from "./state/canvas";
import { setImageDither } from "./state/image";
import { addLayer } from "./state/layers";
import { canvasState, imageSrc, layerOrder, scene } from "./state/process";

// setLogger(new ConsoleLogger("rs"));

//////////////////////////////// IMPORTANT! ////////////////////////////////////
// Please ensure you read the detailed comments in /src/state.ts and
// /src/state/*.ts to understand how the different parts of this app are fitting
// together! This file here only sets up the toplevel UI.
////////////////////////////////////////////////////////////////////////////////

$compile(
	div(
		{ class: "vh-100 flex f7" },
		div(
			{
				class: "w5 bg-light-gray vh-100 overflow-y-scroll",
			},
			div(
				{},
				fileButton(
					{
						accept: ["image/jpeg", "image/png", "image/webp"],
						onchange: (e) =>
							imageSrc.next(
								(<HTMLInputElement>e.target).files![0]
							),
					},
					"Load image"
				),
				div(
					{ class: "bg-gray white bb b--dark-gray pa2" },
					imageParam("scale", 0.1, 2),
					imageParam("gamma", 0.1, 4),
					imageParam("low", -1, 1),
					imageParam("high", 0, 2),
					staticDropdown(
						Object.keys(DITHER_MODES),
						fromView(DB, { path: ["img", "dither"] }),
						{
							attribs: {
								class: "w-100 mb1",
								onchange: (e) =>
									setImageDither(
										<DitherMode>(
											(<HTMLSelectElement>e.target).value
										)
									),
							},
						}
					),
					inputColor({
						class: "w-100",
						value: fromView(DB, { path: ["canvas", "bg"] }),
						onchange: (e) =>
							setCanvasBackground(
								(<HTMLSelectElement>e.target).value
							),
					})
				),
				button(
					{
						class: "dib h2 w-100 bn bg-dark-gray white",
						onclick: () => addLayer(),
					},
					"+ add layer"
				)
			),
			$list(layerOrder, "div", {}, layerControlsForID)
		),
		div(
			".dib",
			{},
			$canvas(
				scene,
				canvasState.map((x) => x.size),
				{ id: "viz", onmount: initGestures }
			)
		),
		stats
	)
).mount(document.getElementById("app")!);

window.addEventListener("resize", resizeCanvas);

// Only for dev builds:
// Expose DB as global var to be able to inspect via console
exposeGlobal("DB", DB);
