import { rect } from "@thi.ng/geom";
import { IShape } from "@thi.ng/geom-api";
import { hash, ZERO2 } from "@thi.ng/vectors";
import {
    Color,
    Hash,
    IGridLayout,
    LayoutBox
} from "../api";
import { handleButtonKeys, isHoverButton } from "../behaviors/button";
import { IMGUI } from "../gui";
import { isLayout } from "../layout";
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
            ? gui.resource(id, "l" + label + key, () =>
                  mkLabel(
                      textTransformH(theme, x, y, w, h),
                      gui.textColor(false),
                      label
                  )
              )
            : undefined,
        labelHover
            ? gui.resource(id, "lh" + labelHover + key, () =>
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
            ? gui.resource(id, "l" + label + key, () =>
                  mkLabel(
                      textTransformV(theme, x, y, w, h),
                      gui.textColor(false),
                      label
                  )
              )
            : undefined,
        labelHover
            ? gui.resource(id, "lh" + labelHover + key, () =>
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
    if (hover) {
        gui.isMouseDown() && (gui.activeID = id);
        info && tooltipRaw(gui, info);
    }
    const focused = gui.requestFocus(id);
    shape.attribs = {
        fill: hover ? gui.fgColor(true) : gui.bgColor(focused),
        stroke: gui.focusColor(id)
    };
    gui.add(shape);
    label && gui.add(hover && labelHover ? labelHover : label);
    if (focused && handleButtonKeys(gui)) {
        return true;
    }
    gui.lastID = id;
    // only emit true on mouse release over this button
    // TODO extract as behavior function
    return !gui.buttons && gui.hotID === id && gui.activeID === id;
};
