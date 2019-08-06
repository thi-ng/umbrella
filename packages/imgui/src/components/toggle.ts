import { pointInside, rect } from "@thi.ng/geom";
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

/**
 * If `square` is true, the clickable area will not fill the entire
 * cell, but only a left-aligned square of cell/row height.
 *
 * @param gui
 * @param layout
 * @param id
 * @param val
 * @param i
 * @param square
 * @param label
 * @param info
 */
export const toggle = (
    gui: IMGUI,
    layout: IGridLayout | LayoutBox,
    id: string,
    val: boolean[],
    i: number,
    square?: boolean,
    label?: string,
    info?: string
) => {
    const { x, y, w, h } = isLayout(layout) ? layout.next() : layout;
    return toggleRaw(
        gui,
        id,
        x,
        y,
        square ? h : w,
        h,
        square ? h : 0,
        val,
        i,
        label,
        info
    );
};

export const toggleRaw = (
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
        info && tooltipRaw(gui, info);
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
            textLabelRaw(
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
