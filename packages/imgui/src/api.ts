import { Predicate } from "@thi.ng/api";

export type Color = string | number | number[];

export interface GUITheme {
    globalBg?: Color;
    font?: string;
    charWidth: number;
    baseLine: number;
    pad: number;
    focus: Color;
    cursor: Color;
    bg: Color;
    fg: Color;
    text: Color;
    bgHover: Color;
    fgHover: Color;
    textHover: Color;
    bgTooltip: Color;
    textTooltip: Color;
}

export interface IMGUIOpts {
    width: number;
    height: number;
    theme?: Partial<GUITheme>;
}

export interface LayoutBox {
    /**
     * Top-left corner X
     */
    x: number;
    /**
     * Top-left corner Y
     */
    y: number;
    /**
     * Box width (based on requested col span and inner gutter(s))
     */
    w: number;
    /**
     * Box height (based on requested row span and inner gutter(s))
     */
    h: number;
    /**
     * Single cell column width (always w/o col span), based on
     * layout's available space and configured number of columns.
     */
    cw: number;
    /**
     * Single cell row height (always same as `rowHeight` arg given to
     * layout ctor).
     */
    ch: number;
    /**
     * Gutter size.
     */
    gap: number;
}

export interface ILayout<O, T> {
    next(opts?: O): T;
}

export interface IGridLayout extends ILayout<[number, number], LayoutBox> {
    readonly x: number;
    readonly y: number;
    readonly width: number;
    readonly cols: number;
    readonly cellW: number;
    readonly cellH: number;
    readonly gap: number;

    nextSquare(): LayoutBox;

    nest(cols: number, spans?: [number, number]): IGridLayout;
}

export const enum MouseButton {
    LEFT = 1,
    RIGHT = 2,
    MIDDLE = 4
}

export const enum KeyModifier {
    SHIFT = 1,
    CONTROL = 2,
    META = 4,
    ALT = 8
}

export const enum Key {
    ALT = "Alt",
    BACKSPACE = "Backspace",
    CAPSLOCK = "CapsLock",
    CONTEXT_MENU = "ContextMenu",
    CONTROL = "Control",
    DELETE = "Delete",
    DOWN = "ArrowDown",
    END = "End",
    ENTER = "Enter",
    ESC = "Escape",
    HELP = "Help",
    HOME = "Home",
    LEFT = "ArrowLeft",
    META = "Meta",
    NUM_LOCK = "NumLock",
    PAGE_DOWN = "PageDown",
    PAGE_UP = "PageUp",
    RIGHT = "ArrowRight",
    SHIFT = "Shift",
    SPACE = " ",
    TAB = "Tab",
    UP = "ArrowUp"
}

export const CONTROL_KEYS = new Set<string>([
    Key.ALT,
    Key.BACKSPACE,
    Key.CAPSLOCK,
    Key.CONTEXT_MENU,
    Key.CONTROL,
    Key.DELETE,
    Key.DOWN,
    Key.END,
    Key.ENTER,
    Key.ESC,
    Key.HELP,
    Key.HOME,
    Key.LEFT,
    Key.META,
    Key.NUM_LOCK,
    Key.PAGE_DOWN,
    Key.PAGE_UP,
    Key.RIGHT,
    Key.SHIFT,
    Key.TAB,
    Key.UP
]);

export const NONE = "__NONE__";

export const DEFAULT_THEME: GUITheme = {
    globalBg: "#333",
    font: "10px Menlo, monospace",
    charWidth: 6,
    baseLine: 4,
    pad: 8,
    focus: [1, 1, 0, 1],
    cursor: [1, 1, 0, 1],
    bg: [0, 0, 0, 0.66],
    fg: [0, 0.3, 0.5, 1],
    text: [1, 1, 1, 1],
    bgHover: [0.1, 0.1, 0.1, 0.9],
    fgHover: [0, 0.66, 0.66, 1],
    textHover: [1, 1, 1, 1],
    bgTooltip: [1, 1, 1, 0.85],
    textTooltip: [0, 0, 0, 1]
};

export const INPUT_ALPHA: Predicate<string> = (x) => /^\w$/.test(x);

export const INPUT_DIGITS: Predicate<string> = (x) => /^\d$/.test(x);
