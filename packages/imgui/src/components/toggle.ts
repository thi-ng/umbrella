import { pointInside, rect } from "@thi.ng/geom";
import { Key, MouseButton } from "../api";
import { IMGUI } from "../gui";
import { textLabel } from "./textlabel";
import { tooltip } from "./tooltip";

export const toggle = (
    gui: IMGUI,
    id: string,
    x: number,
    y: number,
    w: number,
    h: number,
    lx: number,
    val: boolean[],
    i: number,
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
    let changed = !gui.buttons && gui.hotID == id && gui.activeID == id;
    const v = val[i];
    box.attribs = {
        fill: v ? gui.fgColor(hover) : gui.bgColor(hover),
        stroke: gui.focusColor(id)
    };
    gui.add(box);
    label &&
        gui.add(
            textLabel(
                [x + theme.pad + lx, y + h / 2 + theme.baseLine],
                gui.textColor(hover && lx > 0 && lx < w - theme.pad),
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
                changed = true;
                break;
            default:
        }
    }
    changed && (val[i] = !v);
    gui.lastID = id;
    return changed;
};
