import type { IGridLayout, LayoutBox } from "@thi.ng/layout";
import { gridLayout } from "@thi.ng/layout/grid-layout";
import { isLayout } from "@thi.ng/layout/is-layout";
import type { IMGUI } from "../gui";
import { toggle } from "./toggle";

export const radio = (
    gui: IMGUI,
    layout: IGridLayout | LayoutBox,
    id: string,
    horizontal: boolean,
    sel: number,
    square: boolean,
    labels: string[],
    info: string[] = []
) => {
    const n = labels.length;
    const nested = isLayout(layout)
        ? horizontal
            ? layout.nest(n, [n, 1])
            : layout.nest(1, [1, n])
        : horizontal
        ? gridLayout(layout.x, layout.y, layout.w, n, layout.ch, layout.gap)
        : gridLayout(layout.x, layout.y, layout.w, 1, layout.ch, layout.gap);
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
