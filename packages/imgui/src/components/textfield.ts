import { Predicate } from "@thi.ng/api";
import { pointInside, rect } from "@thi.ng/geom";
import { CONTROL_KEYS, Key, MouseButton } from "../api";
import { IMGUI } from "../gui";
import { textLabel } from "./textlabel";
import { tooltip } from "./tooltip";

export const textField = (
    gui: IMGUI,
    id: string,
    x: number,
    y: number,
    w: number,
    h: number,
    label: string[],
    pred: Predicate<string> = () => true,
    info?: string
) => {
    const theme = gui.theme;
    const r = rect([x, y], [w, h]);
    const hover = pointInside(r, gui.mouse);
    if (hover) {
        gui.hotID = id;
        if (gui.activeID === "" && gui.buttons & MouseButton.LEFT) {
            gui.activeID = id;
        }
        info && tooltip(gui, info);
    }
    gui.requestFocus(id);
    r.attribs = {
        fill: gui.bgColor(hover),
        stroke: gui.focusColor(id)
    };
    const cw = theme.charWidth;
    const pad = theme.pad;
    const txt = label[0];
    const maxLength = ((w - pad * 2) / cw) | 0;
    let drawTxt =
        txt.length > maxLength ? txt.substr(txt.length - maxLength) : txt;
    gui.add(
        r,
        textLabel(
            [x + pad, y + h / 2 + theme.baseLine],
            gui.textColor(false),
            drawTxt
        )
    );
    if (gui.focusID == id) {
        const xx = x + 10 + drawTxt.length * cw;
        gui.time % 0.5 < 0.25 &&
            gui.add([
                "line",
                { stroke: theme.cursor },
                [xx, y + 4],
                [xx, y + h - 4]
            ]);
        const k = gui.key;
        switch (k) {
            case "":
                break;
            case Key.TAB:
                gui.switchFocus();
                break;
            case Key.ENTER:
                return true;
            case Key.BACKSPACE:
                if (txt.length > 0) {
                    label[0] = txt.substr(0, txt.length - 1);
                    return true;
                }
                break;
            default: {
                if (!CONTROL_KEYS.has(k) && pred(k)) {
                    label[0] += k;
                    return true;
                }
            }
        }
    }
    gui.lastID = id;
    return false;
};
