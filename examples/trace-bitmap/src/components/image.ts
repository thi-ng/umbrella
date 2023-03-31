import { inputNumber } from "@thi.ng/hiccup-html";
import { fromView } from "@thi.ng/rstream";
import type { ImageParam } from "../api";
import { DB } from "../state";
import { setImageParam } from "../state/image";

export const imageParam = (
	id: Exclude<ImageParam, "buf" | "dither">,
	min: number,
	max: number,
	step = 0.05
) =>
	inputNumber({
		class: "dib w-25 mb1",
		min,
		max,
		step,
		placeholder: id,
		value: fromView(DB, { path: ["img", id] }),
		onchange: (e) => setImageParam(id, (<HTMLInputElement>e.target).value),
	});
