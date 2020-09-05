import { rect } from "@thi.ng/geom";
import type { IShape } from "@thi.ng/geom-api";
import { IGridLayout, isLayout, LayoutBox } from "@thi.ng/layout";
import { hash, ZERO2 } from "@thi.ng/vectors";
import type { Color, Hash } from "../api";
import { handleButtonKeys, isHoverButton } from "../behaviors/button";
import { IMGUI } from "../gui";
import { labelHash } from "../hash";
import { textLabelRaw, textTransformH, textTransformV } from "./textlabel";
import { tooltipRaw } from "./tooltip";

const mkLabel = (transform: number[], fill: Color, label: string) =>
    textLabelRaw(ZERO2, { transform, fill }, label);

export const buttonH = (
    gui: IMGUI,
    layout: IGridLayout | LayoutBox,
    id: string,
    label?: string,
    labelHover = label,
    info?: string
) => {
    const theme = gui.theme;
    const { x, y, w, h } = isLayout(layout) ? layout.next() : layout;
    const key = hash([x, y, w, h]);
    return buttonRaw(
        gui,
        id,
        gui.resource(id, key, () => rect([x, y], [w, h])),
        key,
        label
            ? gui.resource(id, labelHash(key, label, gui.disabled), () =>
                  mkLabel(
                      textTransformH(theme, x, y, w, h),
                      gui.textColor(false),
                      label
                  )
              )
            : undefined,
        labelHover
            ? gui.resource(id, labelHash(key, labelHover, gui.disabled), () =>
                  mkLabel(
                      textTransformH(theme, x, y, w, h),
                      gui.textColor(true),
                      labelHover
                  )
              )
            : undefined,
        info
    );
};

export const buttonV = (
    gui: IMGUI,
    layout: IGridLayout | LayoutBox,
    id: string,
    rows: number,
    label?: string,
    labelHover = label,
    info?: string
) => {
    const theme = gui.theme;
    const { x, y, w, h } = isLayout(layout) ? layout.next([1, rows]) : layout;
    const key = hash([x, y, w, h]);
    return buttonRaw(
        gui,
        id,
        gui.resource(id, key, () => rect([x, y], [w, h])),
        key,
        label
            ? gui.resource(id, labelHash(key, label, gui.disabled), () =>
                  mkLabel(
                      textTransformV(theme, x, y, w, h),
                      gui.textColor(false),
                      label
                  )
              )
            : undefined,
        labelHover
            ? gui.resource(id, labelHash(key, labelHover, gui.disabled), () =>
                  mkLabel(
                      textTransformV(theme, x, y, w, h),
                      gui.textColor(true),
                      labelHover
                  )
              )
            : undefined,
        info
    );
};

export const buttonRaw = (
    gui: IMGUI,
    id: string,
    shape: IShape,
    hash: Hash,
    label?: any,
    labelHover?: any,
    info?: string
) => {
    gui.registerID(id, hash);
    const hover = isHoverButton(gui, id, shape);
    const draw = gui.draw;
    if (hover) {
        gui.isMouseDown() && (gui.activeID = id);
        info && draw && tooltipRaw(gui, info);
    }
    const focused = gui.requestFocus(id);
    if (draw) {
        shape.attribs = {
            fill: hover ? gui.fgColor(true) : gui.bgColor(focused),
            stroke: gui.focusColor(id),
        };
        gui.add(shape);
        label && gui.add(hover && labelHover ? labelHover : label);
    }
    if (focused && handleButtonKeys(gui)) {
        return true;
    }
    gui.lastID = id;
    // only emit true on mouse release over this button
    // TODO extract as behavior function
    return !gui.buttons && gui.hotID === id && gui.activeID === id;
};
