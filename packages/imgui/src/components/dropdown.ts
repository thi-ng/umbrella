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
    items: string[],
    state: [number, boolean]
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
            y += h + 2;
        }
        const fID = gui.focusID;
        if (fID.startsWith(`${id}-`)) {
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
        if (button(gui, id + "-" + sel, x, y, w, h, items[sel])) {
            state[1] = true;
        }
    }
    return res;
};
