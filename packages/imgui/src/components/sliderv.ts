import { Fn } from "@thi.ng/api";
import { pointInside, rect } from "@thi.ng/geom";
import {
    clamp,
    fit,
    norm,
    roundTo
} from "@thi.ng/math";
import { Key, KeyModifier, MouseButton } from "../api";
import { IMGUI } from "../gui";
import { textLabelRaw } from "./textlabel";
import { tooltipRaw } from "./tooltip";

const $ = (x: number, prec: number, min: number, max: number) =>
    clamp(roundTo(x, prec), min, max);

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
    const box = rect([x, y], [w, h]);
    const hover = pointInside(box, gui.mouse);
    const ymax = y + h;
    let active = false;
    if (hover) {
        gui.hotID = id;
        const aid = gui.activeID;
        if ((aid === "" || aid === id) && gui.buttons == MouseButton.LEFT) {
            gui.activeID = id;
            active = true;
            val[i] = $(
                fit(gui.mouse[1], ymax - 1, y, min, max),
                prec,
                min,
                max
            );
            if (gui.modifiers & KeyModifier.ALT) {
                val.fill(val[i]);
            }
        }
        info && tooltipRaw(gui, info);
    }
    const focused = gui.requestFocus(id);
    const v = val[i];
    const normVal = norm(v, min, max);
    const nh = normVal * (h - 1);
    const valueBox = rect([x, ymax - nh], [w, nh], {
        fill: gui.fgColor(hover)
    });
    box.attribs = {
        fill: gui.bgColor(hover || focused),
        stroke: gui.focusColor(id)
    };
    gui.add(
        box,
        valueBox,
        textLabelRaw(
            [0, 0],
            {
                transform: [
                    0,
                    -1,
                    1,
                    0,
                    x + w / 2 + theme.baseLine,
                    ymax - theme.pad
                ],
                fill: gui.textColor(normVal > 0.25)
            },
            (label ? label + " " : "") + (fmt ? fmt(v) : v)
        )
    );
    if (focused) {
        switch (gui.key) {
            case Key.TAB:
                gui.switchFocus();
                break;
            case Key.UP:
            case Key.DOWN: {
                const step =
                    (gui.key === Key.UP ? prec : -prec) *
                    (gui.isShiftDown() ? 5 : 1);
                val[i] = $(v + step, prec, min, max);
                gui.isAltDown() && val.fill(val[i]);
                return true;
            }
            default:
        }
    }
    gui.lastID = id;
    return active;
};

export const sliderVGroupRaw = (
    gui: IMGUI,
    id: string,
    x: number,
    y: number,
    w: number,
    h: number,
    offX: number,
    offY: number,
    min: number,
    max: number,
    prec: number,
    vals: number[],
    label: string[],
    fmt?: Fn<number, string>,
    info: string[] = []
) => {
    let res = false;
    // prettier-ignore
    for (let n = vals.length, i = 0; i < n; i++) {
        res = sliderVRaw(gui, `${id}-${i}`, x, y, w, h, min, max, prec, vals, i, label[i], fmt, info[i]) || res;
        x += offX;
        y += offY;
    }
    return res;
};
