import { div } from "@thi.ng/hiccup-html";
import { $refresh } from "@thi.ng/rdom";
import { THEME } from "../api";
import { geometryStats, imageProcessor } from "../state/process";

/**
 * Stats overlay
 */
export const stats = div(
	{ class: THEME.overlays.stats },
	div(
		{},
		$refresh(
			imageProcessor,
			async ({ size: [width, height] }) =>
				`image: ${width} x ${height} px`
		)
	),
	div(
		{},
		$refresh(
			geometryStats,
			async ({ lines, points }) => `lines: ${lines}, points: ${points}`
		)
	)
);
