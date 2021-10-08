import type { Polygon } from "@thi.ng/geom";
import { triFan } from "@thi.ng/geom-tessellate/tri-fan";
import { circle } from "@thi.ng/geom/ctors/circle";
import { polygon } from "@thi.ng/geom/ctors/polygon";
import { centroid } from "@thi.ng/geom/centroid";
import { vertices } from "@thi.ng/geom/vertices";
import { mod } from "@thi.ng/math/prec";
import { mapIndexed } from "@thi.ng/transducers/map-indexed";
import { add2 } from "@thi.ng/vectors/add";
import { hash } from "@thi.ng/vectors/hash";
import { Hash, Key } from "../api";
import type { IMGUI } from "../gui";
import { buttonRaw } from "./button";
import { textLabelRaw } from "./textlabel";

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
    const key = hash([x, y, r, n, ~~gui.disabled]);
    gui.registerID(id, key);
    const cells: [Polygon, Hash, any, any][] = gui.resource(id, key, () => [
        ...mapIndexed((i, pts) => {
            const cell = polygon(pts);
            const p = add2(
                null,
                [-gui.textWidth(items[i]) >> 1, gui.theme.baseLine],
                centroid(cell)!
            );
            return [
                cell,
                hash(p),
                textLabelRaw(p, gui.textColor(false), items[i]),
                textLabelRaw(p, gui.textColor(true), items[i]),
            ];
        }, triFan(vertices(circle([x, y], r), n))),
    ]);
    let res: number | undefined;
    let sel = -1;
    for (let i = 0; i < n; i++) {
        const cell = cells[i];
        const _id = id + i;
        buttonRaw(gui, _id, cell[0], cell[1], cell[2], cell[3], info[i]) &&
            (res = i);
        gui.focusID === _id && (sel = i);
    }
    if (sel !== -1) {
        switch (gui.key) {
            case Key.UP:
            case Key.RIGHT:
                gui.focusID = id + mod(sel + 1, n);
                break;
            case Key.DOWN:
            case Key.LEFT:
                gui.focusID = id + mod(sel - 1, n);
            default:
        }
    }
    return res;
};
