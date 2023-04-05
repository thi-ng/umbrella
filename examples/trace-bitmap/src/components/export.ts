import { div } from "@thi.ng/hiccup-html";
import {
	exportJsonTrigger,
	exportSvgTrigger,
	geometryStats,
} from "../state/process";
import { smallButton, title } from "./common";

export const exportControls = div(
	{
		class: geometryStats.map(
			(stats) => (stats?.lines || stats?.points ? "" : "dn"),
			{ id: "exportCtrl" }
		),
	},
	title("Export"),
	smallButton(() => exportSvgTrigger.next(true), "export SVG"),
	smallButton(() => exportJsonTrigger.next(true), "export JSON")
);
