import type { Fn, FnN2 } from "@thi.ng/api";
import { polygon } from "@thi.ng/geom";
import { pointInRect } from "@thi.ng/geom-isec";
import { IGridLayout, isLayout, LayoutBox } from "@thi.ng/layout";
import { fitClamped, HALF_PI, mix, norm, PI, TAU } from "@thi.ng/math";
import { map, normRange } from "@thi.ng/transducers";
import { cartesian2, hash, Vec } from "@thi.ng/vectors";
import { dialVal } from "../behaviors/dial";
import { handleSlider1Keys } from "../behaviors/slider";
import { IMGUI } from "../gui";
import { valHash } from "../hash";
import { textLabelRaw } from "./textlabel";
import { tooltipRaw } from "./tooltip";

const ringHeight: FnN2 = (w, thetaGap) =>
    (w / 2) * (1 + Math.sin(HALF_PI + thetaGap / 2));

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
    layout: IGridLayout | LayoutBox,
    id: string,
    min: number,
    max: number,
    prec: number,
    val: number,
    thetaGap: number,
    rscale: number,
    label?: string,
    fmt?: Fn<number, string>,
    info?: string
) => {
    let h: number;
    let box: LayoutBox;
    if (isLayout(layout)) {
        h = ringHeight(layout.cellW, thetaGap);
        box = layout.next([1, layout.rowsForHeight(h) + 1]);
    } else {
        h = ringHeight(layout.cw, thetaGap);
        box = layout;
    }
    return ringRaw(
        gui,
        id,
        box.x,
        box.y,
        box.w,
        h,
        min,
        max,
        prec,
        val,
        thetaGap,
        rscale,
        0,
        h + box.ch / 2 + gui.theme.baseLine,
        label,
        fmt,
        info
    );
};

export const ringGroup = (
    gui: IMGUI,
    layout: IGridLayout,
    id: string,
    min: number,
    max: number,
    prec: number,
    horizontal: boolean,
    thetaGap: number,
    rscale: number,
    vals: number[],
    label: string[],
    fmt?: Fn<number, string>,
    info: string[] = []
) => {
    const n = vals.length;
    const nested = horizontal
        ? layout.nest(n, [n, 1])
        : layout.nest(1, [
              1,
              (layout.rowsForHeight(ringHeight(layout.cellW, thetaGap)) + 1) *
                  n,
          ]);
    let res: number | undefined;
    let idx: number = -1;
    for (let i = 0; i < n; i++) {
        const v = ring(
            gui,
            nested,
            `${id}-${i}`,
            min,
            max,
            prec,
            vals[i],
            thetaGap,
            rscale,
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
    val: number,
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
    const startTheta = HALF_PI + thetaGap / 2;
    const endTheta = HALF_PI + TAU - thetaGap / 2;
    const draw = gui.draw;
    const aid = gui.activeID;
    const hover =
        !gui.disabled &&
        (aid === id || (aid === "" && pointInRect(gui.mouse, [x, y], [w, h])));
    let v: number | undefined = val;
    let res: number | undefined;
    if (hover) {
        gui.setCursor("pointer");
        gui.hotID = id;
        if (gui.isMouseDown()) {
            gui.activeID = id;
            res = dialVal(gui.mouse, pos, startTheta, thetaGap, min, max, prec);
        }
        info && draw && tooltipRaw(gui, info);
    }
    const focused = gui.requestFocus(id);
    if (draw) {
        const valTheta = startTheta + (TAU - thetaGap) * norm(v, min, max);
        const r2 = r * rscale;
        // adaptive arc resolution
        const numV = fitClamped(r, 15, 80, 12, 30);
        const bgShape = gui.resource(id, key, () =>
            polygon(
                [
                    ...arcVerts(pos, r, startTheta, endTheta, numV),
                    ...arcVerts(pos, r2, endTheta, startTheta, numV),
                ],
                {}
            )
        );
        const valShape = gui.resource(id, v, () =>
            polygon(
                [
                    ...arcVerts(pos, r, startTheta, valTheta, numV),
                    ...arcVerts(pos, r2, valTheta, startTheta, numV),
                ],
                {}
            )
        );
        const valLabel = gui.resource(id, valHash(key, v, gui.disabled), () =>
            textLabelRaw(
                [x + lx, y + ly],
                gui.textColor(false),
                (label ? label + " " : "") + (fmt ? fmt(v!) : v)
            )
        );
        bgShape.attribs.fill = gui.bgColor(hover || focused);
        bgShape.attribs.stroke = gui.focusColor(id);
        valShape.attribs.fill = gui.fgColor(hover);
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
