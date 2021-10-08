import type { Fn } from "@thi.ng/api";
import { rect } from "@thi.ng/geom/rect";
import type { IGridLayout, LayoutBox } from "@thi.ng/layout";
import { fit, norm } from "@thi.ng/math/fit";
import { ZERO2 } from "@thi.ng/vectors/api";
import { hash } from "@thi.ng/vectors/hash";
import {
    handleSlider1Keys,
    isHoverSlider,
    slider1Val,
} from "../behaviors/slider";
import type { IMGUI } from "../gui";
import { valHash } from "../hash";
import { layoutBox } from "../layout";
import { textLabelRaw, textTransformV } from "./textlabel";
import { tooltipRaw } from "./tooltip";

export const sliderV = (
    gui: IMGUI,
    layout: IGridLayout | LayoutBox,
    id: string,
    min: number,
    max: number,
    prec: number,
    val: number,
    rows: number,
    label?: string,
    fmt?: Fn<number, string>,
    info?: string
) => {
    const box = layoutBox(layout, [1, rows]);
    return sliderVRaw(
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
    let res: number | undefined;
    let idx: number = -1;
    for (let i = 0; i < n; i++) {
        const v = sliderV(
            gui,
            nested,
            `${id}-${i}`,
            min,
            max,
            prec,
            vals[i],
            rows,
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
    val: number,
    label?: string,
    fmt?: Fn<number, string>,
    info?: string
) => {
    const theme = gui.theme;
    const key = hash([x, y, w, h]);
    gui.registerID(id, key);
    const box = gui.resource(id, key, () => rect([x, y], [w, h], {}));
    const ymax = y + h;
    const hover = isHoverSlider(gui, id, box, "ns-resize");
    const draw = gui.draw;
    let v: number | undefined = val;
    let res: number | undefined;
    if (hover) {
        if (gui.isMouseDown()) {
            gui.activeID = id;
            res = slider1Val(
                fit(gui.mouse[1], ymax - 1, y, min, max),
                min,
                max,
                prec
            );
        }
        info && draw && tooltipRaw(gui, info);
    }
    const focused = gui.requestFocus(id);
    if (draw) {
        const valueBox = gui.resource(id, v, () => {
            const nh = norm(v!, min, max) * (h - 1);
            return rect([x, ymax - nh], [w, nh], {});
        });
        const valLabel = gui.resource(id, valHash(key, v, gui.disabled), () =>
            textLabelRaw(
                ZERO2,
                {
                    transform: textTransformV(theme, x, y, w, h),
                    fill: gui.textColor(false),
                },
                (label ? label + " " : "") + (fmt ? fmt(v!) : v)
            )
        );
        valueBox.attribs.fill = gui.fgColor(hover);
        box.attribs.fill = gui.bgColor(hover || focused);
        box.attribs.stroke = gui.focusColor(id);
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
