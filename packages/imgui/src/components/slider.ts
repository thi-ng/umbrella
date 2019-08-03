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
import { textLabel } from "./textlabel";
import { tooltip } from "./tooltip";

const $ = (x: number, prec: number, min: number, max: number) =>
    clamp(roundTo(x, prec), min, max);

export const slider = (
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
    let active = false;
    if (hover) {
        gui.hotID = id;
        const aid = gui.activeID;
        if ((aid === "" || aid === id) && gui.buttons == MouseButton.LEFT) {
            gui.activeID = id;
            active = true;
            val[i] = $(
                fit(gui.mouse[0], x, x + w - 1, min, max),
                prec,
                min,
                max
            );
            if (gui.modifiers & KeyModifier.ALT) {
                val.fill(val[i]);
            }
        }
        info && tooltip(gui, info);
    }
    const focused = gui.requestFocus(id);
    const v = val[i];
    const normVal = norm(v, min, max);
    const valueBox = rect([x, y], [1 + normVal * (w - 1), h], {
        fill: gui.fgColor(hover)
    });
    box.attribs = {
        fill: gui.bgColor(hover || focused),
        stroke: gui.focusColor(id)
    };
    gui.add(
        box,
        valueBox,
        textLabel(
            [x + theme.pad, y + h / 2 + theme.baseLine],
            gui.textColor(normVal > 0.25),
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

export const sliderGroup = (
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
        res = slider(gui, `${id}-${i}`, x, y, w, h, min, max, prec, vals, i, label[i], fmt, info[i]) || res;
        x += offX;
        y += offY;
    }
    return res;
};
