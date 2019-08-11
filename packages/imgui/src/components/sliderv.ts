import { Fn } from "@thi.ng/api";
import { pointInside, rect } from "@thi.ng/geom";
import { fit, norm } from "@thi.ng/math";
import { hash, ZERO2 } from "@thi.ng/vectors";
import { IGridLayout, LayoutBox, MouseButton } from "../api";
import { handleSlider1Keys, slider1Val } from "../behaviors/slider";
import { IMGUI } from "../gui";
import { isLayout } from "../layout";
import { textLabelRaw } from "./textlabel";
import { tooltipRaw } from "./tooltip";

export const sliderV = (
    gui: IMGUI,
    layout: IGridLayout | LayoutBox,
    id: string,
    min: number,
    max: number,
    prec: number,
    val: number[],
    i: number,
    rows: number,
    label?: string,
    fmt?: Fn<number, string>,
    info?: string
) => {
    const { x, y, w, h } = isLayout(layout) ? layout.next([1, rows]) : layout;
    // prettier-ignore
    return sliderVRaw(gui, id, x, y, w, h, min, max, prec, val, i, label, fmt, info);
};

export const sliderVGroup = (
    gui: IMGUI,
    layout: IGridLayout,
    id: string,
    min: number,
    max: number,
    prec: number,
    vals: number[],
    rows: number,
    label: string[],
    fmt?: Fn<number, string>,
    info: string[] = []
) => {
    const n = vals.length;
    const nested = layout.nest(n, [1, rows]);
    let res = false;
    for (let i = 0; i < n; i++) {
        // prettier-ignore
        res = sliderV(gui, nested, `${id}-${i}`, min, max, prec, vals, i, rows, label[i], fmt, info[i]) || res;
    }
    return res;
};

export const sliderVRaw = (
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
    const hover = pointInside(box, gui.mouse);
    const ymax = y + h;
    let active = false;
    if (hover) {
        gui.hotID = id;
        const aid = gui.activeID;
        if ((aid === "" || aid === id) && gui.buttons & MouseButton.LEFT) {
            gui.activeID = id;
            active = true;
            val[i] = slider1Val(
                fit(gui.mouse[1], ymax - 1, y, min, max),
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
    const valueBox = gui.resource(id, v, () => {
        const nh = normVal * (h - 1);
        return rect([x, ymax - nh], [w, nh], {});
    });
    valueBox.attribs.fill = gui.fgColor(hover);
    box.attribs.fill = gui.bgColor(hover || focused);
    box.attribs.stroke = gui.focusColor(id);
    const valLabel = gui.resource(id, "l" + v, () =>
        textLabelRaw(
            ZERO2,
            {
                transform: [
                    0,
                    -1,
                    1,
                    0,
                    x + w / 2 + theme.baseLine,
                    ymax - theme.pad
                ],
                fill: gui.textColor(false)
            },
            (label ? label + " " : "") + (fmt ? fmt(v) : v)
        )
    );
    gui.add(box, valueBox, valLabel);
    if (focused && handleSlider1Keys(gui, min, max, prec, val, i)) {
        return true;
    }
    gui.lastID = id;
    return active;
};
