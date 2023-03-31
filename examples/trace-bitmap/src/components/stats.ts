import { div } from "@thi.ng/hiccup-html";
import { $refresh } from "@thi.ng/rdom";
import { geometryStats } from "../state/process";

/**
 * Stats overlay
 */
export const stats = $refresh(geometryStats, async ({ lines, points }) =>
	div(
		{ class: "fixed z1 bottom-0 right-0 ma3 pa2 bg-black-60 white" },
		`lines: ${lines} | points: ${points}`
	)
);
