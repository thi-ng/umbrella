import { rect } from "@thi.ng/geom/rect";
import type { IGridLayout, LayoutBox } from "@thi.ng/layout";
import { hash } from "@thi.ng/vectors/hash";
import { handleButtonKeys, hoverButton } from "../behaviors/button";
import type { IMGUI } from "../gui";
import { layoutBox } from "../layout";
import { textLabelRaw } from "./textlabel";

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
    const { x, y, w, h } = layoutBox(layout);
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
    const hover = hoverButton(gui, id, box, info);
    const focused = gui.requestFocus(id);
    let changed = !gui.buttons && gui.hotID === id && gui.activeID === id;
    focused && (changed = handleButtonKeys(gui) || changed);
    changed && (res = val = !val);
    if (gui.draw) {
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
