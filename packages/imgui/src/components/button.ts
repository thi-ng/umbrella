import { pointInside, rect } from "@thi.ng/geom";
import { Key, MouseButton } from "../api";
import { IMGUI } from "../gui";
import { textLabel } from "./text-label";
import { tooltip } from "./tooltip";

export const button = (
    gui: IMGUI,
    id: string,
    x: number,
    y: number,
    w: number,
    h: number,
    label: string,
    info?: string
) => {
    const r = rect([x, y], [w, h]);
    const inside = pointInside(r, gui.mouse);
    if (inside) {
        gui.hotID = id;
        if (gui.activeID === "" && gui.buttons & MouseButton.LEFT) {
            gui.activeID = id;
        }
        info && tooltip(gui, info);
    }
    gui.requestFocus(id);
    r.attribs = {
        fill: inside ? gui.fgColor(true) : gui.bgColor(false),
        stroke: gui.focusColor(id)
    };
    gui.add(r, textLabel([x + 8, y + h - 6], gui.textColor(inside), label));
    if (gui.focusID == id) {
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
    return !gui.buttons && gui.hotID == id && gui.activeID == id;
};
