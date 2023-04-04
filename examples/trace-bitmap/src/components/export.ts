import { div } from "@thi.ng/hiccup-html";
import {
	exportJsonTrigger,
	exportSvgTrigger,
	geometryStats,
} from "../state/process";
import { smallButton } from "./form";

export const exportControls = div(
	{
		class: geometryStats.map(
			(stats) => (stats?.lines || stats?.points ? "" : "dn"),
			{ id: "exportCtrl" }
		),
	},
	smallButton(() => exportSvgTrigger.next(true), "export SVG"),
	smallButton(() => exportJsonTrigger.next(true), "export JSON")
);
