import { pointInside, rect } from "@thi.ng/geom";
import { IShape } from "@thi.ng/geom-api";
import { Vec } from "@thi.ng/vectors";
import {
    IGridLayout,
    Key,
    LayoutBox,
    MouseButton
} from "../api";
import { IMGUI } from "../gui";
import { isLayout } from "../layout";
import { textLabelRaw } from "./textlabel";
import { tooltipRaw } from "./tooltip";

export const button = (
    gui: IMGUI,
    layout: IGridLayout | LayoutBox,
    id: string,
    label?: string,
    info?: string
) => {
    const theme = gui.theme;
    const { x, y, w, h } = isLayout(layout) ? layout.next() : layout;
    return buttonRaw(
        gui,
        id,
        rect([x, y], [w, h]),
        label,
        [x + theme.pad, y + h / 2 + theme.baseLine],
        info
    );
};

export const buttonRaw = (
    gui: IMGUI,
    id: string,
    shape: IShape,
    label?: string,
    lpos?: Vec,
    info?: string
) => {
    const hover = pointInside(shape, gui.mouse);
    if (hover) {
        gui.hotID = id;
        if (gui.activeID === "" && gui.buttons & MouseButton.LEFT) {
            gui.activeID = id;
        }
        info && tooltipRaw(gui, info);
    }
    const focused = gui.requestFocus(id);
    shape.attribs = {
        fill: hover ? gui.fgColor(true) : gui.bgColor(focused),
        stroke: gui.focusColor(id)
    };
    gui.add(shape);
    label && lpos && gui.add(textLabelRaw(lpos, gui.textColor(hover), label));
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
