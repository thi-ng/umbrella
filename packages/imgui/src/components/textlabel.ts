import type { Fn } from "@thi.ng/api";
import { isPlainObject } from "@thi.ng/checks/is-plain-object";
import type { IGridLayout, LayoutBox } from "@thi.ng/layout";
import type { ReadonlyVec } from "@thi.ng/vectors";
import type { Color, GUITheme } from "../api.js";
import type { IMGUI } from "../gui.js";
import { valHash } from "../hash.js";
import { layoutBox } from "../layout.js";

export const textLabel = (
    gui: IMGUI,
    layout: IGridLayout | LayoutBox,
    label: string,
    pad = false
) => {
    const theme = gui.theme;
    const { x, y, h } = layoutBox(layout);
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

export const dialValueLabel = (
    gui: IMGUI,
    id: string,
    key: number,
    v: number,
    x: number,
    y: number,
    label: string | undefined,
    fmt: Fn<number, string> | undefined
) =>
    gui.resource(id, valHash(key, v, gui.disabled), () =>
        textLabelRaw(
            [x, y],
            gui.textColor(false),
            (label ? label + " " : "") + (fmt ? fmt(v!) : v)
        )
    );
