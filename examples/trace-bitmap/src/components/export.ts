import { div } from "@thi.ng/hiccup-html";
import {
	geometryStats,
	jsonExportTrigger,
	svgExportTrigger,
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
	smallButton(() => svgExportTrigger.next(true), "export SVG"),
	smallButton(() => jsonExportTrigger.next(true), "export JSON")
);
