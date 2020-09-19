import { Predicate } from "@thi.ng/api";
import { Key } from "../api";
import { IMGUI } from "../gui";

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

const getNext = (gui: IMGUI, txt: string, cursor: number, dir: -1 | 1) => {
    cursor += dir;
    return gui.isAltDown()
        ? (dir < 0 ? prevNonAlpha : nextNonAlpha)(txt, cursor)
        : cursor;
};

export const handleTextfieldKeys = (
    gui: IMGUI,
    state: { cursor: number; offset: number },
    filter: Predicate<string>,
    txt: string,
    cursor: number,
    drawCursor: number,
    maxLen: number
) => {
    const txtLen = txt.length;
    const move = (next: number, delta: number) => {
        state.cursor = next;
        if (drawCursor + delta < 0) {
            state.offset = Math.max(state.offset + delta, 0);
        } else if (drawCursor + delta > maxLen) {
            state.offset = Math.min(
                state.offset + delta,
                Math.max(0, txtLen - maxLen)
            );
        }
    };

    const k = gui.key;
    switch (k) {
        case "":
            break;
        case Key.TAB:
            gui.switchFocus();
            break;
        case Key.ENTER:
            return txt;
        case Key.BACKSPACE:
            if (cursor > 0) {
                const next = getNext(gui, txt, cursor, -1);
                move(next, next - cursor);
                return txt.substr(0, next) + txt.substr(cursor);
            }
            break;
        case Key.DELETE:
            if (cursor < txtLen) {
                const next = getNext(gui, txt, cursor, 1);
                return txt.substr(0, cursor) + txt.substr(next + 1);
            }
            break;
        case Key.LEFT:
            if (cursor > 0) {
                const next = getNext(gui, txt, cursor, -1);
                move(next, next - cursor);
            }
            break;
        case Key.RIGHT:
            if (cursor < txtLen) {
                const next = getNext(gui, txt, cursor, 1);
                move(next, next - cursor);
            }
            break;
        case Key.HOME:
            move(0, -cursor);
            break;
        case Key.END:
            move(txtLen, txtLen - cursor);
            break;
        default: {
            if (k.length === 1 && filter(k)) {
                move(cursor + 1, 1);
                return txt.substr(0, cursor) + k + txt.substr(cursor);
            }
        }
    }
};
