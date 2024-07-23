import { css, dotsH, type ReadonlyColor } from "@thi.ng/color";
import { div } from "@thi.ng/hiccup-html";
import { svg } from "@thi.ng/hiccup-svg";
import type { DominantColor } from "../api.js";

export const svgSwatches = (colors: ReadonlyColor[], size: number) =>
	svg(
		{
			width: colors.length * (size * 2 + 2),
			height: size * 2,
			__convert: true,
		},
		dotsH(colors, size - 1, 2, {
			translate: [size, size],
		})
	);

export const swatchMarkers = (colors: DominantColor[]) =>
	colors.map((col) =>
		div(".absolute.w1.h1.br-100.bw1.b--solid.b--black", {
			style: {
				left: `${col.pos[0] - 8}px`,
				top: `${col.pos[1] - 8}px`,
				background: css(col.col),
			},
		})
	);
