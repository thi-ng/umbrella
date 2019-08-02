export interface GUITheme {
    globalBg?: string;
    font?: string;
    focus: string;
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
    TAB = "Tab",
    ESC = "Escape",
    ENTER = "Enter",
    SPACE = " ",
    UP = "ArrowUp",
    DOWN = "ArrowDown",
    LEFT = "ArrowLeft",
    RIGHT = "ArrowRight"
}

export const DEFAULT_THEME: GUITheme = {
    globalBg: "#333",
    font: "10px Menlo",
    focus: "#c0c",
    bg: "rgba(0,0,0,0.5)",
    fg: "#0c0",
    text: "#fff",
    bgHover: "#000",
    fgHover: "#0f0",
    textHover: "#555",
    bgTooltip: "rgba(0,0,0,0.8)",
    textTooltip: "#aaa"
};
