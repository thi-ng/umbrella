import { IGridLayout } from "../api";
import { IMGUI } from "../gui";
import { toggle } from "./toggle";

export const radio = (
    gui: IMGUI,
    layout: IGridLayout,
    id: string,
    horizontal: boolean,
    val: number[],
    idx: number,
    square: boolean,
    labels: string[],
    info: string[] = []
) => {
    const n = labels.length;
    const nested = horizontal ? layout.nest(n, [n, 1]) : layout.nest(1, [1, n]);
    let res = false;
    const tmp: boolean[] = [];
    const sel = val[idx];
    for (let i = 0; i < n; i++) {
        tmp[0] = sel === i;
        // prettier-ignore
        if (toggle(gui, nested, `${id}-${i}`, tmp, 0, square, labels[i], info[i])) {
            val[idx] = i;
            res = true;
        }
    }
    return res;
};
