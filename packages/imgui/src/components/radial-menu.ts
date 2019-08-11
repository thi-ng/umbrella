import {
    centroid,
    circle,
    polygon,
    Polygon,
    vertices
} from "@thi.ng/geom";
import { triFan } from "@thi.ng/geom-tessellate";
import { map } from "@thi.ng/transducers";
import { add2, hash, Vec } from "@thi.ng/vectors";
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
    const key = hash([x, y, r, n]);
    gui.registerID(id, key);
    const cells: [Polygon, Vec][] = gui.resource(id, key, () => [
        ...map((pts) => {
            const cell = polygon(pts);
            return [cell, centroid(cell)];
        }, triFan(vertices(circle([x, y], r), n)))
    ]);
    const baseLine = gui.theme.baseLine;
    let res = -1;
    for (let i = 0; i < n; i++) {
        const cell = cells[i];
        const p = add2(
            null,
            [-gui.textWidth(items[i]) >> 1, baseLine],
            cell[1]
        );
        buttonRaw(
            gui,
            id + i,
            cell[0],
            hash(p),
            [1, 0, 0, 1, p[0], p[1]],
            items[i],
            undefined,
            info[i]
        ) && (res = i);
    }
    return res;
};
