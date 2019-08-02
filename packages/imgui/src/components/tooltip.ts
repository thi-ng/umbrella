import { rect } from "@thi.ng/geom";
import { add2 } from "@thi.ng/vectors";
import { IMGUI } from "../gui";
import { textLabel } from "./text-label";

export const tooltip = (gui: IMGUI, tooltip: string) => {
    const theme = gui.theme;
    const p = add2(null, [0, 10], gui.mouse);
    gui.addOverlay(
        rect(p, [tooltip.length * 9, 20], { fill: theme.bgTooltip }),
        textLabel(add2(null, [4, 14], p), theme.textTooltip, tooltip)
    );
};
