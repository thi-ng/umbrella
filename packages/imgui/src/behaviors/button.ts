import { pointInside } from "@thi.ng/geom";
import type { IShape } from "@thi.ng/geom-api";
import { Key } from "../api";
import { IMGUI } from "../gui";

export const isHoverButton = (gui: IMGUI, id: string, shape: IShape) => {
    if (gui.disabled) return false;
    const aid = gui.activeID;
    const hover = (aid === "" || aid === id) && pointInside(shape, gui.mouse);
    if (hover) {
        gui.setCursor("pointer");
        gui.hotID = id;
    }
    return hover;
};

export const handleButtonKeys = (gui: IMGUI) => {
    switch (gui.key) {
        case Key.TAB:
            gui.switchFocus();
            break;
        case Key.ENTER:
        case Key.SPACE:
            return true;
        default:
    }
};
