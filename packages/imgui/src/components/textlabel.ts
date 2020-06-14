import { isPlainObject } from "@thi.ng/checks";
import { IGridLayout, isLayout, LayoutBox } from "@thi.ng/layout";
import { IMGUI } from "../gui";
import type { ReadonlyVec } from "@thi.ng/vectors";
import type { Color, GUITheme } from "../api";

export const textLabel = (
    gui: IMGUI,
    layout: IGridLayout | LayoutBox,
    label: string,
    pad = false
) => {
    const theme = gui.theme;
    const { x, y, h } = isLayout(layout) ? layout.next() : layout;
    gui.draw &&
        gui.add([
            "text",
            { fill: gui.textColor(false) },
            [x + (pad ? theme.pad : 0), y + h / 2 + theme.baseLine],
            label,
        ]);
};

export const textLabelRaw = (
    p: ReadonlyVec,
    attribs: Color | any,
    label: string
) => ["text", isPlainObject(attribs) ? attribs : { fill: attribs }, p, label];

export const textTransformH = (
    theme: GUITheme,
    x: number,
    y: number,
    _: number,
    h: number
) => [1, 0, 0, 1, x + theme.pad, y + h / 2 + theme.baseLine];

export const textTransformV = (
    theme: GUITheme,
    x: number,
    y: number,
    w: number,
    h: number
) => [0, -1, 1, 0, x + w / 2 + theme.baseLine, y + h - theme.pad];
