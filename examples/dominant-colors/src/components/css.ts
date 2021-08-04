import { div, li, textArea, ul } from "@thi.ng/hiccup-html";
import { CIRCLE_FILLED, withSize } from "@thi.ng/hiccup-carbon-icons";
import { css } from "@thi.ng/color";
import type { DominantColor } from "../api";

export const cssPalette = (colors: DominantColor[]) =>
    ul(
        ".dib.w-25.ma0.pa0.list",
        {},
        ...colors
            .map((c) => css(c.col))
            .map((c) =>
                li(
                    ".db.relative",
                    { style: { color: c, height: "2.25rem" } },
                    [
                        "i.absolute",
                        { style: { top: "-0.25rem" } },
                        [
                            "svg",
                            {
                                viewBox: "0 0 1 1",
                                width: "2rem",
                                height: "2rem",
                            },
                            ["circle", { fill: c, cx: 0.5, cy: 0.5, r: 0.5 }],
                        ],
                    ],
                    ["span.ml5", {}, c]
                )
            )
    );
