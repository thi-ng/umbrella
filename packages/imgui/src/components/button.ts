import { pointInside, rect } from "@thi.ng/geom";
import { IShape } from "@thi.ng/geom-api";
import { ReadonlyVec, ZERO2 } from "@thi.ng/vectors";
import { IGridLayout, LayoutBox, MouseButton } from "../api";
import { handleButtonKeys } from "../behaviors/button";
import { IMGUI } from "../gui";
import { isLayout } from "../layout";
import { textLabelRaw } from "./textlabel";
import { tooltipRaw } from "./tooltip";

export const buttonH = (
    gui: IMGUI,
    layout: IGridLayout | LayoutBox,
    id: string,
    label?: string,
    labelHover?: string,
    info?: string
) => {
    const theme = gui.theme;
    const { x, y, w, h } = isLayout(layout) ? layout.next() : layout;
    const hash = String([x, y, w, h]);
    return buttonRaw(
        gui,
        id,
        gui.resource(id, hash, () => rect([x, y], [w, h])),
        hash,
        gui.resource(id, "mat" + hash, () => [
            1,
            0,
            0,
            1,
            x + theme.pad,
            y + h / 2 + theme.baseLine
        ]),
        label,
        labelHover,
        info
    );
};

export const buttonV = (
    gui: IMGUI,
    layout: IGridLayout | LayoutBox,
    id: string,
    rows: number,
    label?: string,
    labelHover?: string,
    info?: string
) => {
    const theme = gui.theme;
    const { x, y, w, h } = isLayout(layout) ? layout.next([1, rows]) : layout;
    const hash = String([x, y, w, h]);
    return buttonRaw(
        gui,
        id,
        gui.resource(id, hash, () => rect([x, y], [w, h])),
        hash,
        gui.resource(id, "mat" + hash, () => [
            0,
            -1,
            1,
            0,
            x + w / 2 + theme.baseLine,
            y + h - theme.pad
        ]),
        label,
        labelHover,
        info
    );
};

export const buttonRaw = (
    gui: IMGUI,
    id: string,
    shape: IShape,
    hash: string,
    lmat?: ReadonlyVec,
    label?: string,
    labelHover?: string,
    info?: string
) => {
    gui.registerID(id, hash);
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
    label &&
        lmat &&
        gui.add(
            textLabelRaw(
                ZERO2,
                {
                    transform: lmat,
                    fill: gui.textColor(hover)
                },
                hover && labelHover ? labelHover : label
            )
        );
    if (focused && handleButtonKeys(gui)) {
        return true;
    }
    gui.lastID = id;
    // only emit true on mouse release over this button
    // TODO extract as behavior function
    return !gui.buttons && gui.hotID === id && gui.activeID === id;
};
