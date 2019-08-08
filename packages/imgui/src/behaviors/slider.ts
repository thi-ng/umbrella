import { clamp, roundTo } from "@thi.ng/math";
import {
    add2,
    clamp2,
    round2,
    Vec
} from "@thi.ng/vectors";
import { Key } from "../api";
import { IMGUI } from "../gui";

export const slider1Val = (x: number, min: number, max: number, prec: number) =>
    clamp(roundTo(x, prec), min, max);

export const slider2Val = (v: Vec, min: Vec, max: Vec, prec: number) =>
    clamp2(v, round2(v, v, prec), min, max);

export const handleSlider1Keys = (
    gui: IMGUI,
    min: number,
    max: number,
    prec: number,
    val: number[],
    i = 0
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
            val[i] = slider1Val(val[i] + step, min, max, prec);
            gui.isAltDown() && val.fill(val[i]);
            return true;
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
            slider2Val(add2(val, val, [step, 0]), min, max, prec);
            return true;
        }
        case Key.UP:
        case Key.DOWN: {
            const step =
                (gui.key === Key.UP ? prec : -prec) *
                (yUp ? 1 : -1) *
                (gui.isShiftDown() ? 5 : 1);
            slider2Val(add2(val, val, [0, step]), min, max, prec);
            return true;
        }
        default:
    }
};
