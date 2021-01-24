import { polygon } from "@thi.ng/geom";
import { gridLayout, IGridLayout, isLayout, LayoutBox } from "@thi.ng/layout";
import { clamp0 } from "@thi.ng/math";
import { hash } from "@thi.ng/vectors";
import { Key } from "../api";
import type { IMGUI } from "../gui";
import { buttonH } from "./button";

/**
 *
 * @param gui -
 * @param layout -
 * @param id -
 * @param sel -
 * @param items -
 * @param title -
 * @param info -
 */
export const dropdown = (
    gui: IMGUI,
    layout: IGridLayout | LayoutBox,
    id: string,
    sel: number,
    items: string[],
    title: string,
    info?: string
) => {
    const open = gui.state<boolean>(id, () => false);
    const nested = isLayout(layout)
        ? layout.nest(1, [1, open ? items.length : 1])
        : gridLayout(layout.x, layout.y, layout.w, 1, layout.ch, layout.gap);
    let res: number | undefined;
    const box = nested.next();
    const { x, y, w, h } = box;
    const key = hash([x, y, w, h, ~~gui.disabled]);
    const tx = x + w - gui.theme.pad - 4;
    const ty = y + h / 2;
    const draw = gui.draw;
    if (open) {
        const bt = buttonH(gui, box, `${id}-title`, title);
        draw &&
            gui.add(
                gui.resource(id, key + 1, () => triangle(gui, tx, ty, true))
            );
        if (bt) {
            gui.setState(id, false);
        } else {
            for (let i = 0, n = items.length; i < n; i++) {
                if (buttonH(gui, nested, `${id}-${i}`, items[i])) {
                    i !== sel && (res = i);
                    gui.setState(id, false);
                }
            }
            if (gui.focusID.startsWith(`${id}-`)) {
                switch (gui.key) {
                    case Key.ESC:
                        gui.setState(id, false);
                        break;
                    case Key.UP:
                        return update(gui, id, clamp0(sel - 1));
                    case Key.DOWN:
                        return update(
                            gui,
                            id,
                            Math.min(items.length - 1, sel + 1)
                        );
                    default:
                }
            }
        }
    } else {
        if (buttonH(gui, box, `${id}-${sel}`, items[sel], title, info)) {
            gui.setState(id, true);
        }
        draw &&
            gui.add(
                gui.resource(id, key + 2, () => triangle(gui, tx, ty, false))
            );
    }
    return res;
};

const update = (gui: IMGUI, id: string, next: number) => {
    gui.focusID = `${id}-${next}`;
    return next;
};

const triangle = (gui: IMGUI, x: number, y: number, open: boolean) => {
    const s = open ? 2 : -2;
    return polygon(
        [
            [x - 4, y + s],
            [x + 4, y + s],
            [x, y - s],
        ],
        {
            fill: gui.textColor(false),
        }
    );
};
