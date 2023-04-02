import { div } from "@thi.ng/hiccup-html";
import { $refresh } from "@thi.ng/rdom";
import { geometryStats, imageProcessor } from "../state/process";

/**
 * Stats overlay
 */
export const stats = div(
	{ class: "fixed z1 bottom-0 right-0 ma3 pa2 bg-black-60 white" },
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
			async ({ lines, points }) => `lines: ${lines} | points: ${points}`
		)
	)
);
