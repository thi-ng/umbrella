import type { Fn5 } from "@thi.ng/api";
import { rect } from "@thi.ng/geom/ctors/rect";
import type { IShape } from "@thi.ng/geom-api";
import type { IGridLayout, LayoutBox } from "@thi.ng/layout";
import { ZERO2 } from "@thi.ng/vectors/api";
import { hash } from "@thi.ng/vectors/hash";
import type { GUITheme, Hash } from "../api";
import { handleButtonKeys, hoverButton } from "../behaviors/button";
import type { IMGUI } from "../gui";
import { labelHash } from "../hash";
import { layoutBox } from "../layout";
import { textLabelRaw, textTransformH, textTransformV } from "./textlabel";

const mkLabel = (
    gui: IMGUI,
    tx: Fn5<GUITheme, number, number, number, number, number[]>,
    id: string,
    key: number,
    x: number,
    y: number,
    w: number,
    h: number,
    hover: boolean,
    label: string
) =>
    gui.resource(id, labelHash(key, label, gui.disabled), () =>
        textLabelRaw(
            ZERO2,
            {
                transform: tx(gui.theme, x, y, w, h),
                fill: gui.textColor(hover),
            },
            label
        )
    );

export const buttonH = (
    gui: IMGUI,
    layout: IGridLayout | LayoutBox,
    id: string,
    label?: string,
    labelHover = label,
    info?: string
) => {
    const { x, y, w, h } = layoutBox(layout);
    const key = hash([x, y, w, h]);
    return buttonRaw(
        gui,
        id,
        gui.resource(id, key, () => rect([x, y], [w, h])),
        key,
        label
            ? mkLabel(gui, textTransformH, id, key, x, y, w, h, false, label)
            : undefined,
        labelHover
            ? // prettier-ignore
              mkLabel(gui, textTransformH, id, key, x, y, w, h, true, labelHover)
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
    const { x, y, w, h } = layoutBox(layout, [1, rows]);
    const key = hash([x, y, w, h]);
    return buttonRaw(
        gui,
        id,
        gui.resource(id, key, () => rect([x, y], [w, h])),
        key,
        label
            ? mkLabel(gui, textTransformV, id, key, x, y, w, h, false, label)
            : undefined,
        labelHover
            ? // prettier-ignore
              mkLabel(gui, textTransformV, id, key, x, y, w, h, true, labelHover)
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
    const hover = hoverButton(gui, id, shape, info);
    const focused = gui.requestFocus(id);
    if (gui.draw) {
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
