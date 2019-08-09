import {
    centroid,
    circle,
    polygon,
    vertices
} from "@thi.ng/geom";
import { triFan } from "@thi.ng/geom-tessellate";
import { add2 } from "@thi.ng/vectors";
import { IMGUI } from "../gui";
import { buttonRaw } from "./button";

export const radialMenu = (
    gui: IMGUI,
    id: string,
    x: number,
    y: number,
    r: number,
    items: string[],
    info: string[]
) => {
    const n = items.length;
    const baseLine = gui.theme.baseLine;
    let i = 0;
    let res = -1;
    for (let tri of triFan(vertices(circle([x, y], r), n))) {
        const cell = polygon(tri);
        const p = add2(null, centroid(cell)!, [
            -gui.textWidth(items[i]) >> 1,
            baseLine
        ]);
        if (
            buttonRaw(
                gui,
                id + i,
                cell,
                [1, 0, 0, 1, p[0], p[1]],
                items[i],
                undefined,
                info[i]
            )
        ) {
            res = i;
        }
        i++;
    }
    return res;
};
