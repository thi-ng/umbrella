import { div, inputNumber } from "@thi.ng/hiccup-html";

import { PAPER_SIZES, THEME } from "../api";
import { dropdown, title } from "./common";
import { fromView, syncRAF } from "@thi.ng/rstream";
import { DB } from "../state/atom";

export const axidrawControls = div(
	{},
	title("Plotter"),
	div(
		{ class: THEME.sideBar.section },
		dropdown(
			Object.keys(PAPER_SIZES),
			["axi", "paperSize"],
			() => {},
			"paper size"
		),
		inputNumber({
			class: THEME.sideBar.layerParam,
			min: 0,
			max: 1000,
			title: "max points per brushstroke",
			value: fromView(DB, { path: ["axi", "maxPoints"] }),
		}),
		inputNumber({
			class: THEME.sideBar.layerParam,
			min: 0,
			max: 1000,
			title: "max dist (in mm) per brushstroke",
			value: fromView(DB, { path: ["axi", "maxDist"] }),
		})
	)
);
