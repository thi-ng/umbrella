import { IMGUI } from "../gui";
import { toggle } from "./toggle";

export const radio = (
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
        if (toggle(gui, `${id}-${i}`, x, y, w, h, lx, tmp, 0, labels[i], info[i])) {
            val[idx] = i;
            res = true;
        }
        x += offX;
        y += offY;
    }
    return res;
};
