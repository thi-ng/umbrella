import { div } from "@thi.ng/hiccup-html";
import { sync, trigger } from "@thi.ng/rstream";
import { map } from "@thi.ng/transducers";
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
			xform: map(({ stats }) =>
				stats?.lines || stats?.points ? "" : "dn"
			),
			mergeOnly: true,
			id: "exportCtrl",
		}),
	},
	smallButton(() => exportSvgTrigger.next(true), "export SVG"),
	smallButton(() => exportJsonTrigger.next(true), "export JSON")
);
