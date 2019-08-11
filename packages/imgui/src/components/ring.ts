import { Fn } from "@thi.ng/api";
import { polygon } from "@thi.ng/geom";
import { pointInRect } from "@thi.ng/geom-isec";
import {
    fitClamped,
    HALF_PI,
    mix,
    norm,
    PI,
    TAU
} from "@thi.ng/math";
import { map, normRange } from "@thi.ng/transducers";
import { cartesian2, hash, Vec } from "@thi.ng/vectors";
import { MouseButton } from "../api";
import { dialVal } from "../behaviors/dial";
import { handleSlider1Keys } from "../behaviors/slider";
import { IMGUI } from "../gui";
import { GridLayout } from "../layout";
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
    layout: GridLayout,
    id: string,
    min: number,
    max: number,
    prec: number,
    val: number[],
    i: number,
    thetaGap: number,
    rscale: number,
    label?: string,
    fmt?: Fn<number, string>,
    info?: string
) => {
    const h = (layout.cellW / 2) * (1 + Math.sin(HALF_PI + thetaGap / 2));
    const rows = Math.ceil(h / layout.cellHG + 1);
    const { x, y, w, ch } = layout.next([1, rows]);
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
        thetaGap,
        rscale,
        0,
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
    thetaGap: number,
    rscale: number,
    lx: number,
    ly: number,
    label?: string,
    fmt?: Fn<number, string>,
    info?: string
) => {
    const r = w / 2;
    const key = hash([x, y, r]);
    gui.registerID(id, key);
    const pos = [x + r, y + r];
    const hover = pointInRect(gui.mouse, [x, y], [w, h]);
    let active = false;
    const startTheta = HALF_PI + thetaGap / 2;
    const endTheta = HALF_PI + TAU - thetaGap / 2;
    if (hover) {
        gui.hotID = id;
        const aid = gui.activeID;
        if ((aid === "" || aid === id) && gui.buttons & MouseButton.LEFT) {
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
            gui.isAltDown() && val.fill(val[i]);
        }
        info && tooltipRaw(gui, info);
    }
    const focused = gui.requestFocus(id);
    const v = val[i];
    const valTheta = startTheta + (TAU - thetaGap) * norm(v, min, max);
    const r2 = r * rscale;
    // adaptive arc resolution
    const res = fitClamped(r, 15, 80, 12, 30);
    const bgShape = gui.resource(id, key, () =>
        polygon(
            [
                ...arcVerts(pos, r, startTheta, endTheta, res),
                ...arcVerts(pos, r2, endTheta, startTheta, res)
            ],
            {}
        )
    );
    bgShape.attribs.fill = gui.bgColor(hover || focused);
    bgShape.attribs.stroke = gui.focusColor(id);
    const valShape = gui.resource(id, v, () =>
        polygon(
            [
                ...arcVerts(pos, r, startTheta, valTheta, res),
                ...arcVerts(pos, r2, valTheta, startTheta, res)
            ],
            {}
        )
    );
    valShape.attribs.fill = gui.fgColor(hover);
    const valLabel = gui.resource(id, "l" + v, () =>
        textLabelRaw(
            [x + lx, y + ly],
            gui.textColor(false),
            (label ? label + " " : "") + (fmt ? fmt(v) : v)
        )
    );
    gui.add(bgShape, valShape, valLabel);
    if (focused && handleSlider1Keys(gui, min, max, prec, val, i)) {
        return true;
    }
    gui.lastID = id;
    return active;
};
