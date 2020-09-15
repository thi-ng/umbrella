import type { Fn } from "@thi.ng/api";
import { line, rect } from "@thi.ng/geom";
import { IGridLayout, LayoutBox } from "@thi.ng/layout";
import { fit2, hash, Vec } from "@thi.ng/vectors";
import {
    handleSlider2Keys,
    isHoverSlider,
    slider2Val,
} from "../behaviors/slider";
import { IMGUI } from "../gui";
import { textLabelRaw } from "./textlabel";
import { tooltipRaw } from "./tooltip";

/**
 * `mode` interpretation:
 *
 * - -2 = square
 * - -1 = proportional height (snapped to rows)
 * - >0 = fixed row height
 *
 * @param gui -
 * @param layout -
 * @param id -
 * @param min -
 * @param max -
 * @param prec -
 * @param val -
 * @param mode -
 * @param yUp -
 * @param label -
 * @param fmt -
 * @param info -
 */
export const xyPad = (
    gui: IMGUI,
    layout: IGridLayout,
    id: string,
    min: Vec,
    max: Vec,
    prec: number,
    val: Vec,
    mode: number,
    yUp: boolean,
    label?: string,
    fmt?: Fn<Vec, string>,
    info?: string
) => {
    let box: LayoutBox;
    const ch = layout.cellH;
    const gap = layout.gap;
    if (mode === -2) {
        box = layout.nextSquare();
    } else {
        let rows = (mode > 0 ? mode : layout.cellW / (ch + gap)) | 0;
        box = layout.next([1, rows + 1]);
        box.h -= ch + gap;
    }
    return xyPadRaw(
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
        yUp,
        0,
        box.h + gap + ch / 2 + gui.theme.baseLine,
        label,
        fmt,
        info
    );
};

export const xyPadRaw = (
    gui: IMGUI,
    id: string,
    x: number,
    y: number,
    w: number,
    h: number,
    min: Vec,
    max: Vec,
    prec: number,
    val: Vec,
    yUp = false,
    lx: number,
    ly: number,
    label?: string,
    fmt?: Fn<Vec, string>,
    info?: string
) => {
    const maxX = x + w;
    const maxY = y + h;
    const pos = yUp ? [x, maxY] : [x, y];
    const maxPos = yUp ? [maxX, y] : [maxX, maxY];
    const key = hash([x, y, w, h]);
    gui.registerID(id, key);
    const box = gui.resource(id, key, () => rect([x, y], [w, h]));
    const col = gui.textColor(false);
    const hover = isHoverSlider(gui, id, box, "move");
    const draw = gui.draw;
    let v: Vec | undefined = val;
    let res: Vec | undefined;
    if (hover) {
        if (gui.isMouseDown()) {
            gui.activeID = id;
            res = slider2Val(
                fit2([], gui.mouse, pos, maxPos, min, max),
                min,
                max,
                prec
            );
        }
        info && draw && tooltipRaw(gui, info);
    }
    const focused = gui.requestFocus(id);
    if (draw) {
        box.attribs = {
            fill: gui.bgColor(hover || focused),
            stroke: gui.focusColor(id),
        };
        const { 0: cx, 1: cy } = fit2([], v, min, max, pos, maxPos);
        gui.add(
            box,
            line([x, cy], [maxX, cy], {
                stroke: col,
            }),
            line([cx, y], [cx, maxY], {
                stroke: col,
            }),
            textLabelRaw(
                [x + lx, y + ly],
                col,
                (label ? label + " " : "") +
                    (fmt ? fmt(val) : `${val[0] | 0}, ${val[1] | 0}`)
            )
        );
    }
    if (
        focused &&
        (v = handleSlider2Keys(gui, min, max, prec, v, yUp)) !== undefined
    ) {
        return v;
    }
    gui.lastID = id;
    return res;
};
