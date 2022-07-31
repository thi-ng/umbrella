import type { Predicate } from "@thi.ng/api";

export type Color = string | number | number[];

export type Hash = number;

export interface GUITheme {
	globalBg?: Color;
	font?: string;
	fontSize: number;
	charWidth: number;
	baseLine: number;
	pad: number;
	focus: Color;
	cursor: Color;
	cursorBlink: number;
	bg: Color;
	bgDisabled: Color;
	bgHover: Color;
	fg: Color;
	fgDisabled: Color;
	fgHover: Color;
	text: Color;
	textDisabled: Color;
	textHover: Color;
	bgTooltip: Color;
	textTooltip: Color;
}

export interface IMGUIOpts {
	theme?: Partial<GUITheme>;
}

export enum MouseButton {
	LEFT = 1,
	RIGHT = 2,
	MIDDLE = 4,
}

export enum KeyModifier {
	SHIFT = 1,
	CONTROL = 2,
	META = 4,
	ALT = 8,
}

export enum Key {
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
	UP = "ArrowUp",
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
	Key.UP,
]);

export const NONE = "__NONE__";

export const DEFAULT_THEME: GUITheme = {
	font: "10px Menlo, monospace",
	fontSize: 10,
	charWidth: 6,
	baseLine: 4,
	pad: 8,
	globalBg: "#ccc",
	focus: [0, 1, 0, 1],
	cursor: [0, 0, 0, 1],
	cursorBlink: 2,
	bg: [1, 1, 1, 0.66],
	bgDisabled: [1, 1, 1, 0.33],
	bgHover: [1, 1, 1, 0.9],
	fg: [0.2, 0.8, 1, 1],
	fgDisabled: [0.2, 0.8, 1, 0.5],
	fgHover: [0.3, 0.9, 1, 1],
	text: [0.3, 0.3, 0.3, 1],
	textDisabled: [0.3, 0.3, 0.3, 0.5],
	textHover: [0.2, 0.2, 0.4, 1],
	bgTooltip: [1, 1, 0.8, 0.85],
	textTooltip: [0, 0, 0, 1],
};

export const INPUT_ALPHA: Predicate<string> = (x) => /^\w$/.test(x);

export const INPUT_DIGITS: Predicate<string> = (x) => /^\d$/.test(x);
