import { Predicate } from "@thi.ng/api";
import { pointInside, rect } from "@thi.ng/geom";
import { fitClamped } from "@thi.ng/math";
import { hash } from "@thi.ng/vectors";
import {
    IGridLayout,
    Key,
    LayoutBox,
    MouseButton
} from "../api";
import { IMGUI } from "../gui";
import { isLayout } from "../layout";
import { textLabelRaw } from "./textlabel";
import { tooltipRaw } from "./tooltip";

export const textField = (
    gui: IMGUI,
    layout: IGridLayout | LayoutBox,
    id: string,
    label: [string, number?, number?],
    filter: Predicate<string> = () => true,
    info?: string
) => {
    const { x, y, w, h } = isLayout(layout) ? layout.next() : layout;
    return textFieldRaw(gui, id, x, y, w, h, label, filter, info);
};

export const textFieldRaw = (
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
    const cw = theme.charWidth;
    const pad = theme.pad;
    const maxLen = Math.max(1, ((w - pad * 2) / cw) | 0);
    const txt = label[0];
    const txtLen = txt.length;
    const maxOffset = Math.max(0, txtLen - maxLen);
    const offset = label[2] || 0;
    const drawTxt = txt.substr(offset, maxLen);
    const key = hash([x, y, w, h]);
    gui.registerID(id, key);
    const box = gui.resource(id, key, () => rect([x, y], [w, h], {}));
    const hover = pointInside(box, gui.mouse);
    if (hover) {
        gui.hotID = id;
        if (gui.buttons & MouseButton.LEFT) {
            gui.activeID === "" && (gui.activeID = id);
            label[1] = Math.min(
                Math.round(
                    fitClamped(
                        gui.mouse[0],
                        x + pad,
                        x + w - pad,
                        offset,
                        offset + maxLen
                    )
                ),
                txtLen
            );
            label[2] = offset;
        }
        info && tooltipRaw(gui, info);
    }
    const focused = gui.requestFocus(id);
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
    if (focused) {
        const cursor = label[1] || 0;
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
                    const next = gui.isAltDown()
                        ? prevNonAlpha(txt, cursor - 1)
                        : cursor - 1;
                    label[0] = txt.substr(0, next) + txt.substr(cursor);
                    moveBackward(
                        label,
                        next,
                        next - cursor,
                        drawCursor,
                        offset
                    );
                    return true;
                }
                break;
            case Key.DELETE:
                if (cursor < txtLen) {
                    const next = gui.isAltDown()
                        ? nextNonAlpha(txt, cursor + 1)
                        : cursor + 1;
                    label[0] = txt.substr(0, cursor) + txt.substr(next + 1);
                    return true;
                }
                break;
            case Key.LEFT:
                if (cursor > 0) {
                    const next = gui.isAltDown()
                        ? prevNonAlpha(txt, cursor - 1)
                        : cursor - 1;
                    moveBackward(
                        label,
                        next,
                        next - cursor,
                        drawCursor,
                        offset
                    );
                }
                break;
            case Key.RIGHT:
                if (cursor < txtLen) {
                    const next = gui.isAltDown()
                        ? nextNonAlpha(txt, cursor + 1)
                        : cursor + 1;
                    moveForward(
                        label,
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
                moveBackward(label, 0, -cursor, drawCursor, offset);
                break;
            case Key.END:
                moveForward(
                    label,
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
                    label[0] = txt.substr(0, cursor) + k + txt.substr(cursor);
                    moveForward(
                        label,
                        cursor + 1,
                        1,
                        drawCursor,
                        offset,
                        maxLen,
                        maxOffset
                    );
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

const moveBackward = (
    label: [string, number?, number?],
    next: number,
    delta: number,
    drawCursor: number,
    offset: number
) => {
    label[1] = next;
    if (drawCursor + delta < 0) {
        label[2] = Math.max(offset + delta, 0);
    }
};

const moveForward = (
    label: [string, number?, number?],
    next: number,
    delta: number,
    drawCursor: number,
    offset: number,
    maxLen: number,
    maxOffset: number
) => {
    label[1] = next;
    if (drawCursor + delta > maxLen) {
        label[2] = Math.min(offset + delta, maxOffset);
    }
};
