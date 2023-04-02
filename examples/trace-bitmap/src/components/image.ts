import { div, inputColor, inputNumber } from "@thi.ng/hiccup-html";
import { staticDropdown } from "@thi.ng/rdom-components";
import { fromView } from "@thi.ng/rstream";
import { DITHER_MODES, THEME, type DitherMode, type ImageParam } from "../api";
import { DB } from "../state/atom";
import { setCanvasBackground } from "../state/canvas";
import { setImageDither, setImageParam } from "../state/image";
import { loadImage } from "../state/process";
import { fileButton } from "./button";

const param = (
	id: Exclude<ImageParam, "buf" | "dither">,
	min: number,
	max: number,
	step = 0.05
) =>
	inputNumber({
		class: THEME.sideBar.imageParam,
		min,
		max,
		step,
		placeholder: id,
		value: fromView(DB, { path: ["img", id] }),
		onchange: (e) => setImageParam(id, (<HTMLInputElement>e.target).value),
	});

export const imageControls = div(
	{},
	fileButton(
		{
			accept: ["image/jpeg", "image/png", "image/webp"],
			onchange: (e) => loadImage((<HTMLInputElement>e.target).files![0]),
		},
		THEME.fileButton.large,
		"Load image"
	),
	div(
		{ class: THEME.sideBar.section },
		param("scale", 0.1, 2),
		param("gamma", 0.1, 4),
		param("low", -1, 1),
		param("high", 0, 2),
		staticDropdown(
			Object.keys(DITHER_MODES),
			fromView(DB, { path: ["img", "dither"] }),
			{
				attribs: {
					class: THEME.sideBar.control,
					onchange: (e) =>
						setImageDither(
							<DitherMode>(<HTMLSelectElement>e.target).value
						),
				},
			}
		),
		inputColor({
			class: THEME.sideBar.control + " pa0",
			value: fromView(DB, { path: ["canvas", "bg"] }),
			oninput: (e) =>
				setCanvasBackground((<HTMLSelectElement>e.target).value),
		})
	)
);
