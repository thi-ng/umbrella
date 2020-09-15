import type { Predicate } from "@thi.ng/api";
import { rect } from "@thi.ng/geom";
import { IGridLayout, isLayout, LayoutBox } from "@thi.ng/layout";
import { fitClamped } from "@thi.ng/math";
import { hash } from "@thi.ng/vectors";
import { Key } from "../api";
import { isHoverSlider } from "../behaviors/slider";
import { IMGUI } from "../gui";
import { textLabelRaw } from "./textlabel";
import { tooltipRaw } from "./tooltip";

interface TextfieldState {
    cursor: number;
    offset: number;
}

export const textField = (
    gui: IMGUI,
    layout: IGridLayout | LayoutBox,
    id: string,
    label: string,
    filter: Predicate<string> = () => true,
    info?: string
) => {
    const box = isLayout(layout) ? layout.next() : layout;
    return textFieldRaw(
        gui,
        id,
        box.x,
        box.y,
        box.w,
        box.h,
        label,
        filter,
        info
    );
};

export const textFieldRaw = (
    gui: IMGUI,
    id: string,
    x: number,
    y: number,
    w: number,
    h: number,
    txt: string,
    filter: Predicate<string> = () => true,
    info?: string
) => {
    const theme = gui.theme;
    const cw = theme.charWidth;
    const pad = theme.pad;
    const maxLen = Math.max(1, ((w - pad * 2) / cw) | 0);
    const txtLen = txt.length;
    const maxOffset = Math.max(0, txtLen - maxLen);
    const state = gui.state(id, () => ({ cursor: 0, offset: 0 }));
    const drawTxt = txt.substr(state.offset, maxLen);
    const key = hash([x, y, w, h]);
    gui.registerID(id, key);
    const box = gui.resource(id, key, () => rect([x, y], [w, h], {}));
    const hover = isHoverSlider(gui, id, box, "text");
    const draw = gui.draw;
    if (hover) {
        if (gui.isMouseDown()) {
            gui.activeID = id;
            state.cursor = Math.min(
                Math.round(
                    fitClamped(
                        gui.mouse[0],
                        x + pad,
                        x + w - pad,
                        state.offset,
                        state.offset + maxLen
                    )
                ),
                txtLen
            );
        }
        info && draw && tooltipRaw(gui, info);
    }
    const focused = gui.requestFocus(id);
    if (draw) {
        box.attribs.fill = gui.bgColor(focused || hover);
        box.attribs.stroke = gui.focusColor(id);
        gui.add(
            box,
            textLabelRaw(
                [x + pad, y + h / 2 + theme.baseLine],
                gui.textColor(focused),
                drawTxt
            )
        );
    }
    if (focused) {
        const { cursor, offset } = state;
        const drawCursor = Math.min(cursor - offset, maxLen);
        if (draw) {
            const xx = x + pad + drawCursor * cw;
            (gui.time * theme.cursorBlink) % 1 < 0.5 &&
                gui.add([
                    "line",
                    { stroke: theme.cursor },
                    [xx, y + 4],
                    [xx, y + h - 4],
                ]);
        }
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
                    const next = gui.isAltDown()
                        ? prevNonAlpha(txt, cursor - 1)
                        : cursor - 1;
                    move(
                        state,
                        next,
                        next - cursor,
                        drawCursor,
                        offset,
                        maxLen,
                        maxOffset
                    );
                    return txt.substr(0, next) + txt.substr(cursor);
                }
                break;
            case Key.DELETE:
                if (cursor < txtLen) {
                    const next = gui.isAltDown()
                        ? nextNonAlpha(txt, cursor + 1)
                        : cursor + 1;
                    return txt.substr(0, cursor) + txt.substr(next + 1);
                }
                break;
            case Key.LEFT:
                if (cursor > 0) {
                    const next = gui.isAltDown()
                        ? prevNonAlpha(txt, cursor - 1)
                        : cursor - 1;
                    move(
                        state,
                        next,
                        next - cursor,
                        drawCursor,
                        offset,
                        maxLen,
                        maxOffset
                    );
                }
                break;
            case Key.RIGHT:
                if (cursor < txtLen) {
                    const next = gui.isAltDown()
                        ? nextNonAlpha(txt, cursor + 1)
                        : cursor + 1;
                    move(
                        state,
                        next,
                        next - cursor,
                        drawCursor,
                        offset,
                        maxLen,
                        maxOffset
                    );
                }
                break;
            case Key.HOME:
                move(state, 0, -cursor, drawCursor, offset, maxLen, maxOffset);
                break;
            case Key.END:
                move(
                    state,
                    txtLen,
                    txtLen - cursor,
                    drawCursor,
                    offset,
                    maxLen,
                    maxOffset
                );
                break;
            default: {
                if (k.length === 1 && filter(k)) {
                    move(
                        state,
                        cursor + 1,
                        1,
                        drawCursor,
                        offset,
                        maxLen,
                        maxOffset
                    );
                    return txt.substr(0, cursor) + k + txt.substr(cursor);
                }
            }
        }
    }
    gui.lastID = id;
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

const move = (
    state: TextfieldState,
    next: number,
    delta: number,
    drawCursor: number,
    offset: number,
    maxLen: number,
    maxOffset: number
) => {
    state.cursor = next;
    if (drawCursor + delta < 0) {
        state.offset = Math.max(offset + delta, 0);
    } else if (drawCursor + delta > maxLen) {
        state.offset = Math.min(offset + delta, maxOffset);
    }
};
