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
import {
	DB,
	addLayer,
	imageSrc,
	layerOrder,
	scene,
	setBgColor,
	setImageDither,
} from "./state";

// setLogger(new ConsoleLogger("rs"));

//////////////////////////////// IMPORTANT! ////////////////////////////////////
// Please ensure you read comments in /src/state.ts to understand how the
// different parts of this app are fitting together! This file here only sets up
// the toplevel UI.
////////////////////////////////////////////////////////////////////////////////

$compile(
	div(
		{ class: "w-100 vh-100 flex overflow-y-hidden" },
		div(
			{
				class: "dib bg-washed-red vh-100 f7",
				style: { width: "16rem" },
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
						value: fromView(DB, { path: ["bg"] }),
						onchange: (e) =>
							setBgColor((<HTMLSelectElement>e.target).value),
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
		div(".dib", {}, $canvas(scene, [1000, 1000]))
	)
).mount(document.getElementById("app")!);

// Only for dev builds:
// Expose DB as global var to be able to inspect via console
exposeGlobal("DB", DB);
