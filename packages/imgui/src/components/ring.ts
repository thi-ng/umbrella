import { Fn } from "@thi.ng/api";
import { polygon } from "@thi.ng/geom";
import { pointInCircle } from "@thi.ng/geom-isec";
import {
    fitClamped,
    HALF_PI,
    mix,
    norm,
    PI,
    TAU
} from "@thi.ng/math";
import { map, normRange } from "@thi.ng/transducers";
import { cartesian2, Vec } from "@thi.ng/vectors";
import { KeyModifier, LayoutBox, MouseButton } from "../api";
import { dialVal } from "../behaviors/dial";
import { handleSlider1Keys } from "../behaviors/slider";
import { IMGUI } from "../gui";
import { GridLayout, isLayout } from "../layout";
import { textLabelRaw } from "./textlabel";
import { tooltipRaw } from "./tooltip";

const arcVerts = (
    o: Vec,
    r: number,
    start: number,
    end: number,
    thetaRes = 12
): Iterable<Vec> =>
    r > 1
        ? map(
              (t) => cartesian2(null, [r, mix(start, end, t)], o),
              normRange(
                  Math.max(1, Math.abs(end - start) / (PI / thetaRes)) | 0
              )
          )
        : [o];

export const ring = (
    gui: IMGUI,
    layout: GridLayout | LayoutBox,
    id: string,
    min: number,
    max: number,
    prec: number,
    val: number[],
    i: number,
    rscale: number,
    label?: string,
    fmt?: Fn<number, string>,
    info?: string
) => {
    const { x, y, w, h, ch } = isLayout(layout) ? layout.nextSquare() : layout;
    return ringRaw(
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
        i,
        rscale,
        gui.theme.pad,
        h + ch / 2 + gui.theme.baseLine,
        label,
        fmt,
        info
    );
};

export const ringRaw = (
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
    rscale: number,
    lx: number,
    ly: number,
    label?: string,
    fmt?: Fn<number, string>,
    info?: string
) => {
    const r = Math.min(w, h) / 2;
    const pos = [x + w / 2, y + h / 2];
    const hover = pointInCircle(gui.mouse, pos, r);
    let active = false;
    const thetaGap = PI / 3;
    const startTheta = HALF_PI + thetaGap / 2;
    const endTheta = HALF_PI + TAU - thetaGap / 2;
    if (hover) {
        gui.hotID = id;
        const aid = gui.activeID;
        if ((aid === "" || aid === id) && gui.buttons == MouseButton.LEFT) {
            gui.activeID = id;
            active = true;
            val[i] = dialVal(
                gui.mouse,
                pos,
                startTheta,
                thetaGap,
                min,
                max,
                prec
            );
            if (gui.modifiers & KeyModifier.ALT) {
                val.fill(val[i]);
            }
        }
        info && tooltipRaw(gui, info);
    }
    const focused = gui.requestFocus(id);
    const v = val[i];
    const valTheta = startTheta + (TAU - thetaGap) * norm(v, min, max);
    const r2 = r * rscale;
    // adaptive arc resolution
    const res = fitClamped(r, 15, 60, 12, 30);
    const bgShape = polygon(
        [
            ...arcVerts(pos, r, startTheta, endTheta, res),
            ...arcVerts(pos, r2, endTheta, startTheta, res)
        ],
        { fill: gui.bgColor(hover || focused), stroke: gui.focusColor(id) }
    );
    const valShape = polygon(
        [
            ...arcVerts(pos, r, startTheta, valTheta, res),
            ...arcVerts(pos, r2, valTheta, startTheta, res)
        ],
        { fill: gui.fgColor(hover) }
    );
    gui.add(
        bgShape,
        valShape,
        textLabelRaw(
            [x + lx, y + ly],
            gui.textColor(false),
            (label ? label + " " : "") + (fmt ? fmt(v) : v)
        )
    );
    if (focused && handleSlider1Keys(gui, min, max, prec, val, i)) {
        return true;
    }
    gui.lastID = id;
    return active;
};
