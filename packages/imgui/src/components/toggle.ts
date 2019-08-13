import { rect } from "@thi.ng/geom";
import { hash } from "@thi.ng/vectors";
import { IGridLayout, LayoutBox } from "../api";
import { handleButtonKeys } from "../behaviors/button";
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
    const key = hash([x, y, w, h]);
    gui.registerID(id, key);
    const box = gui.resource(id, key, () => rect([x, y], [w, h]));
    const hover = gui.isHover(id, box);
    if (hover) {
        gui.isMouseDown() && (gui.activeID = id);
        info && tooltipRaw(gui, info);
    }
    const focused = gui.requestFocus(id);
    let changed = !gui.buttons && gui.hotID === id && gui.activeID === id;
    focused && (changed = handleButtonKeys(gui) || changed);
    changed && (val[i] = !val[i]);
    box.attribs = {
        fill: val[i] ? gui.fgColor(hover) : gui.bgColor(hover),
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
    gui.lastID = id;
    return changed;
};
