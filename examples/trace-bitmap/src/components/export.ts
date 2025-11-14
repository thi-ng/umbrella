// SPDX-License-Identifier: Apache-2.0
import { div } from "@thi.ng/hiccup-html";
import {
	geometryStats,
	jsonExportTrigger,
	svgExportTrigger,
} from "../state/process.js";
import { smallButton, title } from "./common.js";

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
