import { rect } from "@thi.ng/geom";
import { IGridLayout, isLayout, LayoutBox } from "@thi.ng/layout";
import { hash } from "@thi.ng/vectors";
import { handleButtonKeys, isHoverButton } from "../behaviors/button";
import { IMGUI } from "../gui";
import { textLabelRaw } from "./textlabel";
import { tooltipRaw } from "./tooltip";

/**
 * If `square` is true, the clickable area will not fill the entire
 * cell, but only a left-aligned square of cell/row height.
 *
 * @param gui -
 * @param layout -
 * @param id -
 * @param val -
 * @param i -
 * @param square -
 * @param label -
 * @param info -
 */
export const toggle = (
    gui: IMGUI,
    layout: IGridLayout | LayoutBox,
    id: string,
    val: boolean,
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
    val: boolean,
    label?: string,
    info?: string
) => {
    const theme = gui.theme;
    const key = hash([x, y, w, h]);
    gui.registerID(id, key);
    let res: boolean | undefined;
    const box = gui.resource(id, key, () => rect([x, y], [w, h]));
    const hover = isHoverButton(gui, id, box);
    const draw = gui.draw;
    if (hover) {
        gui.isMouseDown() && (gui.activeID = id);
        info && draw && tooltipRaw(gui, info);
    }
    const focused = gui.requestFocus(id);
    let changed = !gui.buttons && gui.hotID === id && gui.activeID === id;
    focused && (changed = handleButtonKeys(gui) || changed);
    changed && (res = val = !val);
    if (draw) {
        box.attribs = {
            fill: val ? gui.fgColor(hover) : gui.bgColor(hover),
            stroke: gui.focusColor(id),
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
    }
    gui.lastID = id;
    return res;
};
