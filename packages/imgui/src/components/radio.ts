import { IGridLayout } from "../api";
import { IMGUI } from "../gui";
import { toggleRaw } from "./toggle";

export const radio = (
    gui: IMGUI,
    layout: IGridLayout,
    id: string,
    horizontal: boolean,
    val: number[],
    idx: number,
    labels: string[],
    info: string[] = []
) => {
    const n = labels.length;
    const nested = horizontal ? layout.nest(n, [n, 1]) : layout.nest(1, [1, n]);
    let res = false;
    const tmp: boolean[] = [];
    const lx = nested.cellH;
    const sel = val[idx];
    for (let i = 0; i < n; i++) {
        tmp[0] = sel === i;
        const { x, y, h } = nested.next();
        // prettier-ignore
        if (toggleRaw(gui, `${id}-${i}`, x, y, h, h, lx, tmp, 0, labels[i], info[i])) {
            val[idx] = i;
            res = true;
        }
    }
    return res;
};
