import { div } from "@thi.ng/hiccup-html";
import { sync, trigger } from "@thi.ng/rstream";
import {
	exportJsonTrigger,
	exportSvgTrigger,
	geometryStats,
} from "../state/process";
import { smallButton } from "./form";

export const exportControls = div(
	{
		class: sync({
			src: { stats: geometryStats, _: trigger() },
			mergeOnly: true,
		}).map(({ stats }) => (stats?.lines || stats?.points ? "" : "dn")),
	},
	smallButton(() => exportSvgTrigger.next(true), "export SVG"),
	smallButton(() => exportJsonTrigger.next(true), "export JSON")
);
