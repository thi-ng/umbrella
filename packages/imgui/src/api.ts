import { Predicate } from "@thi.ng/api";

export interface GUITheme {
    globalBg?: string;
    font?: string;
    charWidth: number;
    baseLine: number;
    pad: number;
    focus: string;
    cursor: string;
    bg: string;
    fg: string;
    text: string;
    bgHover: string;
    fgHover: string;
    textHover: string;
    bgTooltip: string;
    textTooltip: string;
}

export interface IMGUIOpts {
    width: number;
    height: number;
    theme: GUITheme;
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
    CAPSLOCK = "Capslock",
    CONTROL = "Control",
    DELETE = "Delete",
    DOWN = "ArrowDown",
    ENTER = "Enter",
    ESC = "Escape",
    LEFT = "ArrowLeft",
    META = "Meta",
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
    Key.CONTROL,
    Key.DELETE,
    Key.DOWN,
    Key.ENTER,
    Key.ESC,
    Key.LEFT,
    Key.META,
    Key.RIGHT,
    Key.SHIFT,
    Key.TAB,
    Key.UP
]);

export const DEFAULT_THEME: GUITheme = {
    globalBg: "#333",
    font: "10px Menlo",
    charWidth: 6,
    baseLine: 4,
    pad: 8,
    focus: "#c0c",
    cursor: "#c0c",
    bg: "rgba(0,0,0,0.5)",
    fg: "#0c0",
    text: "#fff",
    bgHover: "#000",
    fgHover: "#0f0",
    textHover: "#555",
    bgTooltip: "rgba(0,0,0,0.8)",
    textTooltip: "#aaa"
};

export const INPUT_ALPHA: Predicate<string> = (x) => /^\w$/.test(x);

export const INPUT_DIGITS: Predicate<string> = (x) => /^\d$/.test(x);
