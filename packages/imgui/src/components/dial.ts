import type { Fn } from "@thi.ng/api";
import { circle } from "@thi.ng/geom/circle";
import { line } from "@thi.ng/geom/line";
import type { IGridLayout, LayoutBox } from "@thi.ng/layout";
import { isLayout } from "@thi.ng/layout/checks";
import { HALF_PI, PI, TAU } from "@thi.ng/math/api";
import { norm } from "@thi.ng/math/fit";
import { cartesian2 } from "@thi.ng/vectors/cartesian";
import { hash } from "@thi.ng/vectors/hash";
import { dialVal } from "../behaviors/dial";
import { handleSlider1Keys, isHoverSlider } from "../behaviors/slider";
import type { IMGUI } from "../gui";
import { dialValueLabel } from "./textlabel";
import { tooltipRaw } from "./tooltip";

export const dial = (
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
    const { x, y, w, h, ch } = isLayout(layout) ? layout.nextSquare() : layout;
    return dialRaw(
        gui,
        id,
        x,
        y,
        w,
        h,
        min,
        max,
        prec,
        val,
        gui.theme.pad,
        h + ch / 2 + gui.theme.baseLine,
        label,
        fmt,
        info
    );
};

export const dialGroup = (
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
    const nested = horizontal
        ? layout.nest(n, [n, 1])
        : layout.nest(1, [1, (layout.rowsForHeight(layout.cellW) + 1) * n]);
    let res: number | undefined;
    let idx: number = -1;
    for (let i = 0; i < n; i++) {
        const v = dial(
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

export const dialRaw = (
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
    lx: number,
    ly: number,
    label?: string,
    fmt?: Fn<number, string>,
    info?: string
) => {
    const r = Math.min(w, h) / 2;
    const pos = [x + w / 2, y + h / 2];
    const thetaGap = PI / 2;
    const startTheta = HALF_PI + thetaGap / 2;
    const key = hash([x, y, r]);
    gui.registerID(id, key);
    const bgShape = gui.resource(id, key, () => circle(pos, r, {}));
    const hover = isHoverSlider(gui, id, bgShape, "pointer");
    const draw = gui.draw;
    let v: number | undefined = val;
    let res: number | undefined;
    if (hover) {
        gui.hotID = id;
        if (gui.isMouseDown()) {
            gui.activeID = id;
            res = dialVal(gui.mouse, pos, startTheta, thetaGap, min, max, prec);
        }
        info && draw && tooltipRaw(gui, info);
    }
    const focused = gui.requestFocus(id);
    if (draw) {
        const valShape = gui.resource(id, v, () =>
            line(
                cartesian2(
                    null,
                    [r, startTheta + (TAU - thetaGap) * norm(v!, min, max)],
                    pos
                ),
                pos,
                {}
            )
        );
        const valLabel = dialValueLabel(
            gui,
            id,
            key,
            v,
            x + lx,
            y + ly,
            label,
            fmt
        );
        bgShape.attribs.fill = gui.bgColor(hover || focused);
        bgShape.attribs.stroke = gui.focusColor(id);
        valShape.attribs.stroke = gui.fgColor(hover);
        valShape.attribs.weight = 2;
        gui.add(bgShape, valShape, valLabel);
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
