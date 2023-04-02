import { button, div } from "@thi.ng/hiccup-html";
import { sync, trigger } from "@thi.ng/rstream";
import { THEME } from "../api";
import {
	exportJsonTrigger,
	exportSvgTrigger,
	geometryStats,
} from "../state/process";

export const exportControls = div(
	{
		class: sync({
			src: { stats: geometryStats, _: trigger() },
			mergeOnly: true,
		}).map(({ stats }) => (stats?.lines || stats?.points ? "" : "dn")),
	},
	button(
		{
			class: THEME.button.small,
			onclick: () => exportSvgTrigger.next(true),
		},
		"export SVG"
	),
	button(
		{
			class: THEME.button.small,
			onclick: () => exportJsonTrigger.next(true),
		},
		"export JSON"
	)
);
