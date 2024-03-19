import { div } from "@thi.ng/hiccup-html";
import { $replace } from "@thi.ng/rdom";
import { geometryStats, imageProcessor } from "../state/process";

/**
 * Stats overlay
 */
export const stats = div(
	"#stats",
	{},
	div(
		{},
		$replace(
			imageProcessor.map(
				({ size: [width, height] }) => `image: ${width} x ${height} px`,
				{ id: "statsImg" }
			)
		)
	),
	div(
		{},
		geometryStats.map(
			({ lines, points }) => `lines: ${lines}, points: ${points}`,
			{ id: "statsGeo" }
		)
	)
);
