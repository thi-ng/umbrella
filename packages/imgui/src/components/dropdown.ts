import { polygon } from "@thi.ng/geom";
import { IGridLayout, Key } from "../api";
import { IMGUI } from "../gui";
import { button } from "./button";

export const dropdown = (
    gui: IMGUI,
    layout: IGridLayout,
    id: string,
    state: [number, boolean],
    items: string[],
    info?: string
) => {
    const nested = layout.nest(1, [1, state[1] ? items.length : 1]);
    let res = false;
    const sel = state[0];
    if (state[1]) {
        for (let i = 0, n = items.length; i < n; i++) {
            if (button(gui, nested, `${id}-${i}`, items[i])) {
                if (i !== sel) {
                    state[0] = i;
                    res = true;
                }
                state[1] = false;
            }
        }
        if (gui.focusID.startsWith(`${id}-`)) {
            switch (gui.key) {
                case Key.UP:
                    return update(gui, state, id, Math.max(0, state[0] - 1));
                case Key.DOWN:
                    return update(
                        gui,
                        state,
                        id,
                        Math.min(items.length - 1, state[0] + 1)
                    );
                default:
            }
        }
    } else {
        const box = nested.next();
        const { x, y, w, h } = box;
        if (button(gui, box, `${id}-${sel}`, items[sel], info)) {
            state[1] = true;
        }
        const tx = x + w - gui.theme.pad - 4;
        const ty = y + h / 2;
        gui.add(
            polygon([[tx - 4, ty - 2], [tx + 4, ty - 2], [tx, ty + 2]], {
                fill: gui.textColor(false)
            })
        );
    }
    return res;
};

const update = (
    gui: IMGUI,
    state: [number, boolean?],
    id: string,
    next: number
) => {
    gui.focusID = `${id}-${next}`;
    state[0] = next;
    return true;
};
