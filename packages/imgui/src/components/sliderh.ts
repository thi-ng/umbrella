import { Fn } from "@thi.ng/api";
import { rect } from "@thi.ng/geom";
import { fit, norm } from "@thi.ng/math";
import { hash } from "@thi.ng/vectors";
import { IGridLayout, LayoutBox } from "../api";
import { handleSlider1Keys, slider1Val } from "../behaviors/slider";
import { IMGUI } from "../gui";
import { isLayout } from "../layout";
import { textLabelRaw } from "./textlabel";
import { tooltipRaw } from "./tooltip";

export const sliderH = (
    gui: IMGUI,
    layout: IGridLayout | LayoutBox,
    id: string,
    min: number,
    max: number,
    prec: number,
    val: number[],
    i: number,
    label?: string,
    fmt?: Fn<number, string>,
    info?: string
) => {
    const { x, y, w, h } = isLayout(layout) ? layout.next() : layout;
    // prettier-ignore
    return sliderHRaw(gui, id, x, y, w, h, min, max, prec, val, i, label, fmt, info);
};

export const sliderHGroup = (
    gui: IMGUI,
    layout: IGridLayout,
    id: string,
    min: number,
    max: number,
    prec: number,
    horizontal: boolean,
    vals: number[],
    label: string[],
    fmt?: Fn<number, string>,
    info: string[] = []
) => {
    const n = vals.length;
    const nested = horizontal ? layout.nest(n, [n, 1]) : layout.nest(1, [1, n]);
    let res = false;
    for (let i = 0; i < n; i++) {
        // prettier-ignore
        res = sliderH(gui, nested, `${id}-${i}`, min, max, prec, vals, i, label[i], fmt, info[i]) || res;
    }
    return res;
};

export const sliderHRaw = (
    gui: IMGUI,
    id: string,
    x: number,
    y: number,
    w: number,
    h: number,
    min: number,
    max: number,
    prec: number,
    val: number[],
    i: number,
    label?: string,
    fmt?: Fn<number, string>,
    info?: string
) => {
    const theme = gui.theme;
    const key = hash([x, y, w, h]);
    gui.registerID(id, key);
    const box = gui.resource(id, key, () => rect([x, y], [w, h], {}));
    const hover = gui.isHover(id, box);
    if (hover) {
        if (gui.isMouseDown()) {
            gui.activeID = id;
            val[i] = slider1Val(
                fit(gui.mouse[0], x, x + w - 1, min, max),
                min,
                max,
                prec
            );
            gui.isAltDown() && val.fill(val[i]);
        }
        info && tooltipRaw(gui, info);
    }
    const focused = gui.requestFocus(id);
    const v = val[i];
    const normVal = norm(v, min, max);
    const valueBox = gui.resource(id, v, () =>
        rect([x, y], [1 + normVal * (w - 1), h], {})
    );
    valueBox.attribs.fill = gui.fgColor(hover);
    box.attribs.fill = gui.bgColor(hover || focused);
    box.attribs.stroke = gui.focusColor(id);
    const valLabel = gui.resource(id, "l" + v, () =>
        textLabelRaw(
            [x + theme.pad, y + h / 2 + theme.baseLine],
            gui.textColor(false),
            (label ? label + " " : "") + (fmt ? fmt(v) : v)
        )
    );
    gui.add(box, valueBox, valLabel);
    if (focused && handleSlider1Keys(gui, min, max, prec, val, i)) {
        return true;
    }
    gui.lastID = id;
    return gui.activeID === id;
};
