import { pointInside, rect } from "@thi.ng/geom";
import { Key, MouseButton } from "../api";
import { IMGUI } from "../gui";
import { textLabel } from "./textlabel";
import { tooltip } from "./tooltip";

export const button = (
    gui: IMGUI,
    id: string,
    x: number,
    y: number,
    w: number,
    h: number,
    label?: string,
    info?: string
) => {
    const theme = gui.theme;
    const box = rect([x, y], [w, h]);
    const hover = pointInside(box, gui.mouse);
    if (hover) {
        gui.hotID = id;
        if (gui.activeID === "" && gui.buttons & MouseButton.LEFT) {
            gui.activeID = id;
        }
        info && tooltip(gui, info);
    }
    const focused = gui.requestFocus(id);
    box.attribs = {
        fill: hover ? gui.fgColor(true) : gui.bgColor(focused),
        stroke: gui.focusColor(id)
    };
    gui.add(box);
    label &&
        gui.add(
            textLabel(
                [x + theme.pad, y + h / 2 + theme.baseLine],
                gui.textColor(hover),
                label
            )
        );
    if (focused) {
        switch (gui.key) {
            case Key.TAB:
                gui.switchFocus();
                break;
            case Key.ENTER:
            case Key.SPACE:
                return true;
            default:
        }
    }
    gui.lastID = id;
    // only emit true on mouse release over this button
    return !gui.buttons && gui.hotID == id && gui.activeID == id;
};
