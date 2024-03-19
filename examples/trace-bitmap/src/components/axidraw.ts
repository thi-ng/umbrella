import { div, inputNumber } from "@thi.ng/hiccup-html";
import { fromView } from "@thi.ng/rstream";
import { PAPER_SIZES } from "../api";
import { DB } from "../state/atom";
import { dropdown, title } from "./common";

export const axidrawControls = div(
	{},
	title("Plotter"),
	div(
		".section",
		{},
		dropdown(
			Object.keys(PAPER_SIZES),
			["axi", "paperSize"],
			() => {},
			"paper size"
		),
		inputNumber(".layerparam", {
			min: 0,
			max: 1000,
			title: "max points per brushstroke",
			value: fromView(DB, { path: ["axi", "maxPoints"] }),
		}),
		inputNumber(".layerparam", {
			min: 0,
			max: 1000,
			title: "max dist (in mm) per brushstroke",
			value: fromView(DB, { path: ["axi", "maxDist"] }),
		})
	)
);
