import type { FnN4 } from "@thi.ng/api";
import { pointInside } from "@thi.ng/geom";
import type { IShape } from "@thi.ng/geom-api";
import { clamp, roundTo } from "@thi.ng/math";
import { add2, clamp2, roundN2, Vec } from "@thi.ng/vectors";
import { Key } from "../api";
import { IMGUI } from "../gui";

export const isHoverSlider = (
    gui: IMGUI,
    id: string,
    shape: IShape,
    cursor = "ew-resize"
) => {
    if (gui.disabled) return false;
    const aid = gui.activeID;
    const hover = aid === id || (aid === "" && pointInside(shape, gui.mouse));
    if (hover) {
        gui.setCursor(cursor);
        gui.hotID = id;
    }
    return hover;
};

export const slider1Val: FnN4 = (x, min, max, prec) =>
    clamp(roundTo(x, prec), min, max);

export const slider2Val = (v: Vec, min: Vec, max: Vec, prec: number) =>
    clamp2(null, roundN2([], v, prec), min, max);

export const handleSlider1Keys = (
    gui: IMGUI,
    min: number,
    max: number,
    prec: number,
    val: number
) => {
    switch (gui.key) {
        case Key.TAB:
            gui.switchFocus();
            break;
        case Key.UP:
        case Key.DOWN: {
            const step =
                (gui.key === Key.UP ? prec : -prec) *
                (gui.isShiftDown() ? 5 : 1);
            return slider1Val(val + step, min, max, prec);
        }
        default:
    }
};

export const handleSlider2Keys = (
    gui: IMGUI,
    min: Vec,
    max: Vec,
    prec: number,
    val: Vec,
    yUp: boolean
) => {
    switch (gui.key) {
        case Key.TAB:
            gui.switchFocus();
            break;
        case Key.LEFT:
        case Key.RIGHT: {
            const step =
                (gui.key === Key.RIGHT ? prec : -prec) *
                (gui.isShiftDown() ? 5 : 1);
            return slider2Val(add2([], val, [step, 0]), min, max, prec);
        }
        case Key.UP:
        case Key.DOWN: {
            const step =
                (gui.key === Key.UP ? prec : -prec) *
                (yUp ? 1 : -1) *
                (gui.isShiftDown() ? 5 : 1);
            return slider2Val(add2([], val, [0, step]), min, max, prec);
        }
        default:
    }
};
