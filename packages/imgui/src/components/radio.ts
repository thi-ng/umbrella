import { IGridLayout } from "../api";
import { IMGUI } from "../gui";
import { isLayout } from "../layout";
import { toggleRaw } from "./toggle";

export const radioH = (
    gui: IMGUI,
    layout: IGridLayout,
    id: string,
    val: number[],
    idx: number,
    labels: string[],
    info: string[] = []
) => {
    const { x, y, cw, ch, gap } = isLayout(layout)
        ? layout.next([labels.length, 1])
        : layout;
    // prettier-ignore
    return radioRaw(gui, id, x, y, ch, ch, ch, cw + gap, 0, val, idx, labels, info);
};

export const radioRaw = (
    gui: IMGUI,
    id: string,
    x: number,
    y: number,
    w: number,
    h: number,
    lx: number,
    offX: number,
    offY: number,
    val: number[],
    idx: number,
    labels: string[],
    info: string[] = []
) => {
    let res = false;
    const tmp: boolean[] = [];
    // prettier-ignore
    for (let n = labels.length, sel = val[idx], i = 0; i < n; i++) {
        tmp[0] = sel === i;
        if (toggleRaw(gui, `${id}-${i}`, x, y, w, h, lx, tmp, 0, labels[i], info[i])) {
            val[idx] = i;
            res = true;
        }
        x += offX;
        y += offY;
    }
    return res;
};
