import { IGridLayout } from "../api";
import { IMGUI } from "../gui";
import { toggle } from "./toggle";

export const radio = (
    gui: IMGUI,
    layout: IGridLayout,
    id: string,
    horizontal: boolean,
    sel: number,
    square: boolean,
    labels: string[],
    info: string[] = []
) => {
    const n = labels.length;
    const nested = horizontal ? layout.nest(n, [n, 1]) : layout.nest(1, [1, n]);
    let res: number | undefined;
    for (let i = 0; i < n; i++) {
        toggle(
            gui,
            nested,
            `${id}-${i}`,
            sel === i,
            square,
            labels[i],
            info[i]
        ) !== undefined && (res = i);
    }
    return res;
};
