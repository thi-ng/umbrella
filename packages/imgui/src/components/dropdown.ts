import { polygon } from "@thi.ng/geom";
import { Key } from "../api";
import { IMGUI } from "../gui";
import { button } from "./button";

export const dropdown = (
    gui: IMGUI,
    id: string,
    x: number,
    y: number,
    w: number,
    h: number,
    state: [number, boolean],
    items: string[],
    info?: string
) => {
    let res = false;
    const sel = state[0];
    if (state[1]) {
        for (let i = 0, n = items.length; i < n; i++) {
            if (button(gui, id + "-" + i, x, y, w, h, items[i])) {
                if (i !== sel) {
                    state[0] = i;
                    res = true;
                }
                state[1] = false;
            }
            // TODO no hardcoded gap
            y += h + 2;
        }
        if (gui.focusID.startsWith(`${id}-`)) {
            switch (gui.key) {
                case Key.UP: {
                    const next = Math.max(0, state[0] - 1);
                    gui.focusID = id + "-" + next;
                    state[0] = next;
                    res = true;
                    break;
                }
                case Key.DOWN: {
                    const next = Math.min(items.length - 1, state[0] + 1);
                    gui.focusID = id + "-" + next;
                    state[0] = next;
                    res = true;
                    break;
                }
                default:
            }
        }
    } else {
        if (button(gui, id + "-" + sel, x, y, w, h, items[sel], info)) {
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
