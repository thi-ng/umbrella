import type { ReadonlyColor } from "@thi.ng/color";
import { dotsH } from "@thi.ng/color/swatches";
import { svg } from "@thi.ng/hiccup-svg/svg";

export const svgSwatches = (colors: ReadonlyColor[], size: number) =>
    svg(
        {
            width: colors.length * (size * 2 + 2),
            height: size * 2,
            convert: true,
        },
        dotsH(colors, size - 1, 2, {
            translate: [size, size],
        })
    );
