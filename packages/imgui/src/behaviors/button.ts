import { Key } from "../api";
import { IMGUI } from "../gui";

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
