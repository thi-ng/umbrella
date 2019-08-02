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
    label: [string, number?, number?],
    filter: Predicate<string> = () => true,
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
    const focused = gui.requestFocus(id);
    r.attribs = {
        fill: gui.bgColor(focused || hover),
        stroke: gui.focusColor(id)
    };
    const cw = theme.charWidth;
    const pad = theme.pad;
    const maxLen = ((w - pad * 2) / cw) | 0;
    const txt = label[0];
    const maxOffset = txt.length - maxLen;
    let offset = label[2] !== undefined ? label[2] : maxOffset;
    const drawTxt = txt.substr(offset, maxLen);
    gui.add(
        r,
        textLabel(
            [x + pad, y + h / 2 + theme.baseLine],
            gui.textColor(false),
            drawTxt
        )
    );
    if (gui.focusID == id) {
        const cursor = label[1] !== undefined ? label[1] : txt.length;
        const drawCursor = Math.min(cursor - offset, maxLen);
        const xx = x + pad + drawCursor * cw;
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
                if (cursor > 0) {
                    label[0] = txt.substr(0, cursor - 1) + txt.substr(cursor);
                    label[1] = cursor - 1;
                    if (drawCursor === 0 && offset > 0) {
                        label[2] = offset - 1;
                    }
                    return true;
                }
                break;
            case Key.DELETE:
                if (cursor < txt.length) {
                    label[0] = txt.substr(0, cursor) + txt.substr(cursor + 1);
                    return true;
                }
                break;
            case Key.LEFT:
                if (cursor > 0) {
                    let delta: number, next: number;
                    if (gui.isAltDown()) {
                        next = prevNonAlpha(txt, cursor);
                        delta = next - cursor;
                    } else {
                        next = cursor - 1;
                        delta = -1;
                    }
                    label[1] = next;
                    if (drawCursor + delta < 0) {
                        label[2] = Math.max(offset + delta, 0);
                    }
                }
                break;
            case Key.RIGHT:
                if (cursor < txt.length) {
                    let delta: number, next: number;
                    if (gui.isAltDown()) {
                        next = nextNonAlpha(txt, cursor);
                        delta = next - cursor;
                    } else {
                        next = cursor + 1;
                        delta = 1;
                    }
                    label[1] = next;
                    if (drawCursor + delta > maxLen) {
                        label[2] = Math.min(offset + delta, maxOffset);
                    }
                }
                break;
            default: {
                if (!CONTROL_KEYS.has(k) && filter(k)) {
                    label[0] = txt.substr(0, cursor) + k + txt.substr(cursor);
                    label[1] = cursor + 1;
                    if (drawCursor === maxLen && offset <= maxOffset) {
                        label[2] = offset + 1;
                    }
                    return true;
                }
            }
        }
    }
    gui.lastID = id;
    return false;
};

const WS = /\s/;

const nextNonAlpha = (src: string, i: number) => {
    const n = src.length;
    while (i < n && WS.test(src[i])) i++;
    for (; i < n && !WS.test(src[i]); i++) {}
    return i;
};

const prevNonAlpha = (src: string, i: number) => {
    while (i > 0 && WS.test(src[i])) i--;
    for (; i > 0 && !WS.test(src[i]); i--) {}
    return i;
};
