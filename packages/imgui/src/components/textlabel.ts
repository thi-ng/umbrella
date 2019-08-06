import { isPlainObject } from "@thi.ng/checks";
import { ReadonlyVec } from "@thi.ng/vectors";
import { Color, IGridLayout, LayoutBox } from "../api";
import { IMGUI } from "../gui";
import { isLayout } from "../layout";

export const textLabel = (
    gui: IMGUI,
    layout: IGridLayout | LayoutBox,
    label: string,
    pad = false
) => {
    const theme = gui.theme;
    const { x, y, h } = isLayout(layout) ? layout.next() : layout;
    gui.add([
        "text",
        { fill: theme.text },
        [x + (pad ? theme.pad : 0), y + h / 2 + theme.baseLine],
        label
    ]);
};

export const textLabelRaw = (
    p: ReadonlyVec,
    attribs: Color | any,
    label: string
) => ["text", isPlainObject(attribs) ? attribs : { fill: attribs }, p, label];
