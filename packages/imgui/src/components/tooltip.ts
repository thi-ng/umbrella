import { rect } from "@thi.ng/geom/rect";
import { add2 } from "@thi.ng/vectors/add";
import type { IMGUI } from "../gui.js";
import { textLabelRaw } from "./textlabel.js";

export const tooltipRaw = (gui: IMGUI, tooltip: string) => {
    const theme = gui.theme;
    const p = add2(null, [0, 10], gui.mouse);
    gui.addOverlay(
        rect(p, [tooltip.length * theme.charWidth + theme.pad, 20], {
            fill: theme.bgTooltip,
        }),
        textLabelRaw(
            add2(null, [4, 10 + theme.baseLine], p),
            theme.textTooltip,
            tooltip
        )
    );
};
