// SPDX-License-Identifier: Apache-2.0
import { div, inputColor, inputNumber } from "@thi.ng/hiccup-html";
import { MIME_IMAGE_COMMON } from "@thi.ng/mime/presets";
import { fromView } from "@thi.ng/rstream";
import { DITHER_MODES, type DitherMode, type ImageParam } from "../api";
import { DB } from "../state/atom";
import { setCanvasBackground } from "../state/canvas";
import {
	loadImage,
	rotateImage,
	setImageDither,
	setImageParam,
} from "../state/image";
import { button, dropdown, fileButton, title } from "./common.js";

const param = (
	id: Exclude<ImageParam, "buf" | "dither">,
	min: number,
	max: number,
	step = 0.05
) =>
	inputNumber(".imgparam", {
		min,
		max,
		step,
		title: id,
		value: fromView(DB, { path: ["img", id] }),
		onchange: (e) => setImageParam(id, (<HTMLInputElement>e.target).value),
	});

export const imageControls = div(
	{},
	title("Image"),
	fileButton(
		{
			accept: [...MIME_IMAGE_COMMON, ".pbm", ".pgm", ".ppm"],
			onchange: (e) => loadImage((<HTMLInputElement>e.target).files![0]),
		},
		"large",
		"Load image"
	),
	div(
		".section",
		{},
		div(
			".control",
			{},
			button("col2", () => rotateImage(-1), "-90°", "rotate CCW"),
			button("col2", () => rotateImage(1), "+90°", "rotate CW")
		),
		param("scale", 0.1, 2),
		param("gamma", 0.1, 4),
		param("low", -1, 1),
		param("high", 0, 2),
		dropdown(
			Object.keys(DITHER_MODES),
			["img", "dither"],
			(x) => setImageDither(<DitherMode>x),
			"dither"
		),
		inputColor(".control", {
			title: "background",
			value: fromView(DB, { path: ["canvas", "bg"] }),
			oninput: (e) =>
				setCanvasBackground((<HTMLSelectElement>e.target).value),
		})
	)
);
