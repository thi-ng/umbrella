import type { Fn } from "@thi.ng/api";
import { rect } from "@thi.ng/geom/ctors/rect";
import type { IGridLayout, LayoutBox } from "@thi.ng/layout";
import { fit, norm } from "@thi.ng/math/fit";
import { hash } from "@thi.ng/vectors/hash";
import {
    handleSlider1Keys,
    isHoverSlider,
    slider1Val,
} from "../behaviors/slider";
import type { IMGUI } from "../gui";
import { valHash } from "../hash";
import { layoutBox } from "../layout";
import { textLabelRaw } from "./textlabel";
import { tooltipRaw } from "./tooltip";

export const sliderH = (
    gui: IMGUI,
    layout: IGridLayout | LayoutBox,
    id: string,
    min: number,
    max: number,
    prec: number,
    val: number,
    label?: string,
    fmt?: Fn<number, string>,
    info?: string
) => {
    const box = layoutBox(layout);
    return sliderHRaw(
        gui,
        id,
        box.x,
        box.y,
        box.w,
        box.h,
        min,
        max,
        prec,
        val,
        label,
        fmt,
        info
    );
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
    let res: number | undefined;
    let idx: number = -1;
    for (let i = 0; i < n; i++) {
        const v = sliderH(
            gui,
            nested,
            `${id}-${i}`,
            min,
            max,
            prec,
            vals[i],
            label[i],
            fmt,
            info[i]
        );
        if (v !== undefined) {
            res = v;
            idx = i;
        }
    }
    return res !== undefined ? [idx, res] : undefined;
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
    val: number,
    label?: string,
    fmt?: Fn<number, string>,
    info?: string
) => {
    const theme = gui.theme;
    const key = hash([x, y, w, h]);
    gui.registerID(id, key);
    const box = gui.resource(id, key, () => rect([x, y], [w, h], {}));
    const hover = isHoverSlider(gui, id, box);
    const draw = gui.draw;
    let v: number | undefined = val;
    let res: number | undefined;
    if (hover) {
        if (gui.isMouseDown()) {
            gui.activeID = id;
            res = slider1Val(
                fit(gui.mouse[0], x, x + w - 1, min, max),
                min,
                max,
                prec
            );
        }
        info && draw && tooltipRaw(gui, info);
    }
    const focused = gui.requestFocus(id);
    if (draw) {
        const valueBox = gui.resource(id, v, () =>
            rect([x, y], [1 + norm(v!, min, max) * (w - 1), h], {})
        );
        const valLabel = gui.resource(id, valHash(key, v, gui.disabled), () =>
            textLabelRaw(
                [x + theme.pad, y + h / 2 + theme.baseLine],
                gui.textColor(false),
                (label ? label + " " : "") + (fmt ? fmt(v!) : v)
            )
        );
        box.attribs.fill = gui.bgColor(hover || focused);
        box.attribs.stroke = gui.focusColor(id);
        valueBox.attribs.fill = gui.fgColor(hover);
        gui.add(box, valueBox, valLabel);
    }
    if (
        focused &&
        (v = handleSlider1Keys(gui, min, max, prec, v)) !== undefined
    ) {
        return v;
    }
    gui.lastID = id;
    return res;
};
